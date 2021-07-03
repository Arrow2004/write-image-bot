const { Telegraf } = require("telegraf");
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");
const dotenv = require("dotenv");
const Jimp = require("jimp");
const fs = require("fs");
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const User = require("./user").User;
const Admin = require("./user").Admin;
mongoose
  .connect(
    "mongodb+srv://root:shirina1708@cluster0.ufftb.mongodb.net/imageWrite?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.log(e);
  });
dotenv.config();
async function checkUserJoin(id, channel) {
  const res = await fetch(
    `https://api.telegram.org/bot${process.env.token}/promoteChatMember?chat_id=@${channel}&user_id=${id}`
  );
  const javob = await res.json();
  return javob.ok && javob.result;
}
async function deleteUser(iD) {
  const result = await User.findByIdAndRemove({ id: iD });
  console.log(result);
}
async function checkUser(newId) {
  const user = await User.find({
    id: newId,
  });
  return user[0] !== undefined;
}
async function createUser(userObj) {
  const user = new User(userObj);
  const saveUser = await user.save();
  console.log(saveUser);
}
async function createAdmin(adminObj) {
  const admin = new Admin(adminObj);
  const saveAdmin = await admin.save();
  console.log(saveAdmin);
}
async function readDb() {
  const users = await User.find();
  const usersId = users.map((e) => e.id);
  return [users.length, usersId];
}
async function readDbAdmins() {
  const admins = await Admin.find();
  adminsId = admins.map((elem) => elem.id);
  return adminsId;
}
const bot = new Telegraf(process.env.token);
bot.command("start", async (ctx) => {
  const newUser = {
    id: ctx.chat.id,
    firstName: ctx.chat.first_name,
    lastName: ctx.chat.last_name,
    userName: ctx.chat.username,
    inviteLink: `tg://user?id=${ctx.chat.id}`,
    userType: ctx.chat.type,
  };
  await ctx.replyWithHTML(
    `Assalomu alaykum <a href="${newUser.inviteLink}">${newUser.firstName}</a>. Botimga xush  kelibsiz!!! Botda hozircha bitta tabrik rasm bor! 
    Kimnidur tug'ilgan kuni bilan tabriklamoqchi bo'lsangiz, menga uning ismini quyidagi buyruq yordamida yuboring
    /birthday Akbar
    Bot haqidagi fikrlar uchun: @arrow_2004
    Kuzatib boring: @akbarcoder`
  );
  if (!(await checkUserJoin(ctx.chat.id, "akbarcoder"))) {
    await ctx.reply(
      `Agarda bot sizga manzur kelgan bo'lsa quyidagi kanallarga a'zo bo'lishingizni so'rayman.
      @akbarcoder - Shaxsiy blog
      @izlanvarivojlan - ITga oid ma'lumotlar, foydali maqola va yangiliklar, shaxsiy qarashlar😊
      Bu sizga ortiqcha noqulayliklar tug'ilishining oldini olishi mumkin!!!
      P.S: Majburiy emas, shunchaki qo'llab quvvatlashni xoxlaganlar uchun!!!`
    );
  }
  if (!(await checkUser(newUser.id))) {
    createUser(newUser);
    ctx.telegram.sendMessage(
      "871447523",
      `Botda yangi foydalanuvchi:
      Ismi:  <a href="${newUser.inviteLink}">${newUser.firstName}</a>
      Familyasi: ${newUser.lastName}
      Foydalanuvchi nomi: ${newUser.userName}
      ID: ${newUser.id}
    `,
      Extra.HTML()
    );
  }
  console.log(newUser);
});
bot.command("stat", async (ctx) => {
  let len = await readDb();
  ctx.reply(`Assalomu laykum botdagi foydalanuvchilar soni: ${len[0]}`);
  if (!(await checkUserJoin(ctx.chat.id, "akbarcoder"))) {
    await ctx.reply(
      `Agarda bot sizga manzur kelgan bo'lsa quyidagi kanallarga a'zo bo'lishingizni so'rayman.
      @akbarcoder - Shaxsiy blog
      @izlanvarivojlan - ITga oid ma'lumotlar, foydali maqola va yangiliklar, shaxsiy qarashlar😊
      Bu sizga ortiqcha noqulayliklar tug'ilishining oldini olishi mumkin!!!
      P.S: Majburiy emas, shunchaki qo'llab quvvatlashni xoxlaganlar uchun!!!`
    );
  }
});
bot.on("text", async (ctx) => {
  text = ctx.message.text;
  if (!(await checkUserJoin(ctx.chat.id, "akbarcoder"))) {
    await ctx.reply(
      `Agarda bot sizga manzur kelgan bo'lsa quyidagi kanallarga a'zo bo'lishingizni so'rayman.
      @akbarcoder - Shaxsiy blog
      @izlanvarivojlan - ITga oid ma'lumotlar, foydali maqola va yangiliklar, shaxsiy qarashlar😊
      Bu sizga ortiqcha noqulayliklar tug'ilishining oldini olishi mumkin!!!
      P.S: Majburiy emas, shunchaki qo'llab quvvatlashni xoxlaganlar uchun!!!`
    );
  }
  if (text.slice(1, 9) == "birthday") {
    text = text.slice(10);
    id = ctx.message.chat.id;
    await ctx.replyWithMediaGroup([
      {
        media: "http://happybirthdayname.com/imgbig/name_584854.jpg",
        caption: "Quyidagi rasmlardan birini tanlang!!!",
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
  if (text.slice(1, 9) == "newAdmin" && ctx.chat.id == 871447523) {
    text = text.slice(10);
    createAdmin({ id: text });
  }
});
bot.on("photo", async (ctx) => {
  adminsId = await readDbAdmins();
  usersId = await readDb();
  let id = "" + ctx.chat.id;
  if (adminsId.includes(id))
    usersId[1].forEach((userID) => {
      ctx.telegram.forwardMessage(
        userID,
        ctx.message.from.id,
        ctx.message.message_id
      );
    });
});
bot.action("first_image", async (ctx) => {
  async function writeImage() {
    let image = await Jimp.read(
      `http://happybirthdayname.com/imgbig/name_584854.jpg`
    );
    const font = await Jimp.loadFont("src/fonts/Benne-Regular.ttf.fnt");
    var w = image.bitmap.width;
    var h = image.bitmap.height;
    var textWidth = Jimp.measureText(font, text);
    var textHight = Jimp.measureTextHeight(font, text);
    coordY = 190;
    if (text.includes(" ")) {
      coordY = 240;
    }
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
    await ctx.reply(
      "Iltimos!!! \nKuting rasm tayyorlanmoqda... \n Agar kiritgan ismingiz 2 ta so'zdan iborat bo'lsa rasm dizayni buziladi!!! \n Noqulaylik uchun uzur!!!"
    );
    await ctx.replyWithPhoto({ source: `src/images/${id}.jpg` });
    fs.unlink(`src/images/${id}.jpg`, function (err) {
      if (err) return console.log(err);
      console.log("file deleted successfully");
    });
  }
  writeImage();
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
    await ctx.reply("Iltimos!!! \nKuting rasm tayyorlanmoqda...");
    await ctx.replyWithPhoto({ source: `src/images/${id}.jpg` });
    await fs.unlink(`src/images/${id}.jpg`, function (err) {
      if (err) return console.log(err);
      console.log("file deleted successfully");
    });
  }
  writeImage();
});
console.log(process.env.token);
bot.launch();
