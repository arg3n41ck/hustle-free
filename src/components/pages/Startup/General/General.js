import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import LogoTest from "../../../../public/png/logo.png"
import styled from "styled-components"
import ExpandIcon from "../../../../public/svg/expand-icon.svg"
import ScrollerBlock from "./ScrollerBlock"
import VacanciesAndTasksItem from "./VacanciesAndTasksItem"
import ServicesItem from "./ServicesItem"
import ScrollBlock from "./ScrollBlock"
import TeamMembers from "./TeamMembers"
import { motion } from "framer-motion"
import Activity from "./Activity"
import $api from "../../../../services/axios"
import AboutUsSMI from "./AboutUsSMI"
import Vacancies from "./Vacansies"
import { format, parseISO } from "date-fns"
import { Box } from "@mui/material"
import { useRouter } from "next/router"
import { changeCreateStartupTabsValue } from "../../../../redux/components/navigations"
import { useDispatch } from "react-redux"
import CardTemplate from "../../../ui/CardTemplate"
import phoneFormatter from "../../../../helpers/phoneFormatter"

const variants = {
  open: { height: "100%" },
  closed: { height: "0px" },
}

const tasks = [
  {
    id: 1,
    title: "UI/UX Designer",
    price: "От 50000$",
    views: 15,
    responders: 10,
  },
  {
    id: 2,
    title: "UI/UX Designer",
    price: "От 50000$",
    views: 15,
    responders: 10,
  },
  {
    id: 3,
    title: "UI/UX Designer",
    price: "От 50000$",
    views: 15,
    responders: 10,
  },
  {
    id: 4,
    title: "UI/UX Designer",
    price: "От 50000$",
    views: 15,
    responders: 10,
  },
  {
    id: 5,
    title: "UI/UX Designer",
    price: "От 50000$",
    views: 15,
    responders: 10,
  },
  {
    id: 6,
    title: "UI/UX Designer",
    price: "От 50000$",
    views: 15,
    responders: 10,
  },
  {
    id: 7,
    title: "UI/UX Designer",
    price: "От 50000$",
    views: 15,
    responders: 10,
  },
]

const General = ({ startup, teamMembers, onTabs, onViewToggle }) => {
  const [isExpanded, setIsExpended] = useState(false)
  const [services, setServices] = useState([])
  const [tasks, setTasks] = useState([])
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(async () => {
    const { data } = await $api.get(
      `/startup/startups/${startup.id}/startup_services/`
    )
    const { data: tasksData } = await $api.get(
      `/startup/startups/${startup.id}/startup_tasks/`
    )

    setTasks(tasksData)
    setServices(data)
  }, [])

  return (
    <div>
      <WrapperBlock>
        <HeaderInfo>
          <LogoBlock>
            <Image
              src={startup.logo ? startup.logo : LogoTest}
              alt={"logo"}
              width={56}
              height={56}
              objectFit={"cover"}
            />
          </LogoBlock>
          <HeaderContent>
            <h2>{startup?.title}</h2>
            <p>{startup.presentation}</p>
          </HeaderContent>
          <Link href={`/profile/startups/create?id=${startup.id}`} passHref>
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
        </HeaderInfo>
        <HR />
        <BodyInfo>
          <Description>
            <Block>
              <FirstBlock>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.16699 5.83325H15.8337"
                    stroke="#828282"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4.16699 10H12.5003"
                    stroke="#828282"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4.16699 14.1667H9.16699"
                    stroke="#828282"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </FirstBlock>
              <DescriptionBlock>
                <Descriptions>
                  {startup.shortDescription.length >= 340
                    ? `${startup.shortDescription.slice(0, 340)}...`
                    : startup.shortDescription}
                </Descriptions>
              </DescriptionBlock>
            </Block>
          </Description>
          <div>
            <Block>
              <FirstBlock>
                <Box sx={{ marginTop: 0.4 }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
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
                </Box>
              </FirstBlock>
              <SecondBlock>
                <HeaderP>Основан</HeaderP>
                <InfoH3>{format(parseISO(startup?.startWork), "yyyy")}</InfoH3>
              </SecondBlock>
            </Block>
          </div>
          {!!startup?.link && (
            <div>
              <Block>
                <FirstBlock>
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
                      d="M11 3.05518V8.94334C9.46342 8.76797 8.04833 8.19325 6.97374 7.32014C6.37674 6.83508 5.91152 6.28112 5.58308 5.68969C6.99611 4.25299 8.88792 3.28865 11 3.05518ZM13 3.05518V8.94334C14.5366 8.76797 15.9517 8.19325 17.0263 7.32014C17.6233 6.83508 18.0885 6.28112 18.4169 5.68969C17.0039 4.253 15.1121 3.28865 13 3.05518ZM19.7168 7.36608C19.3207 7.91625 18.8406 8.42297 18.2874 8.87237C16.8355 10.0521 14.9677 10.7712 13 10.9538L13 13.0463C13.8146 13.1219 14.6157 13.2897 15.3804 13.5471C16.4564 13.9092 17.4455 14.4437 18.2874 15.1278C18.837 15.5743 19.3182 16.0801 19.717 16.634C20.5315 15.2805 21 13.6951 21 12.0002C21 10.3053 20.5314 8.71973 19.7168 7.36608ZM18.417 18.3107C18.0861 17.7154 17.6183 17.161 17.0263 16.68C16.3825 16.1569 15.6078 15.7338 14.7425 15.4426C14.1847 15.2549 13.599 15.1253 13 15.0569V20.9453C15.1121 20.7118 17.004 19.7475 18.417 18.3107ZM11 20.9453L11 15.0569C10.401 15.1253 9.81528 15.2549 9.2575 15.4426C8.39222 15.7338 7.61751 16.1569 6.97374 16.68C6.38168 17.161 5.91388 17.7154 5.58301 18.3107C6.99604 19.7475 8.88788 20.7118 11 20.9453ZM4.28297 16.634C4.68176 16.0801 5.16302 15.5743 5.71255 15.1278C6.55451 14.4437 7.54363 13.9092 8.61956 13.5471C9.38428 13.2897 10.1854 13.1219 11 13.0463V10.9538C9.03233 10.7712 7.16455 10.0521 5.71255 8.87237C5.15944 8.42297 4.67933 7.91625 4.28321 7.36608C3.46856 8.71972 3 10.3053 3 12.0002C3 13.6951 3.46846 15.2805 4.28297 16.634Z"
                      fill="#828282"
                    />
                  </svg>
                </FirstBlock>
                <SecondBlock>
                  <HeaderP>Веб-сайт</HeaderP>
                  <a
                    style={{ color: "#2F80ED" }}
                    target={"_blank"}
                    href={startup?.link}
                  >
                    {!!startup.link && startup.link}
                  </a>
                </SecondBlock>
              </Block>
            </div>
          )}
          <div>
            <Block>
              <FirstBlock>
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
              </FirstBlock>
              <SecondBlock>
                <HeaderP>Количество сотрудников</HeaderP>
                <InfoH3>{startup?.numberOfTeam}</InfoH3>
                <ExtraLink href="#">
                  {startup?.teamMembers.length} в JAS
                </ExtraLink>
              </SecondBlock>
            </Block>
          </div>
          <div>
            <Block>
              <FirstBlock>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.398 19.804C13.881 19.0348 19 16.0163 19 11C19 7.13401 15.866 4 12 4C8.13401 4 5 7.13401 5 11C5 16.0163 10.119 19.0348 11.602 19.804C11.8548 19.9351 12.1452 19.9351 12.398 19.804ZM12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
                    fill="#828282"
                  />
                </svg>
              </FirstBlock>
              <SecondBlock>
                <HeaderP>Штаб-квартира</HeaderP>
                <InfoH3>{startup.region?.title}</InfoH3>
              </SecondBlock>
            </Block>
          </div>
          <div>
            <Block>
              <FirstBlock>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.67962 3.32038L7.29289 2.70711C7.68342 2.31658 8.31658 2.31658 8.70711 2.70711L11.2929 5.29289C11.6834 5.68342 11.6834 6.31658 11.2929 6.70711L9.50048 8.49952C9.2016 8.7984 9.1275 9.255 9.31653 9.63307C10.4093 11.8186 12.1814 13.5907 14.3669 14.6835C14.745 14.8725 15.2016 14.7984 15.5005 14.4995L17.2929 12.7071C17.6834 12.3166 18.3166 12.3166 18.7071 12.7071L21.2929 15.2929C21.6834 15.6834 21.6834 16.3166 21.2929 16.7071L20.6796 17.3204C18.5683 19.4317 15.2257 19.6693 12.837 17.8777L11.6286 16.9714C9.88504 15.6638 8.33622 14.115 7.02857 12.3714L6.12226 11.163C4.33072 8.7743 4.56827 5.43173 6.67962 3.32038Z"
                    fill="#828282"
                  />
                </svg>
              </FirstBlock>
              <SecondBlock>
                <HeaderP>Контакты</HeaderP>
                {startup.phoneNumber.map((phoneItem) => (
                  <InfoH3>{phoneFormatter(phoneItem.phoneNumber)}</InfoH3>
                ))}
              </SecondBlock>
            </Block>
          </div>
          <div>
            <Block>
              <FirstBlock>
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
                    d="M3.0132 9.15129C3 9.69022 3 10.3021 3 11V13C3 15.8284 3 17.2426 3.87868 18.1213C4.75736 19 6.17157 19 9 19H15C17.8284 19 19.2426 19 20.1213 18.1213C21 17.2426 21 15.8284 21 13V11C21 10.3021 21 9.69022 20.9868 9.15129L12.9713 13.6044C12.3672 13.9399 11.6328 13.9399 11.0287 13.6044L3.0132 9.15129ZM3.24297 7.02971C3.32584 7.05052 3.4074 7.08237 3.48564 7.12584L12 11.856L20.5144 7.12584C20.5926 7.08237 20.6742 7.05052 20.757 7.02971C20.6271 6.55619 20.4276 6.18491 20.1213 5.87868C19.2426 5 17.8284 5 15 5H9C6.17157 5 4.75736 5 3.87868 5.87868C3.57245 6.18491 3.37294 6.55619 3.24297 7.02971Z"
                    fill="#828282"
                  />
                </svg>
              </FirstBlock>
              <SecondBlock>
                <HeaderP>E-mail</HeaderP>
                <a
                  style={{ color: "#4285F4" }}
                  href={`mailto:${startup?.email}`}
                >
                  {startup?.email}
                </a>
              </SecondBlock>
            </Block>
          </div>
          <ExpandBlock>
            <StartUpsDetail
              animate={isExpanded ? "open" : "closed"}
              transition={0.5}
              variants={variants}
            >
              {startup?.longDescription && (
                <div>
                  <HeaderP>Полное описание</HeaderP>
                  <Description>{startup?.longDescription}</Description>
                </div>
              )}
              <Detail>
                <div>
                  <div>
                    <HeaderP>Индустрия</HeaderP>

                    <p>
                      {
                        !!startup?.industries.length &&
                          startup.industries.map(
                            (item) =>
                              `${item.title}${
                                startup.industries[
                                  startup.industries.length - 1
                                ].id !== item.id
                                  ? ", "
                                  : ""
                              }`
                          )
                        // console.log(startup.industries)
                      }
                    </p>
                  </div>
                  <div>
                    <HeaderP>Стадия</HeaderP>
                    <p>
                      {startup?.stages?.title}
                      {/*{!!startup?.stages?.length &&*/}
                      {/*  startup.stages.map(*/}
                      {/*    (item) =>*/}
                      {/*      `${item.title}${*/}
                      {/*        startup.stages[startup.stages.length - 1].id !==*/}
                      {/*        item.id*/}
                      {/*          ? ", "*/}
                      {/*          : ""*/}
                      {/*      }`*/}
                      {/*  )}*/}
                    </p>
                  </div>
                  <div>
                    <HeaderP>Модель продаж</HeaderP>

                    <p>
                      {!!startup?.salesModel.length &&
                        startup.salesModel.map(
                          (item) =>
                            `${item.title}${
                              startup.salesModel[startup.salesModel.length - 1]
                                .id !== item.id
                                ? ", "
                                : ""
                            }`
                        )}
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <HeaderP>Технология</HeaderP>
                    <p>
                      {!!startup?.technologies.length &&
                        startup.technologies.map(
                          (item) =>
                            `${item.title}${
                              startup.technologies[
                                startup.technologies.length - 1
                              ].id !== item.id
                                ? ", "
                                : ""
                            }`
                        )}
                    </p>
                  </div>
                  <div>
                    <HeaderP>Раунд финансирования</HeaderP>
                    <p>{startup?.fundings?.title}</p>
                  </div>
                  <div>
                    <HeaderP>Бизнес модель</HeaderP>
                    <p>
                      {!!startup?.businessModel?.length &&
                        startup.businessModel.map(
                          (item) =>
                            `${item.title}${
                              startup.businessModel[
                                startup.businessModel.length - 1
                              ].id !== item.id
                                ? ", "
                                : ""
                            }`
                        )}
                    </p>
                  </div>
                </div>
              </Detail>
            </StartUpsDetail>
          </ExpandBlock>
          <HR />
          <ExpandButton onClick={() => setIsExpended(!isExpanded)}>
            <p>{!isExpanded ? "Развернуть" : "Свернуть"}</p>
            <ImageExpand
              isExpanded={isExpanded}
              src={ExpandIcon}
              alt={"Expand Icon"}
            />
          </ExpandButton>
        </BodyInfo>
      </WrapperBlock>
      {/*<Vacancies id={startup.id} />*/}
      {/*{!!tasks?.length ? (*/}
      {/*  <ScrollerBlock title={"Задачи"}>*/}
      {/*    {tasks.map(({ id, title, priceFrom, views, responders }) => (*/}
      {/*      <VacanciesAndTasksItem*/}
      {/*        key={id}*/}
      {/*        title={title}*/}
      {/*        price={priceFrom}*/}
      {/*        responders={responders}*/}
      {/*        views={views}*/}
      {/*      />*/}
      {/*    ))}*/}
      {/*    <AllButton>*/}
      {/*      <svg*/}
      {/*        width="25"*/}
      {/*        height="24"*/}
      {/*        viewBox="0 0 25 24"*/}
      {/*        fill="none"*/}
      {/*        xmlns="http://www.w3.org/2000/svg"*/}
      {/*      >*/}
      {/*        <path*/}
      {/*          d="M18.5 12L19.2071 11.2929L19.9142 12L19.2071 12.7071L18.5 12ZM6.5 13C5.94771 13 5.5 12.5523 5.5 12C5.5 11.4477 5.94771 11 6.5 11V13ZM15.2071 7.29289L19.2071 11.2929L17.7929 12.7071L13.7929 8.70711L15.2071 7.29289ZM19.2071 12.7071L15.2071 16.7071L13.7929 15.2929L17.7929 11.2929L19.2071 12.7071ZM18.5 13H6.5V11H18.5V13Z"*/}
      {/*          fill="#27ae60"*/}
      {/*        />*/}
      {/*      </svg>*/}
      {/*      <button onClick={() => onTabs("tasks")} type={"button"}>*/}
      {/*        Посмотреть все*/}
      {/*      </button>*/}
      {/*    </AllButton>*/}
      {/*  </ScrollerBlock>*/}
      {/*) : (*/}
      {/*  <CardTemplate*/}
      {/*    title={"Задачи"}*/}
      {/*    content={"Добавьте новые задачи"}*/}
      {/*    buttonContent={"Добавить задачу"}*/}
      {/*    section="tasks"*/}
      {/*    path={"#"}*/}
      {/*    isStartup={true}*/}
      {/*  />*/}
      {/*)}*/}
      {!!services.length ? (
        <ScrollerBlock
          onTabs={onTabs}
          onViewToggle={onViewToggle}
          path={"services"}
          title={"Услуги"}
        >
          {services.map(({ id, title, price, views, description }) => (
            <ServicesItem
              key={`ScrollerBlock_Service_item_${id}`}
              title={title}
              price={price}
              views={views}
              descriptions={description}
            />
          ))}
          <AllButton>
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.5 12L19.2071 11.2929L19.9142 12L19.2071 12.7071L18.5 12ZM6.5 13C5.94771 13 5.5 12.5523 5.5 12C5.5 11.4477 5.94771 11 6.5 11V13ZM15.2071 7.29289L19.2071 11.2929L17.7929 12.7071L13.7929 8.70711L15.2071 7.29289ZM19.2071 12.7071L15.2071 16.7071L13.7929 15.2929L17.7929 11.2929L19.2071 12.7071ZM18.5 13H6.5V11H18.5V13Z"
                fill="#27ae60"
              />
            </svg>
            <button onClick={() => onTabs("services")}>Посмотреть все</button>
          </AllButton>
        </ScrollerBlock>
      ) : (
        <CardTemplate
          title={"Услуги"}
          content={"Добавьте новые услуги"}
          buttonContent={"Добавить услугу"}
          section="services"
          path={"#"}
          isStartup={true}
          startupOnChangeTabs={() => {
            onViewToggle()
            onTabs("services")
          }}
        />
      )}
      {!!teamMembers?.length ? (
        <TeamMembers
          onTabs={onTabs}
          onViewToggle={onViewToggle}
          teamMembers={teamMembers}
        />
      ) : (
        <CardTemplate
          title={"Сотрудники"}
          content={"Добавьте сотрудников стартапа"}
          buttonContent={"Добавить сотрудника"}
          section="career"
          path={"#"}
          isStartup={true}
          startupOnChangeTabs={() => {
            onViewToggle()
            onTabs("staff")
          }}
        />
      )}
      {!!startup.media?.length ? (
        <ScrollBlock
          title={"СМИ о нас"}
          onViewToggle={() => {
            dispatch(changeCreateStartupTabsValue("details"))
          }}
          onTabs={(path) => {
            router.push(path)
          }}
          path={`/profile/startups/create?id=${startup.id}/`}
        >
          {/*<AboutUsSMI id={startup.id}/>*/}
          {startup.media.map((item) => (
            <AboutUsSMI data={item} />
          ))}
        </ScrollBlock>
      ) : (
        <CardTemplate
          title={"СМИ о нас"}
          content={"Добавьте новости о стартапе"}
          buttonContent={"Добавить новости"}
          section="galleries"
          path={"#"}
          startupOnChangeTabs={() => {
            dispatch(changeCreateStartupTabsValue("details"))
            router.push(`/profile/startups/create?id=${startup.id}`)
          }}
          isStartup={true}
        />
      )}
      {!!startup.galleries?.length ? (
        <ScrollBlock
          onTabs={onTabs}
          onViewToggle={onViewToggle}
          path={"gallery"}
          title={"Галерея"}
        >
          <GalleryWrapper>
            {!!startup?.galleries?.length &&
              startup.galleries.map(
                ({ id, image }) =>
                  image && (
                    <ImageBlock key={`startup.galleries.${id}`}>
                      <img src={image} alt={"Image"} />
                    </ImageBlock>
                  )
              )}
            <AllButton>
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.5 12L19.2071 11.2929L19.9142 12L19.2071 12.7071L18.5 12ZM6.5 13C5.94771 13 5.5 12.5523 5.5 12C5.5 11.4477 5.94771 11 6.5 11V13ZM15.2071 7.29289L19.2071 11.2929L17.7929 12.7071L13.7929 8.70711L15.2071 7.29289ZM19.2071 12.7071L15.2071 16.7071L13.7929 15.2929L17.7929 11.2929L19.2071 12.7071ZM18.5 13H6.5V11H18.5V13Z"
                  fill="#27ae60"
                />
              </svg>
              <button onClick={() => onTabs("gallery")} type={"button"}>
                Посмотреть все
              </button>
            </AllButton>
          </GalleryWrapper>
        </ScrollBlock>
      ) : (
        <CardTemplate
          title={"Галерея"}
          content={"Загрузите изображения"}
          buttonContent={"Добавить изображение"}
          section="galleries"
          path={"#"}
          isStartup={true}
          startupOnChangeTabs={() => {
            onViewToggle()
            onTabs("gallery")
          }}
        />
      )}
      <div id={"active"}>
        <Activity startup={startup} />
      </div>
    </div>
  )
}

const WrapperBlock = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 32px;
  overflow: hidden;
  word-break: break-all;
`
const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
`
const LogoBlock = styled.div`
  width: 100%;
  max-width: 56px;
  height: 100%;
  min-height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-right: 16px;
  overflow: hidden;
`
const HeaderContent = styled.div`
  width: 70%;
  h2 {
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    color: #333333;
  }
  p {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #333333;
  }
`

const InfoChange = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;

  p {
    white-space: nowrap;
    margin: 0 8px;
    font-family: Inter, sans-serif;
    font-size: 16px;
    line-height: 24px;
    color: #828282;
  }
`

const HR = styled.div`
  border-top: 1px solid #e5e5e5;
  margin: 24px 0;
`
const BodyInfo = styled.div``
const Description = styled.div`
  display: flex;
`
const Block = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
`
const FirstBlock = styled.div`
  min-width: 24px;
  //padding: 5px 0;
  svg {
    margin-top: 2px;
  }
`
const SecondBlock = styled.div`
  margin-left: 7px;

  a {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
  }
`
const DescriptionBlock = styled.div`
  margin-left: 7px;
`
const HeaderP = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  color: #828282;
  margin-bottom: 4px;
`
const InfoH3 = styled.h3`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #333333;
  margin-bottom: 12px;
`
const Descriptions = styled.h6`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
`
const ExtraLink = styled.a`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #27ae60;
  text-decoration-line: underline;
`

const ExpandButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  p {
    margin-right: 22px;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #828282;
    transition: all 0.5s ease;
  }
  p:hover {
    color: #27ae60;
    //transition: 0.5s;
  }
`
const ExpandBlock = styled.div`
  max-height: max-content;
  width: 100%;
  .h1 {
    color: #27ae60;
  }
  .expanded {
    transition: height ease 0.5s;
  }
  .notExpanded {
    height: 0;
    overflow: hidden;
  }
`
const Detail = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  margin-top: 20px;

  & > div {
    display: flex;
    flex-direction: column;
    grid-gap: 20px;
  }
`
const ImageExpand = styled(Image)`
  transition: 0.3s;
  transform: rotate(${(p) => (p.isExpanded ? "180deg" : "0deg")});
`
const AllButton = styled.div`
  min-width: 240px;
  border-radius: 12px;
  padding: 16px;
  margin-right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(111, 207, 151, 0.1);
  button {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #27ae60;
    background-color: transparent;
  }
`
const GalleryWrapper = styled.div`
  width: 100%;
  display: flex;
  grid-gap: 16px;
`

const ImageBlock = styled.div`
  min-height: 148px;
  min-width: 148px;
  height: 148px;
  width: 148px;
  border-radius: 8px;
  display: grid;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`
const StartUpsDetail = styled(motion.div)`
  overflow: hidden;
`
export default General
