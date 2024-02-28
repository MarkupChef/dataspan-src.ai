module.exports = {
  "pluginSearchDirs": ["./node_modules"],
  "plugins": [
    "prettier-plugin-organize-imports",
    "prettier-plugin-tailwindcss"
  ],
  "endOfLine": "lf",
  "printWidth": 120,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false,
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "overrides": [
    {
      "files": "*.scss, ./src/**/*.css",
      "options": {
        "singleQuote": false
      }
    }
  ]
}