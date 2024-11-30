import { getLevelInfo } from './level'
import levels from './levels.json'

describe('level', () => {
  it('can load the levels data', () => {
    expect(levels.length).toBe(1)
    const levelInfo = getLevelInfo('level-one')
    expect(levelInfo).not.toBeUndefined()
    expect(levelInfo?.name).toBe('level-one')
  })
})
