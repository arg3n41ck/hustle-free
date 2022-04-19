import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { Box, useMediaQuery } from "@mui/material"
import { theme } from "../../../styles/theme"
import $api from "../../../services/axios"
import { useRouter } from "next/router"
import { useCookies } from "react-cookie"
import Sidebar from "../../../components/ui/Sidebar"
import { lkOgTabs } from "../../../components/pages/LkOg/Tabs/tabConstants"
import clearCookies from "../../../helpers/clearCookies"
import {
  changeAuthCheck,
  changeOgTabValue,
} from "../../../redux/components/navigations"
import ProfileOg from "../../../components/pages/LkOg/Tabs/Profile/Profile"

const OgProfile = () => {
  const { ogTabValue } = useSelector((state) => state.navigations)
  const router = useRouter()
  const [cookies] = useCookies(["token", "refresh"])
  const { user } = useSelector((state) => state.user)
  const [startupsState, setStartupsState] = useState([])
  const [openSidebar, setOpenSidebar] = useState(false)
  const dispatch = useDispatch()

  const tabHandler = (value) => {
    if (value === "exit") {
      router.push("/login").then(() => {
        dispatch(changeAuthCheck(false))
        clearCookies()
      })
    }
    dispatch(changeOgTabValue(value))
  }

  const toggleSidebarHandler = () => {
    setOpenSidebar((prev) => !prev)
  }

  // useEffect(async () => {
  //   if (user.id) {
  //     const res = await $api.get(`/accounts/users/${user.id}/startups_owner/`)
  //     setStartupsState(res.data)
  //   }
  // }, [user])

  // useEffect(async () => {
  //   if (!cookies.token) {
  //     await router.push("/login")
  //   }
  // }, [cookies]) // раскомментировать после подключения регистрации

  return (
    <Container>
      <Wrapper>
        <SidebarWrapper open={openSidebar}>
          <Sidebar
            open={openSidebar}
            array={lkOgTabs}
            value={ogTabValue}
            onChangeValue={tabHandler}
          />
        </SidebarWrapper>
        <Content>
          {(ogTabValue === "profile" && (
            <ProfileOg onToggleSidebar={toggleSidebarHandler} />
          )) ||
            (ogTabValue === "myTournaments" && <h1>tset</h1>)}
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

export default OgProfile
