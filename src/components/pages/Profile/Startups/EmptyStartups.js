import styled from "styled-components"
import CardTemplate from "../../../ui/CardTemplate"
import { Box } from "@mui/material"
import BG from "../../../../public/png/bg-info.png"
import Image from "next/image"

const EmptyStartups = () => {
  return (
    <>
      <Wrapper>
        <Image height={"200px"} layout="responsive" width={"100%"} src={BG} />
        <Content>
          <h2>Что такое стартап</h2>
          <p>У вас есть стартап или компания?</p>
          <p>
            {" "}
            Разместите соответствующую карточку и станьте частью комьюнити!
          </p>
        </Content>
      </Wrapper>
      <Title>Ваши стартапы</Title>
      <CardTemplate
        path={"profile/startups/create"}
        title={
          <span>
            Создайте персональную карточку{" "}
            <Box as="span" color="#27AE60">
              стартапа
            </Box>
          </span>
        }
        buttonContent={"Создать карточку стартапа"}
        content={
          <>
            <p>У вас есть стартап или компания?</p>{" "}
            <p>
              Разместите соответствующую карточку стартапа и станьте частью
              комьюнити!
            </p>
          </>
        }
      />
    </>
  )
}

const Wrapper = styled.div`
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  height: 369px;
  display: flex;
  flex-direction: column;

  svg {
    width: 100% !important;
    height: 100% !important;

    path {
      width: 100% !important;
      height: 100% !important;
    }
  }
`
const Content = styled.div`
  width: 100%;
  margin-bottom: 65px;
  text-align: center;
  background: #fff;
  h2 {
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;
    color: #27ae60;
    margin: 9px 0;
  }
  p {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 150%;
    color: #828282;
  }
`
const Title = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: #333333;
  margin: 40px 0 24px 0;
`

export default EmptyStartups
