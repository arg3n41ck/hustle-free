import React from 'react'
import { Tab, Tabs, useMediaQuery } from '@mui/material'
import { makeStyles } from '@mui/styles'
import styled from 'styled-components'
import { theme } from '../../../styles/theme'

const useStyle = makeStyles({
  indicator: {
    width: '115%',
    height: 4,
    borderRadius: '20px 20px 0 0px',
  },
})

const HorizontalTabs = ({ valueTab, arrayTab, onChangeHandler, children }) => {
  const classes = useStyle()
  const handleChange = (event, newValue) => {
    onChangeHandler(newValue)
  }
  const sm = useMediaQuery('(max-width: 578px)')
  const maxSm = useMediaQuery('(max-width: 430px)')

  return (
    <Wrapper>
      <Header>
        <Tabs
          value={valueTab}
          onChange={handleChange}
          aria-label='basic tabs example'
          classes={{
            indicator: classes.indicator,
          }}
          sx={{
            '& .MuiTab-root': {
              color: '#BDBDBD',
              fontSize: sm ? (maxSm ? '14px !important' : '17px !important') : '24px !important',
              fontHeight: '32px !important',
              fontStyle: 'normal !important',
            },
            '& .Mui-selected': {
              color: '#F2F2F2 !important',
              transition: 'all 0.3s ease 0s',
            },
            '& .MuiTabs-flexContainer': {
              display: 'grid',
              gridTemplate: '1fr / 1fr 1fr',
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
  max-width: 832px;
  ${theme.mqMax('xl')} {
    max-width: none;
  }
`
const Header = styled.div`
  padding: 32px 48px 0 48px;
  margin: 0 -48px 0 -48px;
  border-bottom: 1px solid #333;

  @media screen and (max-width: 690px) {
    padding: 0;
  }

  @media screen and (max-width: 578px) {
    margin: 0;
  }
`
const Content = styled.div`
  padding: 32px 0;
`
const TabItem = styled(Tab)`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #828282;
  padding: 0;
  &:last-child {
    margin-right: 0;
  }
`

export default HorizontalTabs
