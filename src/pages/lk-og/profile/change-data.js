import React, { useEffect, useState } from "react"
import styled from "styled-components"
import VerticalTab from "../../../components/ui/tabs/VerticalTabs"
import General from "../../../components/pages/ChangeData/General"
import Skills from "../../../components/pages/ChangeData/Skills"
import Career from "../../../components/pages/ChangeData/Career"
import Education from "../../../components/pages/ChangeData/Education"
import Certificates from "../../../components/pages/ChangeData/Certificates"
import { useRouter } from "next/router"
import { useCookies } from "react-cookie"
import { useDispatch, useSelector } from "react-redux"
import { theme } from "../../../styles/theme"
import { changeProfile } from "../../../redux/components/navigations"
import { LinearProgress } from "@mui/material"
import { checkProgress } from "../../../redux/components/user"
import $api from "../../../services/axios"

const tabs = [
  {
    name: "Общие сведения",
    value: "general",
  },
  {
    name: "Карьера",
    value: "career",
  },
  {
    name: "Образование",
    value: "education",
  },
  {
    name: "Навыки",
    value: "skills",
  },
  {
    name: "Сертификаты",
    value: "certificates",
  },
]

const ChangeDataProfile = () => {
  const { changeProfileValue } = useSelector((state) => state.profileMenu)
  const { user, progress } = useSelector((state) => state.user)
  console.log(user)
  const [countries, setCountries] = useState([])
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(["token", "refresh"])

  useEffect(async () => {
    const { data: countriesData } = await $api.get("/accounts/countries/")
    setCountries(countriesData.results)
  }, [])

  const tabsHandler = (newValue) => {
    dispatch(changeProfile(newValue))
  }

  useEffect(async () => {
    if (!cookies.token) {
      await router.push("/login")
    }
  }, [cookies])

  useEffect(() => {
    return () => {
      tabsHandler("general")
    }
  }, [])

  useEffect(() => {
    dispatch(checkProgress())
  }, [user])

  return (
    <Container>
      <Wrapper>
        <Content>
          {(changeProfileValue === "general" && !!user?.id && (
            <General user={user} onTabs={tabsHandler} />
          )) ||
            (changeProfileValue === "skills" && (
              <Skills onTabs={tabsHandler} />
            )) ||
            (changeProfileValue === "career" && !!user?.id && (
              <Career user={user} onTabs={tabsHandler} countries={countries} />
            )) ||
            (changeProfileValue === "education" && !!user?.id && (
              <Education
                user={user}
                onTabs={tabsHandler}
                countries={countries}
              />
            )) ||
            (changeProfileValue === "certificates" && !!user?.id && (
              <Certificates user={user} onTabs={tabsHandler} />
            ))}
        </Content>
        <RightWrapper>
          <VerticalTabWrapper>
            <div>
              <VerticalTab
                onChangeHandler={tabsHandler}
                valueTab={changeProfileValue}
                arrayTab={tabs}
              />
            </div>
          </VerticalTabWrapper>
          <ProgressWrapper>
            <div>
              {" "}
              <LinearProgress
                sx={{ height: "8px", borderRadius: "8px" }}
                variant="determinate"
                value={progress}
              />
              <ProgressTextWrapper>
                <ProgressText>Заполнено</ProgressText>
                <ProgressText>{progress}%</ProgressText>
              </ProgressTextWrapper>
            </div>
          </ProgressWrapper>
        </RightWrapper>
      </Wrapper>
    </Container>
  )
}
const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  ${theme.mqMax("xl")} {
    max-width: none;
  }
`
const Wrapper = styled.div`
  display: flex;
  ${theme.mqMax("xl")} {
    flex-direction: column-reverse;
  }
`
const Content = styled.div`
  flex-grow: 1;
  margin-right: 32px;
  max-width: 832px;
  width: 100%;
  ${theme.mqMax("xl")} {
    padding-right: 10px;
    max-width: none;
  }
  ${theme.mqMax("lg")} {
    padding-right: 0;
  }
`
const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 256px;
  ${theme.mqMax("xl")} {
    margin-left: 0;
    justify-content: flex-end;
    align-items: end;
    margin-right: 20px;
    margin-bottom: 30px;
    width: 100%;
    div {
      width: 360px;
    }
  }
`
const VerticalTabWrapper = styled.div`
  max-height: 310px;
  //margin-left: 32px;
  ${theme.mqMax("xl")} {
    div {
      margin-right: 32px;
      ${theme.mqMax("lg")} {
        margin: 0;
      }
    }
  }
`
const ProgressWrapper = styled.div`
  margin: 24px 3px 0 3px;
  width: 100%;
`
const ProgressTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
`
const ProgressText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #828282;
`

export default ChangeDataProfile
