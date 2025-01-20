import { CurrentStatusData } from '../models/saved'
import {
  decrypt,
  encrypt,
  exportKey,
  generateIV,
  generateKey,
  importKey,
} from './crypto'

const CURRENT_STATUS = 'MUMU_CURRENT_STATUS'
const INITIALIZATION_VECTOR = 'MUMU_IV'
const MUMU_KEY = 'MUMU_KEY'

const saveInitializationVector = (iv: Uint8Array) => {
  const ivString = btoa(String.fromCharCode(...new Uint8Array(iv)))
  localStorage.setItem(INITIALIZATION_VECTOR, ivString)
}

const getInitializationVector = () => {
  const ivString = localStorage.getItem(INITIALIZATION_VECTOR)
  if (ivString) {
    return Uint8Array.from(atob(ivString), (char) => char.charCodeAt(0))
  }
}

const saveKey = async (key: CryptoKey) => {
  const keyString = await exportKey(key)
  localStorage.setItem(MUMU_KEY, keyString)
}

const getKey = () => {
  const keyString = localStorage.getItem(MUMU_KEY)
  if (keyString) {
    return importKey(keyString)
  }
}

export const setCurrentStatus = async (
  data: CurrentStatusData,
): Promise<boolean> => {
  try {
    let iv = getInitializationVector()
    if (!iv) {
      iv = generateIV()
      saveInitializationVector(iv)
    }
    let key = await getKey()
    if (!key) {
      key = await generateKey()
      await saveKey(key)
    }
    const encrypted = await encrypt(key, iv, JSON.stringify(data))
    localStorage.setItem(CURRENT_STATUS, encrypted)
    return true
  } catch (error) {
    void error
  }
  return false
}

export const getCurrentStatus = async () => {
  const stringData = localStorage.getItem(CURRENT_STATUS)
  if (stringData) {
    const iv = getInitializationVector()
    const key = await getKey()
    if (key && iv) {
      const decrypted = await decrypt(key, iv, stringData)
      return JSON.parse(decrypted) as CurrentStatusData
    }
  }
  return undefined
}
