# Bellory - Especificacao do Backend de Tracking

## Visao Geral

Este documento descreve a arquitetura e os endpoints necessarios para o backend que ira receber, armazenar, processar e expor os dados de tracking coletados pelo frontend do site bellory.com.br.

O frontend ja esta instrumentado e envia payloads via `POST /api/tracking` em batches periodicos (a cada 10s) ou eventos criticos (conversoes).

---

## 1. Endpoint de Ingestao

### `POST /api/tracking`

Recebe os eventos coletados pelo frontend.

**Headers:**
```
Content-Type: application/json
```

**Body (TrackingPayload):**
```json
{
  "visitor": {
    "visitorId": "uuid-anonimo-do-visitante",
    "sessionId": "uuid-da-sessao-atual",
    "isNewVisitor": true
  },
  "device": {
    "deviceType": "mobile | desktop | tablet",
    "os": "Android",
    "browser": "Chrome 120",
    "screenSize": "1920x1080",
    "viewportSize": "412x915",
    "touchEnabled": true,
    "language": "pt-BR"
  },
  "session": {
    "startedAt": 1707600000000,
    "lastActiveAt": 1707600300000,
    "pageCount": 5,
    "entryPage": "/",
    "currentPage": "/cadastro",
    "duration": 300000,
    "trafficSource": "organic | direct | social | paid | referral | email | unknown",
    "utmParams": {
      "utm_source": "google",
      "utm_medium": "cpc",
      "utm_campaign": "lancamento-2025"
    },
    "referrer": "https://google.com"
  },
  "geo": {
    "country": "Brazil",
    "state": "Sao Paulo",
    "city": "Sao Paulo"
  },
  "events": [
    {
      "category": "navigation",
      "type": "page_view",
      "path": "/",
      "title": "Bellory - Sistema de Gestao",
      "referrer": "",
      "timestamp": 1707600000000,
      "timeOnPreviousPage": 15000
    },
    {
      "category": "interaction",
      "type": "click_cta",
      "elementId": "cta-hero-comece-gratis",
      "elementLabel": "Comece gratis",
      "section": "hero",
      "metadata": {},
      "timestamp": 1707600015000
    },
    {
      "category": "scroll",
      "type": "scroll_depth",
      "maxDepth": 75,
      "visibleSection": "planos",
      "timestamp": 1707600020000
    },
    {
      "category": "conversion",
      "type": "cadastro_started",
      "metadata": {
        "planId": "plus",
        "planName": "Plus",
        "billingCycle": "annual",
        "timeToConvert": 180000,
        "sessionsToConvert": 2
      },
      "timestamp": 1707600030000
    },
    {
      "category": "error",
      "type": "js_error",
      "message": "Cannot read property 'x' of undefined",
      "stack": "Error: ...",
      "url": "/components/pricing.tsx",
      "timestamp": 1707600040000
    }
  ],
  "performance": {
    "pageLoadTime": 1200,
    "fcp": 800,
    "lcp": 1500,
    "fid": 50,
    "cls": 0.05,
    "ttfb": 200
  }
}
```

**Resposta:**
```json
// 200 OK (ou 204 No Content)
{ "status": "ok" }
```

**Consideracoes:**
- O endpoint deve ser **extremamente rapido** (< 50ms). Receba o payload, valide minimamente e coloque numa **fila** (RabbitMQ, Redis Queue, SQS, ou similar).
- Suportar `Content-Type: application/json` e tambem `navigator.sendBeacon` (que envia como `text/plain`).
- Nao requer autenticacao (dados sao anonimos), mas implementar **rate limiting** por IP (ex: 60 req/min).
- Validar o tamanho maximo do payload (ex: 100KB).

---

## 2. Schema do Banco de Dados

### Banco recomendado: **PostgreSQL** (com possivel uso de TimescaleDB para time-series) ou **ClickHouse** para analytics de alto volume.

### 2.1. Tabela `visitors`

Armazena visitantes unicos.

```sql
CREATE TABLE visitors (
    id UUID PRIMARY KEY,                          -- visitorId gerado no frontend
    first_seen_at TIMESTAMP NOT NULL DEFAULT NOW(),
    last_seen_at TIMESTAMP NOT NULL DEFAULT NOW(),
    total_sessions INTEGER DEFAULT 1,
    total_page_views INTEGER DEFAULT 0,
    is_converted BOOLEAN DEFAULT FALSE,           -- true se fez cadastro
    converted_at TIMESTAMP,
    conversion_plan_id VARCHAR(50),
    country VARCHAR(100),
    state VARCHAR(100),
    city VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_visitors_first_seen ON visitors(first_seen_at);
CREATE INDEX idx_visitors_converted ON visitors(is_converted);
```

### 2.2. Tabela `sessions`

Armazena cada sessao de navegacao.

```sql
CREATE TABLE sessions (
    id UUID PRIMARY KEY,                          -- sessionId gerado no frontend
    visitor_id UUID NOT NULL REFERENCES visitors(id),
    started_at TIMESTAMP NOT NULL,
    ended_at TIMESTAMP,
    duration_ms INTEGER DEFAULT 0,
    page_count INTEGER DEFAULT 0,
    entry_page VARCHAR(500) NOT NULL,
    exit_page VARCHAR(500),
    traffic_source VARCHAR(50) NOT NULL,          -- organic, direct, social, paid, referral, email
    referrer TEXT,
    utm_source VARCHAR(255),
    utm_medium VARCHAR(255),
    utm_campaign VARCHAR(255),
    utm_term VARCHAR(255),
    utm_content VARCHAR(255),
    device_type VARCHAR(20) NOT NULL,             -- mobile, desktop, tablet
    os VARCHAR(100),
    browser VARCHAR(100),
    screen_size VARCHAR(20),
    viewport_size VARCHAR(20),
    touch_enabled BOOLEAN DEFAULT FALSE,
    language VARCHAR(10),
    country VARCHAR(100),
    state VARCHAR(100),
    city VARCHAR(100),
    is_bounce BOOLEAN DEFAULT FALSE,              -- true se page_count == 1
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sessions_visitor ON sessions(visitor_id);
CREATE INDEX idx_sessions_started ON sessions(started_at);
CREATE INDEX idx_sessions_traffic ON sessions(traffic_source);
CREATE INDEX idx_sessions_entry ON sessions(entry_page);
```

### 2.3. Tabela `page_views`

Cada visualizacao de pagina.

```sql
CREATE TABLE page_views (
    id BIGSERIAL PRIMARY KEY,
    session_id UUID NOT NULL REFERENCES sessions(id),
    visitor_id UUID NOT NULL REFERENCES visitors(id),
    path VARCHAR(500) NOT NULL,
    title TEXT,
    referrer TEXT,
    time_on_page_ms INTEGER,                      -- tempo na pagina anterior
    viewed_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_pageviews_session ON page_views(session_id);
CREATE INDEX idx_pageviews_path ON page_views(path);
CREATE INDEX idx_pageviews_viewed ON page_views(viewed_at);
```

### 2.4. Tabela `interaction_events`

Todos os eventos de interacao (cliques, scroll, form, etc).

```sql
CREATE TABLE interaction_events (
    id BIGSERIAL PRIMARY KEY,
    session_id UUID NOT NULL REFERENCES sessions(id),
    visitor_id UUID NOT NULL REFERENCES visitors(id),
    event_type VARCHAR(50) NOT NULL,              -- click_cta, scroll_depth, form_submit, etc
    element_id VARCHAR(255) NOT NULL,             -- ex: "cta-hero-comece-gratis"
    element_label VARCHAR(255),
    section VARCHAR(100),
    metadata JSONB,                               -- dados extras flexiveis
    occurred_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_interactions_session ON interaction_events(session_id);
CREATE INDEX idx_interactions_type ON interaction_events(event_type);
CREATE INDEX idx_interactions_element ON interaction_events(element_id);
CREATE INDEX idx_interactions_section ON interaction_events(section);
CREATE INDEX idx_interactions_occurred ON interaction_events(occurred_at);
```

### 2.5. Tabela `scroll_events`

Eventos de profundidade de scroll.

```sql
CREATE TABLE scroll_events (
    id BIGSERIAL PRIMARY KEY,
    session_id UUID NOT NULL REFERENCES sessions(id),
    visitor_id UUID NOT NULL REFERENCES visitors(id),
    page_path VARCHAR(500) NOT NULL,
    max_depth INTEGER NOT NULL,                   -- 25, 50, 75, 90, 100
    visible_section VARCHAR(100),
    occurred_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_scroll_session ON scroll_events(session_id);
CREATE INDEX idx_scroll_depth ON scroll_events(max_depth);
CREATE INDEX idx_scroll_occurred ON scroll_events(occurred_at);
```

### 2.6. Tabela `conversion_events`

Eventos de conversao (cadastro, trial, lead).

```sql
CREATE TABLE conversion_events (
    id BIGSERIAL PRIMARY KEY,
    session_id UUID NOT NULL REFERENCES sessions(id),
    visitor_id UUID NOT NULL REFERENCES visitors(id),
    event_type VARCHAR(50) NOT NULL,              -- cadastro_started, cadastro_completed, etc
    plan_id VARCHAR(50),
    plan_name VARCHAR(100),
    billing_cycle VARCHAR(20),                    -- monthly, annual
    registration_step INTEGER,
    registration_step_name VARCHAR(100),
    last_feature_viewed VARCHAR(255),
    time_to_convert_ms BIGINT,                    -- tempo desde primeira visita
    sessions_to_convert INTEGER,                  -- quantas sessoes ate converter
    occurred_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_conversions_visitor ON conversion_events(visitor_id);
CREATE INDEX idx_conversions_type ON conversion_events(event_type);
CREATE INDEX idx_conversions_plan ON conversion_events(plan_id);
CREATE INDEX idx_conversions_occurred ON conversion_events(occurred_at);
```

### 2.7. Tabela `error_events`

Erros de JS e requests.

```sql
CREATE TABLE error_events (
    id BIGSERIAL PRIMARY KEY,
    session_id UUID NOT NULL REFERENCES sessions(id),
    visitor_id UUID NOT NULL REFERENCES visitors(id),
    error_type VARCHAR(50) NOT NULL,              -- js_error, request_timeout, request_error
    message TEXT NOT NULL,
    stack TEXT,
    url TEXT,
    status_code INTEGER,
    occurred_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_errors_type ON error_events(error_type);
CREATE INDEX idx_errors_occurred ON error_events(occurred_at);
```

### 2.8. Tabela `performance_snapshots`

Metricas de performance (Web Vitals).

```sql
CREATE TABLE performance_snapshots (
    id BIGSERIAL PRIMARY KEY,
    session_id UUID NOT NULL REFERENCES sessions(id),
    visitor_id UUID NOT NULL REFERENCES visitors(id),
    page_load_time_ms INTEGER,
    fcp_ms INTEGER,                               -- First Contentful Paint
    lcp_ms INTEGER,                               -- Largest Contentful Paint
    fid_ms INTEGER,                               -- First Input Delay
    cls DECIMAL(5,3),                             -- Cumulative Layout Shift
    ttfb_ms INTEGER,                              -- Time to First Byte
    device_type VARCHAR(20),
    browser VARCHAR(100),
    recorded_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_perf_session ON performance_snapshots(session_id);
CREATE INDEX idx_perf_recorded ON performance_snapshots(recorded_at);
```

---

## 3. Processamento do Payload

Quando o payload chega na fila, o **worker** deve:

```
1. Extrair visitor -> UPSERT na tabela visitors
2. Extrair session -> UPSERT na tabela sessions
3. Para cada evento:
   - category == "navigation"  -> INSERT em page_views
   - category == "interaction" -> INSERT em interaction_events
   - category == "scroll"      -> INSERT em scroll_events
   - category == "conversion"  -> INSERT em conversion_events
                                  + UPDATE visitors.is_converted se tipo == cadastro_completed
   - category == "error"       -> INSERT em error_events
4. Se performance existe -> UPSERT em performance_snapshots
5. Atualizar visitors.last_seen_at e total_sessions/total_page_views
6. Atualizar sessions.ended_at, duration_ms, exit_page, page_count
```

---

## 4. API do Painel Administrativo

### 4.1. Endpoints de Dashboard

#### `GET /api/admin/analytics/overview`

Retorna metricas gerais (com filtro de periodo).

**Query Params:** `start_date`, `end_date`, `granularity` (day|week|month)

```json
{
  "period": { "start": "2025-01-01", "end": "2025-01-31" },
  "visitors": {
    "total": 12500,
    "new": 8200,
    "returning": 4300,
    "trend": "+12.5%"
  },
  "sessions": {
    "total": 18000,
    "averageDuration": 185000,
    "averagePages": 3.2,
    "bounceRate": 42.5
  },
  "conversions": {
    "cadastroStarted": 850,
    "cadastroCompleted": 320,
    "conversionRate": 2.56,
    "averageTimeToConvert": 259200000
  },
  "topPages": [
    { "path": "/", "views": 15000, "avgTimeOnPage": 45000 },
    { "path": "/cadastro", "views": 3200, "avgTimeOnPage": 180000 },
    { "path": "/sobre", "views": 1800, "avgTimeOnPage": 60000 }
  ]
}
```

#### `GET /api/admin/analytics/traffic`

Analise de fontes de trafego.

```json
{
  "sources": [
    { "source": "organic", "visitors": 5200, "sessions": 7500, "conversionRate": 3.2 },
    { "source": "direct", "visitors": 3100, "sessions": 4200, "conversionRate": 2.1 },
    { "source": "social", "visitors": 2400, "sessions": 3100, "conversionRate": 1.8 },
    { "source": "paid", "visitors": 1200, "sessions": 1800, "conversionRate": 4.5 },
    { "source": "referral", "visitors": 600, "sessions": 900, "conversionRate": 2.8 }
  ],
  "campaigns": [
    { "campaign": "lancamento-2025", "source": "google", "medium": "cpc", "visitors": 800, "conversions": 36 }
  ],
  "topReferrers": [
    { "referrer": "google.com", "visitors": 5200 },
    { "referrer": "instagram.com", "visitors": 1800 }
  ]
}
```

#### `GET /api/admin/analytics/behavior`

Analise comportamental.

```json
{
  "topCTAs": [
    { "elementId": "cta-hero-comece-gratis", "label": "Comece gratis", "clicks": 2800, "section": "hero" },
    { "elementId": "cta-header-comece-gratis", "label": "Comece gratis", "clicks": 1500, "section": "header" },
    { "elementId": "plan-plus", "label": "Plus - Experimentar", "clicks": 950, "section": "pricing" }
  ],
  "scrollDepth": {
    "25": 85.2,
    "50": 62.1,
    "75": 41.8,
    "90": 28.5,
    "100": 15.3
  },
  "sectionVisibility": [
    { "section": "hero", "viewRate": 100 },
    { "section": "funcionalidades", "viewRate": 78 },
    { "section": "ai-agent", "viewRate": 65 },
    { "section": "planos", "viewRate": 55 },
    { "section": "contato", "viewRate": 32 }
  ],
  "flows": {
    "topPaths": [
      { "path": ["/ ", "/cadastro"], "count": 2100 },
      { "path": ["/", "/sobre", "/cadastro"], "count": 450 },
      { "path": ["/", "/cadastro", "/"], "count": 380 }
    ],
    "exitPages": [
      { "path": "/", "exits": 5200, "exitRate": 34.7 },
      { "path": "/cadastro", "exits": 1800, "exitRate": 56.3 },
      { "path": "/sobre", "exits": 900, "exitRate": 50.0 }
    ]
  }
}
```

#### `GET /api/admin/analytics/conversions`

Funil de conversao detalhado.

```json
{
  "funnel": {
    "totalVisitors": 12500,
    "viewedPricing": 6875,
    "clickedPlan": 2100,
    "startedCadastro": 850,
    "completedStep0_empresa": 780,
    "completedStep1_localizacao": 620,
    "completedStep2_acesso": 580,
    "completedStep3_tema": 540,
    "completedStep4_plano": 420,
    "completedCadastro": 320
  },
  "dropoff": {
    "pricing_to_cadastro": { "rate": 59.5, "lost": 1250 },
    "step0_to_step1": { "rate": 8.2, "lost": 70 },
    "step1_to_step2": { "rate": 9.7, "lost": 60 },
    "step2_to_step3": { "rate": 6.9, "lost": 40 },
    "step3_to_step4": { "rate": 22.2, "lost": 120 },
    "step4_to_complete": { "rate": 23.8, "lost": 100 }
  },
  "planDistribution": [
    { "planId": "gratuito", "count": 120, "percentage": 37.5 },
    { "planId": "basico", "count": 85, "percentage": 26.6 },
    { "planId": "plus", "count": 90, "percentage": 28.1 },
    { "planId": "premium", "count": 25, "percentage": 7.8 }
  ],
  "billingPreference": {
    "monthly": 195,
    "annual": 125,
    "annualPercentage": 39.1
  },
  "averageTimeToConvert": {
    "fromFirstVisit": 259200000,
    "fromCadastroStart": 420000,
    "averageSessions": 2.3
  }
}
```

#### `GET /api/admin/analytics/context`

Dados de contexto (geo, device, performance).

```json
{
  "devices": {
    "mobile": { "visitors": 7500, "percentage": 60, "conversionRate": 1.8 },
    "desktop": { "visitors": 4375, "percentage": 35, "conversionRate": 3.5 },
    "tablet": { "visitors": 625, "percentage": 5, "conversionRate": 2.1 }
  },
  "browsers": [
    { "browser": "Chrome", "visitors": 8750, "percentage": 70 },
    { "browser": "Safari", "visitors": 2500, "percentage": 20 },
    { "browser": "Firefox", "visitors": 750, "percentage": 6 },
    { "browser": "Edge", "visitors": 500, "percentage": 4 }
  ],
  "os": [
    { "os": "Android", "visitors": 5625, "percentage": 45 },
    { "os": "iOS", "visitors": 3125, "percentage": 25 },
    { "os": "Windows", "visitors": 2500, "percentage": 20 },
    { "os": "macOS", "visitors": 1250, "percentage": 10 }
  ],
  "geo": {
    "countries": [
      { "country": "Brazil", "visitors": 12000, "percentage": 96 }
    ],
    "states": [
      { "state": "Sao Paulo", "visitors": 4500, "percentage": 36 },
      { "state": "Rio de Janeiro", "visitors": 1875, "percentage": 15 },
      { "state": "Minas Gerais", "visitors": 1250, "percentage": 10 }
    ],
    "cities": [
      { "city": "Sao Paulo", "visitors": 3000, "percentage": 24 },
      { "city": "Rio de Janeiro", "visitors": 1200, "percentage": 9.6 }
    ]
  },
  "performance": {
    "averages": {
      "pageLoadTime": 1450,
      "fcp": 920,
      "lcp": 1800,
      "fid": 65,
      "cls": 0.08,
      "ttfb": 250
    },
    "byDevice": {
      "mobile": { "pageLoadTime": 1800, "lcp": 2200 },
      "desktop": { "pageLoadTime": 1100, "lcp": 1400 }
    },
    "percentiles": {
      "p50": { "pageLoadTime": 1200, "lcp": 1500 },
      "p75": { "pageLoadTime": 1800, "lcp": 2200 },
      "p95": { "pageLoadTime": 3500, "lcp": 4000 }
    }
  },
  "errors": {
    "total": 45,
    "byType": [
      { "type": "js_error", "count": 30 },
      { "type": "request_timeout", "count": 10 },
      { "type": "request_error", "count": 5 }
    ],
    "topErrors": [
      { "message": "Cannot read property 'x'...", "count": 12, "lastSeen": "2025-01-30" }
    ]
  }
}
```

#### `GET /api/admin/analytics/realtime`

Dados em tempo real.

```json
{
  "activeVisitors": 23,
  "activePages": [
    { "path": "/", "visitors": 15 },
    { "path": "/cadastro", "visitors": 5 },
    { "path": "/sobre", "visitors": 3 }
  ],
  "recentEvents": [
    { "type": "page_view", "path": "/cadastro", "timestamp": 1707600300000 },
    { "type": "click_cta", "elementId": "cta-hero-comece-gratis", "timestamp": 1707600295000 },
    { "type": "cadastro_completed", "planId": "plus", "timestamp": 1707600290000 }
  ],
  "last30Minutes": {
    "visitors": 85,
    "pageViews": 240,
    "conversions": 3
  }
}
```

---

## 5. Queries SQL para o Dashboard

### 5.1. Visitantes novos vs recorrentes (por dia)

```sql
SELECT
    DATE(s.started_at) AS day,
    COUNT(DISTINCT CASE WHEN v.total_sessions = 1 THEN v.id END) AS new_visitors,
    COUNT(DISTINCT CASE WHEN v.total_sessions > 1 THEN v.id END) AS returning_visitors
FROM sessions s
JOIN visitors v ON s.visitor_id = v.id
WHERE s.started_at BETWEEN :start_date AND :end_date
GROUP BY DATE(s.started_at)
ORDER BY day;
```

### 5.2. Funil de conversao

```sql
WITH funnel AS (
    SELECT
        COUNT(DISTINCT CASE WHEN ce.event_type = 'plan_viewed' THEN ce.visitor_id END) AS viewed_plan,
        COUNT(DISTINCT CASE WHEN ce.event_type = 'cadastro_started' THEN ce.visitor_id END) AS started,
        COUNT(DISTINCT CASE WHEN ce.event_type = 'cadastro_step_completed' AND ce.registration_step = 0 THEN ce.visitor_id END) AS step0,
        COUNT(DISTINCT CASE WHEN ce.event_type = 'cadastro_step_completed' AND ce.registration_step = 1 THEN ce.visitor_id END) AS step1,
        COUNT(DISTINCT CASE WHEN ce.event_type = 'cadastro_step_completed' AND ce.registration_step = 2 THEN ce.visitor_id END) AS step2,
        COUNT(DISTINCT CASE WHEN ce.event_type = 'cadastro_step_completed' AND ce.registration_step = 3 THEN ce.visitor_id END) AS step3,
        COUNT(DISTINCT CASE WHEN ce.event_type = 'cadastro_step_completed' AND ce.registration_step = 4 THEN ce.visitor_id END) AS step4,
        COUNT(DISTINCT CASE WHEN ce.event_type = 'cadastro_completed' THEN ce.visitor_id END) AS completed
    FROM conversion_events ce
    WHERE ce.occurred_at BETWEEN :start_date AND :end_date
)
SELECT * FROM funnel;
```

### 5.3. Top CTAs por cliques

```sql
SELECT
    element_id,
    element_label,
    section,
    COUNT(*) AS total_clicks,
    COUNT(DISTINCT visitor_id) AS unique_visitors
FROM interaction_events
WHERE event_type IN ('click_cta', 'click_button', 'click_plan')
    AND occurred_at BETWEEN :start_date AND :end_date
GROUP BY element_id, element_label, section
ORDER BY total_clicks DESC
LIMIT 20;
```

### 5.4. Scroll depth medio por pagina

```sql
SELECT
    page_path,
    ROUND(AVG(max_depth), 1) AS avg_scroll_depth,
    COUNT(DISTINCT session_id) AS sessions,
    SUM(CASE WHEN max_depth >= 75 THEN 1 ELSE 0 END)::FLOAT / COUNT(*) * 100 AS pct_reached_75
FROM scroll_events
WHERE occurred_at BETWEEN :start_date AND :end_date
GROUP BY page_path
ORDER BY sessions DESC;
```

### 5.5. Taxa de conversao por fonte de trafego

```sql
SELECT
    s.traffic_source,
    COUNT(DISTINCT s.visitor_id) AS visitors,
    COUNT(DISTINCT ce.visitor_id) AS conversions,
    ROUND(
        COUNT(DISTINCT ce.visitor_id)::NUMERIC / NULLIF(COUNT(DISTINCT s.visitor_id), 0) * 100, 2
    ) AS conversion_rate
FROM sessions s
LEFT JOIN conversion_events ce ON ce.visitor_id = s.visitor_id
    AND ce.event_type = 'cadastro_completed'
    AND ce.occurred_at BETWEEN :start_date AND :end_date
WHERE s.started_at BETWEEN :start_date AND :end_date
GROUP BY s.traffic_source
ORDER BY visitors DESC;
```

### 5.6. Tempo medio ate conversao

```sql
SELECT
    ROUND(AVG(ce.time_to_convert_ms) / 1000 / 60 / 60, 1) AS avg_hours_to_convert,
    ROUND(AVG(ce.sessions_to_convert), 1) AS avg_sessions_to_convert,
    percentile_cont(0.5) WITHIN GROUP (ORDER BY ce.time_to_convert_ms) / 1000 / 60 / 60 AS median_hours
FROM conversion_events ce
WHERE ce.event_type = 'cadastro_completed'
    AND ce.occurred_at BETWEEN :start_date AND :end_date;
```

### 5.7. Paginas de saida (onde o usuario abandona)

```sql
SELECT
    pv.path,
    COUNT(*) AS exit_count,
    ROUND(
        COUNT(*)::NUMERIC / (
            SELECT COUNT(*) FROM sessions
            WHERE started_at BETWEEN :start_date AND :end_date
        ) * 100, 1
    ) AS exit_rate
FROM page_views pv
INNER JOIN (
    SELECT session_id, MAX(viewed_at) AS last_view
    FROM page_views
    GROUP BY session_id
) last_pv ON pv.session_id = last_pv.session_id AND pv.viewed_at = last_pv.last_view
INNER JOIN sessions s ON s.id = pv.session_id
WHERE s.started_at BETWEEN :start_date AND :end_date
GROUP BY pv.path
ORDER BY exit_count DESC;
```

### 5.8. Performance por dispositivo

```sql
SELECT
    device_type,
    ROUND(AVG(page_load_time_ms)) AS avg_load_time,
    ROUND(AVG(lcp_ms)) AS avg_lcp,
    ROUND(AVG(fcp_ms)) AS avg_fcp,
    ROUND(AVG(cls)::NUMERIC, 3) AS avg_cls,
    COUNT(*) AS samples
FROM performance_snapshots
WHERE recorded_at BETWEEN :start_date AND :end_date
GROUP BY device_type;
```

---

## 6. Arquitetura Recomendada

```
                                   +------------------+
                                   |   Frontend       |
                                   |   (Next.js)      |
                                   +--------+---------+
                                            |
                                  POST /api/tracking
                                            |
                                   +--------v---------+
                                   |   API Gateway     |
                                   |   (Rate Limit)    |
                                   +--------+---------+
                                            |
                                   +--------v---------+
                                   |   Tracking API    |
                                   |   (Validacao +    |
                                   |    Enqueue)       |
                                   +--------+---------+
                                            |
                                   +--------v---------+
                                   |   Message Queue   |
                                   |   (Redis/RabbitMQ)|
                                   +--------+---------+
                                            |
                                   +--------v---------+
                                   |   Worker          |
                                   |   (Processa +     |
                                   |    Salva no DB)   |
                                   +--------+---------+
                                            |
                              +-------------+-------------+
                              |                           |
                     +--------v---------+       +--------v---------+
                     |   PostgreSQL      |       |   Redis Cache    |
                     |   (Dados brutos)  |       |   (Real-time)    |
                     +--------+---------+       +------------------+
                              |
                     +--------v---------+
                     |   Admin API       |
                     |   (Consultas +    |
                     |    Agregacoes)    |
                     +--------+---------+
                              |
                     +--------v---------+
                     |   Painel Admin    |
                     |   (Dashboard)     |
                     +------------------+
```

### Componentes:

1. **Tracking API**: Endpoint rapido que so valida e enfileira
2. **Message Queue**: Redis Queue ou RabbitMQ para processar assincronamente
3. **Worker**: Consome a fila e faz os INSERTs/UPSERTs no banco
4. **PostgreSQL**: Armazena todos os dados brutos
5. **Redis Cache**: Cache para dados de real-time e sessoes ativas
6. **Admin API**: Endpoints autenticados para o painel com queries agregadas
7. **Jobs Agendados**: Processar agregacoes diarias para performance do dashboard

---

## 7. Agregacoes Diarias (Cron Jobs)

Para performance do dashboard, rodar aggregations diarias:

```sql
-- Tabela de metricas diarias pre-calculadas
CREATE TABLE daily_metrics (
    date DATE NOT NULL,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(15,4) NOT NULL,
    dimensions JSONB,                              -- ex: {"source": "organic", "device": "mobile"}
    PRIMARY KEY (date, metric_name, dimensions)
);

-- Exemplo de job diario:
INSERT INTO daily_metrics (date, metric_name, metric_value, dimensions)
SELECT
    DATE(s.started_at),
    'visitors',
    COUNT(DISTINCT s.visitor_id),
    jsonb_build_object('source', s.traffic_source)
FROM sessions s
WHERE DATE(s.started_at) = CURRENT_DATE - 1
GROUP BY DATE(s.started_at), s.traffic_source
ON CONFLICT (date, metric_name, dimensions)
DO UPDATE SET metric_value = EXCLUDED.metric_value;
```

---

## 8. Seguranca e Privacidade

### 8.1. LGPD / Privacidade

- **Nao coletamos dados pessoais identificaveis** (nomes, emails, CPFs).
- O `visitorId` e um UUID anonimo, sem vinculo a dados pessoais.
- A geolocalizacao e baseada em IP e anonimizada (pais/estado/cidade, sem IP armazenado).
- **Nao armazenar o IP do visitante** no banco de dados.
- Cookies: usamos apenas `localStorage`, sem cookies de terceiros.

### 8.2. Consentimento

- Exibir um banner de cookies/tracking informando o usuario.
- Permitir opt-out (configuravel no `TrackingConfig.enabled`).
- A config `enabled: false` desativa toda coleta.

### 8.3. Retencao de Dados

- **Dados brutos**: reter por 12 meses.
- **Dados agregados** (daily_metrics): reter indefinidamente.
- **Job de limpeza mensal**: deletar dados brutos com mais de 12 meses.

```sql
-- Job de limpeza
DELETE FROM page_views WHERE created_at < NOW() - INTERVAL '12 months';
DELETE FROM interaction_events WHERE created_at < NOW() - INTERVAL '12 months';
DELETE FROM scroll_events WHERE created_at < NOW() - INTERVAL '12 months';
DELETE FROM error_events WHERE created_at < NOW() - INTERVAL '12 months';
DELETE FROM performance_snapshots WHERE recorded_at < NOW() - INTERVAL '12 months';
-- Sessions e visitors: manter para historico ou limpar tambem
```

### 8.4. Rate Limiting

```
- POST /api/tracking: 60 requests/minuto por IP
- GET /api/admin/*: 120 requests/minuto por usuario autenticado
```

---

## 9. Tipos de Eventos Rastreados

### 9.1. Eventos de Navegacao
| Evento | Descricao | Quando |
|--------|-----------|--------|
| `page_view` | Visualizacao de pagina | Ao navegar para qualquer rota |

### 9.2. Eventos de Interacao
| Evento | Descricao | Quando |
|--------|-----------|--------|
| `click_cta` | Clique em CTA principal | "Comece gratis", "Experimentar" |
| `click_button` | Clique em botao | "Entrar", "Enviar mensagem" |
| `click_plan` | Clique em plano | Ao clicar no CTA de um plano |
| `scroll_depth` | Profundidade de scroll | 25%, 50%, 75%, 90%, 100% |
| `form_start` | Inicio de formulario | Ao focar no formulario de contato |
| `form_submit` | Envio de formulario | Ao submeter formulario de contato |
| `roi_calculator_open` | Abrir calculadora ROI | Ao clicar na calculadora de ROI |
| `plan_toggle_annual` | Toggle para anual | Ao mudar para plano anual |
| `plan_toggle_monthly` | Toggle para mensal | Ao mudar para plano mensal |
| `promo_bar_click` | Clique no promo bar | Ao clicar "Aproveitar" na barra promo |
| `contact_method_click` | Clique em metodo de contato | WhatsApp, Email, Telefone |
| `theme_toggle` | Toggle de tema | Dark/Light mode |

### 9.3. Eventos de Conversao
| Evento | Descricao | Quando |
|--------|-----------|--------|
| `cadastro_started` | Inicio do cadastro | Ao acessar /cadastro |
| `cadastro_step_completed` | Step do cadastro concluido | Ao avancar cada step (0-4) |
| `cadastro_completed` | Cadastro concluido | Ao finalizar o cadastro |
| `cadastro_abandoned` | Cadastro abandonado | Ao sair da pagina sem concluir |
| `contact_form_submitted` | Formulario de contato | Ao enviar mensagem |
| `plan_viewed` | Plano visualizado | Ao ver secao de planos |
| `plan_selected` | Plano selecionado | Ao escolher um plano |

---

## 10. Metricas Chave para o Dashboard

### KPIs Principais (Cards no topo):
1. **Visitantes unicos** (periodo)
2. **Taxa de conversao** (cadastros / visitantes)
3. **Tempo medio de sessao**
4. **Taxa de rejeicao** (bounce rate)

### Graficos:
1. **Linha**: Visitantes ao longo do tempo (novos vs recorrentes)
2. **Funil**: Funil de conversao (visitante -> precos -> cadastro -> concluido)
3. **Barras**: Fontes de trafego com taxa de conversao
4. **Heatmap**: Scroll depth por pagina
5. **Pizza**: Distribuicao de dispositivos
6. **Mapa**: Distribuicao geografica de visitantes
7. **Barras Horizontais**: Top CTAs por cliques
8. **Linha**: Web Vitals ao longo do tempo
9. **Tabela**: Paginas de saida com taxa de abandono
10. **Funil detalhado**: Steps do cadastro com dropoff

---

## 11. Integracao com o Sistema Administrativo Bellory

O painel de analytics deve ser uma secao dentro do sistema administrativo existente (app.bellory.com.br), acessivel apenas por administradores do sistema.

### Rota sugerida no admin:
```
/admin/analytics           -> Dashboard principal
/admin/analytics/traffic   -> Detalhes de trafego
/admin/analytics/behavior  -> Analise comportamental
/admin/analytics/funnel    -> Funil de conversao
/admin/analytics/context   -> Dispositivos, geo, performance
/admin/analytics/realtime  -> Dados em tempo real
/admin/analytics/errors    -> Monitoramento de erros
```

### Permissoes:
- Apenas usuarios com role `ADMIN` ou `SUPER_ADMIN` devem ter acesso.
- Todas as chamadas ao `/api/admin/analytics/*` requerem autenticacao JWT.

---

## 12. Checklist de Implementacao

### Backend:
- [ ] Criar endpoint `POST /api/tracking` com validacao e rate limiting
- [ ] Configurar fila de mensagens (Redis Queue / RabbitMQ)
- [ ] Criar worker para processar payloads da fila
- [ ] Criar migrations para todas as tabelas
- [ ] Implementar UPSERT de visitors e sessions
- [ ] Implementar insercao de eventos por categoria
- [ ] Criar endpoints `/api/admin/analytics/*` com autenticacao
- [ ] Implementar queries agregadas para o dashboard
- [ ] Configurar cron jobs para agregacoes diarias
- [ ] Configurar job de limpeza de dados antigos (12 meses)
- [ ] Implementar endpoint de realtime (WebSocket ou SSE)
- [ ] Testes unitarios e de integracao

### Frontend (Admin):
- [ ] Criar pagina de Dashboard com cards de KPIs
- [ ] Implementar graficos com Recharts (ja esta no projeto)
- [ ] Implementar filtros de periodo (7d, 30d, 90d, custom)
- [ ] Criar visualizacao de funil de conversao
- [ ] Criar mapa de calor de scroll
- [ ] Criar visualizacao de real-time
- [ ] Criar pagina de erros/monitoramento

### Privacidade:
- [ ] Implementar banner de consentimento no frontend
- [ ] Adicionar opcao de opt-out nas configuracoes
- [ ] Documentar politica de privacidade com dados coletados
- [ ] Garantir que IPs NAO sao armazenados no banco
