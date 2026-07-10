import type { Preview } from "@storybook/nextjs";
import "../src/assets/css/globals.css";
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
