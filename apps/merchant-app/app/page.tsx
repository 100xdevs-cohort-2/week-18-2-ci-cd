"use client";

import { useBalance } from "@repo/store/balance";

export default function() {
  const balance = useBalance();
  return <div>
    hello there {balance}
  </div>
}