import { useParams } from "react-router-dom"
import { NarrowWrapper } from "../../NarrowWrapper"
import { MessageTransition } from "../../components/MessageTransition"
import { useMessageNavigation } from "../../hooks/useMessageNavigation"
import { IndexPage } from "../IndexPage"
import { ScheduleList } from "./Components/ScheduleList"

export function Index() {
  const { message, setMessage } = useMessageNavigation()
  const { postId } = useParams()
  const headerTextSuffix = postId ? ': ' + postId : '' 
  const addButtonText = postId ? 'Add schedule for ' + postId : '' 
  const addButtonLink = postId ? `/schedules/${postId}/create` : ''
  return (
    <IndexPage
      resourceName="schedule"
      headerText={`Schedules${headerTextSuffix}`}
      showButton={Boolean(postId)}
      addButtonText={addButtonText}
      addButtonLink={addButtonLink}
    >
      <ScheduleList setMessage={setMessage} />
      <NarrowWrapper className="mt-12">
        <MessageTransition message={message} setMessage={setMessage} />
      </NarrowWrapper>
    </IndexPage>
  )
}
