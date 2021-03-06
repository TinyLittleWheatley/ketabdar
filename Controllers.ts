import { prisma } from '@prisma/client';
import { Telegraf, Context, Middleware } from 'telegraf'
import { CustomContext } from './Middlewares'
import { BookManager } from './Managers'

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
        this.bot.command("search", this.search);
    }
    borrow(ctx: CustomContext) {
        if (!ctx.user)
            return
        if (ctx.message && "text" in ctx.message) {
            let bookId = Number(ctx.message.text.split(' ')[1])
            new BookManager(bookId).reserve(ctx.user).then(() => ctx.reply('done!')).catch((e) => ctx.reply(e))
        }
    }
    async search(ctx: CustomContext) {
        if (!ctx.user)
            return
        if (ctx.message && "text" in ctx.message) {
            let queries = ctx.message.text.split(' ').slice(1)
            let result = await BookManager.serach(queries)
            ctx.reply(result.reduce(((accumulator: string, curr: any):string=> accumulator + JSON.stringify(curr)), "" as string))
        }
    }
}

export { BaseContoller, LibraryController }
