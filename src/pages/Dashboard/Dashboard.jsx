import { useState } from "react"
import { SectionHeadingWithActionButton } from "../../SectionHeadingWithActionButton"
import { Wrapper } from "../../Wrapper"
import { useResourceList } from "../../hooks/useResources"
import { chartDictionary } from "../../charts"

const secondaryNavigation = [
  { name: "Last 7 days", id: "last7days" },
  { name: "Last 30 days", id: "last30days" },
  { name: "All-time", id: "alltime" },
]

export default function Dashboard() {
  const [timeline, setTimeline] = useState(secondaryNavigation[0])
  const { data: charts } = useResourceList("dashboard") ?? null
  return (
    <>
      <Wrapper as="header" className="dark:border-t dark:border-white/5">
        <SectionHeadingWithActionButton Button={null}>
          <div className="mt-1 flex max-w-7xl flex-wrap items-center justify-start gap-6 sm:flex-nowrap">
            <h1>History Range</h1>
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
      <div className="overflow-hidden bg-bg shadow sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {charts &&
          charts.map((chart) => {
            const { component: ChartComponent, transformData } =
              chartDictionary[chart.type]
            const transformedData = transformData(chart)
            return (
              <div
                key={chart.name}
                className="group bg-bg p-6 ring-1 ring-inset ring-gray-200 dark:ring-gray-800"
              >
                <div className="mx-auto h-36 w-full">
                  <ChartComponent data={transformedData} />
                </div>
                <div className="mt-8">
                  <div className="text-base font-semibold leading-6 text-text">
                    <h4 href={chart.href} className="focus:outline-none">
                      {chart.title}
                    </h4>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {chart.name}
                  </p>
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}
