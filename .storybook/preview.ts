import type { Preview } from "@storybook/react";
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'nintendo',
      values: [
        {
          name: 'nintendo-dark',
          value: '#8A8685',
        },
        {
          name: 'nintendo',
          value: '#BAB7B6'
        },
        {
          name: 'screen-dark',
          value: '#191919'
        }
      ]
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
