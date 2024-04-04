/* eslint-disable no-await-in-loop */

import FSE from "fs-extra";
import "dotenv/config";
import { FigmaResponseType, IconDataType, OptionsType } from "../types";

import { getIconData } from "./get-icon-data";
import { debugLog, getDefaultHeader, InlineLog } from "../utils";
import { getIconUrls } from "./get-icon-urls";
import axios, { AxiosInstance } from "axios";
import { downloadIcons } from "./download-icons";

const exportIcons = async (values: OptionsType): Promise<unknown> => {
  const {
    api = "https://api.figma.com/v1",
    token = process.env.FIGMA_ACCESS_TOKEN,
    file = process.env.FIGMA_FILE_ID,
    out = "icons",
    includePages,
    ignorePages,
    dryRun,
    debug = false,
    iconNameConfig,
    overwritePages,
  } = values;

  if (!out) {
    return false;
  }

  const inlineLog = new InlineLog("Fetching figma file");
  inlineLog.start();

  if (!FSE.existsSync(out)) {
    FSE.mkdir(out);
  }

  const instance: AxiosInstance = axios.create({
    baseURL: api,
    ...getDefaultHeader(token),
  });

  const { data } = await instance.get<FigmaResponseType>(`/files/${file}`);
  const { document } = data;

  let iconData: IconDataType | undefined;
  let pages = document.children;
  const pagesToSkip: string[] = [];

  if (pages && pages.length > 0) {
    if (ignorePages) {
      pages = pages.filter((page) => !ignorePages.includes(page.name));
    }

    if (includePages && includePages.length > 0) {
      pages = pages.filter((page) => includePages.includes(page.name));
    }

    debugLog(debug, `Got pages: ${pages.map((page) => page.name).join(", ")}`);

    iconData = getIconData(out, pages);

    if (dryRun) {
      return iconData;
    } else if (iconData) {
      for (const page of Object.keys(iconData)) {
        const fullDirectory = `${out}/${page}`;
        if (FSE.existsSync(fullDirectory)) {
          if (overwritePages) {
            FSE.removeSync(fullDirectory);
            FSE.mkdir(fullDirectory);
          } else {
            pagesToSkip.push(page);
          }
        } else {
          FSE.mkdir(fullDirectory);
        }
      }

      if (pagesToSkip) {
        for (const page of pagesToSkip) {
          if (iconData && iconData[page]) {
            delete iconData[page];
          }
        }
      }

      if (Object.keys(iconData).length === 0) {
        debugLog(
          debug,
          "No icons found. Maybe you need to add the overwrite option.",
        );
        return true;
      } else {
        const foundIcons = Object.entries(iconData)
          .map(([page, icons]) => `${page}:${icons.length}`)
          .join(";");
        debugLog(debug, `Found icons: ${foundIcons}`);
      }

      inlineLog.stop();

      const resolvedImages = await getIconUrls(iconData, instance, file);
      inlineLog.setMessage(`Download images`);
      inlineLog.start();

      for (const [page, icons] of Object.entries(iconData)) {
        inlineLog.setMessage(`Download images for: ${page}`);
        const workerPromises: Promise<boolean>[] = icons.map(
          async (icon) =>
            await downloadIcons({
              icon,
              resolvedImages,
              iconNameConfig,
            }),
        );
        await Promise.all(workerPromises);
      }
      inlineLog.stop();

      return true;
    }
  }

  return false;
};

export default exportIcons;
