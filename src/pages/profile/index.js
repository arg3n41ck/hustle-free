import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"
import ProfileMain from "../../components/pages/Profile/MyProfile"

import VerticalTab from "../../components/pages/Profile/MyProfile/VerticalTabs"
import { Box, useMediaQuery } from "@mui/material"
import { theme } from "../../styles/theme"
import Startups from "../../components/pages/Profile/Startups"
import $api from "../../services/axios"
import { useRouter } from "next/router"
import { useCookies } from "react-cookie"
import Favorites from "../../components/pages/Profile/MyProfile/Favorites/Favorites"

const Index = () => {
  const { value } = useSelector((state) => state.profileMenu)
  const lg = useMediaQuery("(max-width:992px)")
  const router = useRouter()
  const [cookies] = useCookies(["token", "refresh"])
  const { user } = useSelector((state) => state.user)
  const [startupsState, setStartupsState] = useState([])

  useEffect(async () => {
    if (user.id) {
      const res = await $api.get(`/accounts/users/${user.id}/startups_owner/`)
      setStartupsState(res.data)
    }
  }, [user])

  useEffect(async () => {
    if (!cookies.token) {
      await router.push("/login")
    }
  }, [cookies])

  return (
    <Container>
      <Wrapper>
        <Content>
          {(value === "profile" && <ProfileMain />) ||
            (value === "startups" && <Startups startups={startupsState} />) ||
            (value === "favorites" && <Favorites />)}
        </Content>
        {!lg && (
          <Box sx={{ maxHeight: 359 }}>
            <VerticalTab />
          </Box>
        )}
      </Wrapper>
    </Container>
  )
}
const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`
const Wrapper = styled.div`
  display: flex;
  margin: 0;
  ${theme.mqMax("xl")} {
    margin-right: 10px;
  }
  ${theme.mqMax("lg")} {
    margin-right: 0;
  }
`
const Content = styled.div`
  flex-grow: 1;
  margin-right: 32px;
  ${theme.mqMax("lg")} {
    margin-right: 0;
  }
`

export default Index
