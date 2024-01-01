import { BiaxialLineChart } from "./components/charts/BiaxialLineChart"
import { RingPieChart } from "./components/charts/RingPieChart"
import { SimpleAreaChart } from "./components/charts/SimpleAreaChart"
import { TinyBarChart } from "./components/charts/TinyBarChart"
import { TinyLineChart } from "./components/charts/TinyLineChart"

export const chartDictionary = {
  line: {
    component: TinyLineChart,
    transformData: (chart) => {
      // Add transformation for line chart here
      return chart
    },
  },
  bar: {
    component: TinyBarChart,
    transformData: (chart) => {
      if (Array.isArray(chart.values[0][Object.keys(chart.values[0])[0]])) {
        // If the values are nested arrays, flatten them into one object per month
        return chart.values.map((value) => {
          const month = Object.keys(value)[0]
          const pages = value[month]
          const transformedValue = { name: month }
          pages.forEach((page) => {
            const pageName = Object.keys(page)[0]
            transformedValue[pageName] = page[pageName]
          })
          return transformedValue
        })
      } else {
        // If the values are not nested, map them directly to the expected format
        return chart.values.map((value) => {
          const month = Object.keys(value)[0]
          return { name: month, posts: value[month] }
        })
      }
    },
  },
  area: {
    component: SimpleAreaChart,
    transformData: (chart) => {
      // Add transformation for area chart here
      return chart
    },
  },
  biaxialline: {
    component: BiaxialLineChart,
    transformData: (chart) => {
      // Add transformation for biaxial line chart here
      return chart
    },
  },
  pie: {
    component: RingPieChart,
    transformData: (chart) => {
      return chart.values.map((value) => {
        const key = Object.keys(value)[0]
        return { name: key, value: value[key] }
      })
    },
  },
}
