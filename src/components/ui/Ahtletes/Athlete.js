import React from 'react'
import { Avatar } from '@mui/material'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { theme } from '../../../styles/theme'

function Athlete({ children, user, athleteId, team, statistic }) {
  const { push: routerPush, pathname } = useRouter()

  return (
    <div>
      {user && (
        <ItemWrapper>
          <Item
            onClick={() => {
              routerPush(athleteId ? `/athlete/${athleteId}` : pathname)
            }}
          >
            <Avatar
              alt={`${user?.avatar || ''}`}
              src={user?.avatar || ''}
              sx={{ width: '64px', height: '64px' }}
            />
            <div>
              <ItemTitle>
                {user?.firstName || ''} {user?.lastName || ''}
              </ItemTitle>
              {!!team?.name && <ItemDescription>{team?.name}</ItemDescription>}
              <WinsAndDefeats>
                {statistic?.winsCount || 0} побед / {statistic?.loses || 0} поражений
              </WinsAndDefeats>
            </div>
          </Item>
          {children}
        </ItemWrapper>
      )}
    </div>
  )
}

export default Athlete

const ItemWrapper = styled.div`
  background: #1b1c22;
  border: 1px solid #1b1c22;
  border-radius: 16px;
  padding: 24px;

  ${theme.mqMax('md')} {
    padding: 20px;
  }
`

const Item = styled.li`
  width: 100%;
  display: grid;
  grid-template: auto / 64px 1fr;
  grid-gap: 16px;
`
const ItemTitle = styled.h4`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #f2f2f2;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`
const ItemDescription = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #bdbdbd;
`
const WinsAndDefeats = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: #a0a0a0;
`
