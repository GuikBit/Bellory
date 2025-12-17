import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturesInternal } from "@/components/features-internal"
import { FeaturesExternal } from "@/components/features-external"
import { DemoSection } from "@/components/demo-section"
import { Benefits } from "@/components/benefits"
import { Pricing } from "@/components/pricing"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { FloatingCTA } from "@/components/floating-cta"
import Demo from "@/components/demo"

export default function Home() {
  return (
    <main className="min-h-screen ">
      <Header />
      <Hero />
      <FeaturesInternal />
      <FeaturesExternal />
      <DemoSection />
      <Benefits />
      <Pricing />
      <Contact />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
