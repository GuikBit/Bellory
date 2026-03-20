import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturesInternal } from "@/components/features-internal"
import { FeaturesInternalOld } from "@/components/features-internalOld"
import { FeaturesExternal } from "@/components/features-external"
import { DemoSection } from "@/components/demo-section"
import { Benefits } from "@/components/benefits"
import { Pricing } from "@/components/pricing"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { AIAgentSection } from "@/components/ai-agent-section"
import { FinalCTA } from "@/components/floating-cta"
import { ComparisonSection } from "@/components/comparison-section"
import { SectionTransition } from "@/components/section-transitions"


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

      {/* Pricing (#f3eeea) → Contact (#faf8f6) */}
      <SectionTransition variant="diagonal" colorFrom="#f3eeea" colorTo="#faf8f6" accentColor="#db6f57" />

      <Contact />

      {/* Contact (#faf8f6) → Footer (#f3eeea) */}
      <SectionTransition variant="peaks" colorFrom="#faf8f6" colorTo="#f3eeea" accentColor="#4f6f64" />

      {/* <FinalCTA /> */}
      <Footer />
    </main>

  )
}
