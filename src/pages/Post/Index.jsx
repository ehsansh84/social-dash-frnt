import { PlusIcon } from "@heroicons/react/24/solid"
import { SectionHeadingWithActionButton } from "../../SectionHeadingWithActionButton"
import { Wrapper } from "../../Wrapper"
import { UserList } from "../../UserList"
import { useNavigate } from "react-router-dom"
import { ButtonWithLeadingIcon } from "../../ButtonWithLeadingIcon"

export function Index() {
  const navigate = useNavigate()

  const AddUserButton = () => {
    return (
      <ButtonWithLeadingIcon
        Icon={PlusIcon}
        onClick={() => {
          console.log('clicked')
          navigate("/users/create")
        }}
      >
        Add post
      </ButtonWithLeadingIcon>
    )
  }

  return (
    <>
      <Wrapper as="header" className="dark:border-t dark:border-white/5">
        <SectionHeadingWithActionButton Button={AddUserButton}>
          Posts
        </SectionHeadingWithActionButton>
      </Wrapper>
      <UserList />
    </>
  )
}
