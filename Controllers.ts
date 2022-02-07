import { Telegraf, Context, Middleware } from 'telegraf'
import { CustomContext } from './Middlewares'
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

class LibraryController extends Controller {

    constructor(bot: Telegraf) {
        super(bot);
        this.bot.command("borrow", this.borrow);
    }
    borrow(ctx: Context) {
        if (ctx.message && "text" in ctx.message)
            ctx.reply(ctx.message.text)
    }
}

export { BaseContoller }
