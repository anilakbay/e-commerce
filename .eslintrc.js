module.exports = {
  root: true,
  extends: [
    'plugin:@next/next/recommended', // Next.js için önerilen ayarlar
    '@payloadcms', // PayloadCMS için önerilen ayarlar
    'prettier', // Prettier ile uyumlu olmasını sağlar
  ],
  plugins: [
    'prettier', // Prettier plugin'i
    'simple-import-sort', // Import sıralaması için plugin
  ],
  ignorePatterns: ['**/payload-types.ts'], // Belirli dosyalar için ESLint'i devre dışı bırak
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }], // Prettier hatalarını gösterir
    'no-console': 'off', // Konsol kullanımını engellemez
    'simple-import-sort/imports': 'error', // Import sıralamasını kontrol eder
    'simple-import-sort/exports': 'error', // Export sıralamasını kontrol eder
  },
}
