const COUNTRY_CODES = {
  AL: 28, AD: 24, AT: 20, AZ: 28, BH: 22, BY: 28, BE: 16, BA: 20, BR: 29, BG: 22,
  CR: 22, HR: 21, CY: 28, CZ: 24, DK: 18, DO: 28, TL: 23, EE: 20, FO: 18, FI: 18,
  FR: 27, GE: 22, DE: 22, GI: 23, GR: 27, GL: 18, GT: 28, HU: 28, IS: 26, IQ: 23,
  IE: 22, IL: 23, IT: 27, JO: 30, KZ: 20, XK: 20, KW: 30, LV: 21, LB: 28, LI: 20,
  LT: 20, LU: 20, MK: 19, MT: 31, MR: 27, MC: 27, MD: 24, ME: 22, NL: 18,
  NO: 15, PK: 24, PS: 29, PL: 28, PT: 25, QA: 29, RO: 24, LC: 32, SM: 27,
  ST: 25, SA: 24, RS: 22, SC: 31, SK: 24, SI: 19, ES: 24, SE: 24, CH: 21,
  TN: 24, TR: 26, UA: 29, AE: 23, GB: 22, VA: 22, VG: 24
}

const LETTER_TO_NUM = {
  A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, G: 16, H: 17, I: 18, J: 19,
  K: 20, L: 21, M: 22, N: 23, O: 24, P: 25, Q: 26, R: 27, S: 28, T: 29,
  U: 30, V: 31, W: 32, X: 33, Y: 34, Z: 35
}

const SPANISH_BANKS = [
  '0049','0050','0061','0065','0087','0094','0112','0114','0118','0122','0123','0124','0136','0142',
  '0182','0184','0188','0198','0202','0204','0208','0214','0219','0227','0229','0231',
  '0240','0242','0244','0246','0247','0249','0251','0253','0256','0258','0271','0272',
  '0046','0047','0054','0055','0059','0060','0064','0066','0067','0068','0070','0071','0072','0073','0075','0076',
  '0077','0078','0079','0081','0083','0085','0086','0088','0090','0091','0093','0095','0096','0097','0099','0100',
  '0101','0102','0103','0106','0108','0110','0111','0113','0115','0116','0117','0119','0120','0121','0125','0126',
  '0127','0128','0129','0130','0131','0132','0133','0134','0135','0137','0138','0139','0140','0141','0143','0144',
  '0145','0146','0148','0150','0151','0152','0153','0155','0156','0157','0158','0160','0161','0162','0163','0164',
  '0165','0166','0167','0168','0169','0170','0171','0172','0173','0174','0175','0176','0178','0179','0180','0181',
  '0183','0185','0186','0187','0189','0190','0191','0192','0193','0194','0195','0196','0197','0199','0200','0201',
  '0203','0205','0206','0207','0209','0210','0211','0212','0213','0215','0216','0217','0218','0220','0221','0222',
  '0223','0224','0225','0226','0228','0230','0232','0233','0234','0235','0236','0238','0239','0241','0243','0245',
  '0248','0250','0252','0254','0255','0257','0259','0260','0261','0262','0263','0264','0265','0266','0267','0268',
  '0269','0270','0273','0274','0275','0276','0278','0280','0281','0282','0283','0285','0286','0288','0291','0292',
  '0294','0296','0298','0302','0303','0304','0305','0306','0307','0309','0312','0313','0314','0315','0317','0320',
  '0321','0323','0324','0326','0328','0330'
]

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function getSpanishDC(bankCode, branchCode, accountNumber) {
  const w1 = [1, 2, 4, 8, 5, 10, 9, 7]
  const bc = bankCode + branchCode
  let s1 = 0
  for (let i = 0; i < 8; i++) s1 += parseInt(bc[i]) * w1[i]
  let dc1 = 11 - (s1 % 11)
  if (dc1 === 11) dc1 = 0
  if (dc1 === 10) dc1 = 1

  const w2 = [1, 2, 4, 8, 5, 10, 9, 7, 3, 6]
  let s2 = 0
  for (let i = 0; i < 10; i++) s2 += parseInt(accountNumber[i]) * w2[i]
  let dc2 = 11 - (s2 % 11)
  if (dc2 === 11) dc2 = 0
  if (dc2 === 10) dc2 = 1

  return '' + dc1 + dc2
}

export function validateIBAN(iban) {
  if (!iban) return { valid: false, reason: 'IBAN requerido' }
  
  const cleaned = iban.replace(/\s/g, '').toUpperCase()
  
  if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(cleaned)) {
    return { valid: false, reason: 'Formato inválido' }
  }
  
  const countryCode = cleaned.slice(0, 2)
  const expectedLength = COUNTRY_CODES[countryCode]
  
  if (!expectedLength) {
    return { valid: false, reason: 'Código de país desconocido' }
  }
  
  if (cleaned.length !== expectedLength) {
    return { valid: false, reason: `Debe tener ${expectedLength} caracteres (${countryCode})`, expectedLength }
  }
  
  const rearranged = cleaned.slice(4) + cleaned.slice(0, 4)
  let numericString = ''
  
  for (const char of rearranged) {
    if (/[0-9]/.test(char)) {
      numericString += char
    } else {
      numericString += LETTER_TO_NUM[char]
    }
  }
  
  const mod = BigInt(numericString) % 97n
  if (mod !== 1n) {
    return { valid: false, reason: 'Dígitos de control inválidos' }
  }
  
  if (countryCode === 'ES') {
  }

  return { valid: true, countryCode, length: expectedLength }
}

export function formatIBAN(iban) {
  const cleaned = iban.replace(/\s/g, '').toUpperCase()
  return cleaned.replace(/(.{4})/g, '$1 ').trim()
}

export function generateIBAN(countryCode) {
  const country = countryCode?.toUpperCase() || 'ES'
  const length = COUNTRY_CODES[country]
  
  if (!length) return null

  if (country === 'ES') {
    while (true) {
      const bankCode = randomElement(SPANISH_BANKS)
      const branchCode = String(Math.floor(Math.random() * 10000)).padStart(4, '0')
      const accountNum = String(Math.floor(Math.random() * 10000000000)).padStart(10, '0')
      const dc = getSpanishDC(bankCode, branchCode, accountNum)

      const bban = bankCode + branchCode + dc + accountNum
      if (bban.length !== 20) continue

      const testStr = bban + 'ES00'
      let numericStr = ''
      for (const ch of testStr) {
        numericStr += /[0-9]/.test(ch) ? ch : LETTER_TO_NUM[ch]
      }
      const rem = BigInt(numericStr) % 97n
      const checkDigits = String(98 - Number(rem)).padStart(2, '0')

      return `ES${checkDigits}${bban}`
    }
  }

  const baseDigits = length - 4
  let randomDigits = ''
  for (let i = 0; i < baseDigits; i++) randomDigits += Math.floor(Math.random() * 10)

  const rearranged = randomDigits + country + '00'
  let numericString = ''
  for (const ch of rearranged) {
    numericString += /[0-9]/.test(ch) ? ch : LETTER_TO_NUM[ch]
  }
  const rem = Number(BigInt(numericString) % 97n)
  const checkDigits = String(98 - rem).padStart(2, '0')
  return `${country}${checkDigits}${randomDigits}`
}

export function getSupportedCountries() {
  return Object.keys(COUNTRY_CODES).sort()
}