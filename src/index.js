/**
 * The prefix corresponding to the value type
 */
export const VALUE_2_STRING_MAP = {
  number: '1__',
  string: '2__',
  object: '3__',
  undefined: '4__',
  boolean: '5__'
}

/**
 * The prefix for the value type
 */
export const STRING_2_VALUE_MAP = {
  '1__': 'number',
  '2__': 'string',
  '3__': 'object',
  '4__': 'undefined',
  '5__': 'boolean'
}

/**
 * @public
 * @function processEscapeStr2Value
 * @description process escape string to value with its data type
 * @param str {string}
 * @returns {string|any|undefined|number}
 */
export function processEscapeStr2Value(str) {
  const fullStr = decodeURIComponent(str)
  const typeStr = fullStr.slice(0, 3)
  if (STRING_2_VALUE_MAP[typeStr]) {
    const valueStr = fullStr.slice(3)
    switch (STRING_2_VALUE_MAP[typeStr]) {
      case 'number':
        return Number.isNaN(+valueStr) ? NaN : +valueStr
      case 'object':
        try {
          return JSON.parse(valueStr)
        } catch (e) {
          return str
        }
      case 'undefined':
        return undefined
      case 'boolean':
        return valueStr === 'true'
      case 'string':
      default:
        return valueStr
    }
  }
  return str
}

/**
 * @public
 * @function processValue2EscapeStr
 * @description process value to escape string
 * @param val {any}
 * @returns {string}
 */
export function processValue2EscapeStr(val) {
  const type = typeof val
  switch (type) {
    case 'number':
      return `1__${val}`
    case 'string':
      return `2__${val}`
    case 'undefined':
      return '4__'
    case 'boolean':
      return `5__${val}`
    case 'object':
    default:
      return `3__${JSON.stringify(val)}`
  }
}

export default {
  processEscapeStr2Value,
  processValue2EscapeStr
}
