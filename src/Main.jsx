import { ActivityList } from "./ActivityList"
import { Heading } from "./Heading"
import { Stats } from "./Stats"
import { Tabs } from "./Tabs"

export function Main() {
  return (
    <main>
      <header>
        <Tabs />
        <Heading />
        <Stats />
      </header>
      <ActivityList />
    </main>
  )
}
