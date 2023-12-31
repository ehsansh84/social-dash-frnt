import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
]
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export function RingPieChart() {
  return (
      <PieChart
      style={{marginLeft: "auto", marginRight: "auto"}}
        width={220}
        height={200}
        margin={{
          top: -50,
          right: 0,
          left: 0,
          bottom: 0,
        }}
        //  onMouseEnter={this.onPieEnter}
      >
        <Pie
        stroke="none"
          data={data}
          // cx={120}
          // cy={200}
          innerRadius={38}
          outerRadius={68}
          // fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
  )
}
