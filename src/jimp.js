const Jimp = require("jimp");
const fs = require("fs");
Jimp.read(`http://happybirthdayname.com/imgbig/name_584842.jpg`)
  .then((image) => {
    Jimp.loadFont(Jimp.FONT_SANS_64_BLACK).then((font) => {
      var w = image.bitmap.width;
      var h = image.bitmap.height;
      let text = "Abdurashid";
      var textWidth = Jimp.measureText(font, text);
      var textHight = Jimp.measureTextHeight(font, text);
      image.print(
        font,
        80,
        120,
        {
          text: text,
          //alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          //alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
        },
        textWidth,
        textHight
      );
      image.write(`src/images/871447523-2.jpg`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
