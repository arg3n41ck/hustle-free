import React, { useState } from "react"
import styled from "styled-components"
import $api from "../../../../../../services/axios"
import { Box } from "@mui/material"
import { useRouter } from "next/router"

export const getServerSideProps = async (ctx) => {
  return {
    props: { id: ctx.query.id },
  }
}

const ServiceChange = ({ id }) => {
  const [service, setService] = useState(null)
  const router = useRouter()
  React.useEffect(async () => {
    const { data } = await $api.get(`/services/${id}/`)

    setService(data)
  }, [])

  if (!service) return null

  return (
    <Container>
      <Box
        onClick={() => router.back()}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          marginBottom: 3.2,
        }}
      >
        <svg
          width="15"
          height="10"
          viewBox="0 0 15 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 5L1.29289 4.29289L0.585786 5L1.29289 5.70711L2 5ZM14 6C14.5523 6 15 5.55228 15 5C15 4.44772 14.5523 4 14 4V6ZM5.29289 0.292893L1.29289 4.29289L2.70711 5.70711L6.70711 1.70711L5.29289 0.292893ZM1.29289 5.70711L5.29289 9.70711L6.70711 8.29289L2.70711 4.29289L1.29289 5.70711ZM2 6H14V4H2V6Z"
            fill="#828282"
          />
        </svg>
        <Box sx={{ marginLeft: 1 }}>Назад</Box>
      </Box>
      <Wrapper>
        <Content>
          <Title>{service.title}</Title>
          <Price>
            {!!service?.priceFrom && (
              <p>от {Math.floor(service.priceFrom)} ₸</p>
            )}
            {!!service?.priceFrom && !!service?.priceTo && "-"}
            {!!service?.priceTo && <p>до {Math.floor(service.priceTo)} ₸</p>}
          </Price>
          <TitleDescription>Описание</TitleDescription>
          <Description>{service.description}</Description>
          <Condition>Условия для коммюнити JAS</Condition>
          <ConditionDescription>{service.condition}</ConditionDescription>
        </Content>
        <Info>
          <Box sx={{ marginTop: 0.3 }}>
            <svg
              width="18"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.77 6C17.77 5.64119 17.576 5.40556 17.1878 4.93429C15.7677 3.21014 12.6355 0 8.99977 0C5.36403 0 2.23183 3.21014 0.811736 4.93429C0.423573 5.40556 0.229492 5.64119 0.229492 6C0.229492 6.35881 0.423573 6.59444 0.811735 7.06571C2.23183 8.78986 5.36403 12 8.99977 12C12.6355 12 15.7677 8.78986 17.1878 7.06571C17.576 6.59444 17.77 6.35881 17.77 6ZM8.99977 9C10.6566 9 11.9998 7.65685 11.9998 6C11.9998 4.34315 10.6566 3 8.99977 3C7.34292 3 5.99977 4.34315 5.99977 6C5.99977 7.65685 7.34292 9 8.99977 9Z"
                fill="#828282"
              />
            </svg>
          </Box>
          <InfoDescription>
            <p>Просмотры</p>
            <div>{service.views}</div>
          </InfoDescription>
        </Info>
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`
const Wrapper = styled.div`
  display: flex;
`
const Content = styled.div`
  flex-grow: 1;
  margin-right: 32px;
  max-width: 832px;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 32px;
`
const Title = styled.h3`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  color: #333333;
`
const Price = styled.div`
  display: flex;
  margin: 16px 0;
  p {
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    color: #27ae60;
  }
`
const TitleDescription = styled.h4`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #333333;
`
const Description = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #828282;
  margin: 8px 0 32px 0;
`
const Condition = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #333333;
`
const ConditionDescription = styled.p`
  margin-top: 8px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #333333;
`
const Info = styled.div`
  display: flex;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 32px;
  max-width: 256px;
  width: 100%;
  height: 124px;
`
const InfoDescription = styled.div`
  margin-left: 12px;
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 32px;
    color: #828282;
  }
  div {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #333333;
  }
`

export default ServiceChange
