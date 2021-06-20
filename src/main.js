const { Telegraf } = require("telegraf");
const dotenv = require("dotenv");
const Jimp = require("jimp");
const fs = require("fs");
dotenv.config();
const bot = new Telegraf(process.env.token);
const chats = [];
bot.command("start", (ctx) => {
  //ctx.replyWithPhoto({ source: "src/Image-231061705.jpg" })
  ctx.reply(
    `Assalomu alaykum. Botimga xush  kelibsiz!!! Botda hozircha bitta tabrik rasm bor! 
    Kimnidur tug'ilgan kuni bilan tabriklamoqchi bo'lsangiz, menga uning ismini quyidagi buyruq yordamida yuboring
    /birthday Akbar
    Bot haqidagi fikrlar uchun: @arrow_2004
    Kuzatib boring: @akbarcoder`
  );
});
bot.on("text", (ctx) => {
  text = ctx.message.text;
  if (text.slice(1, 9) == "birthday") {
    text = text.slice(10);
    id = ctx.message.chat.id;
    Jimp.read(`http://happybirthdayname.com/imgbig/name_584854.jpg`)
      .then((image) => {
        Jimp.loadFont("src/fonts/Benne-Regular.ttf.fnt").then((font) => {
          var w = image.bitmap.width;
          var h = image.bitmap.height;
          var textWidth = Jimp.measureText(font, text);
          var textHight = Jimp.measureTextHeight(font, text);
          image.print(
            font,
            w / 2 - textWidth / 2,
            190,
            {
              text: text + "!",
              //alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
              //alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
            },
            textWidth,
            textHight
          );
          image.write(`src/images/${id}.jpg`);
        });
      })
      .then(() => {
        ctx.reply("Iltimos!!! \n Kuting 1-rasm tayyorlanmoqda...");
        setTimeout(() => {
          ctx.replyWithPhoto({ source: `src/images/${id}.jpg` });
        }, 5000);
      })
      .catch((err) => {
        console.error(err);
      });
    Jimp.read(`http://happybirthdayname.com/imgbig/name_584842.jpg`)
      .then((image) => {
        Jimp.loadFont("src/fonts/Bangers-Regular.ttf.fnt").then((font) => {
          var w = image.bitmap.width;
          var h = image.bitmap.height;
          var textWidth = Jimp.measureText(font, text);
          var textHight = Jimp.measureTextHeight(font, text);
          image.print(
            font,
            90,
            140,
            {
              text: text,
              //alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
              //alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
            },
            textWidth,
            textHight
          );
          image.write(`src/images/${id}-2.jpg`);
        });
      })
      .then(() => {
        ctx.reply("2-rasm tayyorlanmoqda...");
        setTimeout(() => {
          ctx.replyWithPhoto({ source: `src/images/${id}-2.jpg` });
        }, 5000);
      })
      .catch((err) => {
        console.error(err);
      });
  }
});
console.log(process.env.token);
bot.launch();
