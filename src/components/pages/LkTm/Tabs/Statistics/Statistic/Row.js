import React, { useState } from 'react'
import DropdownData from '../../../../../ui/DropdownData'
import { PlaceIcon } from '../../../../LkAh/Tabs/Profile/Stories/FilterMyStories'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

function Row({ ePC, participants }) {
  const [open, setOpen] = useState(false)
  const { t: tLkTm } = useTranslation('lkTm')

  return (
    <DropdownData
      title={`
     ${ePC.name ? ePC.name + ' /' : ''} ${ePC.level ? ePC.level + ' /' : ''} ${ePC.fromAge || 0}-${
        ePC.toAge || 0
      } лет / ${ePC.fromWeight || 0}-${ePC.toWeight || 0} кг
    `}
      active={open}
      setActive={setOpen}
    >
      <ListWrapper>
        {!!participants?.length ? (
          participants.map(({ athleteName, place }, index) => (
            <AthleteWrapper key={`statistic-athlete-${index}`}>
              <PlaceIcon place={place || 0} />
              <AthleteName>{athleteName}</AthleteName>
              {!!place && (
                <WDWrapper>
                  <WinDefeat>
                    <p className='win'>{tLkTm('statistics.win')}</p>
                    <p>{athleteName}</p>
                  </WinDefeat>
                  <WinDefeat>
                    <p className='defeat'>{tLkTm('statistics.defeat')}</p>
                    <p>{athleteName}</p>
                  </WinDefeat>
                </WDWrapper>
              )}
            </AthleteWrapper>
          ))
        ) : (
          <p>Нет участников</p>
        )}
      </ListWrapper>
    </DropdownData>
  )
}

export default Row

const AthleteWrapper = styled.div`
  display: grid;
  grid-template: 1fr / 105px 1.5fr 1fr;
  grid-gap: 24px;
  align-items: center;
  justify-items: flex-start;
`

const AthleteName = styled.p`
  font-weight: 700;
  font-size: 28px;
  line-height: 32px;
  text-transform: uppercase;
  color: #f2f2f2;
`

const WDWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template: 1fr / 1fr 1fr;
  grid-column-gap: 24px;
`

const WinDefeat = styled.div`
  padding: 0 0 0 24px;
  border-left: 1px solid #333;
  display: flex;
  flex-direction: column;
  grid-row-gap: 4px;
  justify-content: center;

  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }

  p:first-child {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;

    &.win {
      color: #27ae60;
    }

    &.defeat {
      color: #eb5757;
    }
  }
`

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 24px;
`
