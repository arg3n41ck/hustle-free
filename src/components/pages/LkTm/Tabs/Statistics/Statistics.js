import React from 'react'
import HeaderContent, { TitleHeader } from '../../../../ui/LKui/HeaderContent'
import Events from './Events'
import Awards from './Awards'
import { useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'

const Statistics = ({ onToggleSidebar }) => {
  const user = useSelector((state) => state.user.user)
  const { t: tLkTm } = useTranslation('lkTm')

  return (
    <>
      <HeaderContent onToggle={onToggleSidebar}>
        <TitleHeader>{tLkTm('statistics.statistic')}</TitleHeader>
      </HeaderContent>
      {user && <Awards places={user?.places} />}
      {user && <Events teamId={user?.teamId} />}
    </>
  )
}

export default Statistics
