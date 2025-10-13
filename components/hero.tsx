"use client"

import type React from "react"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 animate-gradient-shift">
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance">
          Hola Lab Art — Creativity Without Limits
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto text-pretty">
          A striking, high-resolution image that evokes creativity, color, and imagination
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search images"
              className="pl-14 pr-4 h-16 text-lg bg-white/95 backdrop-blur-sm border-0 shadow-2xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="lg" className="absolute right-2 top-1/2 -translate-y-1/2 h-12">
              Search
            </Button>
          </div>
        </form>

        {/* Popular Tags */}
        <div className="mt-8 flex flex-wrap gap-2 justify-center">
          {["Abstract", "Digital Art", "Creative", "Colorful", "Imagination", "Studio"].map((tag) => (
            <Button
              key={tag}
              variant="secondary"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
              onClick={() => router.push(`/search?q=${encodeURIComponent(tag)}`)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
