import { Telegraf, Context } from 'telegraf'

class Controller {
    bot: Telegraf;
    constructor(bot: Telegraf) {
        this.bot = bot;
    }
}

class BaseContoller extends Controller {
    constructor(bot: Telegraf) {
        super(bot);
        bot.start(this.start);
        bot.help(this.help);
    }
    start(ctx: Context) {
        ctx.reply('Welcome');
    }
    help(ctx: Context) {
        ctx.reply('Send me a sticker');
    }
}

export = {BaseContoller}