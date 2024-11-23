export interface Frame {
  key: string
  frame: string
}

export interface FrameSet {
  key: string
  frames: Frame[]
  frameRate: number
  repeat: number
}

export const DEFAULT_SPRITE_FRAMERATE = 6
export const SPRITE_VELOCITY_RUN_FACTOR = 2
export const SPRITE_DEFAULT_FRAME_NUMBER = 3
