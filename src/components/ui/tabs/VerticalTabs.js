import React from "react"
import { Tab, Tabs } from "@mui/material"
import { makeStyles } from "@mui/styles"
import styled from "styled-components"

const useStyle = makeStyles({
  indicator: {
    left: "0px",
  },
})

const VerticalTab = ({ valueTab, arrayTab, onChangeHandler }) => {
  const classes = useStyle()
  const handleChange = (event, newValue) => {
    onChangeHandler(newValue)
  }

  return (
    <Wrapper>
      <Tabs
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
        aria-label="tabs example"
        orientation={"vertical"}
        classes={{
          indicator: classes.indicator,
        }}
        value={valueTab}
        onChange={handleChange}
      >
        {arrayTab.map((item) => (
          <TabS value={item.value} label={item.name} />
        ))}
      </Tabs>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  width: 256px;
  height: 100%;
  overflow: hidden;
  padding: 16px 0;
`

const TabS = styled(Tab)`
  font-family: Inter, sans-serif;
  font-size: 16px !important;
  line-height: 24px !important;
  color: #333333;
  padding: 10px 30px !important;
`

export default VerticalTab
