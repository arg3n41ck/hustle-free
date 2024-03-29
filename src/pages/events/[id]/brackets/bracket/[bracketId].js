import React, { useEffect, useMemo } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchBracket,
  fetchBracketsFightsByParams,
  fetchParticipantAthletes,
  selectBrackets,
} from '../../../../../redux/components/eventBrackets'
import EdMainLayout from '../../../../../components/pages/Event/EDMainLayout'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import BracketBranched from '../../../../../components/pages/Event/Brackets/BracketModal/BracketBranched'
import BracketsThreeMan from '../../../../../components/pages/Event/Brackets/BracketModal/BracketsThreeMan'
import BracketsRobin from '../../../../../components/pages/Event/Brackets/BracketModal/BracketsRobin'
import $api from '../../../../../services/axios'
import { theme } from '../../../../../styles/theme'
import BracketHeaderInfo from '../../../../../components/pages/Event/Brackets/BracketModal/BracketHeaderInfo'
import BracketResultTable from '../../../../../components/pages/Event/Brackets/BracketModal/BracketResultTable'
import FullScreenLoader from '../../../../../components/ui/FullScreenLoader'
import ScoreboardLayout from '../../../../../components/pages/Event/Brackets/Scoreboard/ScoreboardLayout'

const bracketComponentByTypes = {
  1: {
    id: 1,
    name: 'SEWithoutBF',
    title: 'Single elimination bracket (without bronze fight)',
    component: (props) => <BracketBranched brType={'SEWithoutBF'} {...props} />,
  },
  2: {
    id: 2,
    name: 'SEWithBF',
    title: 'Single elimination bracket (with a bronze fight)',
    component: (props) => <BracketBranched brType={'SEWithBF'} {...props} />,
  },
  3: {
    id: 3,
    name: 'DEWithoutBZ',
    title: 'Double elimination bracket (without bronze fight)',
    component: (props) => <BracketBranched brType={'DEWithoutBZ'} {...props} />,
  },
  4: {
    id: 4,
    name: 'DEWithBZ',
    title: 'Double elimination bracket (with a bronze fight)',
    component: (props) => <BracketBranched brType={'DEWithBZ'} {...props} />,
  },
  5: {
    id: 5,
    name: 'TMC',
    title: 'Three man bracket, comeback',
    component: (props) => <BracketsThreeMan brType={'TMC'} {...props} />,
  },
  6: {
    id: 6,
    name: 'TMSW',
    title: 'Three man bracket, shortcut winner',
    component: (props) => <BracketsThreeMan brType={'TMSW'} {...props} />,
  },
  7: {
    id: 7,
    name: 'RR',
    title: 'Round Robin brackets',
    component: (props) => <BracketsRobin brType={'RR'} {...props} />,
  },
}

function Bracket({ event }) {
  const {
    query: { bracketId },
    back,
  } = useRouter()
  const [, bracketsFights, participantAthletes, , bracket] = useSelector(selectBrackets)

  const dispatch = useDispatch()

  useEffect(() => {
    bracketId && dispatch(fetchBracket({ bracketId }))
  }, [bracketId])

  useEffect(() => {
    if (bracket?.bracketType && bracketId) {
      dispatch(fetchBracketsFightsByParams({ bracket: bracketId, type: bracket?.bracketType }))
      dispatch(
        fetchParticipantAthletes({
          participation_category: bracket?.participationCategory,
        }),
      )
    }
  }, [bracket, bracketId])

  const { typeTitle, BracketWrapperByType } = useMemo(() => {
    const selectedBrType = bracket && bracketComponentByTypes?.[bracket?.bracketType]
    return {
      typeTitle: selectedBrType && selectedBrType?.title,
      BracketWrapperByType: (props) => selectedBrType && selectedBrType?.component(props),
    }
  }, [bracket])
  const fightersCount = useMemo(() => {
    return participantAthletes.data?.length
      ? participantAthletes.data?.filter(({ isPaid }) => isPaid)
      : 0
  }, [participantAthletes.data])

  return (
    <EdMainLayout event={event}>
      <ScoreboardLayout>
        <ContentWrapper>
          <HeaderWrapper>
            <Back onClick={back}>
              {arrowBack}
              <span>назад</span>
            </Back>
            <Title>{bracket?.title}</Title>
          </HeaderWrapper>
          <BracketHeaderInfo title={typeTitle} allParticipants={fightersCount?.length || 0} />
          <BracketWrapper>{BracketWrapperByType && <BracketWrapperByType />}</BracketWrapper>
          {+(bracket?.bracketType || 0) !== 7 && <BracketResultTable bracketId={bracket?.id} />}
        </ContentWrapper>
      </ScoreboardLayout>
      <FullScreenLoader open={bracketsFights.isLoading} />
    </EdMainLayout>
  )
}

export default Bracket

export async function getServerSideProps(context) {
  const { query, locale } = context
  const { data } = await $api.get(`/events/events/${query.id}/`)
  return {
    props: {
      event: data,
      ...(await serverSideTranslations(locale, [
        'header',
        'common',
        'eventDetail',
        'lkTm',
        'lkOg',
        'footer',
      ])),
    }, // will be passed to the page component as props
  }
}

const ContentWrapper = styled.div`
  width: 100%;
  background: #0f0f10;

  display: grid;
  grid-template: min-content min-content auto / 1fr;
  gap: 16px;

  padding: 16px 16px 40px;
  margin: 0 auto;

  ${theme.mqMax('md')} {
    padding: 16px 0 40px;
  }
`

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #141519;
  border-radius: 16px;
  gap: 32px;
  padding: 20px;

  ${theme.mqMax('md')} {
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    gap: 8px;

    background: none;
    border-radius: 0;
  }
`

const BracketWrapper = styled.div`
  overflow: auto;
`

const Back = styled.button`
  font-weight: 500;
  font-size: 18px;

  display: flex;
  align-items: center;

  color: #828282;
`

const Title = styled.h3`
  font-weight: 700;
  font-size: 28px;
  color: #f2f2f2;

  ${theme.mqMax('md')} {
    font-size: 16px;
  }
`

const arrowBack = (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M5 12L4.29289 11.2929L3.58579 12L4.29289 12.7071L5 12ZM17 13C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11V13ZM8.29289 7.29289L4.29289 11.2929L5.70711 12.7071L9.70711 8.70711L8.29289 7.29289ZM4.29289 12.7071L8.29289 16.7071L9.70711 15.2929L5.70711 11.2929L4.29289 12.7071ZM5 13H17V11H5V13Z'
      fill='#828282'
    />
  </svg>
)
