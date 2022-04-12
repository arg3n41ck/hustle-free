import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

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
  // border-left: 8px solid #27ae60;
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  z-index: 1;
`
const Rectangle = styled.div`
  width: 8px;
  background: red;
  position: absolute;
  z-index: 1;
`

const Wrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 8px 32px rgba(74, 74, 74, 0.12);
  border-radius: 8px;
  position: relative;
  //min-height: 128px;
  padding: 24px;
`
const Title = styled.h3`
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #333333;
  margin-bottom: 8px;
`
const Description = styled.p`
  font-family: Inter, sans-serif;
  font-size: 18px;
  line-height: 24px;
  color: #333333;
`

export default AuthInfo
