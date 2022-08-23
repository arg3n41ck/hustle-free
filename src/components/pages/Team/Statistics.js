import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Events from '../LkTm/Tabs/Statistics/Events'
import Awards from '../LkTm/Tabs/Statistics/Awards'
import HeaderContent, { TitleHeader } from '../../ui/LKui/HeaderContent'
import { useTranslation } from 'next-i18next'
import { getTeamData } from './TeamProfile'

const Statistics = ({ onToggleSidebar }) => {
  const {
    query: { id: teamId },
  } = useRouter()
  const [team, setTeam] = useState(null)
  const { t: tLkTm } = useTranslation('lkTm')

  useEffect(() => {
    getTeamData(teamId).then(setTeam)
  }, [])

  return (
    <>
      <HeaderContent onToggle={onToggleSidebar}>
        <TitleHeader>{tLkTm('statistics.statistic')}</TitleHeader>
      </HeaderContent>
      {team && <Awards places={team?.places} />}
      {teamId && <Events teamId={teamId} isPublic />}
    </>
  )
}

export default Statistics
