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

const phoneUtil = PhoneNumberUtil.getInstance()

export const isPhoneValid = (phone) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone))
  } catch (error) {
    return false
  }
}
