import { DialogLineID, InventoryItem } from '../common'

export interface EncounterCondition {
  requiredItems: InventoryItem[]
}

export interface EncounterOutcome {
  description: string
  dialog: DialogLineID[]
  rewards: InventoryItem[]
}

export interface Encounter {
  dialog: DialogLineID[]
  condition: EncounterCondition
  outcome: EncounterOutcome
  isFulfilled: boolean
}

export interface EncountersData {
  encounters: Record<string, Encounter>
  allEncountersFulfilled?: boolean
  defaultOutcomeWhenAllFulfilled?: EncounterOutcome
}

export const checkAllEncountersFulfilled = (
  encountersData: EncountersData,
): void => {
  const allFulfilled = Object.values(encountersData.encounters).every(
    (encounter) => encounter.isFulfilled,
  )
  encountersData.allEncountersFulfilled = allFulfilled
}
