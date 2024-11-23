import { createIdleFrameSet, createMovingFrameSets } from './frameSetManager'

describe('framSetManager', () => {
  it('can create player frameset', () => {
    const playerFrameSet = createMovingFrameSets('test')
    expect(playerFrameSet.length).toBe(8)
    expect(playerFrameSet[0].key).toBe('walkright')
  })

  it('can create player idle frameset', () => {
    const playerFrameSet = createIdleFrameSet('test')
    expect(playerFrameSet.key).toBe('idle')
  })
})
