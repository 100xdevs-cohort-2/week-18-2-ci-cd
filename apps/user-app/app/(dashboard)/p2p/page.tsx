import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";
import { P2PTransactions } from "../../../components/P2PTransaction";


async function getP2PTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.p2pTransfer.findMany({
      where: {
          fromUserId: Number(session?.user?.id)
      }
  });
  return txns.map((t: { timestamp: Date; amount: number; }) => ({
      time: t.timestamp,
      amount: t.amount
  }))
}

export default async function Home() {
  const transactions=await getP2PTransactions();

  return (
    <>
      <div className="relative items-center min-h-screen">
        P2P
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div className="mt-10 w-full relative left-1/2  border border-slate-400">
          <SendCard />
        </div>
        <div className="bg-white mt-10 w-full relative left-1/2  border border-slate-400">
          <P2PTransactions transactions={transactions}/>
        </div>
      </div>
        </div>
    </>
  );
}
