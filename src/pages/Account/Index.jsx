import { Wrapper } from "../../Wrapper";
import { IndexPage } from "../IndexPage";
import { AccountList } from "./Components/AccountList";

export default function Index() {
  return (
    <IndexPage resourceName="account">
    <Wrapper>
      <AccountList />
    </Wrapper>
  </IndexPage>
  )
}
