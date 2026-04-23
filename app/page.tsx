import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturesInternal } from "@/components/features-internal"
import { AIAgentSection } from "@/components/ai-agent-section"
import { SectionTransition } from "@/components/section-transitions"

// Below-the-fold: code-split os pesados pra reduzir o JS inicial.
// Mantém SSR (default) — a marcação ainda vai no HTML pra SEO; só o chunk
// de hidratação fica adiado.
const Pricing = dynamic(() =>
  import("@/components/pricing").then((m) => ({ default: m.Pricing })),
)
const ProductFAQ = dynamic(() =>
  import("@/components/product-faq").then((m) => ({ default: m.ProductFAQ })),
)
const Contact = dynamic(() =>
  import("@/components/contact").then((m) => ({ default: m.Contact })),
)
const Footer = dynamic(() =>
  import("@/components/footer").then((m) => ({ default: m.Footer })),
)


export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header isMenu={true} isCadastro={true}/>
      <Hero />

      {/* Hero (#faf8f6) → FeaturesInternal (#f3eeea) */}
      <SectionTransition variant="waves" colorFrom="#faf8f6" colorTo="#f3eeea" accentColor="#db6f57" />

      <FeaturesInternal />
      {/* <FeaturesInternalOld />  */}

      {/* FeaturesInternal (#f3eeea) → AIAgentSection (#faf8f6) */}
      <SectionTransition variant="curve" colorFrom="#f3eeea" colorTo="#faf8f6" accentColor="#4f6f64" />

      <AIAgentSection />
      {/* <FeaturesExternal /> */}
      {/* <DemoSection />
      <Benefits /> */}
      {/* <ComparisonSection /> */}

      {/* AIAgentSection (#faf8f6) → Pricing (#f3eeea) */}
      {/* <SectionTransition variant="peaks" colorFrom="#faf8f6" colorTo="#f3eeea" accentColor="#8b3d35" /> */}

      <Pricing />

      {/* Pricing (#f3eeea) → ProductFAQ (#faf8f6) */}
      <SectionTransition variant="waves" colorFrom="#f3eeea" colorTo="#faf8f6" accentColor="#db6f57" />

      <ProductFAQ />

      {/* ProductFAQ (#faf8f6) → Contact (#faf8f6) — mesma cor, sem transição */}

      <Contact />

      {/* Contact (#faf8f6) → Footer (#f3eeea) */}
      <SectionTransition variant="peaks" colorFrom="#faf8f6" colorTo="#f3eeea" accentColor="#4f6f64" />

      {/* <FinalCTA /> */}
      <Footer />
    </main>

  )
}
