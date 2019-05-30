import {
  builtinPropSpecs, ManageableProps, PropLoader, makePropsWithPrefix,
  preprocessPropSpecs,
} from './scaffolding/lib/props';

const particleImages = [
  '',
];

export const commands = {
  jump: {
    input: ['keyboard.UP'],
  },
  left: {
    input: ['keyboard.LEFT'],
  },
  right: {
    input: ['keyboard.RIGHT'],
  },
};

export const shaderCoordFragments = null;
export const shaderColorFragments = null;

export const propSpecs = {
  ...builtinPropSpecs(commands, shaderCoordFragments, shaderColorFragments),

};

export const tileDefinitions = {
  '.': null, // background
};

preprocessPropSpecs(propSpecs, particleImages);

export const manageableProps = new ManageableProps(propSpecs);
export const propsWithPrefix = makePropsWithPrefix(propSpecs, manageableProps);
export default PropLoader(propSpecs, manageableProps);
