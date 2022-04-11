import React, { useEffect, useState } from "react"
import $api from "../../../../../services/axios"
import styled from "styled-components"
import Image from "next/image"
import { Box } from "@mui/material"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { change } from "../../../../../redux/components/navigations"
import LogoCompany from "/src/public/png/logo.png"
import { format, parseISO } from "date-fns"
import sliceText from "../../../../../helpers/sliceText"

export const getServerSideProps = async (ctx) => {
  const { data: startup } = await $api.get(
    `/startup/startups/${ctx.query["startup-id"]}/`
  )

  return {
    props: {
      startup: startup || null,
      idService: ctx.query.id,
    },
  }
}

const FavoriteServiceItem = ({ idService, startup }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [service, setService] = useState(null)
  const {
    logo,
    title,
    technologies,
    startWork,
    link,
    numberOfTeam,
    region,
    email,
  } = startup

  useEffect(async () => {
    const { data } = await $api.get(`/services/${idService}/`)
    setService(data)
  }, [])

  const backHandler = () => {
    dispatch(change("favorites"))
    router.back()
  }

  if (!service) return null

  return (
    <Container>
      <Box
        onClick={backHandler}
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
            {!!service?.priceFrom && !!service?.priceTo && (
              <p style={{ margin: "0 5px" }}>{" - "}</p>
            )}
            {!!service?.priceTo && <p>до {Math.floor(service.priceTo)} ₸</p>}
          </Price>
          <TitleDescription>Описание</TitleDescription>
          <Description>{service.description}</Description>
          <Condition>Условия для коммюнити JAS</Condition>
          <ConditionDescription>{service.condition}</ConditionDescription>
        </Content>
        <Info>
          <InfoTitle>Компания</InfoTitle>
          <InfoCompany>
            <InfoImageWrapper>
              <Image
                src={logo ? logo : LogoCompany}
                width={"100%"}
                height={"100%"}
                objectFit={"cover"}
              />
            </InfoImageWrapper>
            <div
              style={{
                marginLeft: 8,
                marginBottom: 24,
              }}
            >
              <InfoCompanyTitle>{sliceText(title, 17)}</InfoCompanyTitle>
              <InfoCompanyDescription>
                {sliceText(technologies[0].title, 16)}
              </InfoCompanyDescription>
            </div>
          </InfoCompany>
          <ItemInfoWrapper>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="2.5"
                y="5"
                width="15"
                height="12.5"
                rx="2"
                stroke="#828282"
                stroke-width="2"
              />
              <path
                d="M2.5 8.33333C2.5 7.08718 2.5 6.4641 2.76795 6C2.94349 5.69596 3.19596 5.44349 3.5 5.26795C3.9641 5 4.58718 5 5.83333 5H14.1667C15.4128 5 16.0359 5 16.5 5.26795C16.804 5.44349 17.0565 5.69596 17.2321 6C17.5 6.4641 17.5 7.08718 17.5 8.33333H2.5Z"
                fill="#828282"
              />
              <path
                d="M5.83398 2.5L5.83398 5"
                stroke="#828282"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M14.166 2.5L14.166 5"
                stroke="#828282"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <p>{format(parseISO(startWork), "yyyy")}</p>
          </ItemInfoWrapper>

          <ItemInfoWrapper>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9 2.56641L9 7.26366C7.82069 7.09747 6.74213 6.64167 5.91655 5.97088C5.42048 5.56782 5.03944 5.108 4.77562 4.61925C5.90072 3.52671 7.36734 2.78394 9 2.56641ZM11 2.56641V7.26366C12.1793 7.09747 13.2579 6.64167 14.0835 5.97088C14.5795 5.56782 14.9606 5.10801 15.2244 4.61925C14.0993 3.52671 12.6327 2.78394 11 2.56641ZM16.5225 6.29539C16.192 6.74328 15.7965 7.15597 15.3446 7.52311C14.1442 8.49846 12.6142 9.10196 11 9.27892V10.7214C11.6393 10.7914 12.2679 10.9287 12.8702 11.1314C13.7844 11.439 14.6265 11.8937 15.3446 12.4772C15.7937 12.8421 16.1901 13.254 16.5227 13.7049C17.1447 12.612 17.5 11.3477 17.5 10.0003C17.5 8.65281 17.1446 7.3883 16.5225 6.29539ZM15.2244 15.3813C14.9587 14.8896 14.5754 14.4292 14.0835 14.0295C13.5635 13.607 12.9358 13.2637 12.2323 13.0269C11.8365 12.8937 11.423 12.7964 11 12.7368V17.4342C12.6327 17.2167 14.0993 16.4739 15.2244 15.3813ZM9 17.4342L9 12.7368C8.57696 12.7964 8.16355 12.8937 7.76775 13.0269C7.06423 13.2637 6.43651 13.607 5.91655 14.0295C5.4246 14.4292 5.04126 14.8896 4.77555 15.3813C5.90066 16.4739 7.36731 17.2167 9 17.4342ZM3.47728 13.7049C3.80992 13.254 4.20631 12.8421 4.65536 12.4772C5.37351 11.8937 6.21565 11.439 7.12981 11.1314C7.73211 10.9287 8.36067 10.7914 9 10.7214V9.27892C7.38579 9.10196 5.85579 8.49846 4.65536 7.52311C4.2035 7.15597 3.80798 6.74328 3.4775 6.29539C2.85537 7.3883 2.5 8.65281 2.5 10.0003C2.5 11.3477 2.85528 12.612 3.47728 13.7049Z"
                fill="#828282"
              />
            </svg>
            <a target={"_blank"} href={link}>
              {sliceText(link, 20)}
            </a>
          </ItemInfoWrapper>

          <ItemInfoWrapper>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.3766 17.0045C16.8373 16.9085 17.1116 16.4264 16.8827 16.0153C16.3781 15.1089 15.583 14.3124 14.566 13.7054C13.2562 12.9237 11.6513 12.5 10.0003 12.5C8.3493 12.5 6.74443 12.9237 5.43459 13.7054C4.41757 14.3124 3.62254 15.1089 3.11789 16.0153C2.88898 16.4264 3.16334 16.9085 3.62402 17.0045C7.8297 17.881 12.1709 17.881 16.3766 17.0045Z"
                fill="#828282"
              />
              <ellipse
                cx="10.0007"
                cy="6.66667"
                rx="4.16667"
                ry="4.16667"
                fill="#828282"
              />
            </svg>
            <p style={{ color: "#27AE60" }}>{numberOfTeam}</p>
          </ItemInfoWrapper>

          <ItemInfoWrapper>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.3989 16.468C11.7153 15.7737 15.8327 13.2737 15.8327 9.16683C15.8327 5.94517 13.221 3.3335 9.99935 3.3335C6.77769 3.3335 4.16602 5.94517 4.16602 9.16683C4.16602 13.2737 8.28343 15.7737 9.59982 16.468C9.85177 16.6009 10.1469 16.6009 10.3989 16.468ZM9.99935 11.6668C11.3801 11.6668 12.4993 10.5475 12.4993 9.16683C12.4993 7.78612 11.3801 6.66683 9.99935 6.66683C8.61864 6.66683 7.49935 7.78612 7.49935 9.16683C7.49935 10.5475 8.61864 11.6668 9.99935 11.6668Z"
                fill="#828282"
              />
            </svg>
            <p>{sliceText(region.title, 20)}</p>
          </ItemInfoWrapper>

          <ItemInfoWrapper>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.52568 7.82473C2.5 8.43243 2.5 9.14813 2.5 9.99984C2.5 12.6665 2.5 13.9998 3.28817 14.8599C3.34713 14.9243 3.40888 14.986 3.47323 15.045C4.33336 15.8332 5.66669 15.8332 8.33333 15.8332H11.6667C14.3333 15.8332 15.6666 15.8332 16.5268 15.045C16.5911 14.986 16.6529 14.9243 16.7118 14.8599C17.5 13.9998 17.5 12.6665 17.5 9.99984C17.5 9.14813 17.5 8.43243 17.4743 7.82473L10.9713 11.4375C10.3672 11.7731 9.63276 11.7731 9.02871 11.4375L2.52568 7.82473ZM2.89131 5.74616C2.92319 5.75976 2.95468 5.77514 2.98564 5.79235L10 9.68921L17.0144 5.79235C17.0453 5.77514 17.0768 5.75976 17.1087 5.74616C17.0058 5.51834 16.8759 5.31879 16.7118 5.13973C16.6529 5.07538 16.5911 5.01364 16.5268 4.95467C15.6666 4.1665 14.3333 4.1665 11.6667 4.1665H8.33333C5.66669 4.1665 4.33336 4.1665 3.47323 4.95467C3.40888 5.01364 3.34713 5.07538 3.28817 5.13973C3.1241 5.31878 2.99418 5.51834 2.89131 5.74616Z"
                fill="#828282"
              />
            </svg>
            <a target={"_blank"} href={`mailto:${email}`}>
              {sliceText(email, 20)}
            </a>
          </ItemInfoWrapper>
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
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 32px;
  margin-right: 32px;
  max-width: 832px;
  flex-grow: 1;
`
const Title = styled.h3`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #333333;
`
const Price = styled.div`
  display: flex;
  margin: 16px 0 32px 0;
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
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #333333;
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
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 24px;
  max-width: 256px;
  width: 100%;
  overflow: hidden;
`
const InfoTitle = styled.h4`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 32px;
  color: #333333;
  margin-bottom: 24px;
`
const InfoCompany = styled.div`
  display: flex;
`
const InfoImageWrapper = styled.div`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  overflow: hidden;
`
const InfoCompanyTitle = styled.h4`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #333333;
`
const InfoCompanyDescription = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #333333;
`
const ItemInfoWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-content: center;
  svg {
    margin-right: 10px;
    min-width: 20px;
    min-height: 20px;
  }
  p,
  a {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #333333;
  }
  a {
    color: #2f80ed;
  }
`
export default FavoriteServiceItem
