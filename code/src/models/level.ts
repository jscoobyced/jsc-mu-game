import levels from './levels.json';

export interface Level {}

const LevelHelper = () => {
  const getLevelName = (level: number) => levels.levels[level].name;

  return {
    getLevelName,
  };
};

const levelHelper = LevelHelper();

export default levelHelper;
