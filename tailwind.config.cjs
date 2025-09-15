module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'primary': 'hsl(259, 100%, 65%)',
        'muted': 'hsl(0, 0%, 86%)',
        'text': 'hsl(0, 1%, 44%)'
      }
    }
  },
  plugins: []
}