import { Avatar } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import { theme } from '../../../styles/theme'

function CommunitiesOrganizersList({ data }) {
  const { push: routerPush } = useRouter()
  return (
    <CommunitesListItems>
      {!!data?.length &&
        data.map((item) => {
          const { id, user } = item

          return (
            <ItemWrapper key={`comm-teams-${id}`}>
              <Item>
                <Avatar
                  alt={`${user?.avatar || ''}`}
                  src={user?.avatar || ''}
                  sx={{ width: 48, height: 48 }}
                />
                <div>
                  <ItemTitle
                    onClick={() => {
                      // routerPush(`/organizer/${id}`)
                    }}
                  >
                    {`${user?.firstName} ${user?.lastName}`}
                  </ItemTitle>
                  {/* <Results>8287 wins / 8294 losses</Results>
                  <MembersCount>{0} Атлет</MembersCount> */}
                </div>
              </Item>
            </ItemWrapper>
          )
        })}
    </CommunitesListItems>
  )
}

export default CommunitiesOrganizersList

const CommunitesListItems = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 32px;
`

const ItemWrapper = styled.div`
  background: #1b1c22;
  border: 1px solid #1b1c22;
  border-radius: 16px;
  padding: 24px;

  ${theme.mqMax('xl')} {
    padding: 16px;
  }
`

const Item = styled.li`
  width: 100%;
  display: grid;
  grid-template: auto / 48px 1fr;
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
const Results = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #a0a0a0;
`
const MembersCount = styled.p`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #bdbdbd;
`
