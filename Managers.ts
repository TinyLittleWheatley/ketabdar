import { Prisma, PrismaClient, User, Book } from '@prisma/client'

const prisma = new PrismaClient();

class UserManager {
    static async register(data: User) {
        return prisma.user.create({ data: data });
    }
    static async exists(id: number) {
        return Boolean(await prisma.user.count({ where: { id: id } }));
    }

    id: number;

    // set name(value: string) {
    //     prisma.user.update({
    //         where: { id: this.id },
    //         data: { name: value },
    //     });
    // }

    constructor(id: number) {
        this.id = id;
    }
    get data() {
        return prisma.user.findFirst({
            where: { id: this.id },
        });
    }
    get books() {
        return prisma.book.findMany({ where: { userId: this.id } });
    }
}


export { UserManager };