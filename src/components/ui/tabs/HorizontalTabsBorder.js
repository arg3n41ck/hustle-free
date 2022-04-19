import React from "react"
import { makeStyles } from "@mui/styles"
import styled from "styled-components"
import { Tab, Tabs } from "@mui/material"
import { theme } from "../../../styles/theme"

const useStyle = makeStyles({
  indicator: {
    width: "115%",
    height: 8,
    borderRadius: "8px 8px 0px 0px",
    [theme.mqMax("md")]: {
      height: 0,
    },
  },
})

const HorizontalTabsBorder = ({
  valueTab,
  arrayTab,
  onChangeHandler,
  height,
  children,
}) => {
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
            "& .MuiTabs-flexContainer": {
              display: "grid",
              gridTemplateColumns: `repeat(${arrayTab.length}, 1fr)`,
              gridTemplateRows: `${height}`,
            },
            [theme.mqMax("md")]: {
              "& .MuiTabs-flexContainer":
                arrayTab.length === 4
                  ? {
                      display: "grid",
                      gridTemplateColumns: `repeat(${2}, 1fr)`,
                      gridTemplateRows: `${height} ${height}`,
                    }
                  : {},
            },
          }}
        >
          {arrayTab.map((item) => (
            <TabItem
              active={item.value === valueTab}
              value={item.value}
              label={item.name}
            />
          ))}
        </Tabs>
      </Header>
      <Content>{children}</Content>
    </Wrapper>
  )
}

const Wrapper = styled.div``
const Header = styled.div`
  border-top: 1px solid #333333;
  border-bottom: 1px solid #333333;
`
const TabItem = styled(Tab)`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  color: #828282;
  min-width: 100%;
  border-right: 1px solid #333;
  &:last-child {
    border-right: none;
  }
  ${theme.mqMax("md")} {
    border-bottom: ${(p) =>
      p.active ? "8px solid #6d4eea" : "1px solid #333333"};
    transition: 0.4s;
  }
`
const Content = styled.div``

export default HorizontalTabsBorder
