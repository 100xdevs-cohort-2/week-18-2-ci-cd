import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "./lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  //we are getting the user credentials of the person that is logged in 

  if (session?.user) {
    console.log("user logged in",session?.user)
    redirect('/dashboard')
    //navigating to the dashboard path
  } else {
    redirect('/api/auth/signin')
  }
}
