import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json());


app.get("/",(req,res)=>{
    console.log(`app running on port ${3001}`)
    return res.json({
        "mess":"server working fine"
    })
})

interface paymentInformationType {
    token : string,
    userId: number,
    amount : number
}

//bank will hit this endpoint to update the user balance wallet
app.post("/hdfcWebhook",async(req,res)=>{

    try{

        const paymentInformation : paymentInformationType = {
            token : req.body.token,
            userId : req.body.userId,
            amount : req.body.amount
        }

        const userData = await db.user.findUnique({
            where:{
                id:paymentInformation.userId
            },
            include:{
                Balance:true ,
                OnRampTransaction:true
            }
        })

if(userData?.Balance.length === 0){
        //using transactions to do 2 db query in single request so that if 1 fail 2nd also fail's 
        await db.$transaction([

            db.balance.create({
               data:{
                userId:paymentInformation.userId,
                   amount:paymentInformation.amount,
                   locked:0
               }
           }),
       
           db.onRampTransaction.updateMany({
               where:{
                   token: String(paymentInformation.token)
               },
               data:{
                   status:"Success"
               }
           })
       ])

     return  res.status(200).json({
           mess:"req captured and updated"
       })
}
else{
        //using transactions to do 2 db query in single request so that if 1 fail 2nd also fail's 
        await db.$transaction([
            // updating balance not creating for the one having balance none
            //the prisma will throw error saying no records found
            db.balance.updateMany({
               where:{
                   userId: Number(paymentInformation.userId)
               },
               data:{
                   amount:{
                       increment: Number(paymentInformation.amount)
                   }
               }
           }),
       
           db.onRampTransaction.updateMany({
               where:{
                   token: String(paymentInformation.token)
               },
               data:{
                   status:"Success"
               }
           })
       ])

     return  res.status(200).json({
           mess:"req captured and updated"
       })
}  }
    catch(e){
        console.log(e);
      return  res.status(411).json({
            mess:"internal server error",
        })
    }
})

app.listen(3003);



