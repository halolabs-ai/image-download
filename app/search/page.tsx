import { Header } from "@/components/header"
import { SearchResults } from "@/components/search-results"
import { Suspense } from "react"

export default function SearchPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<div className="text-center py-12">Searching...</div>}>
          <SearchResults />
        </Suspense>
      </main>
    </div>
  )
}
