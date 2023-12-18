import { PlusIcon } from "@heroicons/react/24/solid"
import { SectionHeadingWithActionButton } from "../SectionHeadingWithActionButton"
import { Wrapper } from "../Wrapper"
import { UserList } from "../UserList"

export function Users() {
  return (
    <>
      <Wrapper className="border-b">
        <SectionHeadingWithActionButton actionText="Add user" Icon={PlusIcon}>
          Users
        </SectionHeadingWithActionButton>
      </Wrapper>
      <UserList />
    </>
  )
}
