# FIE - Figma Icon Exporter

This repository includes some software that could be used to export SVG files out of our documentation pages within Figma.

## Initial setup

- install dependencies in root
- add env variables to `.env` (adapted out of `.env.template`):
  - create an access token within figma.com (read only is the minimum relevant requirement) and assign it to `FIGMA_ACCESS_TOKEN`
  - assign identifier (hash "path" after `https://www.figma.com/design/` within the URL) to `FIGMA_FILE_ID`

## Running the export

- run `npm run test`
