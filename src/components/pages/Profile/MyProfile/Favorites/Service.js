import React, { useEffect, useState } from "react"
import $api from "../../../../../services/axios"
import { Avatar, Box } from "@mui/material"
import Link from "next/link"
import Image from "next/image"
import styled from "styled-components"
import Logo from "../../../../../public/png/logo.png"
import sliceText from "../../../../../helpers/sliceText"

const Service = ({ service, onDelete, serviceId }) => {
  const [startup, setStartup] = useState(null)

  useEffect(async () => {
    const { data: startup } = await $api.get(
      `/startup/startups/${service.startup}/`
    )
    setStartup(startup)
  }, [])

  if (!service || !startup) return null

  return (
    <ServiceS>
      <Header>
        {startup.logo ? (
          <Avatar src={startup.logo} sx={{ width: 56, height: 56 }} />
        ) : (
          <Image src={Logo} objectFit={"cover"} height={56} width={56} />
        )}
        <Box sx={{ marginLeft: 1.6 }}>
          <Title>{startup.title}</Title>
          <HeaderDescription>
            {!!startup.technologies.length && startup.technologies[0].title}
          </HeaderDescription>
        </Box>
      </Header>

      <TitleDescription>{sliceText(service.title, 50)}</TitleDescription>
      <Description>{service.description}</Description>
      <Price>
        {!!service?.priceFrom && <p>от {Math.round(+service.priceFrom)} ₸</p>}
        {!!service?.priceFrom && !!service?.priceTo && (
          <p style={{ margin: "0 5px" }}>{" - "}</p>
        )}
        {!!service?.priceTo && <p>до {Math.round(+service.priceTo)} ₸</p>}
      </Price>
      <Condition>{service.condition}</Condition>
      <Line />
      <Footer>
        <CountView>
          <Box sx={{ marginRight: 2.4 }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.2975 5.68303C17.9186 5.75043 17.3813 5.92674 16.5212 6.21346L10.0302 8.37712C9.20279 8.65292 8.61902 8.84783 8.19912 9.01167C7.99145 9.09269 7.84682 9.15742 7.74624 9.21048C7.66106 9.25542 7.63044 9.28017 7.62861 9.28144C7.22275 9.67434 7.22275 10.3254 7.62861 10.7183C7.63043 10.7196 7.66106 10.7443 7.74624 10.7893C7.84681 10.8423 7.99145 10.907 8.19912 10.9881C8.61902 11.1519 9.20279 11.3468 10.0302 11.6226C10.0492 11.6289 10.068 11.6352 10.0867 11.6414C10.3601 11.7323 10.6001 11.8122 10.821 11.929C11.3535 12.2106 11.7889 12.646 12.0705 13.1785C12.1874 13.3995 12.2672 13.6395 12.3581 13.9129C12.3643 13.9315 12.3706 13.9504 12.3769 13.9694C12.6527 14.7967 12.8476 15.3805 13.0115 15.8004C13.0925 16.0081 13.1572 16.1527 13.2103 16.2533C13.2552 16.3385 13.28 16.3691 13.2812 16.3709C13.6741 16.7768 14.3252 16.7768 14.7181 16.3709C14.7194 16.3691 14.7441 16.3385 14.7891 16.2533C14.8421 16.1527 14.9068 16.0081 14.9879 15.8004C15.1517 15.3805 15.3466 14.7967 15.6224 13.9694L17.7861 7.47837C18.0728 6.6182 18.2491 6.08097 18.3165 5.70207C18.3179 5.69418 18.3192 5.6865 18.3205 5.67904C18.313 5.6803 18.3053 5.68162 18.2975 5.68303ZM18.5564 5.65991C18.5562 5.6601 18.5529 5.65983 18.5472 5.65856C18.5538 5.6591 18.5566 5.65973 18.5564 5.65991ZM18.341 5.45233C18.3397 5.44659 18.3394 5.4433 18.3396 5.4431C18.3398 5.44289 18.3404 5.44576 18.341 5.45233ZM17.9472 3.71394C18.4982 3.61592 19.2527 3.58674 19.8327 4.16679C20.4128 4.74685 20.3836 5.50136 20.2856 6.05235C20.1893 6.59378 19.9628 7.2729 19.7073 8.03919L19.6834 8.11083L17.5198 14.6018L17.5104 14.63C17.2461 15.4229 17.0354 16.0548 16.8511 16.5274C16.6778 16.9716 16.4723 17.4319 16.1628 17.754C14.9823 18.9824 13.017 18.9824 11.8365 17.754C11.5271 17.4319 11.3216 16.9716 11.1483 16.5274C10.9639 16.0548 10.7533 15.4229 10.489 14.6301L10.4796 14.6018C10.3592 14.2406 10.332 14.1693 10.3025 14.1135C10.2086 13.936 10.0635 13.7909 9.88603 13.697C9.83021 13.6675 9.75892 13.6404 9.39772 13.52L9.36939 13.5105C8.57661 13.2463 7.9447 13.0356 7.47215 12.8513C7.02797 12.678 6.5676 12.4725 6.24555 12.163C5.01711 10.9825 5.01711 9.01721 6.24555 7.83674C6.5676 7.52726 7.02797 7.32177 7.47215 7.14846C7.94471 6.96409 8.57665 6.75344 9.36948 6.48917L9.39772 6.47976L15.8887 4.31609C15.9127 4.30811 15.9365 4.30015 15.9603 4.29222C16.7266 4.0367 17.4057 3.81026 17.9472 3.71394Z"
                fill="#BDBDBD"
              />
            </svg>
          </Box>
          <Box onClick={() => onDelete(serviceId)} sx={{ marginRight: 2.4 }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 9C4 6.17157 4 4.75736 4.87868 3.87868C5.75736 3 7.17157 3 10 3H14C16.8284 3 18.2426 3 19.1213 3.87868C20 4.75736 20 6.17157 20 9V15.8276C20 18.5109 20 19.8525 19.1557 20.2629C18.3114 20.6733 17.2565 19.8444 15.1465 18.1866L14.4713 17.656C13.2849 16.7239 12.6917 16.2578 12 16.2578C11.3083 16.2578 10.7151 16.7239 9.52871 17.656L8.85346 18.1866C6.74355 19.8444 5.68859 20.6733 4.84429 20.2629C4 19.8525 4 18.5109 4 15.8276V9Z"
                fill="#27AE60"
                stroke="#27AE60"
                strokeWidth="2"
              />
            </svg>
          </Box>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.771 12C20.771 11.6412 20.5769 11.4056 20.1888 10.9343C18.7687 9.21014 15.6365 6 12.0007 6C8.36501 6 5.2328 9.21014 3.81271 10.9343C3.42455 11.4056 3.23047 11.6412 3.23047 12C3.23047 12.3588 3.42455 12.5944 3.81271 13.0657C5.2328 14.7899 8.36501 18 12.0007 18C15.6365 18 18.7687 14.7899 20.1888 13.0657C20.5769 12.5944 20.771 12.3588 20.771 12ZM12.0007 15C13.6576 15 15.0007 13.6569 15.0007 12C15.0007 10.3431 13.6576 9 12.0007 9C10.3439 9 9.00075 10.3431 9.00075 12C9.00075 13.6569 10.3439 15 12.0007 15Z"
              fill="#828282"
            />
          </svg>
          <Count>{service.views}</Count>
        </CountView>
        <Link
          passHref
          href={`/profile/favorites/service/${service.id}/?startup-id=${startup.id}`}
        >
          <Button>Подробнее</Button>
        </Link>
      </Footer>
    </ServiceS>
  )
}

const ServiceS = styled.div`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
  word-break: break-all;
`
const Header = styled.div`
  display: flex;
  margin-bottom: 32px;
`
const Title = styled.h3`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #333333;
`
const HeaderDescription = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
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
const Line = styled.div`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)),
    #f6f9ff;
  border-radius: 2px;
  width: 100%;
  height: 1px;
  margin: 32px 0;
`
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`
const Button = styled.a`
  height: 64px;
  max-width: 150px;
  background: #27ae60;
  border-radius: 12px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
  cursor: pointer;
`
const CountView = styled.div`
  display: flex;
  align-items: center;
  img {
    cursor: pointer;
  }
`
const Count = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #828282;
  margin-left: 5px;
`

export default Service
