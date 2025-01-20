import { placePlayerNearSprite } from './playerPosition'

describe('playerPosition', () => {
  const spriteMock = {
    width: 50,
    height: 50,
    x: 110,
    y: 50,
  } as Phaser.Physics.Arcade.Sprite

  it('can set player position on desktop', () => {
    const playerSpriteMock = {
      setPosition: (x?: number, y?: number) => {
        expect(x).toBe(50)
        expect(y).toBe(50)
      },
      width: 50,
    } as Phaser.Physics.Arcade.Sprite
    placePlayerNearSprite(playerSpriteMock, spriteMock, false)
  })

  it('can set player position on mobile', () => {
    const playerSpriteMock = {
      setPosition: (x?: number, y?: number) => {
        expect(x).toBe(40)
        expect(y).toBe(50)
      },
      width: 50,
    } as Phaser.Physics.Arcade.Sprite
    placePlayerNearSprite(playerSpriteMock, spriteMock, true)
  })
})
