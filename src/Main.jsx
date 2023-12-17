import { ActivityList } from "./ActivityList"
import { Heading } from "./Heading"
import { SecondaryNavigation } from "./SecondaryNavigation"
import { Stats } from "./Stats"

export function Main() {
  return (
    <main>
      <header>
        <SecondaryNavigation />
        <Heading />
        <Stats />
      </header>
      <ActivityList />
    </main>
  )
}
