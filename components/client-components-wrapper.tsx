'use client'

import dynamic from 'next/dynamic'

const ClientProblems = dynamic(() => import("@/components/client-problems"), { ssr: false })
const ImpactChart = dynamic(() => import("@/components/client-impact-chart"), { ssr: false })

export default function ClientOnlyWrapper() {
  return (
    <>
      <ClientProblems />
      <ImpactChart />
    </>
  )
}