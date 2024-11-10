module.exports = {
  printWidth: 100, // Satır uzunluğunu 100 karaktere ayarlar
  parser: 'typescript', // TypeScript kullanıyorsanız bunu kullanın
  semi: false, // Satır sonlarında noktalı virgül kullanmaz
  singleQuote: true, // Tek tırnak ('') kullanır
  trailingComma: 'all', // Tüm nesne ve dizi öğelerinin sonuna virgül ekler
  arrowParens: 'avoid', // Tek parametreli ok fonksiyonlarında parantezleri kullanmaz
  importOrder: ['^[./]'], // Import sırasını proje içi dosyalar ve kütüphaneler arasında düzenler
  importOrderSortSpecifiers: true, // Import edilen öğeleri alfabetik sıralar
}
