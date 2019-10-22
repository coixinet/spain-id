// const {
//   validateSpanishId,
//   spainIdType,
//   validDNI,
//   validNIE,
//   validCIF
// } = require('../dist/index.modern.mjs')
import {
  validateSpanishId,
  spainIdType,
  validDNI,
  validNIE,
  validCIF
} from '../dist/index.modern.mjs'

describe('Id validations', () => {
  test('validate DNI 39740191D true', () => {
    expect(validateSpanishId('39740191D')).toBeTruthy()
    expect(validDNI('39740191D')).toBeTruthy()
    expect(spainIdType('39740191D')).toBe('dni')
  })
  test('validate DNI 39740191H false', () => {
    expect(spainIdType('39740191H')).toBe('dni')
    expect(validDNI('39740191H')).toBeFalsy()
    expect(validateSpanishId('39740191H')).toBeFalsy()
  })
  test('validateSpanishId Local goverment id P4622000J should be true', () => {
    expect(spainIdType('P4622000J')).toBe('cif')
    expect(validCIF('P4622000J')).toBeTruthy()
    expect(validateSpanishId('P4622000J')).toBeTruthy()
  })
  test('validateSpanishId Local goverment id P4622000H should be false', () => {
    expect(spainIdType('P4622000H')).toBe('cif')
    expect(validCIF('P4622000H')).toBeFalsy()
    expect(validateSpanishId('P4622000H')).toBeFalsy()
  })
  test('validateSpanishId NIE id X8095495R should be true', () => {
    expect(spainIdType('X8095495R')).toBe('nie')
    expect(validNIE('X8095495R')).toBeTruthy()
    expect(validateSpanishId('X8095495R')).toBeTruthy()
  })
  test('validateSpanishId NIE id X8095495F should be false', () => {
    expect(spainIdType('X8095495F')).toBe('nie')
    expect(validNIE('X8095495F')).toBeFalsy()
    expect(validateSpanishId('X8095495F')).toBeFalsy()
  })
})