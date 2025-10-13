"use client"

import type React from "react"

import { Heart, Download, Eye } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ImageCardProps {
  image: {
    id: number
    webformatURL: string
    tags: string
    user: string
    userImageURL: string
    likes: number
    views: number
    downloads: number
    largeImageURL: string
    pageURL: string
  }
  onImageClick: () => void
}

export function ImageCard({ image, onImageClick }: ImageCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      const response = await fetch(image.largeImageURL)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `pixabay-${image.id}.jpg`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Download failed:", error)
      window.open(image.largeImageURL, "_blank")
    }
  }

  return (
    <div
      className="relative group break-inside-avoid mb-4 overflow-hidden rounded-lg bg-card shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onImageClick}
    >
      <img
        src={image.webformatURL || "/placeholder.svg"}
        alt={image.tags}
        className="w-full h-auto object-cover"
        loading="lazy"
      />

      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-between p-4 animate-in fade-in duration-200">
          <div className="flex justify-end gap-2">
            <Button size="icon" variant="secondary" className="h-8 w-8 bg-card/90 hover:bg-card">
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 bg-card/90 hover:bg-card"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <img
                src={image.userImageURL || "/placeholder.svg?height=32&width=32"}
                alt={image.user}
                className="h-8 w-8 rounded-full border-2 border-card"
              />
              <span className="text-sm font-medium text-card">{image.user}</span>
            </div>

            <div className="flex items-center gap-4 text-xs text-card/90">
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                <span>{image.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{image.views}</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                <span>{image.downloads}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
