import { MiddlewareFn, Context } from 'telegraf'
import { UserManager } from './Managers'

export interface CustomContext extends Context {
    user?: UserManager
}

let middlewares: Array<MiddlewareFn<CustomContext>> = [
    async function logger(ctx, next) {
        next()
        if (ctx.message && "text" in ctx.message)
            console.log(`${ctx.from?.username}: ${ctx.message.text}`)
        else
            console.log(`${ctx.from?.username}: ${ctx.updateType}`)
    },
    async function user_manager_middleware(ctx, next) {
        if (ctx.from)
            ctx.user = new UserManager(ctx.from.id);
        else
            ctx.reply("from is undefined.")
        next()
    },
]


export default middlewares