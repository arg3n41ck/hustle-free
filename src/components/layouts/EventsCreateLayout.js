import React, { useCallback, useMemo } from 'react'
import { BetweenIcon, StartIcon } from '../pages/LkOg/Tabs/Events/FormIcons'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import ActiveLink from '../ActiveLink'
import LkDefaultHeader from '../ui/LKui/LKDefaultHeader'
import { HeaderWrapper } from '../pages/LkOg/Tabs/Events/Events/Events'
import { TitleHeader } from '../ui/LKui/HeaderContent'
import { useEventRouteContext } from '../pages/LkOg/Tabs/Events/EventRouteProvider'
import { useTranslation } from 'next-i18next'

export const createEventEditingSteps = ({ eventId, tLkOg }) => {
  return [
    {
      title: tLkOg('editEvent.generalInformation.generalInformation'),
      href: !eventId ? '/lk-og/profile/events/edit' : '/lk-og/profile/events/edit/[id]',
      ctxKey: 'general',
      path: eventId ? `/lk-og/profile/events/edit/${eventId}` : null,
    },
    {
      title: tLkOg('location.location'),
      href: `/lk-og/profile/events/edit/[id]/location`,
      ctxKey: 'location',
      path: eventId ? `/lk-og/profile/events/edit/${eventId}/location` : null,
    },
    {
      title: tLkOg('registrationPeriods.registrationPeriods'),
      href: `/lk-og/profile/events/edit/[id]/periods`,
      ctxKey: 'periods',
      path: eventId ? `/lk-og/profile/events/edit/${eventId}/periods` : null,
    },
    {
      title: tLkOg('coverAndDescription.coverAndDescription'),
      href: `/lk-og/profile/events/edit/[id]/description`,
      ctxKey: 'description',
      path: eventId ? `/lk-og/profile/events/edit/${eventId}/description` : null,
    },
    {
      title: tLkOg('tournamentRules.tournamentRules'),
      href: `/lk-og/profile/events/edit/[id]/rules`,
      ctxKey: 'rules',
      path: eventId ? `/lk-og/profile/events/edit/${eventId}/rules` : null,
    },
    {
      title: tLkOg('categoriesOfParticipants.categoriesOfParticipants'),
      href: `/lk-og/profile/events/edit/[id]/participant-categories`,
      ctxKey: 'participantCategories',
      path: eventId ? `/lk-og/profile/events/edit/${eventId}/participant-categories` : null,
    },
    {
      title: tLkOg('mat.matAndSchedule'),
      href: `/lk-og/profile/events/edit/[id]/mats`,
      ctxKey: 'mats',
      path: eventId ? `/lk-og/profile/events/edit/${eventId}/mats` : null,
    },
    {
      title: tLkOg('contacts.contacts'),
      href: `/lk-og/profile/events/edit/[id]/contacts`,
      ctxKey: 'contacts',
      path: eventId ? `/lk-og/profile/events/edit/${eventId}/contacts` : null,
    },
    // {
    //   title: "Кредиты",
    //   href: `/lk-og/profile/events/edit/[id]/credits`,
    //   path: eventId ? `/lk-og/profile/events/edit/${eventId}/credits` : null,
    // },
  ]
}

function EventsCreateLayout({ onToggleSidebar, children, onDraft }) {
  const {
    push: routerPush,
    pathname,
    asPath,
    query: { id: eventId },
  } = useRouter()
  const { ctxStep } = useEventRouteContext()
  const { t: tLkOg } = useTranslation('lkOg')

  const steps = useCallback(
    (eventId) => {
      return createEventEditingSteps({ eventId, tLkOg })
    },
    [eventId],
  )

  const readySteps = useMemo(() => steps(eventId), [eventId])

  const handleOnClickLink = ({ access, path }) => {
    if (access && path) {
      routerPush(path)
    }
  }

  return (
    <div>
      <LkDefaultHeader onToggleSidebar={onToggleSidebar}>
        <HeaderWrapper>
          <TitleHeader>{tLkOg('myEvents.createEvent')}</TitleHeader>
          <SaveAsDraft
            type='submit'
            onClick={() => {
              onDraft ? onDraft() : routerPush('/lk-og/profile/events')
            }}
          >
            {tLkOg('myEvents.saveToArchive')}
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
            const isLinkCurrentPage = asPath === path

            return (
              <Step key={`eventCreateSteps_${title}_${i}`}>
                <div
                  onClick={() =>
                    handleOnClickLink({ access: ctxStep[ctxKey]?.access, path, asPath })
                  }
                  className={`step-inner-wrapper ${
                    !(ctxStep[ctxKey]?.access && path) ? 'disabled' : ''
                  } ${isLinkCurrentPage ? 'activeECLink' : ''}`}
                >
                  {icon}
                  <span>{title}</span>
                </div>
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
  cursor: pointer;

  & .step-inner-wrapper {
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

    &.disabled {
      &:hover {
        background: linear-gradient(0deg, rgba(235, 87, 87, 0.07), rgba(235, 87, 87, 0.07)), #141519;
      }
    }
  }
`
