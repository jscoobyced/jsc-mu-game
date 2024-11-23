import { Game } from 'phaser'
import { vi } from 'vitest'
import { isMobile } from './deviceHelper'

const mockPhaserGame = vi.fn(
  (android: boolean, iPad: boolean, iPhone: boolean) => {
    return {
      device: {
        os: {
          android,
          iPad,
          iPhone,
        },
      },
    } as Partial<Game> // Ensure compatibility with Phaser.Game's actual structure
  },
) as ReturnType<typeof vi.fn>

describe('deviceHelper', () => {
  it('can idnetify if a device is android', () => {
    const game = mockPhaserGame(true, false, false) as Phaser.Game
    const result = isMobile(game)
    expect(result).toBeTruthy()
  })

  it('can idnetify if a device is iPad', () => {
    const game = mockPhaserGame(false, true, false) as Phaser.Game
    const result = isMobile(game)
    expect(result).toBeTruthy()
  })

  it('can idnetify if a device is iPhone', () => {
    const game = mockPhaserGame(false, false, true) as Phaser.Game
    const result = isMobile(game)
    expect(result).toBeTruthy()
  })

  it('can idnetify if a device is not mobile', () => {
    const game = mockPhaserGame(false, false, false) as Phaser.Game
    const result = isMobile(game)
    expect(result).toBeFalsy()
  })
})
