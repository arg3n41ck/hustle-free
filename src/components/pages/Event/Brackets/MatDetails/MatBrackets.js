import React from 'react'

export default function MatBrackets({ brackets }) {
  return (
    <Wrapper>
      <Header>
        <Title>Категории</Title>
        <Col>схватка</Col>
        <Col>eta</Col>
      </Header>
      {!!brackets?.length &&
        brackets.map((bracket) => {
          return <BracketWrapper key={bracket?.id}></BracketWrapper>
        })}
    </Wrapper>
  )
}
