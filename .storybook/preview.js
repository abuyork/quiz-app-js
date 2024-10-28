import '../src/index.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: {
      desktop: {
        name: 'Desktop',
        styles: {
          width: '90%',
          height: '90vh',
        },
      },
    },
    defaultViewport: 'desktop',
  },
  layout: 'fullscreen',
};

// Add global styles to make content fit better
export const decorators = [
  (Story) => (
    <div style={{ 
      maxHeight: '90vh',
      padding: '1rem',
      overflow: 'auto',
      boxSizing: 'border-box'
    }}>
      <Story />
    </div>
  ),
];
