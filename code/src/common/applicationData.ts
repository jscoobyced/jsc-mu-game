import { IApplicationData } from '../models/IApplicationData'

export const getApplicationData = () => {
  // @ts-expect-error - We inject this property in index.html
  if (window.jscMumuData) {
    // @ts-expect-error - We inject this property in index.html
    return window.jscMumuData as IApplicationData
  }
  return {
    appVersion: '0.0.0',
  }
}
