import React, { useMemo } from 'react'
import styled from 'styled-components'
import MatFight from '../MatFight'

export default function BracketFights({ bracketFights }) {
  const category = useMemo(() => {
    if (bracketFights) {
      return `${bracketFights?.categoryName} / ${bracketFights?.level} / ${bracketFights?.fromAge} - ${bracketFights?.toAge} / ${bracketFights?.fromWeight} - ${bracketFights?.toWeight}`
    }
    return 'Выберите категорию'
  }, [bracketFights])

  return (
    <Wrapper>
      <Header>
        <Title>{category}</Title>
        <Col>eta</Col>
      </Header>
      <BracketFightsWrapper>
        {!!bracketFights?.fights?.length
          ? bracketFights?.fights.map((bf, i) => (
              <MatFight
                key={bf?.id}
                nextBFStatus={bracketFights?.fights?.[i + 1]?.status}
                bracketId={bracketFights?.id}
                fight={bf}
                category={category}
              />
            ))
          : !bracketFights?.fights?.length && <NoBF>Нет схваток в выбранной категории</NoBF>}
      </BracketFightsWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 1px solid #333333;
  background: #141519;
  border-radius: 8px;
`

const Header = styled.div`
  display: grid;
  grid-template: 1fr / auto 72px;

  background: #1b1c22;
  border-bottom: 1px solid #1b1c22;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const Title = styled.p`
  height: 100%;
  width: 100%;

  margin: 0;
  padding: 16px;

  font-weight: 600;
  font-size: 20px;
  line-height: 32px;

  display: flex;
  align-items: center;
  border-right: 1px solid #333333;
  color: #bdbdbd;
`

const Col = styled.p`
  padding: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #bdbdbd;
`

const BracketFightsWrapper = styled.div`
  max-height: 680px;
  overflow: auto;
`

const NoBF = styled.div`
  min-height: 50px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #bdbdbd;
  display: flex;
  align-items: center;
  justify-content: center;
`
