import { Hero } from "@/components/hero"
import { FeatureGrid } from "@/components/feature-grid"
import { BeforeAfter } from "@/components/before-after"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeatureGrid />
      <BeforeAfter />
      <SiteFooter />
    </div>
  )
}