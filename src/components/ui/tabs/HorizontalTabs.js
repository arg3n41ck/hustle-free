import React from "react"
import { Tab, Tabs } from "@mui/material"
import { makeStyles } from "@mui/styles"
import styled from "styled-components"
import { theme } from "../../../styles/theme"

const useStyle = makeStyles({
  indicator: {
    width: "115%",
    height: 4,
    borderRadius: "20px 20px 0 0px",
  },
})

const HorizontalTabs = ({ valueTab, arrayTab, onChangeHandler, children }) => {
  const classes = useStyle()
  const handleChange = (event, newValue) => {
    onChangeHandler(newValue)
  }

  return (
    <Wrapper>
      <Header>
        <Tabs
          value={valueTab}
          onChange={handleChange}
          aria-label="basic tabs example"
          classes={{
            indicator: classes.indicator,
          }}
          sx={{
            "&.Mui-selected": {
              color: "#F1FBF5 !important",
              transition: "all 0.3s ease 0s",
            },
            "&.MuiTabs-flexContainer": {
              display: "flex",
              justifyContent: "space-around",
            },
          }}
        >
          {arrayTab.map((item) => (
            <TabItem value={item.value} label={item.name} />
          ))}
        </Tabs>
      </Header>
      <Content>{children}</Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border-radius: 12px;
  overflow: hidden;
  max-width: 832px;
  ${theme.mqMax("xl")} {
    max-width: none;
  }
`
const Header = styled.div`
  padding: 32px 32px 0 32px;
  border-bottom: 1px solid #e5e5e5;
`
const Content = styled.div`
  padding: 32px 0;
`
const TabItem = styled(Tab)`
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  color: #828282;
  min-width: 0;
  margin-right: 12px;
  &:last-child {
    margin-right: 0;
  }
`

export default HorizontalTabs
