"use client"
import { Card } from "@repo/ui/card"



export const P2PTransactions=({
    transactions
}:{
    transactions: {
        time : Date,
        amount : number
    }[]
})=>{
    if(!transactions.length){
        return <Card title="Recent Transactions">
       <div className="text-center pv-8 pt-8">
        No Recent Transactions
       </div>
        </Card>
    }
    return(
        <Card title="Recent Transactions">
        <div className="pt-2">
       {transactions.map(t=> <div className="flex justify-between">
        <div>
            <div className="text-sm">
             Transferres in INR
            </div>
            <div className="text-slate-600 text-xs">
             {t.time.toDateString()}
            </div>
        </div>
        <div className="flex flex-col justify-center">
         RS {t.amount/100}
        </div>
        </div>
        )}
        </div>
        </Card>
    )
}