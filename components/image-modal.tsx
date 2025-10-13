"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, X, Heart, Eye } from "lucide-react"

interface ImageModalProps {
  image: {
    id: number
    largeImageURL: string
    tags: string
    user: string
    userImageURL: string
    likes: number
    views: number
    downloads: number
    pageURL: string
  } | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ImageModal({ image, open, onOpenChange }: ImageModalProps) {
  if (!image) return null

  const handleDownload = async () => {
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
      // Fallback to opening in new tab
      window.open(image.largeImageURL, "_blank")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-full p-0 gap-0 bg-background/95 backdrop-blur">
        <div className="relative">
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-background/80 hover:bg-background"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="p-6">
            <img
              src={image.largeImageURL || "/placeholder.svg"}
              alt={image.tags}
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
            />

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={image.userImageURL || "/placeholder.svg?height=48&width=48"}
                    alt={image.user}
                    className="h-12 w-12 rounded-full border-2 border-border"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{image.user}</p>
                    <p className="text-sm text-muted-foreground">Photographer</p>
                  </div>
                </div>

                <Button onClick={handleDownload} className="bg-primary hover:bg-primary/90 gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  <span>{image.likes.toLocaleString()} likes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{image.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>{image.downloads.toLocaleString()} downloads</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {image.tags.split(",").map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
