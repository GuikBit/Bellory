/** @type {import('next').NextConfig} */
const securityHeaders = [
  // Força HTTPS por 2 anos, inclui subdomínios — preload-ready.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  // Bloqueia clickjacking — ninguém pode embedar a página em iframe.
  { key: 'X-Frame-Options', value: 'DENY' },
  // Isola janela/tab — habilita Cross-Origin-Isolation parcial.
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  // Bloqueia MIME-sniffing (browser respeita o Content-Type declarado).
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Limita o quanto de URL é enviado em referer cross-origin.
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Desliga APIs sensíveis no nível do browser (nenhuma é usada no marketing).
  { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), interest-cohort=()' },
]

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // Sem 3840 — nenhuma imagem do site precisa dessa resolução, e o crawler do
    // Lighthouse estava puxando o candidato máximo do srcset, inflando o LCP.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  reactStrictMode: true,
  experimental: {
    // Tree-shaking agressivo dos pacotes mais pesados — corta JS não usado.
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@tanstack/react-query',
      'date-fns',
      'recharts',
    ],
    // NÃO ligar optimizeCss — testado e o critters não reduziu o CSS blocking
    // (continuou em 1090ms mobile); suspeita de regressão de TBT no desktop
    // (passou de 200ms → 2980ms após ativar).
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
