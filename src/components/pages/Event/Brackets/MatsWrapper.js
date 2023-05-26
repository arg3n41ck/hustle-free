import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

export default function MatsWrapper({ matId, matName, children, allFightsTotal, dayStartTime }) {
  const {
    query: { id: eventId },
    push: routerPush,
  } = useRouter()

  const handleOpenMatDetails = () => {
    routerPush(`/events/${eventId}/brackets/mats/${matId}`)
  }

  return (
    <MatWrapper>
      <Header>
        <MatTitle onClick={handleOpenMatDetails}>{matName}</MatTitle>
        {dayStartTime && <ContentText>Начало {dayStartTime}</ContentText>}
      </Header>
      <Content>{children}</Content>
      <Footer>
        <ContentText>{allFightsTotal} схавток</ContentText>
        {dayStartTime && <ContentText>Начало {dayStartTime}</ContentText>}
      </Footer>
    </MatWrapper>
  )
}

export const DNDIconWrapper = styled.button`
  align-self: center;
  justify-self: center;
  padding: 16px 0 16px 16px;
`

const MatWrapper = styled.div`
  height: min-content;
  width: 100%;
  display: grid;
  grid-template: 64px auto 56px / 1fr;
  border-radius: 8px;
  background: #141519;

  &:hover {
    ${DNDIconWrapper} {
      path {
        fill: #6d4eea;
      }
    }
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1b1c22;
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid #1b1c22;
  padding: 16px;
`

const MatTitle = styled.button`
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  margin: 0;
  color: #ffffff;

  &:hover {
    color: #6d4eea;
  }
`

const Content = styled.div`
  max-height: 680px;
  overflow: auto;
`

const ContentText = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  margin: 0;
`

const Footer = styled.div`
  display: flex;
  background: #1b1c22;
  justify-content: space-between;
  border-radius: 0 0 8px 8px;

  & > ${ContentText} {
    padding: 16px;
  }
`
