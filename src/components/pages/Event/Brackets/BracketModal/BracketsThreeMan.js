import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectBrackets } from '../../../../../redux/components/eventBrackets'
import BracketCell from './BracketCell'

export default function BracketsThreeMan() {
  const [, bracketsFights] = useSelector(selectBrackets)

  const bfs = useMemo(() => {
    if (bracketsFights?.data?.length) {
      return bracketsFights.data.map((cell) => cell).sort((a, b) => +a.id - +b.id)
    }
    return null
  }, [bracketsFights])

  return (
    !!bfs && (
      <div>
        <RoundNameWrapper>
          <RoundName>SEMI_FINALS</RoundName>
          <RoundName>FINAL</RoundName>
        </RoundNameWrapper>
        <ColumnsWrapper>
          {bfs.map((bracketFight, index) => {
            const { fightParents, ...cell } = bracketFight
            const parents = fightParents.map(({ id }) => id)
            const sortedFParents = fightParents.map((par) => par).sort((a, b) => +a.id - +b.id)

            const disabled = index !== 2
            return (
              <Row key={`three_man_row_${bracketFight?.id}`}>
                <Column>
                  <BracketCell cell={{ ...cell, parents: parents, disabled }} />
                </Column>

                <Column>
                  {!!sortedFParents?.length &&
                    sortedFParents.map((parent) => {
                      const { id, fightParents: parparents } = parent
                      const borderDirection = !parparents?.length ? 'lineDown' : 'lineUp'
                      const disabled =
                        index !== 0
                          ? index === 1
                            ? !!parparents?.length
                            : !parparents?.length
                          : true

                      return (
                        <BracketCell
                          key={`three_man_parents_${id}`}
                          cell={{ ...parent, borderDirection, disabled }}
                        />
                      )
                    })}
                </Column>
              </Row>
            )
          })}
        </ColumnsWrapper>
      </div>
    )
  )
}

const ColumnsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
`

const Row = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
`

const Column = styled.div`
  min-width: 360px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px;

  &:nth-child(odd) {
    background: rgba(27, 28, 34, 0.25);
  }
`

const RoundNameWrapper = styled.div`
  display: grid;
  grid-template: 1fr / repeat(2, 360px);
`

const RoundName = styled.h4`
  height: 100%;
  font-weight: 600;
  font-size: 24px;
  color: #f2f2f2;

  padding: 16px 32px 0;

  &:nth-child(odd) {
    background: rgba(27, 28, 34, 0.25);
  }
`
