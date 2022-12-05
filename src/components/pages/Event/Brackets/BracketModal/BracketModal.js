import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { theme } from '../../../../../styles/theme'
import BracketHeaderInfo from './BracketHeaderInfo'
import BracketsDoubleEl from './BracketsDoubleEl'
import BracketsSingleEl from './BracketsSingleEl'
import BracketsRobin from './BracketsRobin'
import BracketsThreeMan from './BracketsThreeMan'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchBracketsFightsByParams,
  selectBrackets,
} from '../../../../../redux/components/eventBrackets'

export const bracketTypes = {
  1: {
    id: 1,
    name: 'SEWithoutBF',
    title: 'Single elimination bracket (without bronze fight)',
    component: (props) => <BracketsSingleEl brType={'SEWithoutBF'} {...props} />,
  },
  2: {
    id: 2,
    name: 'SEWithBF',
    title: 'Single elimination bracket (with a bronze fight)',
    component: (props) => <BracketsSingleEl brType={'SEWithBF'} {...props} />,
  },
  3: {
    id: 3,
    name: 'DEWithoutBZ',
    title: 'Double elimination bracket (without bronze fight)',
    component: (props) => <BracketsDoubleEl brType={'DEWithoutBZ'} {...props} />,
  },
  4: {
    id: 4,
    name: 'DEWithBZ',
    title: 'Double elimination bracket (with a bronze fight)',
    component: (props) => <BracketsDoubleEl brType={'DEWithBZ'} {...props} />,
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
  const dispatch = useDispatch()
  const { typeTitle, allParticipants, BracketWrapperByType } = useMemo(() => {
    const selectedBrType = selectedBracket && bracketTypes?.[selectedBracket.bracketType]
    return {
      typeTitle: selectedBrType && selectedBrType?.title,
      allParticipants: selectedBracket && selectedBracket?.participationCategory?.allParticipants,
      BracketWrapperByType: (props) => selectedBrType && selectedBrType?.component(props),
    }
  }, [selectedBracket])

  const updateBF = useCallback(() => {
    const handler = setTimeout(() => {
      dispatch(fetchBracketsFightsByParams({ bracket: selectedBracket?.id }))
    }, 700)

    return () => {
      clearTimeout(handler)
    }
  }, [selectedBracket])

  return (
    <ContentWrapper>
      <HeaderWrapper>
        <Back onClick={onClose}>
          {arrowBack}
          <span>назад</span>
        </Back>
        <Title>{selectedBracket?.title}</Title>
      </HeaderWrapper>
      <BracketHeaderInfo title={typeTitle} allParticipants={allParticipants} />
      {BracketWrapperByType && <BracketWrapperByType updateBF={updateBF} />}
    </ContentWrapper>
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
`

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #141519;
  border-radius: 16px;
  gap: 32px;
  padding: 20px;

  ${theme.mqMax('md')} {
    gap: 16px;
  }
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
    font-size: 18px;
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
