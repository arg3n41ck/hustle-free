import React from 'react'
import { makeStyles } from '@mui/styles'
import styled from 'styled-components'
import { Tab, Tabs, useMediaQuery } from '@mui/material'
import { theme } from '../../../styles/theme'

const HorizontalTabsBorder = ({ valueTab, arrayTab, onChangeHandler, height, children }) => {
  const md = useMediaQuery('(max-width: 768px)')
  const handleChange = (event, newValue) => {
    onChangeHandler(newValue)
  }

  return (
    <Wrapper>
      <Header>
        <Tabs
          value={valueTab}
          onChange={handleChange}
          scrollButtons='false'
          aria-label='basic tabs example'
          variant={md ? 'scrollable' : 'standart'}
          // classes={{
          //   indicator: classes.indicator,
          // }}
          sx={
            !md
              ? {
                  '& .MuiTabs-flexContainer': {
                    display: 'grid',
                    gridTemplateColumns: `repeat(${arrayTab.length}, 1fr)`,
                    gridTemplateRows: `${height}`,
                  },
                }
              : {}
          }
        >
          {arrayTab.map((item, i) => (
            <TabItem
              key={`${item.value}-${item.name}-${i}`}
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
  @media screen and (max-width: 768px) {
    padding: 0 16px;
  }
`
const TabItem = styled(Tab)`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  color: #828282 !important;
  min-width: 100% !important;
  width: 100% !important;
  height: 100% !important;
  border-right: 1px solid #333;

  &.Mui-selected {
    color: #6d4eea !important;
  }

  &:last-child {
    border-right: none;
  }
  border-bottom: ${(p) => (p.active ? '8px solid #6d4eea' : '8px solid #333333')};
  transition: 0.4s;
  ${theme.mqMax('md')} {
    border-bottom: ${(p) => (p.active ? '1px solid #6d4eea' : '1px solid #333333')};
    border-right: none;
    min-width: initial !important;
    width: min-content !important;
  }
`
const Content = styled.div``

export default HorizontalTabsBorder
