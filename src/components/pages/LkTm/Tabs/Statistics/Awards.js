import React from 'react'
import { GoldMedalIcon } from '../../../../../assets/svg/icons'
import { SilverMedalIcon } from '../../../../../assets/svg/icons'
import { BronzeMedalIcon } from '../../../../../assets/svg/icons'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { theme } from '../../../../../styles/theme'
import { useMediaQuery } from '@mui/material'

function Awards({ places }) {
  const md = useMediaQuery('(max-width: 768px)')
  const { t: tLkTm } = useTranslation('lkTm')
  const medalsStyle = md ? { width: 88, height: 88 } : { width: 104, height: 104 }

  return (
    <AwardsWrapper>
      <Award>
        <GoldMedalIcon style={medalsStyle} />
        <AwardInfo>
          <AwardText color={'#FFC107'}>{tLkTm('statistics.gold')}:</AwardText>
          <AwardNumbers color={'#FFC107'}>{places?.gold || 0}</AwardNumbers>
        </AwardInfo>
      </Award>
      <Lines />
      <Award>
        <SilverMedalIcon style={medalsStyle} />
        <AwardInfo>
          <AwardText color={'#E0E0E0'}>{tLkTm('statistics.silver')}:</AwardText>
          <AwardNumbers color={'#E0E0E0'}>{places?.silver || 0}</AwardNumbers>
        </AwardInfo>
      </Award>
      <Lines />
      <Award>
        <BronzeMedalIcon style={medalsStyle} />
        <AwardInfo>
          <AwardText color={'#D7832D'}>{tLkTm('statistics.bronze')}:</AwardText>
          <AwardNumbers color={'#D7832D'}>{places?.bronze || 0}</AwardNumbers>
        </AwardInfo>
      </Award>
    </AwardsWrapper>
  )
}

export default Awards

const AwardsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content 1fr min-content 1fr;
  grid-gap: 17px;

  padding: 32px;

  ${theme.mqMax('xl')} {
    padding: 16px 0;
  }

  ${theme.mqMax('md')} {
    padding: 16px 0;
  }
`

const Lines = styled.div`
  height: 100%;
  width: 2px;
  border-left: 1px solid #333;
`

const Award = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  ${theme.mqMax('xl')} {
    grid-gap: 12px;
  }
`

const AwardInfo = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  ${theme.mqMax('xl')} {
    align-items: center;
  }

  ${theme.mqMax('md')} {
    width: min-content;
  }
`

const AwardText = styled.p`
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  color: ${(p) => p.color};

  ${theme.mqMax('md')} {
    font-size: 18px;
  }
`

const AwardNumbers = styled(AwardText)`
  font-size: 48px;
  line-height: 56px;

  ${theme.mqMax('md')} {
    font-size: 32px;
    line-height: 40px;
  }
`
