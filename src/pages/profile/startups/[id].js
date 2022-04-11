import React, { useEffect, useState } from "react"
import $api from "/src/services/axios"
import styled from "styled-components"
import { Box } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import {
  changeStartUp,
  changeTeamMembers,
} from "/src/redux/components/navigations"
import General from "/src/components/pages/Startup/General/General"
import VerticalTabs from "/src/components/ui/tabs/VerticalTabs"
import Vacancies from "../../../components/pages/Startup/Vacancies/Vacancies"
import CreateVacancy from "../../../components/pages/Startup/Vacancies/Create"
import Services from "../../../components/pages/Startup/Services/Services"
import CreateService from "../../../components/pages/Startup/Services/Create"
import TeamMembers from "../../../components/pages/Startup/TeamMembers/TeamMembers"
import Gallery from "../../../components/pages/Startup/Gallery/Gallery"
import { toast } from "react-toastify"
import sliceText from "../../../helpers/sliceText"

export async function getServerSideProps(context) {
  const { data: startup } = await $api.get(
    `/startup/startups/${context.query.id}/`
  )
  const { data: startupTeamMembers } = await $api.get(
    `/startup/startups/${context.query.id}/startup_staff/`
  )
  const existingMembers = startupTeamMembers.filter(({ user }) => !!user)

  return {
    props: {
      startup,
      startupTeamMembers: existingMembers,
    },
  }
}

const makeServicesFavorite = async (id) => {
  try {
    const { data } = await $api.post("/favorites/services/", { service: id })
    toast.success("Услуга добавлена в избранные")
    return data
  } catch (e) {
    console.log(e)
  }
}

const removeServicesFromFavorites = async (id) => {
  try {
    return $api.delete(`/favorites/services/${id}/`)
  } catch (e) {
    console.log(e)
  }
}

// const getServices = async (id, userID) => {
//   try {
//     const { data: unsortedByFavorites } = await $api.get(
//       `/startup/startups/${id}/startup_services/`
//     )
//     const { data: sortedByFavorites } = await $api.get(
//       `/accounts/users/${userID}/service_favorites/`
//     )
//     const fav = sortedByFavorites.map(({ id, ...others }) => ({
//       id: others.service.id,
//       favID: id,
//     }))
//     return (unsortedByFavorites.length ? unsortedByFavorites : []).map(
//       (service) => {
//         return {
//           ...service,
//           favorite: fav.find(({ id }) => id === service.id),
//         }
//       }
//     )
//   } catch (e) {
//     console.log(e)
//   }
// }

const Startup = ({ startup, startupTeamMembers }) => {
  const { changeStartUpValue } = useSelector((state) => state.profileMenu)
  const dispatch = useDispatch()
  const tabsRef = React.useRef([
    {
      name: sliceText(startup.title, 15),
      value: "",
    },
    // {
    //   name: "Вакансии",
    //   value: "vacancies",
    //   createText: "Создать вакансию",
    //   createTitle: "Создание вакансии",
    //   createDescription:
    //     "Заполните поля ниже, чтобы опубликовать вакансию на портале",
    // },
    // {
    //   name: "Задачи",
    //   value: "tasks",
    //   createText: "Создать задачу",
    //   createTitle: "Создание задачи",
    //   createDescription:
    //     "Заполните поля ниже, чтобы опубликовать задачу на портале",
    // },
    {
      name: "Услуги",
      value: "services",
      createText: "Создать услугу",
      createTitle: "Создание услуги",
      createDescription:
        "Заполните поля ниже, чтобы опубликовать услугу на портале",
    },
    {
      name: "Сотрудники",
      value: "staff",
      createText: "Создать участика",
    },
    {
      name: "Галерея",
      value: "gallery",
      createText: "Добавить фотографию",
    },
    // {
    //   name: "Подписчики",
    //   value: "followers",
    // },
  ])
  const [createOrView, setCreateOrView] = useState("view") // view | create
  const [vacancies, setVacancies] = useState([])
  const [services, setServices] = useState([])

  const user = useSelector((state) => state.user.user)

  useEffect(async () => {
    // dispatch(changeStartUp(startup.title))
    const {
      data: { results: vacancies },
    } = await $api.get("/vacancies/vacancies/")
    setVacancies(vacancies)
  }, [])

  // const updateServices = () => {
  //   getServices(startup.id, user.id).then((data) => {
  //     setServices(data)
  //   })
  // }

  useEffect(() => {
    updateServices()
    return () => {
      dispatch(changeStartUp(""))
      dispatch(changeTeamMembers("all"))
    }
  }, [])

  const tabsHandler = (newValue) => {
    dispatch(changeStartUp(newValue))
  }

  const createOrViewToggle = () => {
    setCreateOrView((prev) => (prev === "view" ? "create" : "view"))
  }

  const checkerHeader = React.useMemo(
    () => () => {
      const currentTab = tabsRef.current.find(
        (tab) => tab.value === changeStartUpValue
      )

      if (currentTab) {
        return {
          title: currentTab.name,
          btnText: currentTab.createText,
          createTitle: currentTab.createTitle,
          createDescription: currentTab.createDescription,
        }
      }
    },
    [changeStartUpValue]
  )

  return (
    <>
      <Container>
        {createOrView === "view" ||
        changeStartUpValue === "gallery" ||
        changeStartUpValue === "staff" ? (
          <>
            {changeStartUpValue !== "" && (
              <Header>
                <Title>{checkerHeader()?.title}</Title>
                {checkerHeader()?.btnText && (
                  <CreateBtn onClick={createOrViewToggle}>
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5 6L12.5 18"
                        stroke="#27AE60"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M18.5 12L6.5 12"
                        stroke="#27AE60"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>

                    <Box sx={{ marginLeft: 1 }}>{checkerHeader().btnText}</Box>
                  </CreateBtn>
                )}
              </Header>
            )}
          </>
        ) : (
          <>
            {checkerHeader().btnText && (
              <CreateHeader onClick={createOrViewToggle}>
                <Box
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
                <CreateTitle>{checkerHeader().createTitle}</CreateTitle>
                <CreateDescription>
                  {checkerHeader().createDescription}
                </CreateDescription>
              </CreateHeader>
            )}
          </>
        )}
        <Wrapper>
          <Content>
            {createOrView === "view" ? (
              <>
                {!!startup?.id &&
                  (((changeStartUpValue === startup.title ||
                    changeStartUpValue === "") && (
                    <General
                      startup={startup}
                      teamMembers={startupTeamMembers}
                      onViewToggle={createOrViewToggle}
                      onTabs={tabsHandler}
                    />
                  )) ||
                    (changeStartUpValue === "vacancies" && (
                      <Vacancies vacancies={vacancies} />
                    )) ||
                    (changeStartUpValue === "services" && (
                      <Services
                        makeFavorite={makeServicesFavorite}
                        removeFromFavorites={removeServicesFromFavorites}
                        services={services}
                        updateServices={updateServices}
                        onViewToggle={createOrViewToggle}
                      />
                    )) ||
                    (changeStartUpValue === "staff" && (
                      <TeamMembers
                        startupID={startup.id}
                        closeModal={createOrViewToggle}
                        services={services}
                      />
                    )) ||
                    (changeStartUpValue === "gallery" && (
                      <Gallery
                        startup={startup}
                        closeModal={createOrViewToggle}
                      />
                    )))}
              </>
            ) : (
              <>
                {(!!startup?.id && changeStartUpValue === "vacancies" && (
                  <CreateVacancy />
                )) ||
                  (changeStartUpValue === "services" && (
                    <CreateService
                      setServices={setServices}
                      onView={createOrViewToggle}
                      startupId={startup.id}
                    />
                  )) ||
                  (changeStartUpValue === "staff" && (
                    <TeamMembers
                      openModal={changeStartUpValue === "staff"}
                      startupID={startup.id}
                      startupOwner={startup.owner}
                      services={services}
                      closeModal={createOrViewToggle}
                    />
                  )) ||
                  (changeStartUpValue === "gallery" && (
                    <Gallery
                      openModal={changeStartUpValue === "gallery"}
                      startup={startup}
                      closeModal={createOrViewToggle}
                    />
                  ))}
              </>
            )}
          </Content>
          <Box onClick={() => setCreateOrView("view")} sx={{ maxHeight: 258 }}>
            {" "}
            {/* 424 old value */}
            <VerticalTabs
              valueTab={changeStartUpValue}
              onChangeHandler={tabsHandler}
              arrayTab={tabsRef.current}
            />
          </Box>
        </Wrapper>
      </Container>
    </>
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
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`
const Title = styled.h3`
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 48px;
  color: #333333;
  margin-bottom: 30px;
`
const CreateHeader = styled.div``
const CreateTitle = styled.h4`
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 48px;
  color: #333333;
`
const CreateDescription = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  color: #828282;
  margin-top: 16px;
  margin-bottom: 32px;
`
const CreateBtn = styled.button`
  width: 256px;
  border: 1px solid #27ae60;
  box-sizing: border-box;
  border-radius: 12px;
  height: 64px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #27ae60;
  cursor: pointer;
  background: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  &:hover {
    border: none;
    background: #f1fbf5;
  }
`

export default Startup
