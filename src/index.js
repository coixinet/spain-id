"use strict"
const DNI_REGEX = /^(\d{8})([A-Z])$/
const CIF_REGEX = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/
const NIE_REGEX = /^[XYZ]\d{7,8}[A-Z]$/

const sanitize = function (str) {
  // Ensure uppercase and remove whitespace ang hyphens
  return str.toUpperCase().replace(/\s/g, '').replace(/-/g, '')
}

export const validateSpanishId = (str) => {
  str = sanitize(str)
  let valid = false;
  const type = spainIdType(str);

  switch (type) {
    case 'dni':
      valid = validDNI(str);
      break;
    case 'nie':
      valid = validNIE(str);
      break;
    case 'cif':
      valid = validCIF(str);
      break;
  }

  return valid

}

export const spainIdType = (str) => {
  str = sanitize(str)
  if (str.match(DNI_REGEX)) {
    return 'dni';
  }
  if (str.match(CIF_REGEX)) {
    return 'cif';
  }
  if (str.match(NIE_REGEX)) {
    return 'nie';
  }
}

export const validDNI = (str) => {
  str = sanitize(str)
  const dni_letters = "TRWAGMYFPDXBNJZSQVHLCKE";
  const letter = dni_letters.charAt(parseInt(str, 10) % 23)

  return letter === str.charAt(8)
}

export const validNIE = (str) => {
  str = sanitize(str)

  // Change the initial letter for the corresponding number and validate as DNI
  var nie_prefix = str.charAt(0);

  switch (nie_prefix) {
    case 'X':
      nie_prefix = 0;
      break;
    case 'Y':
      nie_prefix = 1;
      break;
    case 'Z':
      nie_prefix = 2;
      break;
    default:
      return false;
  }

  return validDNI(nie_prefix + str.substr(1));

};

export const validCIF = (str) => {
  str = sanitize(str)
  if (!str || str.length !== 9) {
    return false;
  }

  const letters = ['J', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  const digits = str.substr(1, str.length - 2);
  const letter = str.substr(0, 1);
  const control = str.substr(str.length - 1);
  let sum = 0;
  let i;
  let digit;

  if (!letter.match(/[A-Z]/)) {
    return false;
  }

  for (i = 0; i < digits.length; ++i) {
    digit = parseInt(digits[i]);

    if (isNaN(digit)) {
      return false;
    }

    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) {
        digit = parseInt(digit / 10) + (digit % 10);
      }

      sum += digit;
    } else {
      sum += digit;
    }
  }

  sum %= 10;
  if (sum !== 0) {
    digit = 10 - sum;
  } else {
    digit = sum;
  }

  if (letter.match(/[ABEH]/)) {
    return String(digit) === control;
  }
  if (letter.match(/[NPQRSW]/)) {
    return letters[digit] === control;
  }

  return String(digit) === control || letters[digit] === control;
}