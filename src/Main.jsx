import { PlusIcon } from "@heroicons/react/24/solid"
import { Breadcrcumb } from "./Breadcrumb"
import { SectionHeadingWithActionButton } from "./SectionHeadingWithActionButton"
import { UserList } from "./UserList"
import { Wrapper } from "./Wrapper"

export function Main() {
  return (
    <main>
      <Wrapper className="border-b">
        <SectionHeadingWithActionButton actionText="Add user" Icon={PlusIcon}>
          Users
        </SectionHeadingWithActionButton>
      </Wrapper>
      <UserList />
    </main>
  )
}
