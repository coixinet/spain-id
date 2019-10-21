"use strict"

class Validator {

  constructor(str) {

    this.str = str
    this.DNI_REGEX = /^(\d{8})([A-Z])$/
    this.CIF_REGEX = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/
    this.NIE_REGEX = /^[XYZ]\d{7,8}[A-Z]$/

  }

  validateSpanishId() {

    // Ensure upcase and remove whitespace ang hyphens
    this.str = this.str.toUpperCase().replace(/\s/, '').replace('-', '')

    let valid = false;
    const type = this._spainIdType(this.str);

    switch (type) {
      case 'dni':
        valid = this._validDNI();
        break;
      case 'nie':
        valid = this._validNIE();
        break;
      case 'cif':
        valid = this._validCIF();
        break;
    }

    return valid

  }

  _spainIdType() {
    if (this.str.match(this.DNI_REGEX)) {
      return 'dni';
    }
    if (this.str.match(this.CIF_REGEX)) {
      return 'cif';
    }
    if (this.str.match(this.NIE_REGEX)) {
      return 'nie';
    }
  };

  _validDNI() {
    var dni_letters = "TRWAGMYFPDXBNJZSQVHLCKE";
    var letter = dni_letters.charAt(parseInt(this.str, 10) % 23);

    return letter == this.str.charAt(8);
  };

  _validNIE() {

    // Change the initial letter for the corresponding number and validate as DNI
    var nie_prefix = this.str.charAt(0);

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
    }

    return validDNI(nie_prefix + this.str.substr(1));

  };


  _validCIF() {
    if (!this.str || this.str.length !== 9) {
      return false;
    }

    const letters = ['J', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    const digits = cif.substr(1, cif.length - 2);
    const letter = cif.substr(0, 1);
    const control = cif.substr(cif.length - 1);
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

}

module.exports = Validator;