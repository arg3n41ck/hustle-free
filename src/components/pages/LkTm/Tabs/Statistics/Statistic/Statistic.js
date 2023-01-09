import React from 'react'
import HeaderWithBack from '../../../../../ui/LKui/HeaderWithBack'
import Row from './Row'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { theme } from '../../../../../../styles/theme'

function Statistic({ statistic, isPublic = false, teamId }) {
  const { eventParticipantsCategory, name } = statistic
  const { t: tLkTm } = useTranslation('lkTm')

  return (
    <MainWrapper>
      <HeaderWithBack
        link={teamId && isPublic ? `/team/${teamId}/statistics/` : '/lk-tm/profile/statistics'}
        title={name}
      />
      <Title>{tLkTm('statistics.categories')}</Title>
      <Rows>
        {!!eventParticipantsCategory?.length ? (
          eventParticipantsCategory.map((ePC, index) => (
            <>
              {!!ePC?.participantsCategory?.length &&
                ePC?.participantsCategory.map(({ level, participants }, i) => (
                  <Row
                    key={`EPC-${ePC.id}-${index}-${i}`}
                    ePC={{ ...ePC, level }}
                    participants={participants}
                  />
                ))}
            </>
          ))
        ) : (
          <Empty>{tLkTm('statistics.noCategories')}</Empty>
        )}
      </Rows>
    </MainWrapper>
  )
}

export default Statistic

const MainWrapper = styled.div`
  margin: 32px 0 0;
  background: #1b1c22;
  border-radius: 24px;
  border: 1px solid #333;
`
const Rows = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  grid-row-gap: 32px;

  ${theme.mqMax('xl')} {
    padding: 20px;
    grid-row-gap: 20px;
  }

  ${theme.mqMax('md')} {
    padding: 16px;
    grid-row-gap: 16px;
  }
`

const Title = styled.h1`
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  color: #bdbdbd;
  padding: 32px 32px 0;
  border-top: 1px solid #333;

  ${theme.mqMax('xl')} {
    padding: 20px 20px 0;
  }

  ${theme.mqMax('md')} {
    padding: 16px 16px 0;
  }
`

const Empty = styled.p``
