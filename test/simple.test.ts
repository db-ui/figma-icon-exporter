import { describe, expect, test } from "@jest/globals";
import exportIcons from "../src/figma-icon-exporter/index";

describe("simple", () => {
  test("check if request works", async () => {
    const success = await exportIcons({
      debug: true,
      ignorePages: [
        "👋 Welcome & Getting Started",
        "🪜 Overview",
        "🗂️ Changelog",
        "---",
        "----------",
        "🖼️ Cover",
        "Placeholder + Templates",
      ],
      iconNameConfig: {
        replacements: [
          { from: "Size=", to: "" },
          { from: "Variant=(Def) Outlined", to: "" },
          { from: "Variant=Filled", to: "filled" },
          { from: "Variant=Inverted", to: "inverted" },
        ],
      },
    });
    expect(success).toBe(true);
    // No timeout
  }, 99999999);
});
