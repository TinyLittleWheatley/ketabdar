import { Prisma, PrismaClient, User, Book } from '@prisma/client'
import { Context } from 'telegraf';
import CONSTS from './Constants';
const prisma = new PrismaClient();

class BaseManager{
    id:number;
    constructor(id:number){
        this.id=id
    }
}
class UserManager extends BaseManager{
    static async register(data: User) {
        return prisma.user.create({ data: data });
    }
    static async exists(id: number) {
        return Boolean(await prisma.user.count({ where: { id: id } }));
    }

    // set name(value: string) {
    //     prisma.user.update({
    //         where: { id: this.id },
    //         data: { name: value },
    //     });
    // }
    get data() {
        return prisma.user.findFirst({
            where: { id: this.id },
        });
    }
    get books() {
        return prisma.book.findMany({ where: { userId: this.id } });
    }
}

class BookManager extends BaseManager{
    async reserve(user:UserManager){
        if((await this.data)?.userId!==null)
            throw 'the book isnt available'
        if((await user.books).length>=CONSTS.MAX_LOANED_BOOKS)
            throw 'too many loaned books'
        this.loan=user.id
        
    }
    get data(){
        return prisma.book.findFirst({
            where:{id:this.id},
        })
    }
    set loan(userId:number){
        prisma.book.update({
            where:{id:this.id},
            data:{userId:userId}
        })
    }
}

export { UserManager, BookManager };