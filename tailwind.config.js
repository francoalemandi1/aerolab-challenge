module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'aerolab-main': '#F2F2F2',
      'custom-light-gray': '#EDEDED',
      'custom-light-blue': '#0AD4FA',
      'custom-gray': '#616161',
     }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
