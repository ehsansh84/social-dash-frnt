import { BarChart, Bar, Tooltip, ResponsiveContainer } from "recharts"

export function TinyBarChart({ data }) {
  // Get all the keys from the first object in the data array, excluding 'name'
  const keys = Object.keys(data[0]).filter((key) => key !== "name")

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  // Custom tooltip content
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className ="bg-bg-hover rounded-md py-1 px-4">
          <p>{`${payload[0].payload.name}`}</p>
          {payload.map((item) => (
            <p key={item.name} style={{ color: item.color }}>
              {`${item.name} : ${item.value}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }
  return (
    <ResponsiveContainer width="99%" height="100%">
      <BarChart data={data}>
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "none" }} />
        {keys.map((key) => (
          <Bar key={key} dataKey={key} fill={getRandomColor()} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
