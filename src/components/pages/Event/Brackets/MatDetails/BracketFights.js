import React, { useMemo } from 'react'
import styled from 'styled-components'
import MatFight from '../MatFight'

export default function BracketFights({ bracket, bracketFights }) {
  const category = useMemo(() => {
    if (bracket) {
      return `${bracket?.categoryName} / ${bracket?.level} / ${bracket?.fromAge} - ${bracket?.toAge} / ${bracket?.fromWeight} - ${bracket?.toWeight}`
    }
    return 'Выберите категорию'
  }, [bracket])

  return (
    <Wrapper>
      <Header>
        <Title>{category}</Title>
        <Col>eta</Col>
      </Header>
      <BracketFightsWrapper>
        {!!bracketFights?.length ? (
          bracketFights.map((bf) => (
            <MatFight key={bf?.id} bracketId={bracket?.id} fight={{ ...bf, category }} />
          ))
        ) : (
          <NoBF>{bracket ? 'Нет схваток в выбранной категории' : 'Выберите категорию'}</NoBF>
        )}
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
