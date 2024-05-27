import { SendCard } from "../../../components/SendCard";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { ToP2PTransactionsCard } from "../../../components/ToP2PTransactions";
import { FromP2PTransactionsCard } from "../../../components/FromP2PTransactions";
     async function getToP2PTransactions(){
     const session = await getServerSession(authOptions);
     const userId = session?.user?.id ;
          const txns = await prisma.p2pTransfer.findMany({
               where : {
                    fromUserId : Number(userId)
               },
               orderBy: {
                    timestamp: 'desc',
                },
                take: 2,
          })
          
              return txns.map(t=>({
               amount : t.amount ,
               toUserId : t.toUserId,
               time : t.timestamp
              }))    
          
     }
     async function getFromP2PTransactions(){
          const session = await getServerSession(authOptions);
          const txns = await prisma.p2pTransfer.findMany({
               where : {
                    toUserId : Number(session?.user?.id)
               },
               orderBy: {
                    timestamp: 'desc',
                },
                take: 2,

          })
          return txns.map(t => ({
               amount : t.amount,
               fromUserId : t.fromUserId,
               time : t.timestamp
          }))
     }
export default async function (){
     const txns = await getToP2PTransactions() ;
     const Fromtxns =  await getFromP2PTransactions();
     return (
          <div className="w-full flex justify-center">
               <SendCard></SendCard>
               <div className="flex flex-col items-center justify-center space-y-4">
               <ToP2PTransactionsCard p2ptransactions={txns}/>
               <FromP2PTransactionsCard p2ptransactions={Fromtxns}/>
               </div>
               
          </div>
     )
}