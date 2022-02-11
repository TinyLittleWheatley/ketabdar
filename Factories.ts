import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
prisma.book.deleteMany()
for (let i = 0; i < 5; i++)
    prisma.book.create({ data: { title: `Book ${i}`, author: `author` } }).then(console.log)