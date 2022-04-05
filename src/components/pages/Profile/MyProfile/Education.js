import React from "react"
import styled from "styled-components"
import CardTemplate from "../../../ui/CardTemplate"
import Link from "next/link"
import { changeProfile } from "../../../../redux/components/navigations"
import { useDispatch } from "react-redux"
import { theme } from "../../../../styles/theme"

const Education = ({ educations }) => {
  const dispatch = useDispatch()
  const sectionHandler = (section) => {
    dispatch(changeProfile(section))
  }

  return educations.length ? (
    <EducationItem educations={educations} />
  ) : (
    <CardTemplate
      title={"Образование"}
      content={"Добавьте сведения об образовании"}
      buttonContent={"Добавить ВУЗ"}
      section="education"
      path={"/profile/change-data"}
      onChangeSection={sectionHandler}
    />
  )
}

const EducationItem = ({ educations }) => {
  const dispatch = useDispatch()
  return (
    <Wrapper>
      <InfoHeader>
        <InfoTitle>Образование </InfoTitle>
        <div onClick={() => dispatch(changeProfile("education"))}>
          <Link href={"/profile/change-data"} passHref>
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
          </Link>{" "}
        </div>
      </InfoHeader>
      {educations.map((item) => (
        <>
          <EducationBlock key={item.id}>
            <EducationLogo>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.8305 1.27785C15.558 0.875482 16.437 0.875482 17.1675 1.27785L30.5992 8.70716C31.4632 9.18478 32 10.0979 32 11.0873V11.9201H0V11.0873C0 10.0969 0.536829 9.18579 1.40278 8.70816L14.8305 1.27785ZM10.6252 8.05494C10.6583 8.18438 10.7737 8.27368 10.9072 8.27368H21.0838C21.2173 8.27368 21.3317 8.18438 21.3648 8.05494C21.3979 7.9255 21.3377 7.79104 21.2203 7.72682L17.1645 5.47816C16.436 5.07679 15.553 5.07679 14.8245 5.47816L10.7667 7.72682C10.6493 7.79204 10.5921 7.9265 10.6252 8.05494ZM9.51947 24.4075V15.6296H10.5319V14.4767C10.5319 13.7713 9.96098 13.1994 9.25457 13.1994H4.78635C4.08095 13.1994 3.51 13.7713 3.51 14.4767V15.6296H4.59068V24.4075H9.51947ZM29.7718 27.5803H27.6777V25.8263H4.52281V27.5803H2.49591V29.2671H0.944624V31.023H31.2579V29.2671H29.7718V27.5803ZM27.6793 15.6296V24.4075H22.8217V15.6306H21.742V14.4787C21.742 13.7733 22.312 13.2013 23.0174 13.2013H27.4836C28.188 13.2013 28.7589 13.7733 28.7589 14.4787V15.6296H27.6793ZM18.5643 24.4075V15.6296H19.6449V14.4767C19.6449 13.7713 19.074 13.1994 18.3696 13.1994H13.9014C13.196 13.1994 12.625 13.7713 12.625 14.4767V15.6296H13.6365V24.4075H18.5643Z"
                  fill="#828282"
                />
              </svg>
            </EducationLogo>
            <EducationContent>
              <h2>{item.title}</h2>
              <EducationFaculty>{item.profession}</EducationFaculty>
              <EducationDate>
                {item.degreeOfEducation} ·{" "}
                {!!item.untilNow
                  ? "по настоящее время"
                  : `Год выпуска ${new Date(item.endDate).getFullYear()}`}
              </EducationDate>
              <EducationCity>{item.city}</EducationCity>
            </EducationContent>
          </EducationBlock>
          {educations[educations.length - 1].id !== item.id && <HR />}
        </>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 832px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 32px 32px 0 32px;
  font-family: Inter, sans-serif;
  margin: 32px 0;
  color: #333333;
  ${theme.mqMax("lg")} {
    max-width: none;
  }
`
const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
`
const InfoTitle = styled.h4`
  font-family: Inter, sans-serif;
  font-weight: bold;
  font-size: 24px;
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
const EducationBlock = styled.div`
  display: flex;
  margin: 32px 0;
`
const EducationLogo = styled.div`
  width: 100%;
  max-width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 24px;
  background: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
`
const EducationContent = styled.div`
  width: 100%;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  grid-gap: 4px;
  h2 {
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;
  }
`
const EducationFaculty = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #27ae60;
`
const EducationDate = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
`
const EducationCity = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
`
const HR = styled.hr`
  width: 100%;
  height: 1px;
  border-top: 1px solid #d8d8d8;
`
export default Education
