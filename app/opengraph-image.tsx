import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'
export const alt = 'Bellory - Sistema de Gestão para Salões, Barbearias e Clínicas'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Image generation
export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#faf8f6',
          background: 'linear-gradient(135deg, #faf8f6 0%, #e6d9d4 100%)',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'white',
            borderRadius: '24px',
            padding: '60px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            width: '90%',
            height: '80%',
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              color: '#db6f57',
              marginBottom: '20px',
              letterSpacing: '-2px',
            }}
          >
            Bellory
          </div>
          <div
            style={{
              fontSize: 36,
              color: '#2a2420',
              textAlign: 'center',
              maxWidth: '900px',
              lineHeight: 1.4,
              marginBottom: '30px',
            }}
          >
            Sistema de Gestão para Salões, Barbearias e Clínicas de Estética
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#4f6f64',
              textAlign: 'center',
              maxWidth: '800px',
              lineHeight: 1.5,
            }}
          >
            Agendamentos • Clientes • Financeiro • IA
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
