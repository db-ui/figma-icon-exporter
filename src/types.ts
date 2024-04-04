export type ProgrammOptionsType = {
  name: string;
  short?: string;
  long?: string;
  array?: boolean;
  required?: boolean;
  description?: string;
  defaultValue?: string | boolean | string[];
};

export type IconNameConfigType = {
  /**
   * Lower cases the icon file name, defaults to 'true'
   */
  toLowerCase?: boolean;

  /**
   * Replace repeating prefixes/postfixes etc.
   */
  replacements?: { from: string; to: string }[];

  /**
   * Change the separator, defaults to '_'
   */
  separator?: string;

  /**
   * Replaces symbols(and,or,...), defaults to true
   */
  cleanSymbols?: string;
};

export type OptionsType = {
  token?: string;
  file?: string;
  api?: string;
  out?: string;
  overwritePages?: boolean;
  iconNameConfig?: IconNameConfigType;
  includePages?: string[];
  ignorePages?: string[];
  debug?: boolean;
  dryRun?: boolean;
};

export type FigmaResponseType = {
  document: FigmaType;
};
export type FigmaImageResponseType = {
  err: unknown;
  images: Record<string, string>;
};

export type FigmaType = {
  id: string;
  name: string;
  type: "DOCUMENT" | "CANVAS" | "FRAME" | "COMPONENT";
  children?: FigmaType[];
};

export type IconType = {
  name: string;
  variant: string;
  id: string;
  dir: string;
};

export type IconDataType = Record<string, IconType[]>;

export type DownloadTaskType = {
  icon: IconType;
  resolvedImages: Record<string, string>;
  iconNameConfig?: IconNameConfigType;
};
