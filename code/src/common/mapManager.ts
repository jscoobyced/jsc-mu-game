import getGeneralSettings from '../models/general'
import { getLevelInfo } from '../models/level'

const GROUND = 'ground'
const OBSTACLES = 'obstacles'

export const createMap = (levelName: string, scene: Phaser.Scene) => {
  const levelInfo = getLevelInfo(levelName)
  if (!levelInfo) return

  const map = scene.make.tilemap({
    key: levelInfo.name,
    tileWidth: getGeneralSettings().tile.width,
    tileHeight: getGeneralSettings().tile.height,
  })
  const tiles = map.addTilesetImage(
    `${levelInfo.tiles}-tiles`,
    `${levelInfo.name}-tiles`,
  )
  if (tiles) {
    map.createLayer(GROUND, tiles)
    const obstaclesLayer = map.createLayer(OBSTACLES, tiles)
    if (obstaclesLayer)
      obstaclesLayer.setCollisionByProperty({ collidable: true })
  }
  return map
}

export const getObstacleLayer = (
  map: Phaser.Tilemaps.Tilemap,
): Phaser.Tilemaps.TilemapLayer | undefined =>
  map.getLayer(OBSTACLES)?.tilemapLayer

export const loadMapImage = (levelName: string, scene: Phaser.Scene) => {
  const levelInfo = getLevelInfo(levelName)
  if (!levelInfo) return
  scene.load.image(
    `${levelInfo.name}-tiles`,
    `${getGeneralSettings().baseUrls.images}/map/${levelInfo.tiles}-tiles.png`,
  )
  scene.load.tilemapTiledJSON(
    levelInfo.name,
    `${getGeneralSettings().baseUrls.json}/${levelInfo.name}.json`,
  )
}
