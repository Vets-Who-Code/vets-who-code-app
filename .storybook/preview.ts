import type { Preview } from "@storybook/nextjs";
// @ts-ignore: side-effect import of CSS globals
import "../src/assets/css/globals.css";
// @ts-ignore
import "../src/assets/css/tailwind.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
