// /** @type {import('next-i18next').UserConfig} */
// // const path = require('path');
// module.exports = {
//   i18n: {
//     defaultLocale: "de",
//     locales: ["en", "de", "pl"],
//     // localePath: path.resolve('./public/locales'),
//   },
//   detection: {
//     order: ['queryString', 'cookie'],
//     caches: ['cookie'],
//   },
//   defaultNS: "common",
//   react: { useSuspense: false }, //TEMP
// };



/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "de",
    locales: ["pl","en", "de"],
  },
};