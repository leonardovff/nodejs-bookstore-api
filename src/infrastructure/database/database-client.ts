import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const dbClient = prisma;
export default dbClient;
export const connect = async () => await prisma.$connect();
export const disconnect = async () => await prisma.$disconnect();
