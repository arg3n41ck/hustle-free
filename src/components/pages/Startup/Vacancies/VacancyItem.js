import React from "react"
import styled from "styled-components"
import Link from "next/link"
import { useSelector } from "react-redux"

const VacanciesItem = ({ vacancy }) => {
  const skills = useSelector((state) => state.skills.skills)

  let arrOfSkills = skills.filter((item) => vacancy.skills.includes(item.id))

  return (
    <Wrapper>
      <Header>
        <Title>{vacancy.title}</Title>
        <Link href={`/profile/startups/change/vacancy/${vacancy.id}/`} passHref>
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
        </Link>
      </Header>
      <Price>
        {vacancy?.salaryFrom && <p>от ${vacancy.salaryFrom} ₸</p>}
        {vacancy?.salaryTo && <p>- до ${vacancy.salaryTo} ₸</p>}
      </Price>
      {vacancy?.obligations && <Description>{vacancy.obligations}</Description>}
      {vacancy?.condition && <Condition>{vacancy.condition}</Condition>}
      <SkillsTitle>Навыки</SkillsTitle>
      <SkillsBody>
        {arrOfSkills.map((item) => (
          <Item key={item.id}> {item.title} </Item>
        ))}
      </SkillsBody>
      <CountView>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.6515 20.4054C20.2043 20.2902 20.5336 19.7117 20.2589 19.2183C19.6533 18.1307 18.6993 17.1749 17.4788 16.4465C15.907 15.5085 13.9812 15 12 15C10.0188 15 8.09292 15.5085 6.52112 16.4465C5.30069 17.1749 4.34666 18.1307 3.74108 19.2183C3.46638 19.7117 3.79562 20.2902 4.34843 20.4054V20.4054C9.39524 21.4572 14.6047 21.4572 19.6515 20.4054V20.4054Z"
            fill="#828282"
          />
          <circle cx="12" cy="8" r="5" fill="#828282" />
        </svg>
        <Count>{vacancy.enrolledCnt}</Count>
      </CountView>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border-bottom: 1px solid #e5e5e5;
  padding: 32px 0;
  &:last-child {
    border-bottom-width: 0;
  }
`
const SkillsTitle = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #828282;
  margin: 12px 0 8px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`
const Title = styled.h3`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  color: #333333;
`
const InfoChange = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  p {
    margin: 0 8px;
    font-family: Inter, sans-serif;
    font-size: 16px;
    line-height: 24px;
    color: #828282;
  }
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
const Description = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #333;
`
const Condition = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #333333;
  margin: 16px 0 24px 0;
`
const CountView = styled.div`
  display: flex;
  align-items: center;
`
const Count = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #828282;
  margin-left: 5px;
`
const SkillsBody = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 24px;
`
const Item = styled.p`
  padding: 8px 12px;
  text-align: center;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  height: 40px;
`

export default VacanciesItem

//alwaysPublished: false
// conditions: "sefsef"
// contractEndDate: null
// contractStartDate: null
// created: "2022-03-06T20:00:52.553183Z"
// deadline: null
// enrolledCnt: 2
// id: 1
// obligations: "ssef"
// pubDate: null
// recommendedCourses: []
// requiredCourses: []
// requirements: "sefsef"
// salaryFrom: 2
// salaryTo: 2
// skills: [35]
// specialization: "fsefs"
// startup: null
// title: "test"
