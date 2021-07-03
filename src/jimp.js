const Jimp = require("jimp");
const fs = require("fs");
async function writeImage(text) {
  let id = 212121;
  let image = await Jimp.read(
    `http://happybirthdayname.com/imgbig/name_584854.jpg`
  );
  const font = await Jimp.loadFont("src/fonts/Benne-Regular.ttf.fnt");
  coordY = 190;
  if (text.includes(" ")) {
    coordY = 240;
  }
  var w = image.bitmap.width;
  var h = image.bitmap.height;
  var textWidth = Jimp.measureText(font, text);
  var textHight = Jimp.measureTextHeight(font, text);
  image.print(
    font,
    w / 2 - textWidth / 2,
    coordY,
    {
      text: text + "!",
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      //alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
    },
    textWidth,
    textHight
  );
  await image.write(`src/images/${id}.jpg`);
  console.log("OK");
}
writeImage("Akbar Coder");
