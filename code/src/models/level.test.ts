import levelHelper from './level'

describe('level', () => {
  it('can return the level name', () => {
    const lHelper = levelHelper
    expect(lHelper.getLevelName(0)).toBe('intro-scene')
  })
})
