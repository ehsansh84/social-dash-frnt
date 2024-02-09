import { createPortal } from "react-dom"
import { Modal } from "./Modal"

export function CropModal({ setIsModalOpen }) {
  return createPortal(
    <Modal title="Hello world" handleDismiss={() => setIsModalOpen(false)}>
      This is an example modal! It includes <a href="">several</a>{" "}
      <a href="">different</a> <a href="">links</a>.
    </Modal>,
    document.querySelector("#crop-modal"),
  )
}
