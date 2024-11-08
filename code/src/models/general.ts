import general from './general.json';

export interface GeneralSettings {
  width: number;
  height: number;
  backgroundColor: string;
  baseUrls: {
    images: string;
    audio: string;
    json: string;
    fonts: string;
  };
}

const getGeneralSettings = () => general;

export default getGeneralSettings;
