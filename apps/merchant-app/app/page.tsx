"use client";

import { useBalance } from "@repo/store/balance";




export default function() {
  const balance = useBalance();
  return <div>
    hi bro here is your balance {balance}
  </div>
}