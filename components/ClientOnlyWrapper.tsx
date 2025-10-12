"use client"

import dynamic from "next/dynamic"

export const ClientProblems = dynamic(() => import("@/components/client-problems"), { ssr: false })
export const ImpactChart = dynamic(() => import("@/components/client-impact-chart"), { ssr: false })

export default function ClientOnlyWrapper() {
  return (
    <div>
      <ClientProblems />
      <ImpactChart />
    </div>
  )
}
