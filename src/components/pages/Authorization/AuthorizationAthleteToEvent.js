import React from 'react'
import styled from 'styled-components'
import AthleteUserInfo from './AthleteUserInfo'
import AthleteEventInfo from './AthleteEventInfo'
import { useMediaQuery } from '@mui/material'

function AuthorizationAthleteToEvent({ event }) {
  const md = useMediaQuery('(max-width: 768px)')
  return (
    <RegistrationAthleteToEventContainer>
      <RegistrationAthleteToEventHeading>
        <RegistrationAthleteToEventHeadingText>
          Сведения о пользователе
        </RegistrationAthleteToEventHeadingText>
      </RegistrationAthleteToEventHeading>
      {!md && <Line />}
      <AthleteUserInfo />
      {!md && <Line />}
      <AthleteEventInfo eventRegistration={event?.registration} />
    </RegistrationAthleteToEventContainer>
  )
}

export default AuthorizationAthleteToEvent

const RegistrationAthleteToEventContainer = styled.div`
  width: 100%;
  height: min-content;
  background-color: #1b1c22;
  border: 1px solid #333333;
  border-radius: 24px;

  @media screen and (max-width: 768px) {
    background: none;
    border: none;
  }
`
const RegistrationAthleteToEventHeading = styled.div`
  height: 96px;
  display: flex;
  align-items: center;
  padding: 32px;

  @media screen and (max-width: 768px) {
    padding: 0;
  }
`

const RegistrationAthleteToEventHeadingText = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
`

const Line = styled.div`
  border-bottom: 1px solid #333333;
  width: 100%;
`
