const fs = require('fs');
const path = require('path');

// Kuzatilayotgan CSS fayllar va mos HTML fayllar
const fileMapping = [
  {
    cssFile: path.join(__dirname, 'css', 'index.css'),
    htmlFile: path.join(__dirname, 'index.html')
  },
  {
    cssFile: path.join(__dirname, 'css', 'telegram.css'),
    htmlFile: path.join(__dirname, 'telegram.html')
  }
];

// Style tagini yangilash funksiyasi
function updateStyleTag(cssContent, htmlFile) {
  // HTML faylni o'qish
  fs.readFile(htmlFile, 'utf8', (err, htmlContent) => {
    if (err) {
      console.error(`${htmlFile} faylini o'qishda xatolik:`, err);
      return;
    }

    // Style tagini topish va yangilash
    const styleRegex = /(<style>)[\s\S]*?(<\/style>)/;

    if (styleRegex.test(htmlContent)) {
      // Agar style tegi mavjud bo'lsa, uni yangilash
      const updatedHtml = htmlContent.replace(styleRegex, `$1\n${cssContent}\n$2`);

      // Yangilangan HTML faylini saqlash
      fs.writeFile(htmlFile, updatedHtml, 'utf8', (err) => {
        if (err) {
          console.error(`${htmlFile} faylini yozishda xatolik:`, err);
          return;
        }
        console.log(`${path.basename(htmlFile)} faylidagi style tegi yangilandi.`);
      });
    } else {
      // Agar style tegi mavjud bo'lmasa, head tagiga qo'shish
      const headEndRegex = /<\/head>/;
      if (headEndRegex.test(htmlContent)) {
        const updatedHtml = htmlContent.replace(
          headEndRegex,
          `<style>\n${cssContent}\n</style>\n</head>`
        );

        fs.writeFile(htmlFile, updatedHtml, 'utf8', (err) => {
          if (err) {
            console.error(`${htmlFile} faylini yozishda xatolik:`, err);
            return;
          }
          console.log(`${path.basename(htmlFile)} fayliga style tegi qo'shildi.`);
        });
      } else {
        console.error(`${htmlFile} faylida head tegi topilmadi.`);
      }
    }
  });
}

// CSS faylini o'qish va tegishli HTML fayldagi style tagini yangilash
function updateStyleInHtmlFile(cssFile, htmlFile) {
  fs.readFile(cssFile, 'utf8', (err, cssContent) => {
    if (err) {
      console.error(`${cssFile} faylini o'qishda xatolik:`, err);
      return;
    }

    updateStyleTag(cssContent, htmlFile);
  });
}

// Dastlab barcha fayllarni bir marta yangilash
fileMapping.forEach(mapping => {
  updateStyleInHtmlFile(mapping.cssFile, mapping.htmlFile);
});

// Har bir CSS faylini kuzatish
fileMapping.forEach(mapping => {
  console.log(`${mapping.cssFile} faylini kuzatish boshlandi...`);

  fs.watch(mapping.cssFile, (eventType) => {
    if (eventType === 'change') {
      console.log(`${path.basename(mapping.cssFile)} fayli o'zgartirildi, ${path.basename(mapping.htmlFile)} faylni yangilash...`);
      // O'zgartirish sodir bo'lgandan so'ng ozgina kutish (fayl to'liq yozilishi uchun)
      setTimeout(() => {
        updateStyleInHtmlFile(mapping.cssFile, mapping.htmlFile);
      }, 100);
    }
  });
});
