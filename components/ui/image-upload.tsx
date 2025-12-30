"use client"

import { useState, useRef } from "react"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  maxImages?: number
  images: File[]
  onImagesChange: (images: File[]) => void
  label?: string
  description?: string
}

export function ImageUpload({
  maxImages = 3,
  images,
  onImagesChange,
  label = "Upload Images",
  description = `You can upload up to ${maxImages} images`
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)
  const [previews, setPreviews] = useState<string[]>([])

  const handleFiles = (files: FileList | null) => {
    if (!files) return

    const newFiles = Array.from(files).filter(
      file => file.type.startsWith('image/')
    )

    const availableSlots = maxImages - images.length
    const filesToAdd = newFiles.slice(0, availableSlots)

    if (filesToAdd.length > 0) {
      const updatedImages = [...images, ...filesToAdd]
      onImagesChange(updatedImages)

      // Generate previews for new files
      filesToAdd.forEach(file => {
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreviews(prev => [...prev, e.target?.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
    // Reset input value to allow selecting the same file again
    e.target.value = ''
  }

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index)
    const updatedPreviews = previews.filter((_, i) => i !== index)
    onImagesChange(updatedImages)
    setPreviews(updatedPreviews)
  }

  const canAddMore = images.length < maxImages

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <span className="text-xs text-gray-500">
          {images.length}/{maxImages} images
        </span>
      </div>

      {/* Upload Area */}
      {canAddMore && (
        <div
          onClick={handleClick}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-lg p-6 cursor-pointer
            transition-colors duration-200 text-center
            ${dragActive 
              ? 'border-red-500 bg-red-50' 
              : 'border-gray-300 hover:border-red-400 hover:bg-gray-50'
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleInputChange}
            className="hidden"
          />
          
          <div className="flex flex-col items-center gap-2">
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center
              ${dragActive ? 'bg-red-100' : 'bg-gray-100'}
            `}>
              <Upload className={`w-6 h-6 ${dragActive ? 'text-red-600' : 'text-gray-400'}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                {dragActive ? 'Drop images here' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {description}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((file, index) => (
            <div
              key={index}
              className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
            >
              {previews[index] ? (
                <Image
                  src={previews[index]}
                  alt={`Upload ${index + 1}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-gray-300" />
                </div>
              )}
              
              {/* Remove button */}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="
                  absolute top-1 right-1 w-6 h-6 rounded-full
                  bg-red-600 text-white flex items-center justify-center
                  opacity-0 group-hover:opacity-100 transition-opacity
                  hover:bg-red-700
                "
              >
                <X className="w-4 h-4" />
              </button>
              
              {/* File name overlay */}
              <div className="
                absolute bottom-0 left-0 right-0 p-1.5
                bg-gradient-to-t from-black/60 to-transparent
              ">
                <p className="text-xs text-white truncate">
                  {file.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
