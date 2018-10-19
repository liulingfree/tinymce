import { Arr } from '@ephox/katamari';
import { Objects } from '@ephox/boulder';
import { SelectData } from './BespokeSelect';

const process = (rawFormats): Array<{ title: string, format: string}> => {
  return Arr.map(rawFormats, (item) => {
    let title = item, format = item;
    // Allow text=value block formats
    const values = item.split('=');
    if (values.length > 1) {
      title = values[0];
      format = values[1];
    }

    return { title, format };
  });
};

export interface BasicSelectDataset {
  type: 'basic';
  data: Array<{
    title: string;
    format: string;
  }>;
}

export interface AdvancedSelectDataset extends SelectData {
  type: 'advanced';
}

const buildBasicStaticDataset = (data): BasicSelectDataset => {
  return {
    type: 'basic',
    data
  };
};

export enum Delimiter { SemiColon, Space }

const split = (rawFormats: string, delimiter: Delimiter): string[] => {
  if (delimiter === Delimiter.SemiColon) {
    return rawFormats.replace(/;$/, '').split(';');
  } else {
    return rawFormats.split(' ');
  }
};

const buildBasicSettingsDataset = (editor, settingName, defaults, delimiter: Delimiter): BasicSelectDataset => {
  const rawFormats = Objects.readOptFrom<any>(editor.settings, settingName).getOr(defaults);
  const data = process(split(rawFormats, delimiter));
  return {
    type: 'basic',
    data
  };
};

export {
  buildBasicSettingsDataset,
  buildBasicStaticDataset
};