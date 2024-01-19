import { NarrowWrapper } from "../../NarrowWrapper"
import { MessageTransition } from "../../components/MessageTransition"
import { useMessageNavigation } from "../../hooks/useMessageNavigation"
import { IndexPage } from "../IndexPage"
import { DestinationList } from "./Components/DestinationList"

export function Index() {
  const { message, setMessage } = useMessageNavigation()

  return (
    <IndexPage resourceName="destination">
      <DestinationList />
      <NarrowWrapper className="mt-12">
        <MessageTransition message={message} setMessage={setMessage} />
      </NarrowWrapper>
    </IndexPage>
  )
}
