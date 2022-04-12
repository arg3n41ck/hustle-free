import React, { useEffect, useState } from "react"
import Header from "../Header/Header"
import { Box, useMediaQuery } from "@mui/material"
import hfIcon from "../../public/svg/hfIcon.svg"
import Navbar from "../Navbar"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import Head from "next/head"
import { checkProgress, fetchUser } from "../../redux/components/user"
import { useCookies } from "react-cookie"
import { theme } from "../../styles/theme"
import styled from "styled-components"

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
      pathname === "/registration/activation"
    ) {
      setPageNotAuth(true)
    } else {
      setPageNotAuth(false)
    }
  }, [pathname])

  useEffect(() => {
    // dispatch(fetchSkills())
    // dispatch(fetchTechnologies())
    dispatch(fetchUser())
    // dispatch(fetchStartups())
  }, [cookies])

  // useEffect(() => {
  //   dispatch(fetchSkills())
  // }, [pathname])

  return (
    <>
      <Head>
        <title>HF</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="icon" href={hfIcon} />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V4Z"
            fill="url(#paint0_linear_22_8208)"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.67505 19.3395L6.67505 17.1967C5.8539 16.6101 5.44333 16.3169 5.22166 15.8861C5 15.4554 5 14.9508 5 13.9417V10.0587C5 9.73732 5 9.46714 5.00716 9.23422L11 13.5148V20.2315C10.6433 20.0311 10.227 19.7338 9.67505 19.3395ZM13 20.2315C13.3567 20.0311 13.773 19.7338 14.325 19.3395L17.325 17.1967C18.1461 16.6101 18.5567 16.3169 18.7783 15.8861C19 15.4554 19 14.9508 19 13.9417V10.0587C19 9.73732 19 9.46714 18.9928 9.23422L13 13.5148V20.2315ZM18.1276 7.39447L12 11.7713L5.87244 7.39447C6.08372 7.22611 6.34653 7.03839 6.67505 6.80374L9.67505 4.66088C10.7977 3.85897 11.3591 3.45801 12 3.45801C12.6409 3.45801 13.2023 3.85897 14.325 4.66088L17.325 6.80374C17.6535 7.03839 17.9163 7.22611 18.1276 7.39447Z"
            fill="#333333"
          />
          <defs>
            <linearGradient
              id="paint0_linear_22_8208"
              x1="0"
              y1="12"
              x2="24"
              y2="12"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#3F82E1" />
              <stop offset="1" stop-color="#7A3FED" />
            </linearGradient>
          </defs>
        </svg> */}
      </Head>
      <Header pageNotAuth={pageNotAuth} onMenu={menuHandler} />
      <Box sx={{ display: "flex" }}>
        {/* {!pageNotAuth && (
          <Box
            sx={{
              margin: "80px 0 0 0",
            }}
          >
            <Navbar lg={lg} open={openMenu} onMenu={menuHandler} />
          </Box>
        )} */}

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
