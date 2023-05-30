import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useMediaQuery } from '@mui/material'
import { theme } from '../../../../styles/theme'

const TeamItem = ({ team, index }) => {
  const { t: tEventDetail } = useTranslation('eventDetail')
  const mxMd = useMediaQuery('(max-width: 620px)')

  return (
    <Item>
      <Link href={`/team/${team?.team?.id}`} passHref>
        <A>
          <ItemLeft>
            <ItemNumber>{index}.</ItemNumber>
            <ItemText>
              <ItemTitle>{team?.team?.name}</ItemTitle>
              <ItemDescription>{team?.team?.country?.name}</ItemDescription>
            </ItemText>
          </ItemLeft>
          <ItemRight>
            <Info>
              {!mxMd && (
                <InfoItem color={'#828282'}>
                  <p>{team?.countParticipant || 0}</p>
                  <div>{tEventDetail('event.results.teamItem.participant')}</div>
                </InfoItem>
              )}
              <InfoItem color={'#27AE60'}>
                <p>{team?.wins || 0}</p>
                <div>{tEventDetail('event.results.teamItem.wins')}</div>
              </InfoItem>
              <InfoItem color={'#EB5757'}>
                <p>{team?.defeats || 0}</p>
                <div>{tEventDetail('event.results.teamItem.defeats')}</div>
              </InfoItem>
            </Info>
            <Medal>
              <InfoItem color={'#FFC107'}>
                <p>{team?.team?.places?.gold || 0}</p>
                <div>{tEventDetail('event.results.teamItem.gold')}</div>
              </InfoItem>
              <InfoItem color={'#E0E0E0'}>
                <p>{team?.team?.places?.silver || 0}</p>
                <div>{tEventDetail('event.results.teamItem.silver')}</div>
              </InfoItem>
              <InfoItem color={'#D7832D'}>
                <p>{team?.team?.places?.bronze || 0}</p>
                <div>{tEventDetail('event.results.teamItem.bronze')}</div>
              </InfoItem>
            </Medal>
          </ItemRight>
        </A>
      </Link>
    </Item>
  )
}
const Item = styled.li``
const A = styled.a`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #333333;
  padding-bottom: 32px;
  grid-gap: 16px;

  ${theme.mqMax('xl')} {
    flex-direction: column;
  }
`
const ItemLeft = styled.div`
  display: flex;
  align-items: center;
`
const ItemRight = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 20px;
  /* flex-wrap: wrap; */

  ${theme.mqMax('md')} {
    grid-gap: 16px;
  }
`
const ItemNumber = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #828282;
  margin-right: 30px;
`
const ItemText = styled.div`
  display: flex;
  flex-direction: column;
`
const ItemTitle = styled.h4`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  text-transform: uppercase;
  color: #f2f2f2;
`
const ItemDescription = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #828282;
`
const Info = styled.div`
  display: flex;
  grid-gap: 20px;
  border-right: 1px solid #333333;
  border-left: 1px solid #333333;
  padding: 0 20px;

  ${theme.mqMax('xl')} {
    padding: 0;
    border: none;
  }

  ${theme.mqMax('md')} {
    grid-gap: 16px;
  }
`

const Medal = styled.div`
  display: flex;
  grid-gap: 20px;
  @media screen and (max-width: 450px) {
    width: 100%;
    grid-gap: 16px;
  }
`

const InfoItem = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${(p) => p.color};
  p {
    margin-bottom: 4px;
  }

  @media screen and (max-width: 450px) {
    div,
    p {
      font-weight: 400;
      font-size: 13px;
      line-height: 20px;
    }
  }
`

export default TeamItem
