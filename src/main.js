const { Telegraf } = require("telegraf");
const dotenv = require("dotenv");
const Jimp = require("jimp");
dotenv.config();
const bot = new Telegraf(process.env.token);
const chats = [];
bot.command("start", (ctx) => {
  //ctx.replyWithPhoto({ source: "src/Image-231061705.jpg" })
  ctx.reply(
    "Assalomu alaykum. Botimga xush  kelibsiz!!! Botda hozircha bitta tabrik rasm bor! \n Kimnidur tug'ilgan kuni bilan tabriklamoqchi bo'lsangiz, menga uning ismini yuboring"
  );
});
bot.on("text", (ctx) => {
  text = ctx.message.text;
  id = ctx.message.chat.id;
  Jimp.read(`http://happybirthdayname.com/imgbig/name_584854.jpg`)
    .then((image) => {
      Jimp.loadFont(Jimp.FONT_SANS_64_BLACK).then((font) => {
        image.print(font, 340, 230, text + "!");
        image.write(`src/images/${id}.jpg`);
      });
    })
    .then(() => {
      ctx.reply("Iltimos!!! \n Kuting...");
      setTimeout(() => {
        ctx.replyWithPhoto({ source: `src/images/${id}.jpg` });
      }, 5000);
    })
    .catch((err) => {
      console.error(err);
    });
});
bot.command("/stop", (ctx) => {
  chats.pop(ctx.chat.id);
});
console.log(process.env.token);
bot.launch();
