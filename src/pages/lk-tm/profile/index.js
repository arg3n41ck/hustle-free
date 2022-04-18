import React, { useState } from "react"
import styled from "styled-components"
import Sidebar from "../../../components/ui/Sidebar"
import { useDispatch, useSelector } from "react-redux"
import {
  changeAuthCheck,
  changeTmTabValue,
} from "../../../redux/components/navigations"
import clearCookies from "../../../helpers/clearCookies"
import { useRouter } from "next/router"
import { lkTmTabs } from "../../../components/pages/LkTm/Tabs/tabConstants"
import ProfileTm from "../../../components/pages/LkTm/Tabs/Profile/Profile"
import Athletes from "../../../components/pages/LkTm/Tabs/Athletes/Athletes"

const TmProfile = () => {
  const { tmTabValue } = useSelector((state) => state.navigations)
  const [openSidebar, setOpenSidebar] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  const tabHandler = (value) => {
    if (value === "exit") {
      router.push("/login").then(() => {
        dispatch(changeAuthCheck(false))
        clearCookies()
      })
    }
    dispatch(changeTmTabValue(value))
  }

  const toggleSidebarHandler = () => {
    setOpenSidebar((prev) => !prev)
  }

  return (
    <Container>
      <Wrapper>
        <SidebarWrapper open={openSidebar}>
          <Sidebar
            open={openSidebar}
            array={lkTmTabs}
            value={tmTabValue}
            onChangeValue={tabHandler}
          />
        </SidebarWrapper>
        <Content>
          {(tmTabValue === "profile" && (
            <ProfileTm onToggleSidebar={toggleSidebarHandler} />
          )) ||
            (tmTabValue === "athletes" && (
              <Athletes onToggleSidebar={toggleSidebarHandler} />
            ))}
        </Content>
      </Wrapper>
    </Container>
  )
}
const Container = styled.div`
  max-width: 1408px;
  margin: 64px auto;
`
const Wrapper = styled.div`
  border: 1px solid #333333;
  border-radius: 24px;
  background: #1b1c22;
  display: flex;
`
const SidebarWrapper = styled.div`
  border-right: 1px solid #333333;
  padding: ${(p) => (p.open ? "32px" : 0)};
`
const Content = styled.div`
  flex-grow: 1;
`

export default TmProfile
