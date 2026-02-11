// ============================================================================
// TIPOS DO SISTEMA DE TRACKING - BELLORY
// ============================================================================

// --- Identificadores ---

export interface VisitorIdentity {
  /** ID anonimo do visitante (UUID gerado no cliente, persistido em localStorage) */
  visitorId: string
  /** ID da sessao atual (UUID gerado a cada nova sessao) */
  sessionId: string
  /** true se e a primeira visita (sem visitorId em localStorage) */
  isNewVisitor: boolean
}

// --- 1. Camada de Navegacao ---

export type TrafficSource = 'organic' | 'direct' | 'social' | 'paid' | 'referral' | 'email' | 'unknown'

export interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

export interface NavigationEvent {
  type: 'page_view'
  path: string
  title: string
  referrer: string
  timestamp: number
  /** Tempo em ms que o usuario ficou na pagina anterior */
  timeOnPreviousPage?: number
}

export interface SessionData {
  sessionId: string
  visitorId: string
  isNewVisitor: boolean
  startedAt: number
  lastActiveAt: number
  pageCount: number
  /** Pagina de entrada da sessao */
  entryPage: string
  /** Ultima pagina visitada */
  currentPage: string
  /** Duracao total da sessao em ms */
  duration: number
  /** Fonte de trafego */
  trafficSource: TrafficSource
  /** Parametros UTM se existirem */
  utmParams: UTMParams
  /** Referrer original */
  referrer: string
}

// --- 2. Camada Comportamental ---

export type InteractionEventType =
  | 'click_cta'
  | 'click_button'
  | 'click_link'
  | 'click_plan'
  | 'scroll_depth'
  | 'form_start'
  | 'form_submit'
  | 'form_abandon'
  | 'download'
  | 'video_play'
  | 'roi_calculator_open'
  | 'roi_calculator_interact'
  | 'plan_toggle_annual'
  | 'plan_toggle_monthly'
  | 'theme_toggle'
  | 'faq_open'
  | 'contact_method_click'
  | 'promo_bar_click'
  | 'dropdown_menu_open'
  | 'mobile_menu_open'

export interface InteractionEvent {
  type: InteractionEventType
  /** Identificador do elemento (ex: "cta-hero-comece-gratis", "plan-plus") */
  elementId: string
  /** Label legivel (ex: "Comece gratis", "Plano Plus") */
  elementLabel?: string
  /** Section onde o evento ocorreu */
  section?: string
  /** Metadados adicionais */
  metadata?: Record<string, string | number | boolean>
  timestamp: number
}

export interface ScrollDepthEvent {
  type: 'scroll_depth'
  /** Porcentagem maxima de scroll atingida (25, 50, 75, 90, 100) */
  maxDepth: number
  /** Secao visivel no momento */
  visibleSection?: string
  timestamp: number
}

export interface FlowStep {
  path: string
  timestamp: number
  timeSpent: number
}

export interface FlowData {
  /** Sequencia de paginas visitadas */
  steps: FlowStep[]
  /** Se o usuario completou o fluxo desejado */
  completed: boolean
  /** Onde o usuario abandonou (se abandonou) */
  abandonedAt?: string
  /** Passos ate conversao */
  stepsToConversion?: number
}

// --- 3. Camada de Contexto ---

export interface DeviceInfo {
  /** mobile | desktop | tablet */
  deviceType: 'mobile' | 'desktop' | 'tablet'
  /** Ex: "Windows", "macOS", "Android", "iOS" */
  os: string
  /** Ex: "Chrome 120", "Safari 17" */
  browser: string
  /** Ex: "1920x1080" */
  screenSize: string
  /** Viewport atual */
  viewportSize: string
  /** Touch enabled */
  touchEnabled: boolean
  /** Idioma do navegador */
  language: string
}

export interface GeoInfo {
  country?: string
  state?: string
  city?: string
}

export interface PerformanceMetrics {
  /** Tempo de carregamento da pagina em ms */
  pageLoadTime?: number
  /** First Contentful Paint */
  fcp?: number
  /** Largest Contentful Paint */
  lcp?: number
  /** First Input Delay */
  fid?: number
  /** Cumulative Layout Shift */
  cls?: number
  /** Time to First Byte */
  ttfb?: number
}

export interface ErrorEvent {
  type: 'js_error' | 'request_timeout' | 'request_error'
  message: string
  stack?: string
  url?: string
  /** Status code para erros HTTP */
  statusCode?: number
  timestamp: number
}

// --- 4. Camada de Conversao ---

export type ConversionEventType =
  | 'cadastro_started'
  | 'cadastro_step_completed'
  | 'cadastro_completed'
  | 'cadastro_abandoned'
  | 'trial_started'
  | 'lead_qualified'
  | 'contact_form_submitted'
  | 'plan_viewed'
  | 'plan_selected'
  | 'newsletter_subscribed'

export interface ConversionEvent {
  type: ConversionEventType
  /** Metadados nao sensiveis */
  metadata?: {
    /** Plano visualizado/selecionado */
    planId?: string
    planName?: string
    /** Recorrencia */
    billingCycle?: 'monthly' | 'annual'
    /** Step do cadastro */
    registrationStep?: number
    registrationStepName?: string
    /** Feature mais acessada antes da conversao */
    lastFeatureViewed?: string
    /** Tempo em ms desde a primeira visita ate esta conversao */
    timeToConvert?: number
    /** Numero de sessoes ate converter */
    sessionsToConvert?: number
  }
  timestamp: number
}

// --- Payload unificado para envio ao backend ---

export interface TrackingPayload {
  visitor: VisitorIdentity
  device: DeviceInfo
  session: Omit<SessionData, 'sessionId' | 'visitorId' | 'isNewVisitor'>
  geo?: GeoInfo
  events: Array<
    | ({ category: 'navigation' } & NavigationEvent)
    | ({ category: 'interaction' } & InteractionEvent)
    | ({ category: 'scroll' } & ScrollDepthEvent)
    | ({ category: 'conversion' } & ConversionEvent)
    | ({ category: 'error' } & ErrorEvent)
  >
  performance?: PerformanceMetrics
}

// --- Configuracao do Tracker ---

export interface TrackingConfig {
  /** URL do endpoint de tracking */
  apiUrl: string
  /** Intervalo de flush em ms (default: 10000 = 10s) */
  flushInterval: number
  /** Tamanho maximo do batch antes de forcar flush */
  maxBatchSize: number
  /** Se o tracking esta habilitado */
  enabled: boolean
  /** Se deve coletar dados de geolocalização (via API) */
  collectGeo: boolean
  /** Se deve coletar metricas de performance */
  collectPerformance: boolean
  /** Se deve rastrear erros JS */
  trackErrors: boolean
  /** Porcentagens de scroll para trackear */
  scrollThresholds: number[]
  /** Tempo de inatividade para considerar sessao encerrada (default: 30min) */
  sessionTimeout: number
  /** Debug mode - loga eventos no console */
  debug: boolean
}

export const DEFAULT_TRACKING_CONFIG: TrackingConfig = {
  apiUrl: 'https://api.bellory.com.br/api/tracking',
  flushInterval: 10000,
  maxBatchSize: 20,
  enabled: true,
  collectGeo: true,
  collectPerformance: true,
  trackErrors: true,
  scrollThresholds: [25, 50, 75, 90, 100],
  sessionTimeout: 30 * 60 * 1000, // 30 minutos
  debug: typeof window !== 'undefined' && window.location.hostname === 'localhost',
}
