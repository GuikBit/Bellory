import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SectionTransition } from "@/components/section-transitions"
import {
  AutoFlowSection,
  CapabilitiesSection,
  CTASection,
  CustomizationSection,
  HeroSection,
  HowItWorksSection,
  PainSection,
  TryLiveSection,
} from "@/components/agente-virtual"

export default function AgenteVirtualPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header isMenu={true} isCadastro={true} />

      <HeroSection />

      <SectionTransition
        variant="waves"
        colorFrom="#faf8f6"
        colorTo="#f3eeea"
        accentColor="#db6f57"
      />

      <PainSection />

      <SectionTransition
        variant="curve"
        colorFrom="#f3eeea"
        colorTo="#faf8f6"
        accentColor="#8b3d35"
      />

      <TryLiveSection />

      <SectionTransition
        variant="diagonal"
        colorFrom="#faf8f6"
        colorTo="#2a2420"
        accentColor="#db6f57"
      />

      <HowItWorksSection />

      <SectionTransition
        variant="curve"
        colorFrom="#2a2420"
        colorTo="#faf8f6"
        accentColor="#db6f57"
      />

      <CustomizationSection />

      <SectionTransition
        variant="peaks"
        colorFrom="#faf8f6"
        colorTo="#f3eeea"
        accentColor="#4f6f64"
      />

      <CapabilitiesSection />

      <SectionTransition
        variant="waves"
        colorFrom="#f3eeea"
        colorTo="#faf8f6"
        accentColor="#db6f57"
      />

      <AutoFlowSection />

      <SectionTransition
        variant="curve"
        colorFrom="#faf8f6"
        colorTo="#2a2420"
        accentColor="#db6f57"
        
      />

      <CTASection />

      <SectionTransition variant="peaks" colorFrom="#1a1510" colorTo="#F3EEEA" accentColor="#db6f57" />

      <Footer />
    </main>
  )
}
