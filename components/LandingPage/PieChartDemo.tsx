"use client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { browser: "chrome", visitors: 50, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 80, fill: "var(--color-safari)" },
]

const chartConfig = {
  visitors: {
    label: "Github Commits ",
  },
  chrome: {
    label: "Github Commits",
    color: "hsl(var(--primary))",
  },
  safari: {
    label: "X posts ",
    color: "black",
  },
} satisfies ChartConfig

export function PieChartDemo({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className="items-center pb-0">
        <CardTitle>X posts vs GitHub Commits</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] gap-1 flex"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors" nameKey="browser" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
