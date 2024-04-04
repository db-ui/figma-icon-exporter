import { FigmaType, IconDataType, IconType } from "../../types";

export const getIconData = (
  out: string,
  pages?: FigmaType[],
): IconDataType | undefined => {
  if (pages) {
    const data: IconDataType = {};

    for (const { name, children } of pages) {
      const lowerName = name.toLowerCase();
      const pagePath = `${out}/${lowerName}`;
      const icons: IconType[] = [];

      if (children) {
        for (const icon of children) {
          const iconName = icon.name;
          if (icon.children) {
            for (const variant of icon.children) {
              icons.push({
                name: iconName,
                variant: variant.name,
                id: variant.id,
                dir: pagePath,
              });
            }
          }
        }
        data[lowerName] = icons;
      }
    }

    return data;
  }

  return undefined;
};

export default { getIconData };
