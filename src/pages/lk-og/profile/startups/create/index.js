import React, { useEffect } from "react"
import styled from "styled-components"
import { theme } from "/src/styles/theme"
import GeneralCreateStartup from "/src/components/pages/CreateStartups/General"
import VerticalTab from "/src/components/ui/tabs/VerticalTabs"
import DetailsCreateStartup from "../../../../../components/pages/CreateStartups/Details"
import { useDispatch, useSelector } from "react-redux"
import { saveChangeStartup } from "../../../../../redux/components/startups"
import $api from "../../../../../services/axios"
import { changeCreateStartupTabsValue } from "../../../../../redux/components/navigations"

export async function getServerSideProps(context) {
  return {
    props: { id: context.query.id || null },
  }
}

const tabs = [
  {
    name: "Основные данные",
    value: "general",
  },
  {
    name: "Детали стартапа",
    value: "details",
  },
]

const CreateStartups = ({ id }) => {
  const dispatch = useDispatch()
  const { changeStartup } = useSelector((state) => state.startups)
  const { createStartupTabsValue } = useSelector((state) => state.navigations)

  const startupChangeHandler = (value) => {
    dispatch(saveChangeStartup({ ...changeStartup, ...value }))
  }

  const viewHandler = (value) => {
    dispatch(changeCreateStartupTabsValue(value))
  }

  useEffect(async () => {
    if (id) {
      const { data } = await $api.get(`/startup/startups/${id}`)
      startupChangeHandler({
        ...data,
        industries: !!data.industries.length ? `${data.industries[0].id}` : "",
        technologies: !!data.technologies.length
          ? `${data.technologies[0].id}`
          : "",
        stages: `${data.stages?.id}`,
        fundings: `${data.fundings?.id}`,
        salesModel: data.salesModel[0] ? `${data.salesModel[0].id}` : "",
        region: `${data.region?.id}`,
        businessModel: data.businessModel[0]
          ? `${data.businessModel[0].id}`
          : "",
        teamMembers: data.teamMembers,
        legalEntitiesChecker: !!data.legalEntities,
        innBin: data.legalEntities?.innBin || "",
        companyName: data.legalEntities?.companyName || "",
      })
    }
  }, [])

  useEffect(() => {
    const iniVal = {
      title: "",
      shortDescription: "",
      longDescription: "",
      link: "",
      industries: "",
      technologies: "",
      stages: "",
      salesModel: "",
      region: "",
      fundings: "",
      businessModel: "",
      startWork: "",
      presentation: "",
      logo: null,
      numberOfTeam: "",
      teamMembers: [],
      legalEntities: null,
      businessPrograms: [
        { title: "", dataOfStart: null, link: "", dataOfEnd: null },
      ],
      legalEntitiesChecker: false,
      companyName: "",
      innBin: "",
      media: [{ title: "", link: "" }],
      galleries: [],
    }
    if (!id) {
      dispatch(saveChangeStartup(iniVal))
    }
    return () => {
      dispatch(changeCreateStartupTabsValue("general"))
      dispatch(saveChangeStartup(iniVal))
    }
  }, [])

  return (
    <Container>
      <Title>{id ? "Редактирование стартапа" : "Создание стартапа"}</Title>
      {!id && (
        <Description>
          Заполните поля ниже, чтобы опубликовать стартап на портале
        </Description>
      )}
      <Wrapper>
        <Content>
          {(createStartupTabsValue === "general" && (
            <GeneralCreateStartup
              id={id}
              initialValues={changeStartup}
              onChangeStartup={startupChangeHandler}
              onView={viewHandler}
            />
          )) ||
            (createStartupTabsValue === "details" && (
              <DetailsCreateStartup
                initialValues={changeStartup}
                idStartup={id || changeStartup.id}
                onChangeStartup={startupChangeHandler}
              />
            ))}
        </Content>
        <VerticalTabWrapper>
          <VerticalTab
            onChangeHandler={viewHandler}
            valueTab={createStartupTabsValue}
            arrayTab={tabs}
          />
        </VerticalTabWrapper>
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
const Title = styled.h3`
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 48px;
  color: #333333;
  margin-bottom: 16px;
`
const Description = styled.p`
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  color: #828282;
  margin-bottom: 32px;
`
const Content = styled.div`
  flex-grow: 1;
  margin-right: 32px;
  ${theme.mqMax("lg")} {
    margin: 0;
  }
`
const VerticalTabWrapper = styled.div`
  height: 144px;
  width: 256px;
  //margin-left: 32px;
  ${theme.mqMax("xl")} {
    margin-left: 0;
    margin-bottom: 30px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    div {
      width: 360px;
      margin-right: 32px;
      ${theme.mqMax("lg")} {
        margin: 0;
      }
    }
  }
`

export default CreateStartups
