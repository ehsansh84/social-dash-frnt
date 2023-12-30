import { PlusIcon } from "@heroicons/react/24/solid"
import pluralize from "pluralize"
import { useNavigate } from "react-router-dom"

import { SectionHeadingWithActionButton } from "../SectionHeadingWithActionButton"
import { Wrapper } from "../Wrapper"
import { ButtonWithLeadingIcon } from "../components/ButtonWithLeadingIcon"
import { capitalize } from "../utils"

export function IndexPage({ resourceName, children }) {
  const navigate = useNavigate()

  const AddButton = () => {
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
        <SectionHeadingWithActionButton Button={AddButton}>
          {capitalize(pluralize(resourceName))}
        </SectionHeadingWithActionButton>
      </Wrapper>
      {children}
    </>
  )
}
