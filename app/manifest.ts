import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bellory - Sistema de Gestão para Salões e Barbearias',
    short_name: 'Bellory',
    description: 'Plataforma completa de gestão para barbearias, salões de beleza e clínicas de estética',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf8f6',
    theme_color: '#db6f57',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }
    ],
    categories: ['business', 'productivity', 'lifestyle'],
    lang: 'pt-BR',
    dir: 'ltr',
    scope: '/',
    shortcuts: [
      {
        name: 'Cadastro',
        short_name: 'Cadastrar',
        description: 'Criar uma nova conta',
        url: '/cadastro',
        icons: [{ src: '/icon-192x192.png', sizes: '192x192' }]
      },
      {
        name: 'Sobre',
        short_name: 'Sobre',
        description: 'Conheça a Bellory',
        url: '/sobre',
        icons: [{ src: '/icon-192x192.png', sizes: '192x192' }]
      }
    ]
  }
}
