import { useState } from "react"
import { TinyLineChart } from "../../components/charts/TinyLineChart"
import { SectionHeadingWithActionButton } from "../../SectionHeadingWithActionButton"
import { Wrapper } from "../../Wrapper"
import { TinyBarChart } from "../../components/charts/TinyBarChart"
import { SimpleAreaChart } from "../../components/charts/SimpleAreaChart"
import { BiaxialLineChart } from "../../components/charts/BiaxialLineChart"
import { RingPieChart } from "../../components/charts/RingPieChart"

const charts = [
  { title: "Request time off", id: Math.random(), type: "line" },
  { title: "Benefits", id: Math.random(), type: "bar" },
  { title: "Schedule a one-on-one", id: Math.random(), type: "line" },
  { title: "Payroll", id: Math.random(), type: "area" },
  { title: "Submit an expense", id: Math.random(), type: "bar" },
  { title: "Training", id: Math.random(), type: "ring" },
  { title: "Submit an expense", id: Math.random(), type: "biaxialline" },
]

const chartDictionary = {
  line: TinyLineChart,
  bar: TinyBarChart,
  area: SimpleAreaChart,
  biaxialline: BiaxialLineChart,
  ring: RingPieChart,
}

const secondaryNavigation = [
  { name: "Last 7 days", id: "last7days" },
  { name: "Last 30 days", id: "last30days" },
  { name: "All-time", id: "alltime" },
]

export default function Dashboard() {
  const [timeline, setTimeline] = useState(secondaryNavigation[0])

  return (
    <>
      <Wrapper as="header" className="dark:border-t dark:border-white/5">
        <SectionHeadingWithActionButton Button={null}>
          <div className="mt-1 flex max-w-7xl flex-wrap items-center justify-start gap-6 sm:flex-nowrap">
            <h1>Timeline</h1>
            <div className="order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-s sm:border-border sm:ps-6 sm:leading-7">
              {secondaryNavigation.map((item) => (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    setTimeline(item)
                  }}
                  key={item.name}
                  href={item.href}
                  className={
                    item.id === timeline.id
                      ? "text-primary"
                      : "text-gray-700 dark:text-gray-400"
                  }
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </SectionHeadingWithActionButton>
      </Wrapper>
      {/* <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-bg shadow dark:divide-gray-800 sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0 lg:grid-cols-3"> */}
      <div className=" overflow-hidden  bg-bg shadow sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {charts.map((chart) => {
          const ChartComponent = chartDictionary[chart.type]
          return (
            <div
              key={chart.id}
              className="group bg-bg p-6 ring-1 ring-inset ring-gray-200 dark:ring-gray-800"
            >
              <div className="mx-auto h-36 w-full">
                <ChartComponent />
              </div>
              <div className="mt-8">
                <div className="text-base font-semibold leading-6 text-text">
                  <h4 href={chart.href} className="focus:outline-none">
                    {/* Extend touch target to entire panel */}
                    {/* <span className="absolute inset-0" aria-hidden="true" /> */}
                    {chart.title}
                  </h4>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Doloribus dolores nostrum quia qui natus officia quod et
                  dolorem. Sit repellendus qui ut at blanditiis et quo et
                  molestiae.
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
