import { Card } from "@repo/ui/card"
import { Center } from "@repo/ui/center"
export const ToP2PTransactionsCard = ({
    p2ptransactions
}: {
     p2ptransactions: {
        time: Date,
        amount: number,
        
        toUserId : number 
    }[]
}) => {
    if (!p2ptransactions.length) {
        return <div><Center> 
        <Card title="Recently Credited Transactions">
            <div className="text-center pb-8 pt-8 ">
                No Recent transactions
            </div>
        </Card></Center></div>
    }
    return <div className="">
    <Center>
    <Card title="Recent Credited Transactions">
        <div className="pt-2">
            {p2ptransactions.map(t => <div className="flex justify-between">
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

            </div>)}
        </div>
    </Card>
    </Center></div>
}