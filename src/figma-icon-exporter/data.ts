import { ProgrammOptionsType } from "../types";

export const fieOptions: ProgrammOptionsType[] = [
  {
    name: "api",
    defaultValue: "https://api.figma.com/v1",
    description: "figma base api",
  },
  {
    name: "token",
    description: "figma personal access token to download",
  },
  {
    name: "file",
    description: "figma file id",
  },
  {
    name: "ignorePages",
    defaultValue: [],
    description: "pages to ignore",
  },
  {
    name: "out",
    defaultValue: "icons",
    description: "output directory for icons",
  },
  {
    name: "dryRun",
    description: "prints the output of the command",
  },
  {
    name: "debug",
    description: "Extra logging",
    defaultValue: false,
  },
];
