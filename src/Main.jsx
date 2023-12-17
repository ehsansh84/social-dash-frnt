import { ActivityList } from "./ActivityList"
import { Heading } from "./Heading"
import { Tabs } from "./Tabs"

export function Main() {
  return (
    <main>
      <header>
        <Tabs />
        <Heading />
      </header>
      <ActivityList />
    </main>
  )
}
