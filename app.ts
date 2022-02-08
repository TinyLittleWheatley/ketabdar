import { Telegraf } from 'telegraf'
import { BaseContoller } from './Controllers'
import middlewares, { CustomContext } from './Middlewares'
import fs from 'fs' 

const bot = new Telegraf<CustomContext>(String(process.env.BOT_TOKEN))
bot.use(...middlewares)
new BaseContoller(bot)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))