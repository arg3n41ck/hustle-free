import React from "react"
import styled from "styled-components"
import CardTemplate from "../../../ui/CardTemplate"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { changeProfile } from "../../../../redux/components/navigations"
import { theme } from "../../../../styles/theme"

const Skills = ({ skills }) => {
  const dispatch = useDispatch()
  const sectionHandler = (section) => {
    dispatch(changeProfile(section))
  }

  return skills.length ? (
    <SkillsItem userSkills={skills} />
  ) : (
    <CardTemplate
      title={"Навыки"}
      content={"Добавьте навыки, чтобы продемонстрировать свою компетентность"}
      buttonContent={"Добавить навыки"}
      section="skills"
      path={"/profile/change-data"}
      onChangeSection={sectionHandler}
    />
  )
}

const SkillsItem = ({ userSkills }) => {
  const dispatch = useDispatch()

  return (
    <Wrapper>
      <SkillsHeader>
        <SkillsTitle>Навыки</SkillsTitle>
        <div onClick={() => dispatch(changeProfile("skills"))}>
          <Link href={"/profile/change-data"} passHref>
            <SkillsChange>
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
            </SkillsChange>
          </Link>
        </div>
      </SkillsHeader>
      <SkillsBody>
        {userSkills.map((item) => (
          <Item key={item.id}> {item.title} </Item>
        ))}
      </SkillsBody>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 832px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 32px;
  margin: 32px 0;
  ${theme.mqMax("lg")} {
    max-width: none;
  }
`
const SkillsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 32px;
`
const SkillsTitle = styled.h4`
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: #333333;
`
const SkillsChange = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  p {
    margin: 0 8px;
    font-size: 16px;
    line-height: 24px;
    color: #828282;
  }
`
const SkillsBody = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`
const Item = styled.p`
  padding: 8px 12px;
  text-align: center;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  margin: 4px 3px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Skills
