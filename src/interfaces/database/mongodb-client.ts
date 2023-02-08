import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dbClient = prisma;
export const connect = async () => await prisma.$connect();
export const disconnect = async () => await prisma.$disconnect();
