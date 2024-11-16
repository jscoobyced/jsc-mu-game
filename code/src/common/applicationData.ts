import { IApplicationData } from '../models/IApplicationData'

export const getApplicationData = () => {
  // @ts-expect-error - We inject this property in index.html
  if (window.jscAppData) {
    // @ts-expect-error - We inject this property in index.html
    return window.jscAppData as IApplicationData
  }
  return {
    appVersion: 'v0.0.0',
  }
}
