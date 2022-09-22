import { Avatar, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { SearchIcon } from '../../../../../../assets/svg/icons'
import useDebounce from '../../../../../../hooks/useDebounce'
import {
  fetchAthleteTeams,
  fetchTeams,
  teamsSelector,
} from '../../../../../../redux/components/teams'
import $api from '../../../../../../services/axios'
import { theme } from '../../../../../../styles/theme'

const applyToTeam = async (body) => {
  await $api.post('/teams/athlete_requests/', body)
}

function TeamSearchContent({ onClose, selectedTeam, setSelectedTeam, setModOpen, teamsRequests }) {
  const [athleteTeams, teams] = useSelector(teamsSelector)
  const { user } = useSelector((state) => state.user)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTeams({ search: debouncedSearch }))
  }, [debouncedSearch])

  const onSubmit = async () => {
    if (selectedTeam?.preliminaryModeration) {
      setModOpen(true)
      return
    }
    selectedTeam && (await applyToTeam({ team: selectedTeam?.id, athlete: user?.athleteId }))
    dispatch(fetchAthleteTeams({ athletes: user.athleteId }))
    onClose()
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
                  (teamsRequests || []).includes(id) || athleteTeams.some((team) => team?.id == id)
                )
              })
              .map((item) => {
                const { id, user, fullNameCoach, teamMembersCount, preliminaryModeration } = item

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
                        <ItemTitle>{fullNameCoach || ''}</ItemTitle>
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
