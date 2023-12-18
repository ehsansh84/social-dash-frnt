import { Heading } from "./Heading"
import { List } from "./List"
import { Tabs } from "./Tabs"

export function Main() {
  return (
    <main>
      <header>
        <Tabs />
        <Heading />
        <List />
      </header>
    </main>
  )
}
