import { PhoneNumberUtil } from "google-libphonenumber"

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export function validateHashtag(text) {
  const textPattern = /^[\p{L}\p{N}_]+$/u
  return textPattern.test(text)
}

export function validateUsername(text) {
  const textPattern = /^[A-z][A-z0-9-_]{3,23}$/
  return {
    test: () => textPattern.test(text),
    instructions: [
      "4 to 24 characters.",
      "Must begin with a letter",
      "Letters, numbers, underscores. hyphons allowed.",
    ],
  }
}

export function validatePassword(text) {
  const textPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
  return {
    test: () => textPattern.test(text),
    instructions: [
      "8 to 24 characters.",
      "Must include uppercase and lowercase letters, a number and a special character.",
    ],
  }
}

const phoneUtil = PhoneNumberUtil.getInstance()

export const isPhoneValid = (phone) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone))
  } catch (error) {
    return false
  }
}

export function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

