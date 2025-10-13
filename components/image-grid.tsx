"use client"

import { useEffect, useState } from "react"
import { ImageCard } from "@/components/image-card"
import { ImageModal } from "@/components/image-modal"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"

const PIXABAY_API_KEY = "50957168-902dcf852010bdacc97574f3e"

interface PixabayImage {
  id: number
  pageURL: string
  type: string
  tags: string
  previewURL: string
  previewWidth: number
  previewHeight: number
  webformatURL: string
  webformatWidth: number
  webformatHeight: number
  largeImageURL: string
  imageWidth: number
  imageHeight: number
  imageSize: number
  views: number
  downloads: number
  likes: number
  comments: number
  user_id: number
  user: string
  userImageURL: string
}

interface PixabayResponse {
  total: number
  totalHits: number
  hits: PixabayImage[]
}

export function ImageGrid() {
  const [images, setImages] = useState<PixabayImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [selectedImage, setSelectedImage] = useState<PixabayImage | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true)
        const response = await fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&per_page=50&page=1&order=latest`)

        if (!response.ok) {
          throw new Error("Failed to fetch images")
        }

        const data: PixabayResponse = await response.json()
        setImages(data.hits)
        setHasMore(data.hits.length === 50 && data.totalHits > 50)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  async function loadMore() {
    try {
      setLoadingMore(true)
      const nextPage = page + 1
      const response = await fetch(
        `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&per_page=50&page=${nextPage}&order=latest`,
      )

      if (!response.ok) {
        throw new Error("Failed to fetch more images")
      }

      const data: PixabayResponse = await response.json()
      setImages((prev) => [...prev, ...data.hits])
      setPage(nextPage)
      setHasMore(data.hits.length === 50 && images.length + data.hits.length < data.totalHits)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoadingMore(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Error: {error}</p>
      </div>
    )
  }

  return (
    <div>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            onImageClick={() => {
              setSelectedImage(image)
              setIsModalOpen(true)
            }}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button onClick={loadMore} disabled={loadingMore} size="lg" className="min-w-[200px]">
            {loadingMore ? (
              <>
                <Spinner className="h-4 w-4 mr-2" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}

      <ImageModal image={selectedImage} open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  )
}
