import React from "react"
import { Box, Tab, Tabs } from "@mui/material"
import styled from "styled-components"
import { makeStyles } from "@mui/styles"
import { useDispatch, useSelector } from "react-redux"
import { change } from "../../../../redux/components/navigations"
import { useRouter } from "next/router"

const useStyle = makeStyles({
  indicator: {
    left: "0px",
  },
})

// ниже код не чиатать

const VerticalTab = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { value } = useSelector((state) => state.profileMenu)
  const classes = useStyle()
  const handleChange = (event, newValue) => {
    dispatch(change(newValue))
  }

  const outHandler = () => {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
    })
    // await removeCookie("token")
    // await removeCookie("refresh")

    router.push("/login")
  }

  return (
    <Wrapper>
      <Tabs
        aria-label=" tabs example"
        orientation={"vertical"}
        classes={{
          indicator: classes.indicator,
        }}
        value={value}
        onChange={handleChange}
        sx={{
          "& .MuiTabs-flexContainer": {
            alignItems: "flex-start",
          },
          "& .MuiButtonBase-root": {
            width: "100%",
            alignItems: "flex-start",
            height: 56,
          },
          "& .Mui-selected": {
            background: "#F1FBF5",
            fontWeight: 600,
          },
        }}
      >
        <TabS value={"profile"} label="Мой профиль" />
        {/*<TabsOfProfile*/}
        {/*  sx={{*/}
        {/*    display:*/}
        {/*      value === "startups" || value === "settings" ? "none" : "block",*/}
        {/*    opacity: 0,*/}
        {/*    height: 56,*/}
        {/*  }}*/}
        {/*  value={"vacancy"}*/}
        {/*  label={"Мои вакансии"}*/}
        {/*/>*/}
        {/*<TabsOfProfile*/}
        {/*  sx={{*/}
        {/*    display:*/}
        {/*      value === "startups" || value === "settings" ? "none" : "block",*/}
        {/*    opacity: 0,*/}
        {/*    height: 56,*/}
        {/*  }}*/}
        {/*  value={"tasks"}*/}
        {/*  label={"Мои задачи"}*/}
        {/*/>*/}
        <TabsOfProfile
          sx={{
            display:
              value === "startups" || value === "settings" ? "none" : "block",
            opacity: 0,
            height: 56,
          }}
          value={"favorites"}
          label={"Избранное"}
        />
        <TabsOfProfile
          sx={{
            display:
              value === "startups" || value === "settings" ? "none" : "block",
            opacity: 0,
            height: 56,
          }}
          onClick={outHandler}
          value={"out"}
          label={"Выйти"}
        />
        {!(value === "startups" || value === "settings") && (
          <WrapperProfileTabs
            active={value === "startups" || value === "settings"}
          >
            {/*<TabsOfProfile*/}
            {/*  sx={{*/}
            {/*    color: value === "vacancy" ? "#27AE60" : "#333333",*/}
            {/*    fontWeight: value === "vacancy" ? 600 : 400,*/}
            {/*    background: value === "vacancy" ? "#F1FBF5" : "#fff",*/}
            {/*  }}*/}
            {/*  value={"vacancy"}*/}
            {/*  label={"Мои вакансии"}*/}
            {/*/>*/}
            {/*<TabsOfProfile*/}
            {/*  sx={{*/}
            {/*    color: value === "tasks" ? "#27AE60" : "#333333",*/}
            {/*    fontWeight: value === "tasks" ? 600 : 400,*/}
            {/*    background: value === "tasks" ? "#F1FBF5" : "#fff",*/}
            {/*  }}*/}
            {/*  value={"tasks"}*/}
            {/*  label={"Мои задачи"}*/}
            {/*/>*/}
            <TabsOfProfile
              sx={{
                color: value === "favorites" ? "#27AE60" : "#333333",
                fontWeight: value === "favorites" ? 600 : 400,
                background: value === "favorites" ? "#F1FBF5" : "#fff",
              }}
              value={"favorites"}
              label={"Избранное"}
            />
            <TabsOfProfile
              onClick={outHandler}
              sx={{
                color: value === "out" ? "#27AE60" : "#333333",
                fontWeight: value === "out" ? 600 : 400,
                background: value === "out" ? "#F1FBF5" : "#fff",
              }}
              value={"out"}
              label={"Выйти"}
            />
          </WrapperProfileTabs>
        )}
        <Line />
        <TabS value={"startups"} label="Стартапы" />
      </Tabs>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  width: 256px;
  overflow: hidden;
  padding: 16px 0;
`
const TabS = styled(Tab)`
  font-family: Inter, sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: #333333;
  padding: 8px 32px !important;
`
const TabsOfProfile = styled(Tab)`
  padding: 8px 47px !important;
  font-family: Inter, sans-serif;
  font-size: 16px;
  line-height: 24px;
  //color: #828282;
`
const WrapperProfileTabs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: ${(p) => (!p.active ? "-112px" : 0)}; // -224px full
  pointer-events: none;
  width: 100%;
`
const Line = styled.div`
  margin: 16px auto;
  background: #d8d8d8;
  height: 1px;
  max-width: 208px;
  width: 100%;
`

export default VerticalTab
