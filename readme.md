## What is this?
A very small library to validate spanish id documents (NIF, CIF, NIE)

## Installation

```
npm i spain-id
```

Or with yarn

```
yarn add spain-id
```

## Usage

```javascript
// import just what you need
import { validateSpanishId, spainIdType, validDNI, validNIE, validCIF } from 'spain-id'

validateSpanishId('39740191D') // Validates the 3 types of document
spainIdType('39740191D') // 'dni'
validDNI('14741806W') // true
validNIE('X8095495R') // true
validCIF('P4622000J') // true

```
