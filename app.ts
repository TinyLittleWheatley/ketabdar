import { Telegraf, Telegram } from 'telegraf'
import { BaseContoller, LibraryController  } from './Controllers'
import middlewares, { CustomContext } from './Middlewares'
import agent from './Proxy'

const bot = new Telegraf<CustomContext>(String(process.env.BOT_TOKEN), {telegram:{agent:agent}})
bot.use(...middlewares)
new BaseContoller(bot)
new LibraryController(bot)
bot.launch()
console.log("started!")

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))