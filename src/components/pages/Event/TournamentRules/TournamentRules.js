import React from 'react'
import styled from 'styled-components'
import Checkbox from '@mui/material/Checkbox'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

function TournamentRules({ event, rules }) {
  const [checked, setChecked] = React.useState(false)
  const { t: tEventDetail } = useTranslation('eventDetail')

  return (
    <TournamentRulesContainer>
      <TournamentRulesHeading>
        <TournamentRulesHeadingText>
          {tEventDetail('event.tournamentRules.tournamentRules')}
        </TournamentRulesHeadingText>
      </TournamentRulesHeading>
      <Line />
      <TournamentRulesHeroInfo>
        {!!rules?.rules && (
          <TournamentRulesHeroInfoText dangerouslySetInnerHTML={{ __html: rules.rules }} />
        )}
        <TournamentRulesHeroBottomInfo>
          <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
          <TournamentRulesHeroBottomInfoText>
            {tEventDetail('event.tournamentRules.agree')}
          </TournamentRulesHeroBottomInfoText>
        </TournamentRulesHeroBottomInfo>
      </TournamentRulesHeroInfo>
      <Line />
      <TournamentRulesBottomButtons>
        <Link href={`/events/${event?.id}/`}>
          <TournamentRulesBottomButton>
            {tEventDetail('event.tournamentRules.cancel')}
          </TournamentRulesBottomButton>
        </Link>
        <Link href={`/events/${event?.id}/registration`} passHref>
          <TournamentRulesBottomButton
            disabled={!checked}
            background={checked && 'linear-gradient(90deg, #3F82E1 0%, #7A3FED 100%)'}
          >
            {tEventDetail('event.tournamentRules.further')}
          </TournamentRulesBottomButton>
        </Link>
      </TournamentRulesBottomButtons>
    </TournamentRulesContainer>
  )
}

export default TournamentRules

const TournamentRulesBottomButtons = styled.div`
  padding: 32px;
  border: 1px solid #333333;
  height: 128px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const TournamentRulesBottomButton = styled.button`
  background: ${({ background }) => (!!background ? background : '#828282')};
  border-radius: 16px;
  max-width: 256px;
  width: 100%;
  height: 64px;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  text-align: center;
  color: #fff;
  margin-left: 32px;

  &:first-child {
    margin-left: 0;
  }
`

const TournamentRulesContainer = styled.div`
  width: 100%;
  background-color: #1b1c22;
  border: 1px solid #333333;
  border-radius: 24px;
`
const TournamentRulesHeading = styled.div`
  height: 96px;
  display: flex;
  align-items: center;
  padding: 32px;
`
const TournamentRulesHeroInfo = styled.div`
  padding: 32px;
`

const TournamentRulesHeroBottomInfo = styled.div`
  margin-top: 32px;
  display: flex;
  align-items: center;
  margin-left: -10px;
`

const TournamentRulesHeroBottomInfoText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  color: #f2f2f2;
`

const TournamentRulesHeroInfoText = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  color: #f2f2f2;
`

const TournamentRulesHeadingText = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
`

const Line = styled.div`
  border-bottom: 1px solid #333333;
  width: 100%;
`
