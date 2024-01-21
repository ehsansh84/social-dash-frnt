import { useParams } from "react-router-dom"
import { NarrowWrapper } from "../../NarrowWrapper"
import { MessageTransition } from "../../components/MessageTransition"
import { useMessageNavigation } from "../../hooks/useMessageNavigation"
import { IndexPage } from "../IndexPage"
import { PermissionList } from "./Components/PermissionList"
import { useResource } from "../../hooks/useResources"

export function Index() {
  const { message, setMessage } = useMessageNavigation()
  const { roleId } = useParams()
  const {data: role} = useResource("roles", roleId)
  const headerTextSuffix = role?.name ? ' for '  + role?.name : '' 
  const addButtonText = 'Add permission'
  const addButtonLink = roleId ? `/permissions/${roleId}/create` : ''
  return (
    <IndexPage
      resourceName="permission"
      headerText={`Permissions${headerTextSuffix}`}
      showButton={Boolean(roleId)}
      addButtonText={addButtonText}
      addButtonLink={addButtonLink}
    >
      <PermissionList setMessage={setMessage} />
      <NarrowWrapper className="mt-12">
        <MessageTransition message={message} setMessage={setMessage} />
      </NarrowWrapper>
    </IndexPage>
  )
}
