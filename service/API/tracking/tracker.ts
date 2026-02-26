import type {
  TrackingConfig,
  TrackingPayload,
  VisitorIdentity,
  SessionData,
  DeviceInfo,
  GeoInfo,
  PerformanceMetrics,
  NavigationEvent,
  InteractionEvent,
  ScrollDepthEvent,
  ConversionEvent,
  ErrorEvent,
  TrafficSource,
  UTMParams,
} from './types'

// ============================================================================
// TRACKER CORE - BELLORY
// Motor de coleta de dados de usuario
// ============================================================================

type TrackingEvent =
  | ({ category: 'navigation' } & NavigationEvent)
  | ({ category: 'interaction' } & InteractionEvent)
  | ({ category: 'scroll' } & ScrollDepthEvent)
  | ({ category: 'conversion' } & ConversionEvent)
  | ({ category: 'error' } & ErrorEvent)

const STORAGE_KEYS = {
  VISITOR_ID: 'bly_vid',
  SESSION_ID: 'bly_sid',
  SESSION_START: 'bly_ss',
  SESSION_LAST_ACTIVE: 'bly_sla',
  VISITOR_FIRST_SEEN: 'bly_vfs',
  SESSION_COUNT: 'bly_sc',
  PAGE_COUNT: 'bly_pc',
  ENTRY_PAGE: 'bly_ep',
} as const

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function getStorageItem(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function setStorageItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    // localStorage indisponivel (ex: modo privado em Safari)
  }
}

class BelloryTracker {
  private config: TrackingConfig
  private visitor: VisitorIdentity
  private session: SessionData
  private device: DeviceInfo
  private geo: GeoInfo | undefined
  private events: TrackingEvent[] = []
  private flushTimer: ReturnType<typeof setInterval> | null = null
  private performanceMetrics: PerformanceMetrics | undefined
  private scrollThresholdsReached: Set<number> = new Set()
  private previousPageTimestamp: number = 0
  private initialized = false

  constructor(config: TrackingConfig) {
    this.config = config
    this.visitor = this.initVisitor()
    this.device = this.collectDeviceInfo()
    this.session = this.initSession()
  }

  // --- Inicializacao ---

  init(): void {
    if (this.initialized || typeof window === 'undefined') return
    if (!this.config.enabled) return

    this.initialized = true

    // Inicia flush periodico
    this.flushTimer = setInterval(() => this.flush(), this.config.flushInterval)

    // Coleta geolocalizacao (sem bloquear)
    if (this.config.collectGeo) {
      this.collectGeoInfo()
    }

    // Coleta performance metrics
    if (this.config.collectPerformance) {
      this.collectPerformanceMetrics()
    }

    // Escuta erros JS
    if (this.config.trackErrors) {
      this.setupErrorTracking()
    }

    // Envia dados antes do usuario sair
    window.addEventListener('beforeunload', () => this.flush())

    // Detecta visibilidade para sessao
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.flush()
      } else {
        this.refreshSession()
      }
    })

    this.log('Tracker inicializado', {
      visitorId: this.visitor.visitorId,
      sessionId: this.visitor.sessionId,
      isNew: this.visitor.isNewVisitor,
    })
  }

  destroy(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer)
      this.flushTimer = null
    }
    this.flush()
    this.initialized = false
  }

  // --- Visitor ---

  private initVisitor(): VisitorIdentity {
    const existingVisitorId = getStorageItem(STORAGE_KEYS.VISITOR_ID)
    const isNewVisitor = !existingVisitorId
    const visitorId = existingVisitorId || generateId()

    if (isNewVisitor) {
      setStorageItem(STORAGE_KEYS.VISITOR_ID, visitorId)
      setStorageItem(STORAGE_KEYS.VISITOR_FIRST_SEEN, Date.now().toString())
      setStorageItem(STORAGE_KEYS.SESSION_COUNT, '0')
    }

    const sessionId = this.resolveSessionId()

    return { visitorId, sessionId, isNewVisitor }
  }

  private resolveSessionId(): string {
    const existingSessionId = getStorageItem(STORAGE_KEYS.SESSION_ID)
    const lastActive = getStorageItem(STORAGE_KEYS.SESSION_LAST_ACTIVE)
    const now = Date.now()

    // Sessao expirada?
    if (existingSessionId && lastActive) {
      const elapsed = now - parseInt(lastActive, 10)
      if (elapsed < this.config.sessionTimeout) {
        setStorageItem(STORAGE_KEYS.SESSION_LAST_ACTIVE, now.toString())
        return existingSessionId
      }
    }

    // Nova sessao
    const newSessionId = generateId()
    setStorageItem(STORAGE_KEYS.SESSION_ID, newSessionId)
    setStorageItem(STORAGE_KEYS.SESSION_START, now.toString())
    setStorageItem(STORAGE_KEYS.SESSION_LAST_ACTIVE, now.toString())
    setStorageItem(STORAGE_KEYS.PAGE_COUNT, '0')

    const sessionCount = parseInt(getStorageItem(STORAGE_KEYS.SESSION_COUNT) || '0', 10)
    setStorageItem(STORAGE_KEYS.SESSION_COUNT, (sessionCount + 1).toString())

    return newSessionId
  }

  private refreshSession(): void {
    const newSessionId = this.resolveSessionId()
    if (newSessionId !== this.visitor.sessionId) {
      this.visitor.sessionId = newSessionId
      this.session = this.initSession()
    }
    setStorageItem(STORAGE_KEYS.SESSION_LAST_ACTIVE, Date.now().toString())
  }

  // --- Sessao ---

  private initSession(): SessionData {
    const now = Date.now()
    const sessionStart = parseInt(getStorageItem(STORAGE_KEYS.SESSION_START) || now.toString(), 10)
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'

    const utmParams = this.extractUTMParams()
    const trafficSource = this.detectTrafficSource()
    const referrer = typeof document !== 'undefined' ? document.referrer : ''

    if (!getStorageItem(STORAGE_KEYS.ENTRY_PAGE)) {
      setStorageItem(STORAGE_KEYS.ENTRY_PAGE, currentPath)
    }

    return {
      sessionId: this.visitor.sessionId,
      visitorId: this.visitor.visitorId,
      isNewVisitor: this.visitor.isNewVisitor,
      startedAt: sessionStart,
      lastActiveAt: now,
      pageCount: parseInt(getStorageItem(STORAGE_KEYS.PAGE_COUNT) || '0', 10),
      entryPage: getStorageItem(STORAGE_KEYS.ENTRY_PAGE) || currentPath,
      currentPage: currentPath,
      duration: now - sessionStart,
      trafficSource,
      utmParams,
      referrer,
    }
  }

  private extractUTMParams(): UTMParams {
    if (typeof window === 'undefined') return {}

    const params = new URLSearchParams(window.location.search)
    const utm: UTMParams = {}

    if (params.get('utm_source')) utm.utm_source = params.get('utm_source')!
    if (params.get('utm_medium')) utm.utm_medium = params.get('utm_medium')!
    if (params.get('utm_campaign')) utm.utm_campaign = params.get('utm_campaign')!
    if (params.get('utm_term')) utm.utm_term = params.get('utm_term')!
    if (params.get('utm_content')) utm.utm_content = params.get('utm_content')!

    return utm
  }

  private detectTrafficSource(): TrafficSource {
    if (typeof window === 'undefined') return 'unknown'

    const params = new URLSearchParams(window.location.search)
    const referrer = document.referrer

    // UTM com gclid/fbclid = pago
    if (params.get('gclid') || params.get('fbclid') || params.get('utm_medium') === 'cpc' || params.get('utm_medium') === 'paid') {
      return 'paid'
    }

    // UTM com email
    if (params.get('utm_medium') === 'email') {
      return 'email'
    }

    // UTM com social
    if (params.get('utm_medium') === 'social') {
      return 'social'
    }

    // Se tem UTM source, e' referral/organic dependendo do medium
    if (params.get('utm_source')) {
      return 'referral'
    }

    // Sem referrer = direto
    if (!referrer) {
      return 'direct'
    }

    // Referrer de buscadores
    const searchEngines = ['google.', 'bing.', 'yahoo.', 'duckduckgo.', 'baidu.']
    if (searchEngines.some((se) => referrer.includes(se))) {
      return 'organic'
    }

    // Referrer de redes sociais
    const socialNetworks = ['facebook.', 'instagram.', 'twitter.', 'linkedin.', 'tiktok.', 'youtube.', 't.co']
    if (socialNetworks.some((sn) => referrer.includes(sn))) {
      return 'social'
    }

    // Referrer do proprio site
    try {
      const referrerHost = new URL(referrer).hostname
      if (referrerHost === window.location.hostname) {
        return 'direct'
      }
    } catch {
      // URL invalida
    }

    return 'referral'
  }

  // --- Device Info ---

  private collectDeviceInfo(): DeviceInfo {
    if (typeof window === 'undefined') {
      return {
        deviceType: 'desktop',
        os: 'unknown',
        browser: 'unknown',
        screenSize: 'unknown',
        viewportSize: 'unknown',
        touchEnabled: false,
        language: 'pt-BR',
      }
    }

    const ua = navigator.userAgent

    return {
      deviceType: this.detectDeviceType(),
      os: this.detectOS(ua),
      browser: this.detectBrowser(ua),
      screenSize: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      touchEnabled: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      language: navigator.language || 'pt-BR',
    }
  }

  private detectDeviceType(): 'mobile' | 'desktop' | 'tablet' {
    if (typeof window === 'undefined') return 'desktop'
    const width = window.innerWidth
    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    return 'desktop'
  }

  private detectOS(ua: string): string {
    if (ua.includes('Windows')) return 'Windows'
    if (ua.includes('Mac OS X') || ua.includes('Macintosh')) return 'macOS'
    if (ua.includes('Android')) return 'Android'
    if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS'
    if (ua.includes('Linux')) return 'Linux'
    return 'unknown'
  }

  private detectBrowser(ua: string): string {
    if (ua.includes('Firefox/')) {
      const match = ua.match(/Firefox\/(\d+)/)
      return match ? `Firefox ${match[1]}` : 'Firefox'
    }
    if (ua.includes('Edg/')) {
      const match = ua.match(/Edg\/(\d+)/)
      return match ? `Edge ${match[1]}` : 'Edge'
    }
    if (ua.includes('Chrome/')) {
      const match = ua.match(/Chrome\/(\d+)/)
      return match ? `Chrome ${match[1]}` : 'Chrome'
    }
    if (ua.includes('Safari/') && !ua.includes('Chrome')) {
      const match = ua.match(/Version\/(\d+)/)
      return match ? `Safari ${match[1]}` : 'Safari'
    }
    return 'unknown'
  }

  // --- Geolocalizacao (anonimizada, via API) ---

  private async collectGeoInfo(): Promise<void> {
    try {
      // Usa um servico de geolocalizacao por IP (sem identificar o usuario)
      const response = await fetch('https://ipapi.co/json/', {
        signal: AbortSignal.timeout(5000),
      })
      if (response.ok) {
        const data = await response.json()
        this.geo = {
          country: data.country_name,
          state: data.region,
          city: data.city,
        }
        this.log('Geo coletada', this.geo)
      }
    } catch {
      // Falha na geolocalizacao nao e critica
      this.log('Falha ao coletar geo (nao critico)')
    }
  }

  // --- Performance ---

  private collectPerformanceMetrics(): void {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return

    // Web Vitals via PerformanceObserver
    try {
      // LCP
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const last = entries[entries.length - 1] as any
        if (last) {
          this.performanceMetrics = {
            ...this.performanceMetrics,
            lcp: Math.round(last.startTime),
          }
        }
      })
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

      // FID
      const fidObserver = new PerformanceObserver((list) => {
        const entry = list.getEntries()[0] as any
        if (entry) {
          this.performanceMetrics = {
            ...this.performanceMetrics,
            fid: Math.round(entry.processingStart - entry.startTime),
          }
        }
      })
      fidObserver.observe({ type: 'first-input', buffered: true })

      // CLS
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        }
        this.performanceMetrics = {
          ...this.performanceMetrics,
          cls: Math.round(clsValue * 1000) / 1000,
        }
      })
      clsObserver.observe({ type: 'layout-shift', buffered: true })

      // FCP e TTFB via navigation timing
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.performanceMetrics = {
              ...this.performanceMetrics,
              fcp: Math.round(entry.startTime),
            }
          }
        }
      })
      paintObserver.observe({ type: 'paint', buffered: true })

      // Navigation timing
      window.addEventListener('load', () => {
        setTimeout(() => {
          const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
          if (nav) {
            this.performanceMetrics = {
              ...this.performanceMetrics,
              pageLoadTime: Math.round(nav.loadEventEnd - nav.fetchStart),
              ttfb: Math.round(nav.responseStart - nav.requestStart),
            }
          }
        }, 0)
      })
    } catch {
      this.log('Falha ao coletar performance metrics (nao critico)')
    }
  }

  // --- Error Tracking ---

  private setupErrorTracking(): void {
    if (typeof window === 'undefined') return

    window.addEventListener('error', (event) => {
      this.trackError({
        type: 'js_error',
        message: event.message,
        stack: event.error?.stack,
        url: event.filename,
        timestamp: Date.now(),
      })
    })

    window.addEventListener('unhandledrejection', (event) => {
      this.trackError({
        type: 'js_error',
        message: `Unhandled Promise: ${event.reason?.message || String(event.reason)}`,
        stack: event.reason?.stack,
        timestamp: Date.now(),
      })
    })
  }

  // --- API Publica: Track Events ---

  trackPageView(path: string, title: string): void {
    if (!this.config.enabled) return

    const now = Date.now()
    const timeOnPreviousPage = this.previousPageTimestamp
      ? now - this.previousPageTimestamp
      : undefined

    this.previousPageTimestamp = now

    // Atualiza sessao
    const pageCount = parseInt(getStorageItem(STORAGE_KEYS.PAGE_COUNT) || '0', 10) + 1
    setStorageItem(STORAGE_KEYS.PAGE_COUNT, pageCount.toString())
    this.session.pageCount = pageCount
    this.session.currentPage = path
    this.session.lastActiveAt = now
    this.session.duration = now - this.session.startedAt

    // Reset scroll thresholds na nova pagina
    this.scrollThresholdsReached.clear()

    const event: TrackingEvent = {
      category: 'navigation',
      type: 'page_view',
      path,
      title,
      referrer: document.referrer,
      timestamp: now,
      timeOnPreviousPage,
    }

    this.pushEvent(event)
    this.log('Page view', { path, title })
  }

  trackInteraction(
    type: InteractionEvent['type'],
    elementId: string,
    options?: {
      elementLabel?: string
      section?: string
      metadata?: Record<string, string | number | boolean>
    }
  ): void {
    if (!this.config.enabled) return

    const event: TrackingEvent = {
      category: 'interaction',
      type,
      elementId,
      elementLabel: options?.elementLabel,
      section: options?.section,
      metadata: options?.metadata,
      timestamp: Date.now(),
    }

    this.pushEvent(event)
    this.log('Interaction', { type, elementId })
  }

  trackScrollDepth(depth: number, visibleSection?: string): void {
    if (!this.config.enabled) return

    // So trackeia thresholds definidos na config
    const threshold = this.config.scrollThresholds.find(
      (t) => depth >= t && !this.scrollThresholdsReached.has(t)
    )

    if (!threshold) return

    this.scrollThresholdsReached.add(threshold)

    const event: TrackingEvent = {
      category: 'scroll',
      type: 'scroll_depth',
      maxDepth: threshold,
      visibleSection,
      timestamp: Date.now(),
    }

    this.pushEvent(event)
    this.log('Scroll depth', { depth: threshold, section: visibleSection })
  }

  trackConversion(
    type: ConversionEvent['type'],
    metadata?: ConversionEvent['metadata']
  ): void {
    if (!this.config.enabled) return

    // Enriquece com dados de sessao
    const enrichedMetadata = {
      ...metadata,
      timeToConvert: metadata?.timeToConvert ?? (Date.now() - parseInt(getStorageItem(STORAGE_KEYS.VISITOR_FIRST_SEEN) || Date.now().toString(), 10)),
      sessionsToConvert: parseInt(getStorageItem(STORAGE_KEYS.SESSION_COUNT) || '1', 10),
    }

    const event: TrackingEvent = {
      category: 'conversion',
      type,
      metadata: enrichedMetadata,
      timestamp: Date.now(),
    }

    this.pushEvent(event)
    // Conversoes fazem flush imediato
    this.flush()
    this.log('Conversion', { type, metadata: enrichedMetadata })
  }

  trackError(error: ErrorEvent): void {
    if (!this.config.enabled || !this.config.trackErrors) return

    const event: TrackingEvent = {
      category: 'error',
      ...error,
    }

    this.pushEvent(event)
    this.log('Error tracked', { type: error.type, message: error.message })
  }

  // --- Buffer e Flush ---

  private pushEvent(event: TrackingEvent): void {
    this.events.push(event)
    this.session.lastActiveAt = Date.now()
    setStorageItem(STORAGE_KEYS.SESSION_LAST_ACTIVE, Date.now().toString())

    if (this.events.length >= this.config.maxBatchSize) {
      this.flush()
    }
  }

  private async flush(): Promise<void> {
    if (this.events.length === 0) return

    const eventsToSend = [...this.events]
    this.events = []

    const payload: TrackingPayload = {
      visitor: this.visitor,
      device: this.device,
      session: {
        startedAt: this.session.startedAt,
        lastActiveAt: this.session.lastActiveAt,
        pageCount: this.session.pageCount,
        entryPage: this.session.entryPage,
        currentPage: this.session.currentPage,
        duration: Date.now() - this.session.startedAt,
        trafficSource: this.session.trafficSource,
        utmParams: this.session.utmParams,
        referrer: this.session.referrer,
      },
      geo: this.geo,
      events: eventsToSend,
      performance: this.performanceMetrics,
    }

    this.log('Flushing', { eventCount: eventsToSend.length })

    try {
      // Usa sendBeacon para beforeunload (mais confiavel)
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' })
        const sent = navigator.sendBeacon(this.config.apiUrl, blob)
        if (sent) return
      }

      // Fallback para fetch
      await fetch(this.config.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      })
    } catch {
      // Se falhar, devolve os eventos pro buffer
      this.events = [...eventsToSend, ...this.events]
      this.log('Flush falhou, eventos devolvidos ao buffer')
    }
  }

  // --- Getters publicos ---

  getVisitorId(): string {
    return this.visitor.visitorId
  }

  getSessionId(): string {
    return this.visitor.sessionId
  }

  isNewVisitor(): boolean {
    return this.visitor.isNewVisitor
  }

  getSessionData(): SessionData {
    return { ...this.session }
  }

  // --- Debug ---

  private log(message: string, data?: any): void {
    if (this.config.debug) {
      // console.log(`[Bellory Tracker] ${message}`, data ?? '')
    }
  }
}

// --- Singleton ---

let trackerInstance: BelloryTracker | null = null

export function createTracker(config: TrackingConfig): BelloryTracker {
  if (trackerInstance) {
    trackerInstance.destroy()
  }
  trackerInstance = new BelloryTracker(config)
  return trackerInstance
}

export function getTracker(): BelloryTracker | null {
  return trackerInstance
}

export { BelloryTracker }
