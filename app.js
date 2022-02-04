const { Telegraf } = require('telegraf')
const { PrismaClient } = require('@prisma/client')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there', ))
bot.launch()



const prisma = new PrismaClient()

async function f(){

  const newUser = await prisma.user.create({
    data: {
      name: 'Alice',
    },
  })
  
  console.log(await prisma.user.findMany())
  
}

f()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))