import {
  DEFAULT_SPRITE_FRAMERATE,
  Frame,
  FrameSet,
  SPRITE_DEFAULT_FRAME_NUMBER,
  SPRITE_VELOCITY_RUN_FACTOR,
} from '../models/frameSet'
import { withLeadingZero } from './formatter'

const createFrameSet = (
  name: string,
  move: string,
  direction: string,
  frameRate: number,
  frameNumber: number,
): FrameSet => {
  const frames: Frame[] = []
  for (let i = 1; i <= frameNumber; i++) {
    const currentFrameNumber = withLeadingZero(i)
    frames.push({
      key: name,
      frame: `${direction}-${currentFrameNumber}`,
    })
  }
  return {
    key: `${move}${direction}`,
    frames,
    frameRate,
    repeat: -1,
  }
}

const createFrameSets = (
  name: string,
  directions: string[],
  moves: string[],
  frameRates: number[],
  frameNumber: number,
) => {
  const frameSets = []
  for (let direction of directions) {
    for (let i = 0; i < moves.length; i++) {
      const frameSet = createFrameSet(
        name,
        moves[i],
        direction,
        frameRates[i],
        frameNumber,
      )
      frameSets.push(frameSet)
    }
  }
  return frameSets
}

export const createMovingFrameSets = (name: string) => {
  return createFrameSets(
    name,
    ['right', 'left', 'up', 'down'],
    ['walk', 'run'],
    [
      DEFAULT_SPRITE_FRAMERATE,
      DEFAULT_SPRITE_FRAMERATE * SPRITE_VELOCITY_RUN_FACTOR,
    ],
    SPRITE_DEFAULT_FRAME_NUMBER,
  )
}

export const createIdleFrameSet = (name: string) => {
  return createFrameSet(
    name,
    '',
    'idle',
    DEFAULT_SPRITE_FRAMERATE,
    SPRITE_DEFAULT_FRAME_NUMBER,
  )
}
