const LETTERS = 'TRWAGMYFPDXBNJZSQVHLCKE'

export function getLetterFromDNI(number) {
  const num = parseInt(number, 10)
  if (isNaN(num)) return null
  return LETTERS[num % 23]
}

export function validateDNI(dni) {
  if (!dni || dni.length !== 9) return { valid: false, reason: 'Debe tener 9 caracteres' }
  
  const numberPart = dni.slice(0, 8)
  const letter = dni[8].toUpperCase()
  
  if (!/^\d{8}$/.test(numberPart)) {
    return { valid: false, reason: 'Los 8 primeros caracteres deben ser numéricos' }
  }
  
  const expectedLetter = getLetterFromDNI(numberPart)
  if (!expectedLetter) {
    return { valid: false, reason: 'Número de DNI inválido' }
  }
  
  if (letter !== expectedLetter) {
    return { valid: false, reason: `La letra debería ser ${expectedLetter}`, expectedLetter }
  }
  
  return { valid: true }
}

export function generateDNI(number) {
  const letter = getLetterFromDNI(number)
  if (!letter) return null
  return `${number}${letter}`
}

export function generateRandomDNI() {
  const number = Math.floor(Math.random() * 100000000).toString().padStart(8, '0')
  return generateDNI(number)
}