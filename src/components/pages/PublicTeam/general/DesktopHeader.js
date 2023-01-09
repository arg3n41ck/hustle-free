import { useTranslation } from 'next-i18next'
import React from 'react'
import { HeaderWrapper } from '../../LkOg/Tabs/Events/Events/Events'
import { TitleHeader } from '../../../ui/LKui/HeaderContent'
import LkDefaultHeader from '../../../ui/LKui/LKDefaultHeader'
import ApplyToTeam from './ApplyToTeam'

function DesktopHeader({ onToggleSidebar }) {
  const { t: tLkTm } = useTranslation('lkTm')

  return (
    <LkDefaultHeader onToggleSidebar={onToggleSidebar}>
      <HeaderWrapper>
        <TitleHeader>{tLkTm('teamProfile.profile')}</TitleHeader>
        <ApplyToTeam />
      </HeaderWrapper>
    </LkDefaultHeader>
  )
}

export default DesktopHeader
