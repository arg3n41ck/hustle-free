import React, { useCallback, useEffect } from 'react'
import { PlusIcon } from '../TeamProfile'
import $api from '../../../../services/axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { localStorageSetItem } from '../../../../helpers/helpers'
import { getIsUserInTeam } from '../../../../redux/components/teams'
import styled from 'styled-components'
import { theme } from '../../../../styles/theme'

function ApplyToTeam() {
  const {
    query: { id: teamId },
  } = useRouter()
  const { push: routerPush } = useRouter()
  const dispatch = useDispatch()
  const { user, userAuthenticated } = useSelector((state) => state.user)
  const userStatusInTeam = useSelector((state) => state.teams.team.userStatusInTeam.status)

  useEffect(() => {
    teamId && dispatch(getIsUserInTeam({ teamId }))
  }, [teamId])

  const sendReq = useCallback(async () => {
    if (
      (userStatusInTeam?.message === 'Not found' ||
        userStatusInTeam?.message === 'User rejected') &&
      user
    ) {
      try {
        await $api.post('/teams/athlete_requests/', { team: teamId, athlete: user?.athleteId })
        dispatch(getIsUserInTeam({ teamId }))
      } catch (e) {
        console.log(e)
      }
    } else if (userStatusInTeam?.message === 'Is anonymous') {
      toast.info('Войдите в систему в роли атлета', { autoClose: 5000 })
      localStorageSetItem('role', 'athlete')
      routerPush('/registration')
    }
  }, [userStatusInTeam, user])

  return (userAuthenticated && user?.role === 'athlete') || !userAuthenticated ? (
    <CreateEventBTN
      disabled={
        userStatusInTeam?.message !== 'Is anonymous' &&
        userStatusInTeam?.message !== 'Not found' &&
        userStatusInTeam?.message !== 'User rejected'
      }
      active={
        userStatusInTeam?.message === 'Not found' ||
        userStatusInTeam?.message === 'Is anonymous' ||
        userStatusInTeam?.message === 'User rejected'
      }
      onClick={() => sendReq()}
    >
      {userStatusInTeam?.message === 'Not found' ||
      userStatusInTeam?.message === 'Is anonymous' ||
      userStatusInTeam?.message === 'User rejected' ? (
        <>
          <PlusIcon /> Вступить в команду
        </>
      ) : userStatusInTeam?.message === 'User in pending' ? (
        'На модерации'
      ) : (
        'Вы уже в команде'
      )}
    </CreateEventBTN>
  ) : null
}

export default ApplyToTeam

const CreateEventBTN = styled.button`
  padding: 4px 20px;
  background: ${({ active }) =>
    active ? 'linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%)' : '#333'};
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  line-height: 40px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  grid-column-gap: 8px;

  ${theme.mqMax('md')} {
    width: 100%;
    justify-content: center;
  }
`
