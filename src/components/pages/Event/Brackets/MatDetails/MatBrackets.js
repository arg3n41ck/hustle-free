import React from 'react'
import BracketRow from './BracketRow'
import styled from 'styled-components'

export default function MatBrackets({ brackets, selectedBracket, onSelect, bracketFights }) {
  return (
    <Wrapper>
      <Header>
        <Title>Категории</Title>
        <Col>схватка</Col>
        <Col>eta</Col>
      </Header>
      {!!brackets?.length ? (
        brackets.map((bracket) => {
          return (
            <BracketRow
              key={bracket?.id}
              selected={selectedBracket === bracket?.id}
              onSelect={onSelect}
              bracket={bracket}
              bracketFights={bracketFights}
            />
          )
        })
      ) : (
        <NoBR>Нет категорий в выбранном мате</NoBR>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: min-content;

  @media screen and (min-width: 768px) {
    border: 1px solid #333333;
    border-radius: 8px;
    background: #141519;
  }

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    grid-gap: 12px;
  }
`

const Header = styled.div`
  display: grid;
  grid-template: 1fr / auto 88px 80px;

  background: #1b1c22;
  border-bottom: 1px solid #1b1c22;
  @media screen and (max-width: 768px) {
    grid-template: 1fr / auto 64px 50px;
    border: none;
    border-radius: 8px;
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

  @media screen and (max-width: 768px) {
    font-size: 16px;
    line-height: 20px;
    padding: 8px;
  }
`

const Col = styled.div`
  height: 100%;
  width: 100%;
  padding: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #bdbdbd;
  border-right: 1px solid #333333;

  &:last-child {
    border-right: none;
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
    line-height: 16px;
    padding: 8px;
  }
`

const NoBR = styled.div`
  min-height: 50px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #bdbdbd;
  display: flex;
  align-items: center;
  justify-content: center;
`
