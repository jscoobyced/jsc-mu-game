import getGeneralSettings from '../models/general'

const MAIN_TILES = 'main-tiles'
const GROUND = 'ground'
const OBSTACLES = 'obstacles'

export const createMap = (levelName: string, scene: Phaser.Scene) => {
  const map = scene.make.tilemap({
    key: levelName,
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

export const loadMapImage = (levelName: string, scene: Phaser.Scene) => {
  const safeLevelName = encodeURIComponent(levelName)
  scene.load.image(
    `${levelName}-tiles`,
    `${getGeneralSettings().baseUrls.images}/map/${safeLevelName}-tiles.png`,
  )
  scene.load.tilemapTiledJSON(
    safeLevelName,
    `${getGeneralSettings().baseUrls.json}/${safeLevelName}.json`,
  )
}
