module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"Work Sans"', 'system-ui', 'sans-serif']
      },
      colors: {
        ink: '#0B0D10',
        mist: '#F7F4EF',
        ember: '#FF6B4A',
        moss: '#2A9D8F',
        gold: '#F4B860',
        slate: '#3E4A59'
      },
      boxShadow: {
        soft: '0 20px 45px rgba(11, 13, 16, 0.12)'
      }
    }
  },
  plugins: []
};
