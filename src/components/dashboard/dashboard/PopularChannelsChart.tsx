"use client"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const data = [
    { name: "Tech News", subscribers: 4500 },
    { name: "Gaming", subscribers: 3800 },
    { name: "Movies", subscribers: 3150 },
    { name: "Music", subscribers: 2850 },
    { name: "Sports", subscribers: 2400 },
]

const PopularChannelsChart = () => {
    return (
        <div className="bg-white rounded-2xl border border-zinc-100/80 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] select-none">
            <h3 className="text-lg font-bold text-title mb-6">Popular Channels</h3>
            <div className="w-full h-[320px]">
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={44}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F1F4" />
                        <XAxis
                            dataKey="name"
                            stroke="#717182"
                            fontSize={12}
                            fontWeight={500}
                            tickLine={false}
                            axisLine={{ stroke: "#E4E4E7", strokeWidth: 1 }}
                            dy={10}
                        />
                        <YAxis
                            stroke="#717182"
                            fontSize={12}
                            fontWeight={500}
                            tickLine={false}
                            axisLine={{ stroke: "#E4E4E7", strokeWidth: 1 }}
                            domain={[0, 6000]}
                            ticks={[0, 1500, 3000, 4500, 6000]}
                            dx={-10}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#ffffff",
                                border: "1px solid #F1F1F4",
                                borderRadius: "12px",
                                fontSize: "12px",
                                fontWeight: "600",
                                color: "#0A0A0A",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                            }}
                            labelStyle={{ color: "#717182", fontWeight: "500", marginBottom: "4px" }}
                            cursor={{ fill: "rgba(99, 102, 241, 0.04)" }}
                        />
                        <Bar
                            dataKey="subscribers"
                            fill="#6366F1"
                            radius={[8, 8, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default PopularChannelsChart