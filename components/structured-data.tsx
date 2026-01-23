export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Bellory",
    "url": "https://bellory.com.br",
    "logo": "https://bellory.com.br/Bellory_transparente.png",
    "description": "Plataforma completa de gestão para barbearias, salões de beleza e clínicas de estética",
    "sameAs": [
      "https://www.instagram.com/bellory",
      "https://www.facebook.com/bellory",
      "https://www.linkedin.com/company/bellory",
      "https://twitter.com/bellory"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "availableLanguage": ["Portuguese"]
    }
  }

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Bellory",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "BRL",
      "lowPrice": "0",
      "highPrice": "499",
      "offerCount": "4",
      "offers": [
        {
          "@type": "Offer",
          "name": "Plano Gratuito",
          "price": "0",
          "priceCurrency": "BRL",
          "description": "Plano básico com funcionalidades essenciais"
        },
        {
          "@type": "Offer",
          "name": "Plano Básico",
          "price": "99",
          "priceCurrency": "BRL",
          "description": "Ideal para pequenos negócios"
        },
        {
          "@type": "Offer",
          "name": "Plano Plus",
          "price": "199",
          "priceCurrency": "BRL",
          "description": "Recursos avançados para negócios em crescimento"
        },
        {
          "@type": "Offer",
          "name": "Plano Premium",
          "price": "499",
          "priceCurrency": "BRL",
          "description": "Solução completa para grandes empresas"
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "description": "Sistema de gestão completo para salões de beleza, barbearias e clínicas de estética com agendamento online, controle financeiro, gestão de clientes e muito mais"
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Bellory",
    "url": "https://bellory.com.br",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://bellory.com.br/busca?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://bellory.com.br"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Sobre",
        "item": "https://bellory.com.br/sobre"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Cadastro",
        "item": "https://bellory.com.br/cadastro"
      }
    ]
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que é o Bellory?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O Bellory é uma plataforma completa de gestão para barbearias, salões de beleza e clínicas de estética. Oferecemos agendamento online, controle financeiro, gestão de clientes e funcionários, tudo em um único sistema."
        }
      },
      {
        "@type": "Question",
        "name": "Quanto custa o Bellory?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O Bellory oferece planos a partir de R$ 0 (plano gratuito) até R$ 499/mês (plano premium). Temos opções para todos os tamanhos de negócio."
        }
      },
      {
        "@type": "Question",
        "name": "Posso testar o Bellory gratuitamente?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim! Oferecemos um plano gratuito permanente com funcionalidades essenciais. Você pode começar agora mesmo sem precisar de cartão de crédito."
        }
      },
      {
        "@type": "Question",
        "name": "O Bellory funciona para qual tipo de negócio?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O Bellory é ideal para salões de beleza, barbearias, clínicas de estética, espaços de coworking de beleza e profissionais autônomos do setor."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
