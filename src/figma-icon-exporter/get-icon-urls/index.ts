import { FigmaImageResponseType, IconDataType } from "../../types";
import { AxiosInstance } from "axios";
import { InlineLog } from "../../utils";

export const getIconUrls = async (
  iconData: IconDataType,
  instance: AxiosInstance,
  file?: string,
): Promise<Record<string, string>> => {
  let resolvedImages: Record<string, string> = {};

  const inlineLog = new InlineLog("Download pages");
  inlineLog.start();
  for (const [page, icons] of Object.entries(iconData)) {
    inlineLog.setMessage(`Download page: ${page}`);
    const iconIds = icons.map((icon) => icon.id).join(",");

    const { data } = await instance.get<FigmaImageResponseType>(
      `/images/${file}?ids=${iconIds}&format=svg`,
    );
    resolvedImages = { ...resolvedImages, ...data.images };
  }

  inlineLog.stop();
  return resolvedImages;
};

export default { getIconUrls };
