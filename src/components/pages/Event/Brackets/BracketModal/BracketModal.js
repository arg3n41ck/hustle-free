import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { theme } from '../../../../../styles/theme'
import BracketHeaderInfo from './BracketHeaderInfo'
import BracketsRobin from './BracketsRobin'
import BracketsThreeMan from './BracketsThreeMan'
import { useSelector } from 'react-redux'
import { selectBrackets } from '../../../../../redux/components/eventBrackets'
import FullScreenLoader from '../../../../ui/FullScreenLoader'
import BracketResultTable from './BracketResultTable'
import { useRouter } from 'next/router'
import BracketBranched from './BracketBranched'

export const bracketTypes = {
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

export default function BracketModal({ selectedBracket, onClose }) {
  const [, bracketsFights, participantAthletes] = useSelector(selectBrackets)
  const { pathname } = useRouter()
  const { typeTitle, BracketWrapperByType } = useMemo(() => {
    const selectedBrType = selectedBracket && bracketTypes?.[selectedBracket.bracketType]
    return {
      typeTitle: selectedBrType && selectedBrType?.title,
      BracketWrapperByType: (props) => selectedBrType && selectedBrType?.component(props),
    }
  }, [selectedBracket])

  const fightersCount = useMemo(() => {
    return participantAthletes.data?.length
      ? participantAthletes.data?.filter(({ isPaid }) => isPaid)
      : 0
  }, [participantAthletes])

  useEffect(() => {
    pathname !== '/events/[id]/brackets' && onClose()
  }, [pathname])

  return (
    <>
      <ContentWrapper>
        <HeaderWrapper>
          <Back onClick={onClose}>
            {arrowBack}
            <span>назад</span>
          </Back>
          <Title>{selectedBracket?.title}</Title>
        </HeaderWrapper>
        <BracketHeaderInfo title={typeTitle} allParticipants={fightersCount?.length || 0} />
        <BracketWrapper>{BracketWrapperByType && <BracketWrapperByType />}</BracketWrapper>
        {+(selectedBracket?.bracketType || 0) !== 7 && (
          <BracketResultTable bracketId={selectedBracket?.id} />
        )}
      </ContentWrapper>
      <FullScreenLoader open={bracketsFights.isLoading} />
    </>
  )
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
