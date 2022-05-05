import React, { useEffect } from "react"
import Header from "../Header/Header"
import { useMediaQuery } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import Head from "next/head"
import { fetchUser, selectIsUserAuth } from "../../redux/components/user"
import { useCookies } from "react-cookie"
import { theme } from "../../styles/theme"
import styled from "styled-components"
import { fetchCountries } from "../../redux/components/countriesAndCities"
import { fetchSportTypes } from "../../redux/components/sportTypes"
import { getCookie } from "../../services/JWTService"
import Footer from "../Footer/Footer"

const Layout = ({ children }) => {
  const lg = useMediaQuery("(max-width:992px)")
  const dispatch = useDispatch()
  const [cookies] = useCookies(["token", "refresh"])
  const [userAuthenticated] = useSelector(selectIsUserAuth)

  useEffect(() => {
    if (getCookie("token")) {
      dispatch(fetchUser())
      dispatch(fetchCountries())
      dispatch(fetchSportTypes())
    }
  }, [cookies?.token, userAuthenticated])

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
      <ChildrenWrapper lg={lg}>
        <div style={{ height: "100%" }}>{children}</div>

        <Footer />
      </ChildrenWrapper>
    </>
  )
}

const ChildrenWrapper = styled.div`
  max-width: 1489px;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 76px 38px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${theme.mqMax("lg")} {
    margin: 117px auto 160px auto;
    padding: 0 20px;
  }
`

export default Layout
