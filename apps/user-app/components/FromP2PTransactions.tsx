import { Center } from "@repo/ui/center"
import { Card } from "@repo/ui/card"
export function FromP2PTransactionsCard ({p2ptransactions}:{
     p2ptransactions :{
          amount : number ,
          fromUserId : number ,
          time : Date 
     }[]
}){
     if(!p2ptransactions.length){
          return <div className="ml-2"><Center>
               <Card title="Recently Debited Transactions">
                    <div className="pt-2 ">
                         No Recent Transactions
                    </div>
               </Card>
               </Center></div>
     }
     return <div className="">
          <Center>
               <Card title="Recently Debited Transactions">
                    <div className="pt-2">
                         {
                              p2ptransactions.map(t => <div className="flex justify-between">
                                   <div>
                                        <div className="text-sm">
                                        Received INR
                                        </div>
                                        <div className="text-slate-600 text-xs">
                                        {t.time.toDateString()}
                                        </div>
                                   </div>
                                   <div className="justify-center">
                                        + Rs {t.amount / 100}
                                   </div>
                                   </div>
                                    )
                         }

                    </div>
               </Card>
          </Center>

     </div>
}