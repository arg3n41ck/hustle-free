import React, { useEffect } from "react"
import Header from "../Header/Header"
import { Box, useMediaQuery } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import Head from "next/head"
import { fetchUser, selectIsUserAuth } from "../../redux/components/user"
import { useCookies } from "react-cookie"
import { theme } from "../../styles/theme"
import styled from "styled-components"

const Layout = ({ children }) => {
  const lg = useMediaQuery("(max-width:992px)")
  const dispatch = useDispatch()
  const [cookies] = useCookies(["token", "refresh"])
  const [userAuthenticated] = useSelector(selectIsUserAuth)

  useEffect(() => {
    userAuthenticated && dispatch(fetchUser())
  }, [cookies])

  return (
    <>
      <Head>
        <title>HF</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <Box sx={{ display: "flex" }}>
        <ChildrenWrapper lg={lg}>{children}</ChildrenWrapper>
      </Box>
    </>
  )
}

const ChildrenWrapper = styled.div`
  max-width: 1408px;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 76px 38px 130px;

  ${theme.mqMax("lg")} {
    margin: 117px auto 160px auto;
    padding: 0 20px;
  }
`

export default Layout
