'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Activity } from 'lucide-react';
import { useMemo } from 'react';

const generateChartData = () => {
    const data = [];
    for (let i = 5; i >= 0; i--) {
        const minutes = i * 5;
        const date = new Date(Date.now() - minutes * 60 * 1000);
        const speed = 90 + Math.random() * 30;
        data.push({
            time: `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`,
            speed: Math.floor(speed),
        });
    }
    return data;
}


const chartConfig = {
  speed: {
    label: 'Speed (Mbps)',
    color: 'hsl(var(--primary))',
  },
};

export default function SpeedChart({ isConnected }: { isConnected: boolean }) {
  const chartData = useMemo(() => {
    return generateChartData();
  }, []);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle>Live Speed</CardTitle>
            <Activity className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>A real-time view of your connection performance.</CardDescription>
      </CardHeader>
      <CardContent className="relative flex-1">
        <div className="h-full w-full">
            <ChartContainer config={chartConfig} className="h-full w-full">
            <LineChart
                data={isConnected ? chartData : []}
                margin={{
                left: -10,
                right: 20,
                top: 5,
                bottom: 5,
                }}
            >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                    dataKey="time"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                    domain={[60, 140]}
                    width={35}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent 
                        indicator="line" 
                        nameKey="speed" 
                        hideLabel 
                        formatter={(value) => `${value} Mbps`}
                        />}
                />
                <Line
                    dataKey="speed"
                    type="monotone"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={true}
                    activeDot={{ r: 6, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--card))' }}
                />
            </LineChart>
            </ChartContainer>
        </div>
         {!isConnected && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
            <p className="text-muted-foreground">Connect to see live speed data.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
