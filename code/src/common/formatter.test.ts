import { withLeadingZero } from './formatter'

describe('formatter', () => {
  it('can format less than 10 to 2 digits', () => {
    const input = 0
    const expected = '00'
    const output = withLeadingZero(input)

    expect(output).toEqual(expected)
  })

  it('can format less than 10 to 3 digits', () => {
    const input = 1
    const expected = '001'
    const output = withLeadingZero(input, 3)

    expect(output).toEqual(expected)
  })

  it('can format less than 100 to 3 digits', () => {
    const input = 11
    const expected = '011'
    const output = withLeadingZero(input, 3)

    expect(output).toEqual(expected)
  })

  it('can format more than 100 to 3 digits', () => {
    const input = 110
    const expected = '110'
    const output = withLeadingZero(input, 3)

    expect(output).toEqual(expected)
  })
})
