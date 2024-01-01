import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="px-2 py-1 rounded-md bg-bg-hover"
      >
        <p
          style={{ color: payload[0].color }}
        >{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    )
  }

  return null
}

export function RingPieChart({ data }) {
  return (
    <PieChart
      style={{ marginLeft: "auto", marginRight: "auto" }}
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
      <Tooltip content={<CustomTooltip />} />
    </PieChart>
  )
}
