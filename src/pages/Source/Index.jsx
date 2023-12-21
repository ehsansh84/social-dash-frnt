import { PlusIcon } from "@heroicons/react/24/solid"
import { SectionHeadingWithActionButton } from "../../SectionHeadingWithActionButton"
import { Wrapper } from "../../Wrapper"
import { useNavigate } from "react-router-dom"
import { ButtonWithLeadingIcon } from "../../components/ButtonWithLeadingIcon" 
import { SourceList } from "./Components/SourceList"

export function Index() {
  const navigate = useNavigate()

  const AddUserButton = () => {
    return (
      <ButtonWithLeadingIcon
        Icon={PlusIcon}
        onClick={() => {
          console.log('clicked')
          navigate("/sources/create")
        }}
      >
        Add source
      </ButtonWithLeadingIcon>
    )
  }

  return (
    <>
      <Wrapper as="header" className="dark:border-t dark:border-white/5">
        <SectionHeadingWithActionButton Button={AddUserButton}>
          Users
        </SectionHeadingWithActionButton>
      </Wrapper>
      <SourceList />
    </>
  )
}
