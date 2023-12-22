import { PlusIcon } from "@heroicons/react/24/solid"
import { SectionHeadingWithActionButton } from "./SectionHeadingWithActionButton"
import { Wrapper } from "./Wrapper"
import { useNavigate } from "react-router-dom"
import { ButtonWithLeadingIcon } from "./components/ButtonWithLeadingIcon"
import pluralize from "pluralize"
import { capitalize } from "./utils"

export function IndexPage({ resourceName, children }) {
  const navigate = useNavigate()

  const AddUserButton = () => {
    return (
      <ButtonWithLeadingIcon
        Icon={PlusIcon}
        onClick={() => {
          navigate(`/${pluralize(resourceName)}/create`)
        }}
      >
        Add {resourceName}
      </ButtonWithLeadingIcon>
    )
  }

  return (
    <>
      <Wrapper as="header" className="dark:border-t dark:border-white/5">
        <SectionHeadingWithActionButton Button={AddUserButton}>
          {capitalize(resourceName)}
        </SectionHeadingWithActionButton>
      </Wrapper>
      {children}
    </>
  )
}