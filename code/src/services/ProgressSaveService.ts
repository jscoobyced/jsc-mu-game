import { Level, SaveFile } from '../models/common'
import general from '../config/general.json'
import ProgressTracker from './ProgressTracker'

export default class ProgressSaveService implements ProgressTracker {
  protected level!: Level
  private SAVE_GAME = 'SAVE_GAME'
  private saveFile!: SaveFile

  public constructor(level: Level) {
    this.level = level
  }

  updateProgress = (progress: number) => {
    const index = this.saveFile.levels.findIndex((currentLevel) => {
      return currentLevel.name === this.level.key
    })
    if (index >= 0) {
      this.saveFile.levels[index].progress = progress
    } else {
      this.saveFile.levels.push({
        name: this.level.key,
        progress: progress,
      })
    }
    this.saveGame()
  }

  updateLevelKey = (levelKey: string) => {
    this.saveFile.level = levelKey
    this.saveGame()
  }

  getProgress = (levelKey?: string) => {
    const levelToCheck = levelKey || this.level.key
    const index = this.saveFile.levels.findIndex((currentLevel) => {
      return currentLevel.name === levelToCheck
    })
    if (index >= 0) {
      return this.saveFile.levels[index].progress
    }
    return 0
  }

  getLevelKey = () => {
    return this.saveFile.level
  }

  updatePosition = (position: { x: number; y: number }) => {
    this.saveFile.position = position
    this.saveGame()
  }

  getPlayerSavedPosition = (): { x: number; y: number } => this.saveFile.position

  private saveGame = () => {
    localStorage.setItem(this.SAVE_GAME, JSON.stringify(this.saveFile))
  }

  public loadSavedGame = () => {
    const savedJson = localStorage.getItem(this.SAVE_GAME)
    if (savedJson && savedJson.indexOf('version') > 0) this.saveFile = JSON.parse(savedJson) as SaveFile
    else {
      this.saveFile = {
        version: 1,
        level: general.levels.levelOne.key,
        levels: [
          {
            name: general.levels.levelOne.key,
            progress: 0,
          },
        ],
        position: {
          x: (general.width - general.controller) / 2,
          y: general.height / 2,
        },
      }
    }
  }
}
