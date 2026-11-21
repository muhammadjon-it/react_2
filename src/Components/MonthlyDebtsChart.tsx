"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import type { ChartConfig } from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartData = [
  { month: "Jan", lent: 0, borrowed: 0 },
  { month: "Feb", lent: 0, borrowed: 0 },
  { month: "Mar", lent: 0, borrowed: 0 },
  { month: "Apr", lent: 0, borrowed: 0 },
  { month: "May", lent: 0, borrowed: 0 },
  { month: "Jun", lent: 0, borrowed: 0 },
  { month: "Jul", lent: 0, borrowed: 0 },
  { month: "Aug", lent: 0, borrowed: 0 },
  { month: "Sep", lent: 0, borrowed: 0 },
  { month: "Oct", lent: 0, borrowed: 0 },
  { month: "Nov", lent: 200, borrowed: 550 },
  { month: "Dec", lent: 0, borrowed: 0 },
]

const chartConfig = {
  lent: {
    label: "Lent (Owed to me)",
    color: "#16a34a",
  },
  borrowed: {
    label: "Borrowed (I owe)",
    color: "#e11d48", 
  },
} satisfies ChartConfig

export function MonthlyDebtsChart() {
  const [year, setYear] = React.useState("2026")

  return (
    <Card className="w-full rounded-xl border bg-white shadow-sm">
      <CardHeader className="flex flex-col space-y-4 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-slate-800">
            Monthly Debts Overview
          </CardTitle>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="h-8 w-[85px] rounded-md border-slate-200 text-xs font-medium">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2027">2027</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-5 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#16a34a]" />
            <span>Lent (Owed to me)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e11d48]" />
            <span>Borrowed (I owe)</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 16,
              left: -16,
              right: 16,
              bottom: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              tickFormatter={(value) => `${value}k`}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />

            <Line
              dataKey="lent"
              type="monotone"
              stroke="var(--color-lent)"
              strokeOpacity={0.2}
              strokeWidth={2}
              dot={{
                fill: "var(--color-lent)",
                strokeOpacity: 1,
                r: 3,
              }}
              activeDot={{
                r: 5,
              }}
            />

            <Line
              dataKey="borrowed"
              type="monotone"
              stroke="var(--color-borrowed)"
              strokeOpacity={0.2}
              strokeWidth={2}
              dot={{
                fill: "var(--color-borrowed)",
                strokeOpacity: 1,
                r: 3,
              }}
              activeDot={{
                r: 5,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
