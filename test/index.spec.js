import {
  validateSpanishId,
  spainIdType,
  validDNI,
  validNIE,
  validCIF
} from '../lib/cjs/index.js'

describe('Id validations', () => {
  test('validate 8 digits DNI 9654234F true', () => {
    expect(validateSpanishId('9654234-F')).toBeTruthy()
    expect(validDNI('9654234 F')).toBeTruthy()
    expect(validNIE('9654235F')).toBeFalsy()
    expect(spainIdType('9654234F')).toBe('dni')
  })

  test('validate DNI 39740191D true', () => {
    expect(validateSpanishId('3-9740191-D')).toBeTruthy()
    expect(validDNI('39740191 D')).toBeTruthy()
    expect(validNIE('39740191-D')).toBeFalsy()
    expect(spainIdType('39740191-D')).toBe('dni')
  })

  test('validate DNI 39740191H false', () => {
    expect(spainIdType('39740191H')).toBe('dni')
    expect(validDNI('39740191H')).toBeFalsy()
    expect(validateSpanishId('39740191H')).toBeFalsy()
  })
  test('validateSpanishId Local government id P4622000J should be true', () => {
    expect(spainIdType('P4622000J')).toBe('cif')
    expect(validCIF('P4622000J')).toBeTruthy()
    expect(validateSpanishId('P4622000J')).toBeTruthy()
  })
  test('validate CIF A28017895 should be true', () => {
    expect(spainIdType('A28017895')).toBe('cif')
    expect(validCIF('A28017895')).toBeTruthy()
    expect(validCIF('A28017894')).toBeFalsy()
    expect(validateSpanishId('A28017895')).toBeTruthy()
    expect(validateSpanishId('A28017894')).toBeFalsy()
  })
  test('validate CIF B72327000 should be true', () => {
    expect(spainIdType('B72327000')).toBe('cif')
    expect(validCIF('B72327000')).toBeTruthy()
    expect(validCIF('B72327001')).toBeFalsy()
    expect(validateSpanishId('B72327000')).toBeTruthy()
    expect(validateSpanishId('B72327001')).toBeFalsy()
  })
  test('validateSpanishId Local government id P4622000H should be false', () => {
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
