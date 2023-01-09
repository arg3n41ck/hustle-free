import { Avatar } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { truncateString } from '../../../../helpers/helpers'
import ApplyToTeam from './ApplyToTeam'
import NavTabs from './NavTabs'

export default function MobileTeamNavigation({ children }) {
  const team = useSelector((state) => state.teams.team.team)

  return (
    <div>
      {!!team && (
        <TeamInfoWrapper>
          <Avatar
            src={team?.user?.avatar}
            alt={`${team?.user?.avatar}`}
            sx={{ width: 200, height: 200 }}
          />
          <CenterText>
            <CenterTitle>{team?.name || ''}</CenterTitle>
            <CenterDescription>
              {truncateString(team?.description || '', 200, true)}
            </CenterDescription>
          </CenterText>
          <ApplyToTeam />
        </TeamInfoWrapper>
      )}

      <NavTabs />

      {children}
    </div>
  )
}

const TeamInfoWrapper = styled.div`
  display: grid;
  grid-template: 200px 1fr 48px / 1fr;
  justify-items: center;
  grid-gap: 16px;

  padding: 25px 0 0;
`

const CenterText = styled.div`
  display: flex;
  flex-direction: column;
`
const CenterTitle = styled.h4`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  color: #f2f2f2;
  text-align: center;
`
const CenterDescription = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #828282;
  text-align: center;
  margin-top: 4px;
`
