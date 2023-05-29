import React from 'react'
import BracketRow from './BracketRow'
import styled from 'styled-components'

export default function MatBrackets({ brackets, selectedBracket, onSelect }) {
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
            />
          )
        })
      ) : (
        <NoBR>Нет категорий в выбранной мате</NoBR>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: min-content;
  border: 1px solid #333333;
  background: #141519;
  border-radius: 8px;
`

const Header = styled.div`
  display: grid;
  grid-template: 1fr / auto 88px 80px;

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
