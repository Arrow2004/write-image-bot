const { Telegraf } = require("telegraf");
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");
const dotenv = require("dotenv");
const Jimp = require("jimp");
dotenv.config();
const bot = new Telegraf(process.env.token);
var users = { usersInfo: [], ids: [] };
bot.command("start", async (ctx) => {
  newUser = {
    id: ctx.chat.id,
    firstName: ctx.chat.first_name,
    lastName: ctx.chat.last_name,
    userName: ctx.chat.username,
    inviteLink: ctx.chat.invite_link,
    userType: ctx.chat.type,
  };
  await ctx.reply(
    `Assalomu alaykum. Botimga xush  kelibsiz!!! Botda hozircha bitta tabrik rasm bor! 
    Kimnidur tug'ilgan kuni bilan tabriklamoqchi bo'lsangiz, menga uning ismini quyidagi buyruq yordamida yuboring
    /birthday Akbar
    Bot haqidagi fikrlar uchun: @arrow_2004
    Kuzatib boring: @akbarcoder`
  );
  if (users.ids.indexOf(newUser.id) == -1) {
    users.usersInfo.push(newUser);
    users.ids.push(newUser.id);
    console.log(users);
  }
  ctx.telegram.sendMessage(
    "871447523",
    `Botda yangi foydalanuvchi:
    Ismi: ${newUser.firstName}
    Familyasi: ${newUser.lastName}
    Foydalanuvchi nomi: ${newUser.userName}
    ID: ${newUser.id}
  `
  );
  console.log(newUser);
});
bot.command("stat", (ctx) => {
  ctx.reply(
    `Assalomu laykum botdagi foydalanuvchilar soni: ${users.ids.length}`
  );
});
bot.on("text", async (ctx) => {
  text = ctx.message.text;
  if (text.slice(1, 9) == "birthday") {
    text = text.slice(10);
    id = ctx.message.chat.id;
    await ctx.replyWithMediaGroup([
      {
        media: "http://happybirthdayname.com/imgbig/name_584854.jpg",
        caption: "From URL",
        type: "photo",
      },
      {
        media: "http://happybirthdayname.com/imgbig/name_584842.jpg",
        type: "photo",
      },
    ]);
    ctx.replyWithMarkdown(
      "Rasmlardan birini tanlang:",
      Extra.markup((m) =>
        m.inlineKeyboard([
          m.callbackButton("1", "first_image"),
          m.callbackButton("2", "second_image"),
        ])
      )
    );
  }
});
bot.action("first_image", (ctx) => {
  async function writeImage() {
    let image = await Jimp.read(
      `http://happybirthdayname.com/imgbig/name_584854.jpg`
    );
    const font = await Jimp.loadFont("src/fonts/Benne-Regular.ttf.fnt");
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
    await image.write(`src/images/${id}.jpg`);
    ctx.reply("Iltimos!!! \nKuting rasm tayyorlanmoqda...");
    ctx.replyWithPhoto({ source: `src/images/${id}.jpg` });
  }
});
bot.action("second_image", (ctx) => {
  async function writeImage() {
    let image = await Jimp.read(
      `http://happybirthdayname.com/imgbig/name_584842.jpg`
    );
    const font = await Jimp.loadFont("src/fonts/Bangers-Regular.ttf.fnt");
    var w = image.bitmap.width;
    var h = image.bitmap.height;
    var textWidth = Jimp.measureText(font, text);
    var textHight = Jimp.measureTextHeight(font, text);
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
    await image.write(`src/images/${id}.jpg`);
    ctx.reply("Iltimos!!! \nKuting rasm tayyorlanmoqda...");
    ctx.replyWithPhoto({ source: `src/images/${id}.jpg` });
  }
  writeImage();
});
console.log(process.env.token);
bot.launch();
