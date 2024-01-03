import { NarrowWrapper } from "../../NarrowWrapper"
import { MessageTransition } from "../../components/MessageTransition"
import { useMessageNavigation } from "../../hooks/useMessageNavigation"
import { IndexPage } from "../IndexPage"
import { PostList } from "./Components/PostList"

export function Index() {
  const { message, setMessage } = useMessageNavigation()

  return (
    <IndexPage resourceName="posts">
      <PostList />
      <NarrowWrapper className="mt-12">
        <MessageTransition message={message} setMessage={setMessage} />
      </NarrowWrapper>
    </IndexPage>
  )
}
