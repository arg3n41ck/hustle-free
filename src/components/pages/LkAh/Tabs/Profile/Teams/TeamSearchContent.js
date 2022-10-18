import { Avatar, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { SearchIcon } from '../../../../../../assets/svg/icons'
import useDebounce from '../../../../../../hooks/useDebounce'
import { fetchTeams, teamsSelector } from '../../../../../../redux/components/teams'
import { theme } from '../../../../../../styles/theme'

function TeamSearchContent({ onClose, selectedTeam, setSelectedTeam, setModOpen, teamsRequests }) {
  const [athleteTeams, teams] = useSelector(teamsSelector)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTeams({ search: debouncedSearch }))
  }, [debouncedSearch])

  const onSubmit = async () => {
    if (selectedTeam?.id) {
      setModOpen(true)
      return
    }
  }

  return (
    <>
      <Title>Вступить команду</Title>
      <TeamsForm>
        <TextField
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root > input': {
              margin: '0 0 0 -20px !important',
            },
            '& .MuiOutlinedInput-root': {
              background: '#0F0F10 !important',
              '& svg path': { fill: '#A0A0A0 !important' },
            },
          }}
          onChange={({ target: { value } }) => setSearch(value)}
          fullWidth
          placeholder='Найти команду'
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
        />

        <Teams>
          {!!teams?.length &&
            teams
              .filter(({ id }) => {
                return !(
                  (teamsRequests || []).includes(id) ||
                  athleteTeams.some(({ team }) => team?.id == id)
                )
              })
              .map((item) => {
                const { id, user, name, teamMembersCount, preliminaryModeration } = item

                return (
                  <ItemWrapper
                    onClick={() =>
                      setSelectedTeam((s) =>
                        s?.id === id ? null : { id: id, preliminaryModeration },
                      )
                    }
                    active={selectedTeam?.id === id}
                    key={`comm-teams-${id}`}
                  >
                    <Item>
                      <Avatar
                        alt={`${user?.avatar || ''}`}
                        src={user?.avatar || ''}
                        sx={{ width: 48, height: 48 }}
                      />
                      <div>
                        <TitleContainer>
                          {preliminaryModeration && lockIcon}
                          <ItemTitle>{name || ''}</ItemTitle>
                        </TitleContainer>
                        <Results>8287 wins / 8294 losses</Results>
                        <MembersCount>{teamMembersCount || 0} Атлет</MembersCount>
                      </div>
                    </Item>
                  </ItemWrapper>
                )
              })}
        </Teams>
      </TeamsForm>

      <Footer>
        <Cancel onClick={onClose}>Назад</Cancel>
        <Submit variant='filled' onClick={onSubmit}>
          Далее
        </Submit>
      </Footer>
    </>
  )
}

export default TeamSearchContent

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const Title = styled.p`
  padding: 24px;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
  border-bottom: 1px solid #333333;

  ${theme.mqMax('xl')} {
    padding: 16px;
  }
`

const TeamsForm = styled.div`
  padding: 24px 24px 0;
  display: flex;
  flex-direction: column;
  grid-gap: 16px;

  ${theme.mqMax('xl')} {
    padding: 16px 16px 0;
  }
`

const Footer = styled.div`
  display: flex;
  padding: 24px;
  grid-gap: 10px;

  border-top: 1px solid #333333;

  ${theme.mqMax('xl')} {
    padding: 16px;
  }
`

const Submit = styled.button`
  width: 100%;
  background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
  border-radius: 16px;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  padding: 8px 24px;
  ${theme.mqMax('xl')} {
    padding: 4px 16px;
  }
`

const Cancel = styled.button`
  width: 100%;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  text-align: center;
  color: #828282;
  border-radius: 16px;
  padding: 8px 24px;
  ${theme.mqMax('xl')} {
    padding: 4px 16px;
  }
`

const Teams = styled.div`
  max-height: 480px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`

const ItemWrapper = styled.div`
  background: #1b1c22;
  border: 1px solid ${({ active }) => (active ? '#6D4EEA' : '#1b1c22')};
  border-radius: 16px;
  padding: 24px;

  ${theme.mqMax('xl')} {
    padding: 16px;
  }

  cursor: pointer;
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

const lockIcon = (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M4.87868 20.1213L4.17157 20.8284L4.87868 20.1213ZM19.1213 20.1213L18.4142 19.4142L19.1213 20.1213ZM19.4142 9.58579L20.1213 8.87868L19.4142 9.58579ZM8 10H16V8H8V10ZM19 13V15H21V13H19ZM14 20H10V22H14V20ZM5 15V13H3V15H5ZM10 20C8.55752 20 7.57625 19.9979 6.84143 19.8991C6.13538 19.8042 5.80836 19.6368 5.58579 19.4142L4.17157 20.8284C4.82768 21.4845 5.64711 21.7565 6.57494 21.8812C7.474 22.0021 8.61406 22 10 22V20ZM3 15C3 16.3859 2.99788 17.526 3.11875 18.4251C3.2435 19.3529 3.51546 20.1723 4.17157 20.8284L5.58579 19.4142C5.36322 19.1916 5.19584 18.8646 5.10092 18.1586C5.00212 17.4237 5 16.4425 5 15H3ZM19 15C19 16.4425 18.9979 17.4237 18.8991 18.1586C18.8042 18.8646 18.6368 19.1916 18.4142 19.4142L19.8284 20.8284C20.4845 20.1723 20.7565 19.3529 20.8812 18.4251C21.0021 17.526 21 16.3859 21 15H19ZM14 22C15.3859 22 16.526 22.0021 17.4251 21.8812C18.3529 21.7565 19.1723 21.4845 19.8284 20.8284L18.4142 19.4142C18.1916 19.6368 17.8646 19.8042 17.1586 19.8991C16.4237 19.9979 15.4425 20 14 20V22ZM16 10C16.9711 10 17.5988 10.0021 18.0613 10.0643C18.495 10.1226 18.631 10.2168 18.7071 10.2929L20.1213 8.87868C19.6117 8.36902 18.9833 8.17027 18.3278 8.08214C17.701 7.99788 16.9145 8 16 8V10ZM21 13C21 12.0855 21.0021 11.299 20.9179 10.6722C20.8297 10.0167 20.631 9.38834 20.1213 8.87868L18.7071 10.2929C18.7832 10.369 18.8774 10.505 18.9357 10.9387C18.9979 11.4012 19 12.0289 19 13H21ZM8 8C7.08546 8 6.29896 7.99788 5.67221 8.08214C5.01669 8.17027 4.38834 8.36902 3.87868 8.87868L5.29289 10.2929C5.36902 10.2168 5.50496 10.1226 5.9387 10.0643C6.40121 10.0021 7.02892 10 8 10V8ZM5 13C5 12.0289 5.00212 11.4012 5.06431 10.9387C5.12262 10.505 5.21677 10.369 5.29289 10.2929L3.87868 8.87868C3.36902 9.38834 3.17027 10.0167 3.08214 10.6722C2.99788 11.299 3 12.0855 3 13H5Z'
      fill='#A0A0A0'
    />
    <path
      d='M15 8C15 8.55228 15.4477 9 16 9C16.5523 9 17 8.55228 17 8H15ZM7 8C7 8.55228 7.44772 9 8 9C8.55228 9 9 8.55228 9 8H7ZM17 8V7H15V8H17ZM7 7V8H9V7H7ZM12 2C9.23858 2 7 4.23858 7 7H9C9 5.34315 10.3431 4 12 4V2ZM17 7C17 4.23858 14.7614 2 12 2V4C13.6569 4 15 5.34315 15 7H17Z'
      fill='#A0A0A0'
    />
    <circle cx='12' cy='15' r='2' fill='#A0A0A0' />
  </svg>
)
