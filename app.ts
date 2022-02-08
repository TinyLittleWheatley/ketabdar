import { Telegraf } from 'telegraf'
import { BaseContoller } from './Controllers'
import middlewares, { CustomContext } from './Middlewares'
import fs from 'fs' 

const bot = new Telegraf<CustomContext>(String(process.env.BOT_TOKEN))
bot.use(...middlewares)
new BaseContoller(bot)

// Set telegram webhook
bot.telegram.setWebhook('http://NnbyO-40499.portmap.host:40499')
bot.launch({webhook:{port:3000}})
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))