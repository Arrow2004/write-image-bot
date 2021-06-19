const Jimp = require("jimp");
const fs = require("fs");
Jimp.read(`http://happybirthdayname.com/imgbig/name_584854.jpg`)
  .then((image) => {
    Jimp.loadFont(Jimp.FONT_SANS_64_BLACK).then((font) => {
      image.print(font, 340, 230, "Akbar!");
      image.write(`src/images/871447523.jpg`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
