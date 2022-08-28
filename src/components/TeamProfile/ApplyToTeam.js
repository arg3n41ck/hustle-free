import React, { useCallback, useState } from 'react'
import { CreateEventBTN, PlusIcon } from '../pages/Team/TeamProfile'
import $api from '../../services/axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { localStorageSetItem } from '../../helpers/helpers'

function ApplyToTeam({ checkUserStatus, userStatusInTeam }) {
  const {
    query: { id: teamId },
  } = useRouter()
  const { push: routerPush } = useRouter()
  const { user, userAuthenticated } = useSelector((state) => state.user)

  const sendReq = useCallback(async () => {
    console.log({ userStatusInTeam })
    if (
      (userStatusInTeam?.message === 'Not found' ||
        userStatusInTeam?.message === 'User rejected') &&
      user
    ) {
      try {
        await $api.post('/teams/athlete_requests/', { team: teamId, athlete: user?.athleteId })
        checkUserStatus()
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
        'Запрошено'
      ) : (
        'Вы уже в команде'
      )}
    </CreateEventBTN>
  ) : null
}

export default ApplyToTeam
