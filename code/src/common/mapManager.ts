import getGeneralSettings from '../models/general'

const MAIN_TILES = 'main-tiles'
const GROUND = 'ground'
const OBSTACLES = 'obstacles'

export const createMap = (
  level: string,
  x: number,
  y: number,
  scene: Phaser.Scene,
) => {
  const levelName = getLevelName(level)

  const map = scene.make.tilemap({
    key: getLevelFullName(level, x, y),
    tileWidth: getGeneralSettings().tile.width,
    tileHeight: getGeneralSettings().tile.height,
  })
  const tiles = map.addTilesetImage(MAIN_TILES, `${levelName}-tiles`)
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

export const loadMapImage = (
  level: string,
  x: number,
  y: number,
  scene: Phaser.Scene,
) => {
  const levelFullName = getLevelFullName(level, x, y)
  const levelName = getLevelName(level)
  scene.load.image(
    `${levelName}-tiles`,
    `${getGeneralSettings().baseUrls.images}/map/${levelName}-map.png`,
  )
  scene.load.tilemapTiledJSON(
    levelFullName,
    `${getGeneralSettings().baseUrls.json}/${levelFullName}.json`,
  )
}

const getLevelName = (level: string) => `level-${level}`

const getLevelFullName = (level: string, x: number, y: number) =>
  `level-${level}-${x.toString()}x${y.toString()}`
