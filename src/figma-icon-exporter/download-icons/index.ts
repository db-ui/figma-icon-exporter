import { DownloadTaskType } from "../../types";
import { createWriteStream } from "fs";
import axios from "axios";

export const downloadIcons = async ({
  icon,
  resolvedImages,
  iconNameConfig,
}: DownloadTaskType): Promise<boolean> => {
  return new Promise((resolve) => {
    const foundIconUrl: string | undefined = resolvedImages[icon.id];
    if (foundIconUrl) {
      let iconName = `${icon.name} ${icon.variant}`.replaceAll(",", "");
      if (iconNameConfig) {
        if (iconNameConfig.replacements) {
          iconNameConfig.replacements.forEach(({ to, from }) => {
            iconName = iconName.replaceAll(from, to);
          });
        }

        if (
          iconNameConfig.toLowerCase === undefined ||
          iconNameConfig.toLowerCase
        ) {
          iconName = iconName.toLowerCase();
        }

        if (iconNameConfig.separator) {
          iconName = iconName.trim().replaceAll(" ", iconNameConfig.separator);
        } else {
          iconName = iconName.trim().replaceAll(" ", "_");
        }
      } else {
        iconName = iconName.toLowerCase().trim().replaceAll(" ", "_");
      }

      const filePath = `${icon.dir}/${iconName}.svg`;

      axios({
        method: "GET",
        url: foundIconUrl,
        responseType: "stream",
      }).then((res) => {
        res.data.pipe(createWriteStream(filePath));
        res.data.on("end", () => {
          resolve(true);
        });
      });
    } else {
      resolve(false);
    }
  });
};

export default { downloadIcons };
