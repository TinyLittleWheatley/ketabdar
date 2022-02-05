const { Telegraf } = require('telegraf')
const { PrismaClient } = require('@prisma/client')
const { BaseContoller } = require('./Controller')

const bot = new Telegraf(process.env.BOT_TOKEN)
new BaseContoller(bot)
bot.launch()

const prisma = new PrismaClient()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))