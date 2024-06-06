"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) {
        return {
            message: "Error while sending"
        }
    }
    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });

    if (!toUser) {
        return {
            message: "User not found"
        }
    }
    await prisma.$transaction(async (tx: { $queryRaw: any; balance: { findUnique: (arg0: { where: { userId: number; }; }) => any; update: (arg0: { where: { userId: number; } | { userId: any; }; data: { amount: { decrement: number; }; } | { amount: { increment: number; }; }; }) => any; }; p2pTransfer: { create: (arg0: { data: { fromUserId: number; toUserId: any; amount: number; timestamp: Date; }; }) => any; }; }) => {
           await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

          const fromBalance = await tx.balance.findUnique({
            where: { userId: Number(from) },
          });
          if (!fromBalance || fromBalance.amount < amount) {
            throw new Error('Insufficient funds');
          }

          await tx.balance.update({
            where: { userId: Number(from) },
            data: { amount: { decrement: amount } },
          });

          await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } },
          });

          await tx.p2pTransfer.create({
            data: {
                fromUserId: Number(from),
                toUserId: toUser.id,
                amount,
                timestamp: new Date()
            }
          })
          // locking
    });
}