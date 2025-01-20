import { getCurrentStatus } from './common/storage'

declare global {
  interface Window {
    mumu: {
      debug: () => void
    }
  }
}

const mumu = {
  debug: async () => {
    const returnResult = {
      value: '',
    }
    if (
      document.location.hostname === 'localhost' ||
      document.location.hostname === '127.0.0.1'
    ) {
      const result = await getCurrentStatus()
      returnResult.value = JSON.stringify(result)
    }
    return returnResult.value
  },
}

window.mumu = mumu
