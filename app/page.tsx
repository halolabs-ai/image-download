import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ImageGrid } from "@/components/image-grid"
import { Suspense } from "react"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Latest Images</h2>
        <Suspense fallback={<div className="text-center py-12">Loading images...</div>}>
          <ImageGrid />
        </Suspense>
      </main>
    </div>
  )
}
