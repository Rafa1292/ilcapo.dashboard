export const showErrorMsg = (name: string) => {
  const msg = document.getElementById(name)
  if (msg) {
    msg.style.display = 'flex'
  }
}

export const validateNumber = (value: any, name: string, regex: RegExp): boolean => {
  const isValid = regex.test(value)
  if (isValid) {
    return true
  } else {
    showErrorMsg(name)
    return false
  }
}

export const validateString = (value: any, name: string, length: number): boolean => {
  const currentLength = length === 0 ? 100 : length
  const reg = new RegExp(`^[a-zA-Z0-9\\u00E0-\\u00FC\\s?]{1,${currentLength}}$`)
  const isValid = reg.test(value)
  if (isValid) {
    return true
  } else {
    showErrorMsg(name)
    return false
  }
}