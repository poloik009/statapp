import type React from "react"
import { Card } from "@/components/ui/card"

type StatsCardProps = {
  label: string
  value: string | number
  icon?: React.ReactNode
}

export function StatsCard({ label, value, icon }: StatsCardProps) {
  return (
    <Card className="p-6 flex flex-col items-center justify-center gap-3 bg-card border-border/50 hover:border-primary/30 transition-colors">
      {icon && <div className="text-primary">{icon}</div>}
      <div className="text-3xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </Card>
  )
}
