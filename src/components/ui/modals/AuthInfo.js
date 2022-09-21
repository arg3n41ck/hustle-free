import React from "react"
import styled from "styled-components"

const AuthInfo = ({ title, text, toggleShow }) => {
  // React.useEffect(() => {
  //   if (toggleShow) {
  //     toggleShow(true)
  //     const timeOut = setTimeout(() => {
  //       toggleShow(false)
  //     }, 5000)
  //     return () => {
  //       clearInterval(timeOut)
  //     }
  //   }
  // }, [])

  return (
    <Container>
      <Wrapper>
        <Rectangle />
        <Title>{title}</Title>
        <Description>{text}</Description>
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  z-index: 1;
`
const Rectangle = styled.div`
  width: 8px;
  height: 100%;
  background: #6d4eea;
  position: absolute;
  z-index: 1;
  margin: -24px 0 0 -24px;
  border-radius: 8px 0 0 8px;
`

const Wrapper = styled.div`
  background: #191a1f;
  box-shadow: 0 8px 32px rgba(74, 74, 74, 0.12);
  border-radius: 8px;
  position: relative;
  padding: 24px;
`
const Title = styled.h3`
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #f2f2f2;
  margin-bottom: 8px;
`
const Description = styled.p`
  font-family: Inter, sans-serif;
  font-size: 18px;
  line-height: 24px;
  color: #f2f2f2;
`

export default AuthInfo
