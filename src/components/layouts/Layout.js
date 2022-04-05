import React, { useEffect, useState } from "react"
import Header from "../Header/Header"
import { Box, useMediaQuery } from "@mui/material"

import Navbar from "../Navbar"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { fetchSkills } from "../../redux/components/skills"
import Head from "next/head"
import { checkProgress, fetchUser } from "../../redux/components/user"
import { useCookies } from "react-cookie"
import { theme } from "../../styles/theme"
import styled from "styled-components"
import { fetchStartups } from "../../redux/components/startups"
import { fetchTechnologies } from "../../redux/components/technologies"

const Layout = ({ children }) => {
  const lg = useMediaQuery("(max-width:992px)")
  const [openMenu, setOpenMenu] = useState(lg)
  const [pageNotAuth, setPageNotAuth] = useState(false)
  const router = useRouter()
  const { pathname } = router
  const dispatch = useDispatch()
  const [cookies] = useCookies(["token", "refresh"])

  const menuHandler = () => {
    setOpenMenu((prev) => !prev)
  }

  useEffect(() => {
    if (
      pathname === "/login" ||
      pathname === "/registration" ||
      pathname === "/reset-password" ||
      pathname === "/registration/input-data"
    ) {
      setPageNotAuth(true)
    } else {
      setPageNotAuth(false)
    }
  }, [pathname])

  useEffect(() => {
    dispatch(fetchSkills())
    dispatch(fetchTechnologies())
    dispatch(fetchUser())
    dispatch(fetchStartups())
  }, [cookies])

  useEffect(() => {
    dispatch(fetchSkills())
  }, [pathname])

  return (
    <>
      <Head>
        <title>JVA</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header pageNotAuth={pageNotAuth} onMenu={menuHandler} />
      <Box sx={{ display: "flex" }}>
        {!pageNotAuth && (
          <Box
            sx={{
              margin: "80px 0 0 0",
            }}
          >
            <Navbar lg={lg} open={openMenu} onMenu={menuHandler} />
          </Box>
        )}

        <ChildrenWrapper lg={lg} pageNotAuth={pageNotAuth} openMenu={openMenu}>
          {children}
        </ChildrenWrapper>
      </Box>
    </>
  )
}

const ChildrenWrapper = styled.div`
  width: 100%;
  margin: ${(p) =>
    !p.pageNotAuth
      ? `117px 0 160px ${p.openMenu ? "330px" : `${p.lg ? "30" : "116"}px`}`
      : "0 auto 160px"};
  min-width: ${(p) => `calc(100vw - ${p.openMenu ? "330px" : "116px"})`};
  ${theme.mqMax("lg")} {
    margin: 117px auto 160px auto;
    padding: 0 20px;
  }
`

export default Layout
