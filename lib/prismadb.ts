import { PrismaClient } from "@prisma/client";

// this is added to add the var prisma to globalThis
declare global {
    var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();

// if we initialize prisma next 13 will create multiple instances of prisma causing a memory leak and errors
if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = prismadb;
};

export default prismadb;