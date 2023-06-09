import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { theme } from '../../../../../styles/theme'
import { ScoreboardContext } from '../Scoreboard/context'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchBracketsFightsByParams,
  selectBrackets,
} from '../../../../../redux/components/eventBrackets'
import { useRouter } from 'next/router'

export default function BracketHeaderInfo({ title, allParticipants }) {
  const { open } = useContext(ScoreboardContext)
  const [, , , , bracket] = useSelector(selectBrackets)
  const {
    query: { bracketId },
  } = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBracketsFightsByParams({ bracket: bracketId, type: bracket?.bracketType }))
  }, [open])
  return (
    <HeaderWrapper>
      <BracketText>
        Тип сетки: <b>{title}</b>
      </BracketText>
      <BracketText>
        Участников: <b>{allParticipants}</b>
      </BracketText>
    </HeaderWrapper>
  )
}

const BracketText = styled.p`
  min-height: 56px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 400;
  font-size: 18px;
  padding: 0 0 0 24px;
  border-left: 1px solid #333333;

  color: #bdbdbd;

  &:first-child {
    border: none;
    padding: 0;
  }

  b {
    color: #fff;
  }

  ${theme.mqMax('xl')} {
    font-size: 16px;
  }

  ${theme.mqMax('md')} {
    font-size: 12px;
    border: none;
    padding: 0;
    flex-direction: column;
    align-items: flex-start;
  }
`

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background: #1b1c22;
  border-radius: 16px;
  gap: 24px;
  padding: 16px;

  ${theme.mqMax('md')} {
    display: grid;
    grid-template: 1fr / auto min-content;
    gap: 10px;
  }
`
