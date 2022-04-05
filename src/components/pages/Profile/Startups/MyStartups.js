import React from "react"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import AddButton from "../../../ui/AddButton"

import LogoTest from "../../../../public/png/logo.png"
import { Box } from "@mui/material"
import { useSelector } from "react-redux"
import { format, parseISO } from "date-fns"
import { useRouter } from "next/router"

const MyStartups = ({ startups }) => {
  const technologiesRedux = useSelector((state) => state.technologies)
  const { push } = useRouter()
  return (
    <Wrapper>
      <TitleBlock>
        <h2>Ваши стартапы</h2>
      </TitleBlock>
      <ContentBlock>
        {startups.map(
          ({
            numberOfTeam,
            id,
            title,
            startWork,
            shortDescription,
            technologies,
            logo,
          }) => {
            const technologiesData = technologiesRedux.technologies.filter(
              (itemFilter) => technologies.includes(itemFilter.id)
            )
            return (
              <>
                <StartUpsBlock onClick={() => push(`/profile/startups/${id}/`)}>
                  <ImageBlock>
                    <Image
                      src={logo ? logo : LogoTest}
                      alt={"logo"}
                      width={96}
                      height={96}
                      objectFit={"cover"}
                    />
                  </ImageBlock>
                  <StartUpContent>
                    <Title>
                      <h2>{title}</h2>
                      <InfoChange>
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
                            d="M17.2038 10.7962L18.9998 9.00019C19.545 8.45494 19.8176 8.18231 19.9634 7.88822C20.2407 7.32866 20.2407 6.67171 19.9634 6.11215C19.8176 5.81806 19.545 5.54544 18.9998 5.00019C18.4545 4.45494 18.1819 4.18231 17.8878 4.03658C17.3282 3.75929 16.6713 3.75929 16.1117 4.03658C15.8176 4.18231 15.545 4.45494 14.9998 5.00019L13.1811 6.81884C14.145 8.46944 15.5311 9.845 17.2038 10.7962ZM11.7267 8.2733L4.85615 15.1438C4.43109 15.5689 4.21856 15.7814 4.07883 16.0425C3.93909 16.3036 3.88015 16.5983 3.76226 17.1878L3.14686 20.2648C3.08034 20.5974 3.04708 20.7637 3.14168 20.8583C3.23629 20.9529 3.4026 20.9196 3.73521 20.8531L6.81219 20.2377C7.40164 20.1198 7.69637 20.0609 7.95746 19.9211C8.21856 19.7814 8.43109 19.5689 8.85615 19.1438L15.7456 12.2544C14.1239 11.2388 12.7522 9.87646 11.7267 8.2733Z"
                            fill="#828282"
                          />
                        </svg>
                        <p>Редактировать</p>
                      </InfoChange>
                    </Title>
                    <Description>{shortDescription}</Description>
                    <StatisticContent>
                      <Block>
                        <StatisticHeader>
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 -2 20 24"
                              fill="none"
                            >
                              <rect
                                x="3"
                                y="6"
                                width="18"
                                height="15"
                                rx="2"
                                stroke="#828282"
                                strokeWidth="2"
                              />
                              <path
                                d="M3 10C3 8.11438 3 7.17157 3.58579 6.58579C4.17157 6 5.11438 6 7 6H17C18.8856 6 19.8284 6 20.4142 6.58579C21 7.17157 21 8.11438 21 10H3Z"
                                fill="#828282"
                              />
                              <path
                                d="M7 3L7 6"
                                stroke="#828282"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M17 3L17 6"
                                stroke="#828282"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                          <p>Основан</p>
                        </StatisticHeader>
                        <StatisticBody>
                          <p>
                            {startWork
                              ? format(parseISO(startWork), "yyyy")
                              : "2014"}
                          </p>
                        </StatisticBody>
                      </Block>
                      <Block>
                        <StatisticHeader>
                          <div>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19.6515 20.4054C20.2043 20.2902 20.5336 19.7117 20.2589 19.2183C19.6533 18.1307 18.6993 17.1749 17.4788 16.4465C15.907 15.5085 13.9812 15 12 15C10.0188 15 8.09292 15.5085 6.52112 16.4465C5.30069 17.1749 4.34666 18.1307 3.74108 19.2183C3.46638 19.7117 3.79562 20.2902 4.34843 20.4054C9.39524 21.4572 14.6047 21.4572 19.6515 20.4054Z"
                                fill="#828282"
                              />
                              <circle cx="12" cy="8" r="5" fill="#828282" />
                            </svg>
                          </div>
                          <p>Количество сотрудников</p>
                        </StatisticHeader>
                        <StatisticBody>
                          <p>{numberOfTeam}</p>
                        </StatisticBody>
                      </Block>
                    </StatisticContent>
                    {!!technologiesData.length && (
                      <Technologies>
                        <p>Технологии и направления</p>
                      </Technologies>
                    )}
                    <TechnologiesBlock>
                      {technologiesData.map((elem) => (
                        <Item key={elem.id}>{elem.title}</Item>
                      ))}
                    </TechnologiesBlock>
                  </StartUpContent>
                </StartUpsBlock>
                {startups[startups.length - 1].id !== id && <HR />}
              </>
            )
          }
        )}
      </ContentBlock>
      <AddBtn>
        <Link href={"profile/startups/create"} passHref>
          <Box component="a" sx={{ maxWidth: 390, width: "100%" }}>
            <AddButton>Добавить карточку стартапа</AddButton>
          </Box>
        </Link>
      </AddBtn>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
`
const TitleBlock = styled.div`
  padding: 32px 32px 24px;
  border-bottom: 1px solid #e0e0e0;
`
const ContentBlock = styled.div`
  padding: 32px;
`
const StartUpsBlock = styled.div`
  display: flex;
  cursor: pointer;
  word-break: break-all;
`
const ImageBlock = styled.div`
  max-width: 96px;
  width: 100%;
  height: 96px;
  margin-right: 24px;
  border-radius: 50%;
  overflow: hidden;
`
const StartUpContent = styled.div`
  width: 100%;
`
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;
  }
  p {
    margin: 0 8px;
    font-family: Inter, sans-serif;
    font-size: 16px;
    line-height: 24px;
    color: #828282;
  }
`
const InfoChange = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    min-width: 24px;
    height: 24px;
  }
  p {
    white-space: nowrap;
  }
`
const StatisticContent = styled.div`
  display: flex;
`
const Block = styled.div`
  width: 50%;
`
const StatisticHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  p {
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 32px;
    margin-left: 10px;
    color: #828282;
  }
`
const StatisticBody = styled.div`
  p {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    margin-left: 27px;
  }
`
const Technologies = styled.div`
  p {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #828282;
    margin: 16px 0;
  }
`
const TechnologiesBlock = styled.div`
  display: flex;
  margin: 0 4px;
`
const Item = styled.div`
  padding: 8px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #27ae60;
  background: #6fcf9733;
  border-radius: 8px;
  margin-right: 8px;
`
const Description = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 16px;
`
const HR = styled.div`
  width: 100%;
  height: 1px;
  border-top: 1px solid #d8d8d8;
  margin: 32px 0;
`
const AddBtn = styled.div`
  padding-top: 24px;
  padding-bottom: 32px;
  display: flex;
  justify-content: center;
  border-top: 1px solid #e0e0e0;
`
export default MyStartups
