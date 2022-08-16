import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import AthleteUserData from './AthleteUserData'
import { useDispatch } from 'react-redux'
import { fetchCountries } from '../../../redux/components/countriesAndCities'
import Teams from './Teams'
import Participations from './Participations'
import HorizontalTabsBorder from '../../ui/tabs/HorizontalTabsBorder'
import { useTranslation } from 'next-i18next'

function PublicAthlete({ athleteData }) {
  const { user, teams, participations, isVisible } = athleteData
  const [view, setView] = React.useState('all') // all | wins | draws | defeats
  const dispatch = useDispatch()
  const { t: tLkAh } = useTranslation('lkAh')
  useEffect(() => {
    dispatch(fetchCountries())
  }, [])

  const { current: tabs } = useRef([
    {
      id: 1,
      name: tLkAh('myHistory.tabs.all'),
      value: 'all',
    },
    {
      id: 2,
      name: tLkAh('myHistory.tabs.wins'),
      value: 'wins',
    },
    {
      id: 3,
      name: tLkAh('myHistory.tabs.draws'),
      value: 'draws',
    },
    {
      id: 4,
      name: tLkAh('myHistory.tabs.defeats'),
      value: 'defeats',
    },
  ])
  console.log({participations})
  return (
    <MainWrapper>
      {user && <AthleteUserData user={user} isVisible={isVisible} />}
      {!!teams && !!participations ? (
        <TeamsAndPartWrapper>
          <Teams teams={teams} />
          {!!participations?.length && (
            <HorizontalTabsBorder
              arrayTab={tabs}
              valueTab={view}
              onChangeHandler={(value) => setView(value)}
              height={'96px'}
            >
              {participations.map(({ event, participationCategory }, i) => {
                const {
                  eventParticipantsCategory: { name, fromAge, toAge, fromWeight, toWeight },
                  level,
                } = participationCategory

                return (
                  <Participations
                    key={`${event?.name}-${i}`}
                    eventName={event?.name}
                    level={level}
                    name={name}
                    fromAge={fromAge}
                    toAge={toAge}
                    fromWeight={fromWeight}
                    toWeight={toWeight}
                  />
                )
              })}
            </HorizontalTabsBorder>
          )}
        </TeamsAndPartWrapper>
      ) : (
        <Private>
          {lock}
          <p>{tLkAh('closedProfile')}</p>
        </Private>
      )}
    </MainWrapper>
  )
}

export default PublicAthlete

const MainWrapper = styled.div`
  height: max-content;
  display: grid;
  justify-self: flex-start;
  grid-template-columns: 328px auto;
  background: #1b1c22;
  margin-top: 64px;
  border: 1px solid #333333;
  border-radius: 24px;
`
const TeamsAndPartWrapper = styled.div``

export const PubAthTitles = styled.h3`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
  grid-row-gap: 16px;
`

const Private = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    color: #f2f2f2;
  }
`

const lock = (
  <svg width='96' height='96' viewBox='0 0 96 96' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M32 39H64V33H32V39ZM77 52V60H83V52H77ZM56 81H40V87H56V81ZM19 60V52H13V60H19ZM40 81C34.2583 81 30.2539 80.9936 27.2325 80.5874C24.2974 80.1928 22.7431 79.471 21.636 78.364L17.3934 82.6066C19.8011 85.0143 22.8326 86.0498 26.433 86.5339C29.9471 87.0064 34.428 87 40 87V81ZM13 60C13 65.572 12.9936 70.0529 13.4661 73.567C13.9502 77.1674 14.9857 80.1989 17.3934 82.6066L21.636 78.364C20.529 77.2569 19.8072 75.7026 19.4126 72.7675C19.0064 69.7461 19 65.7417 19 60H13ZM77 60C77 65.7417 76.9936 69.7461 76.5874 72.7675C76.1928 75.7026 75.471 77.2569 74.364 78.364L78.6066 82.6066C81.0143 80.1989 82.0498 77.1674 82.5339 73.567C83.0064 70.0529 83 65.572 83 60H77ZM56 87C61.572 87 66.0529 87.0064 69.567 86.5339C73.1674 86.0498 76.1989 85.0143 78.6066 82.6066L74.364 78.364C73.2569 79.471 71.7026 80.1928 68.7675 80.5874C65.7461 80.9936 61.7417 81 56 81V87ZM64 39C67.856 39 70.4463 39.0064 72.3784 39.2661C74.2243 39.5143 75.0143 39.9432 75.5355 40.4645L79.7782 36.2218C77.9563 34.3999 75.6891 33.6573 73.1779 33.3196C70.753 32.9936 67.6864 33 64 33V39ZM83 52C83 48.3136 83.0064 45.247 82.6804 42.8221C82.3427 40.3109 81.6001 38.0437 79.7782 36.2218L75.5355 40.4645C76.0568 40.9857 76.4857 41.7757 76.7339 43.6216C76.9936 45.5537 77 48.144 77 52H83ZM32 33C28.3136 33 25.247 32.9936 22.8221 33.3196C20.3109 33.6573 18.0437 34.3999 16.2218 36.2218L20.4645 40.4645C20.9857 39.9432 21.7757 39.5143 23.6216 39.2661C25.5537 39.0064 28.144 39 32 39V33ZM19 52C19 48.144 19.0064 45.5537 19.2661 43.6216C19.5143 41.7757 19.9432 40.9857 20.4645 40.4645L16.2218 36.2218C14.3999 38.0437 13.6573 40.3109 13.3196 42.8221C12.9936 45.247 13 48.3136 13 52H19Z'
      fill='#828282'
    />
    <path
      d='M61 32C61 33.6569 62.3431 35 64 35C65.6569 35 67 33.6569 67 32H61ZM29 32C29 33.6569 30.3431 35 32 35C33.6569 35 35 33.6569 35 32H29ZM67 32V28H61V32H67ZM29 28V32H35V28H29ZM48 9C37.5066 9 29 17.5066 29 28H35C35 20.8203 40.8203 15 48 15V9ZM67 28C67 17.5066 58.4934 9 48 9V15C55.1797 15 61 20.8203 61 28H67Z'
      fill='#828282'
    />
    <circle cx='48' cy='60' r='8' fill='#828282' />
  </svg>
)
