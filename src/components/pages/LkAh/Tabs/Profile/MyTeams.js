import React, { useMemo, useRef, useState } from 'react'
import LkDefaultHeader from '../../../../ui/LKui/LKDefaultHeader'
import { TitleHeader } from '../../../../ui/LKui/HeaderContent'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAthleteTeams, teamsSelector } from '../../../../../redux/components/teams'
import Teams from './Teams/Teams'
import { fetchCountries } from '../../../../../redux/components/countriesAndCities'
import { useTranslation } from 'next-i18next'
import HorizontalTabsBorder from '../../../../ui/tabs/HorizontalTabsBorder'
import { useEffect } from 'react'
import styled from 'styled-components'
import TeamsModalTemplate from './Teams/TeamsModalTemplate'
import { theme } from '../../../../../styles/theme'

function MyTeams({ onToggleSidebar }) {
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [athleteTeams] = useSelector(teamsSelector)

  const teams = useMemo(() => {
    const check = new Set()
    return (
      athleteTeams?.length &&
      athleteTeams.filter((rq) => !check.has(rq?.team?.id) && check.add(rq?.team?.id))
    )
  }, [athleteTeams])

  const { t: tLkAh } = useTranslation('lkAh')
  const [view, setView] = React.useState('all') // all | approved | panding
  const [open, setOpen] = useState(false)

  const { current: tabs } = useRef([
    {
      id: 1,
      name: tLkAh('myTeams.tabs.all'),
      value: 'all',
    },
    {
      id: 2,
      name: tLkAh('myTeams.tabs.approved'),
      value: 'approved',
    },
    {
      id: 3,
      name: tLkAh('myTeams.tabs.panding'),
      value: 'in_panding',
    },
  ])

  useEffect(() => {
    dispatch(fetchCountries())
  }, [])

  React.useEffect(() => {
    !!user?.athleteId &&
      dispatch(fetchAthleteTeams({ athlete: user.athleteId, status: view === 'all' ? '' : view }))
  }, [user, view])

  return (
    <div>
      <LkDefaultHeader onToggleSidebar={onToggleSidebar}>
        <TitleHeader>{tLkAh('myTeams.myTeams')}</TitleHeader>
      </LkDefaultHeader>
      <HorizontalTabsBorder
        arrayTab={tabs}
        valueTab={view}
        onChangeHandler={(value) => setView(value)}
        height={'96px'}
      >
        <TeamsModalTemplate open={open} onClose={() => setOpen(false)} />
        <TeamsWrapper>
          {!!teams?.length && <Teams athleteTeams={teams} />}
          <JoinToTeam onClick={() => setOpen(true)}>
            <Plus />
            <p>Вступить в команду</p>
          </JoinToTeam>
        </TeamsWrapper>
      </HorizontalTabsBorder>
    </div>
  )
}

export default MyTeams

const TeamsWrapper = styled.div`
  min-height: 200px;
`

const JoinToTeam = styled.button`
  height: 205px;

  border: 1px dashed #828282;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 10px;

  margin: 32px;
  padding: 16px;

  ${theme.mqMax('sm')} {
    height: 148px;
    margin: 16px;
    width: 100%;
  }

  ${theme.mqMax('xl')} {
    margin: 16px;
  }

  p {
    font-weight: 400;
    font-size: 18px;
    color: #bdbdbd;
  }
`

const Plus = (props) => (
  <svg
    {...props}
    width='80'
    height='80'
    viewBox='0 0 80 80'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M40 20L40 60' stroke='#6D4EEA' stroke-width='4' stroke-linecap='round' />
    <path d='M60 40L20 40' stroke='#6D4EEA' stroke-width='4' stroke-linecap='round' />
  </svg>
)
