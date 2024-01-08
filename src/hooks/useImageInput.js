import { useState, useEffect } from "react"

export function useImageInput(initialImageUrl = "") {
  const [selectedImage, setSelectedImage] = useState(initialImageUrl)
  const [inputKey, setInputKey] = useState(Date.now())

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type.match("image.*")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
      }
      reader.readAsDataURL(file)
    } else {
      console.error("File is not an image.")
    }
  }

  useEffect(() => {
    if (initialImageUrl) {
      setSelectedImage(initialImageUrl)
    }
  }, [initialImageUrl])

  const removeImage = () => {
    setSelectedImage("")
    setInputKey(Date.now())
  }

  return { selectedImage, inputKey, handleImageUpload, removeImage }
}
