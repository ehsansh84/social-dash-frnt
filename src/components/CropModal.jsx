import { createPortal } from "react-dom"
import { Modal } from "./Modal"
import { useState } from "react"
import Cropper from "react-easy-crop"

export function CropModal({ image, setIsModalOpen, setImage }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedArea, setCroppedArea] = useState(null)
  const [aspectRatio, setAspectRatio] = useState(4 / 3)
  // Generating Cropped Image When Done Button Clicked

  const onCropDone = (imgCroppedArea) => {
    const canvasEle = document.createElement("canvas")
    canvasEle.width = imgCroppedArea.width
    canvasEle.height = imgCroppedArea.height

    const context = canvasEle.getContext("2d")

    let imageObj1 = new Image()
    imageObj1.src = image
    imageObj1.onload = function () {
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height,
      )

      const dataURL = canvasEle.toDataURL("image/jpeg")

      setImage(dataURL)
      setIsModalOpen(false)
    }
  }

  const onCropCancel = () => {
    setIsModalOpen(false)
  }

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels)
  }

  const onAspectRatioChange = (event) => {
    setAspectRatio(event.target.value)
  }

  return createPortal(
    <Modal title="Crop Image" handleDismiss={() => setIsModalOpen(false)}>
      <div className="relative h-[80vh] w-[90vw]">
        <div className="absolute inset-0 bottom-20">
          <Cropper
            image={image}
            aspect={aspectRatio}
            crop={crop}
            zoom={zoom}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="absolute bottom-5 end-0 start-0 mx-auto flex h-10 w-1/2 items-center justify-center text-violet-950">
          <div onChange={onAspectRatioChange}>
            <input type="radio" value={1 / 1} name="ratio" /> 1:1
            <input type="radio" value={5 / 4} name="ratio" /> 5:4
            <input type="radio" value={4 / 3} name="ratio" /> 4:3
            <input type="radio" value={3 / 2} name="ratio" /> 3:2
            <input type="radio" value={5 / 3} name="ratio" /> 5:3
            <input type="radio" value={16 / 9} name="ratio" /> 16:9
            <input type="radio" value={3 / 1} name="ratio" /> 3:1
          </div>

          <button className="btn btn-outline" onClick={onCropCancel}>
            Cancel
          </button>

          <button
            className="btn"
            onClick={() => {
              onCropDone(croppedArea)
            }}
          >
            Done
          </button>
        </div>
      </div>
    </Modal>,
    document.querySelector("#crop-modal"),
  )
}
