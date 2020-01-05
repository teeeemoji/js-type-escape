/**
 * Summary.
 *  main test file.
 *
 * Description
 *  This is the main test file
 *
 * @file   This main test file for class js-type-escape.
 * @author teeeemoji.
 * @since 2020-1-3
 */
const main = require('../src/index')
const {processEscapeStr2Value, processValue2EscapeStr, VALUE_2_STRING_MAP, STRING_2_VALUE_MAP} = main

describe('process value to escape string', function () {
  it('process null value', function () {
    const val = processValue2EscapeStr(null)
    expect(val).toBe(`${VALUE_2_STRING_MAP.object}${null}`)
  })
  it('process undefined value', function () {
    const val = processValue2EscapeStr(void 0)
    expect(val).toBe(VALUE_2_STRING_MAP.undefined)
  })
  it('process string value', function () {
    const str = 'js-type-escape'
    const val = processValue2EscapeStr(str)
    expect(val).toBe(`${VALUE_2_STRING_MAP.string}${str}`)
  })
  it('process number value', function () {
    const num1 = NaN
    const num2 = 1000
    const val1 = processValue2EscapeStr(num1)
    const val2 = processValue2EscapeStr(num2)
    expect(val1).toBe(`${VALUE_2_STRING_MAP.number}${num1}`)
    expect(val2).toBe(`${VALUE_2_STRING_MAP.number}${num2}`)
  })
  it('process boolean value', function () {
    const bool = true
    const val = processValue2EscapeStr(bool)
    expect(val).toBe(`${VALUE_2_STRING_MAP.boolean}${bool}`)
  })
  it('process array value', function () {
    const arr = [1, 2, '567', 'asdf']
    const val = processValue2EscapeStr(arr)
    expect(val).toBe(`${VALUE_2_STRING_MAP.object}${JSON.stringify(arr)}`)
  })
  it('process Object value', function () {
    const obj = {a: [1, '2', 'apple'], b: true, c: {d: 'e'}}
    const val = processValue2EscapeStr(obj)
    expect(val).toBe(`${VALUE_2_STRING_MAP.object}${JSON.stringify(obj)}`)
  })
  it('process Date value', function () {
    const date = new Date()
    const val = processValue2EscapeStr(date)
    expect(val).toBe(`${VALUE_2_STRING_MAP.object}${JSON.stringify(date)}`)
  })
})

describe('process escape string to value with date type', function () {
  it('process value of null', function () {
    const val = processEscapeStr2Value(`${VALUE_2_STRING_MAP.object}${null}`)
    expect(val).toBeNull()
  })
  it('process value of undefined', function () {
    const val = processEscapeStr2Value(VALUE_2_STRING_MAP.undefined)
    expect(val).toBeUndefined()
  })
  it('process value of string', function () {
    const str = 'js-type-escape'
    const val = processEscapeStr2Value(`${VALUE_2_STRING_MAP.string}${str}`)
    expect(val).toBe(str)
  })
  it('process value of number', function () {
    const num1 = NaN
    const num2 = 1000
    const val1 = processEscapeStr2Value(`${VALUE_2_STRING_MAP.number}${num1}`)
    const val2 = processEscapeStr2Value(`${VALUE_2_STRING_MAP.number}${num2}`)
    expect(val1).toBeNaN()
    expect(val2).toBe(num2)
  })
  it('process value of boolean', function () {
    const bool = true
    const val = processEscapeStr2Value(`${VALUE_2_STRING_MAP.boolean}${bool}`)
    expect(val).toBe(bool)
  })
  it('process value of array', function () {
    const arr = [1, 2, '567', 'asdf']
    const val = processEscapeStr2Value(`${VALUE_2_STRING_MAP.object}${JSON.stringify(arr)}`)
    expect(val).toEqual(arr)
  })
  it('process value of Object', function () {
    const obj = {a: [1, '2', 'apple'], b: true, c: {d: 'e'}}
    const val = processEscapeStr2Value(`${VALUE_2_STRING_MAP.object}${JSON.stringify(obj)}`)
    expect(val).toEqual(obj)
  })
  it('process value of Date', function () {
    const date = new Date()
    const val = processEscapeStr2Value(`${VALUE_2_STRING_MAP.object}${JSON.stringify(date.toLocaleString())}`)
    expect(val).toBe(date.toLocaleString())
  })
})
