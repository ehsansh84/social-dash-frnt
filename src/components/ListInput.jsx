import React, { useState } from "react"
import { InputField } from "./InputField"
import { InputWithValidation } from "./InputWithValidation"

export function ListInput({ id, label, items, setItems, ...delegated }) {
  const [input, setInput] = useState("")

  const handleEnter = (event) => {
    setInput(event.target.value)
    if (event.key === "Enter") {
      event.preventDefault()
      setItems([...items, input])
      setInput("")
    }
  }

  return (
    <div>
      <InputWithValidation
        id={id}
        label={label}
        setValue={setInput}
        value={input}
        onKeyPress={handleEnter}
        {...delegated}
      />
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
