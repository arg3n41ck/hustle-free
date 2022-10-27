import React from 'react'
import styled from 'styled-components'
import Athlete from '../../ui/Ahtletes/Athlete'
import { useTranslation } from 'next-i18next'
import { theme } from '../../../styles/theme'

function CommunitesAthletesList({ data }) {
  const { t: tCommon } = useTranslation('common')
  const { t: tCommunities } = useTranslation('communities')

  return (
    <CommunitesAthletesListItems>
      {!!data?.length &&
        data.map((item) => {
          const { id, user, teams } = item
          return (
            <Athlete
              key={`communities-${id}-${user?.id}`}
              athleteId={id}
              team={teams[0]}
              user={user}
            >
              {/* <AthletesBottomInfo>
                <AthletesBottomItem>
                  <AthletesBottomItemTextHeading>
                    {tCommunities('communities.country')}
                  </AthletesBottomItemTextHeading>
                  <AthletesBottomItemText>
                    {user.country || tCommunities('communities.notSpecified')}
                  </AthletesBottomItemText>
                </AthletesBottomItem>
                <AthletesBottomItem>
                  <AthletesBottomItemTextHeading>
                    {tCommon('form.fieldsNames.gender.label')}
                  </AthletesBottomItemTextHeading>
                  <AthletesBottomItemText>
                    {user?.gender === 'male'
                      ? tCommunities('communities.male')
                      : user?.gender === 'female'
                      ? tCommunities('communities.female')
                      : tCommunities('communities.notSpecified')}
                  </AthletesBottomItemText>
                </AthletesBottomItem>
              </AthletesBottomInfo> */}
            </Athlete>
          )
        })}
    </CommunitesAthletesListItems>
  )
}

export default CommunitesAthletesList

const CommunitesAthletesListItems = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 32px;

  ${theme.mqMax('lg')} {
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
  }

  ${theme.mqMax('md')} {
    grid-template-columns: 1fr;
  }
`
