import React, { useEffect, useState } from "react"
import { InputWithValidation } from "./InputWithValidation"
import { HashtagButton } from "./HashtagButton"

export function ListInput({
  id,
  label,
  items,
  setItems,
  validateCallback,
  helpText = "Press enter to add to the list",
  ...delegated
}) {
  const [input, setInput] = useState("")
  const [isValid, setIsValid] = useState(true)

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
      if (input && isValid) {
        if (!items.includes(input)) {
          setItems([...items, input])
          setInput("")
        }
      }
    } else {
      setInput(event.target.value)
    }
  }

  const removeItem = (index) => {
    setItems(items.filter((item, i) => i !== index))
  }

  useEffect(() => {
    if (input) {
      setIsValid(validateCallback(input))
    } else {
      setIsValid(true)
    }
  }, [input, validateCallback])

  return (
    <div>
      <InputWithValidation
        id={id}
        label={label}
        setValue={setInput}
        value={input}
        onKeyPress={handleEnter}
        isValid={isValid}
        helpText={helpText}
        {...delegated}
      />
      <div className="flex gap-2 pt-2">
        {items.map((item, index) => (
          <HashtagButton key={index} onClick={() => removeItem(index)}>
            {item}
          </HashtagButton>
        ))}
      </div>
    </div>
  )
}
