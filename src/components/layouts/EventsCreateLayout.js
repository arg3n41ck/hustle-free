import React from "react"
import { BetweenIcon, StartIcon } from "../pages/LkOg/Tabs/Events/FormIcons"
import { useRouter } from "next/router"
import styled from "styled-components"
import ActiveLink from "../ActiveLink"
import LkDefaultHeader from "../ui/LKui/LKDefaultHeader"
import { HeaderWrapper } from "../pages/LkOg/Tabs/Events/Events/Events"
import { TitleHeader } from "../ui/LKui/HeaderContent"
import { useEventRouteContext } from "../pages/LkOg/Tabs/Events/EventRouteProvider"

function EventsCreateLayout({ onToggleSidebar, children }) {
  const {
    push: routerPush,
    pathname,
    asPath,
    query: { id: eventId },
  } = useRouter()
  const { ctxStep } = useEventRouteContext()
  const readySteps = steps(eventId)

  return (
    <div>
      <LkDefaultHeader onToggleSidebar={onToggleSidebar}>
        <HeaderWrapper>
          <TitleHeader>Создание турнира</TitleHeader>
          <SaveAsDraft onClick={() => routerPush("/lk-og/profile/events/")}>
            Сохранить в черновик
          </SaveAsDraft>
        </HeaderWrapper>
      </LkDefaultHeader>
      <MainWrapper>
        <div>
          <PageHeader>
            <h2>{readySteps.find(({ href }) => href === pathname)?.title}</h2>
          </PageHeader>
          <Form>{children}</Form>
        </div>

        <StepsWrapper>
          {readySteps.map(({ title, href, path, ctxKey }, i) => {
            const icon =
              i === 0 || i === readySteps.length - 1 ? (
                <StartIcon
                  completed={ctxStep[ctxKey]?.allFieldsFilled}
                  active={href === pathname}
                  reversed={i !== 0}
                />
              ) : (
                <BetweenIcon
                  completed={ctxStep[ctxKey]?.allFieldsFilled}
                  active={href === pathname}
                />
              )
            return (
              <Step key={`eventCreateSteps_${title}_${i}`}>
                <ActiveLink
                  disabled
                  href={ctxStep[ctxKey]?.access && path ? path : asPath}
                  activeClassName={
                    ctxStep[ctxKey]?.access && path ? "activeECLink" : ""
                  }
                >
                  <a>
                    {icon}
                    <span>{title}</span>
                  </a>
                </ActiveLink>
              </Step>
            )
          })}
        </StepsWrapper>
      </MainWrapper>
    </div>
  )
}

export default EventsCreateLayout

const SaveAsDraft = styled.button`
  padding: 8px 24px;
  background: #333333;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  color: #ffffff;
`

const MainWrapper = styled.div`
  display: grid;
  grid-template: 1fr / 3fr 1fr;
`

const Form = styled.div`
  min-height: calc(100% - 96px);
  padding: 32px;
`

const PageHeader = styled.div`
  height: 96px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #333333;
  h2 {
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 32px;
    color: #f2f2f2;
  }
`

const StepsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #333;
`

const Step = styled.div`
  a {
    height: 96px;
    display: grid;
    grid-template: 1fr/ 26px auto;
    justify-items: center;
    grid-column-gap: 24px;
    padding: 0 8%;
    &.activeECLink {
      background: rgba(109, 78, 234, 0.07);
    }
    &:hover {
      background: rgba(109, 78, 234, 0.07);
    }

    span {
      font-weight: 600;
      font-size: 18px;
      line-height: 32px;
      color: #ffffff;
      align-self: center;
      justify-self: flex-start;
    }
  }
`

const steps = (eventId) => {
  return [
    {
      title: "Общая информация",
      href: !eventId
        ? "/lk-og/profile/events/edit"
        : "/lk-og/profile/events/edit/[id]",
      ctxKey: "general",
      path: eventId ? `/lk-og/profile/events/edit/${eventId}` : null,
    },
    {
      title: "Локация",
      href: `/lk-og/profile/events/edit/[id]/location`,
      ctxKey: "location",
      path: eventId ? `/lk-og/profile/events/edit/${eventId}/location` : null,
    },
    {
      title: "Периоды регистрации",
      href: `/lk-og/profile/events/edit/[id]/periods`,
      ctxKey: "periods",
      path: eventId ? `/lk-og/profile/events/edit/${eventId}/periods` : null,
    },
    {
      title: "Обложка и описание",
      href: `/lk-og/profile/events/edit/[id]/description`,
      ctxKey: "description",
      path: eventId
        ? `/lk-og/profile/events/edit/${eventId}/description`
        : null,
    },
    {
      title: "Правила турнира",
      href: `/lk-og/profile/events/edit/[id]/rules`,
      ctxKey: "rules",
      path: eventId ? `/lk-og/profile/events/edit/${eventId}/rules` : null,
    },
    {
      title: "Категории участников",
      href: `/lk-og/profile/events/edit/[id]/participant-categories`,
      ctxKey: "participantCategories",
      path: eventId
        ? `/lk-og/profile/events/edit/${eventId}/participant-categories`
        : null,
    },
    {
      title: "Контакты",
      href: `/lk-og/profile/events/edit/[id]/contacts`,
      ctxKey: "contacts",
      path: eventId ? `/lk-og/profile/events/edit/${eventId}/contacts` : null,
    },
    // {
    //   title: "Кредиты",
    //   href: `/lk-og/profile/events/edit/[id]/credits`,
    //   path: eventId ? `/lk-og/profile/events/edit/${eventId}/credits` : null,
    // },
  ]
}
