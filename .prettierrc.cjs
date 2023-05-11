/**
 * @type {import('prettier').Options}
 */
module.exports = {
  printWidth: 160,
  tabWidth: 2,
  arrowParens: 'avoid',
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: true,
  plugins: [require.resolve('@plasmohq/prettier-plugin-sort-imports')],
  importOrder: ['^@plasmohq/(.*)$', '^~(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
