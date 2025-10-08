import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturesInternal } from "@/components/features-internal"
import { FeaturesExternal } from "@/components/features-external"
import { DemoSection } from "@/components/demo-section"
import { Benefits } from "@/components/benefits"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { FloatingCTA } from "@/components/floating-cta"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturesInternal />
      <FeaturesExternal />
      <DemoSection />
      <Benefits />
      <Contact />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
