export function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export function validateHashtag(text) {
  // The regex pattern for a hashtag
  const hashtagPattern = /^#[a-zA-Z0-9_]+$/

  // Test the input against the pattern
  return hashtagPattern.test(text)
}
