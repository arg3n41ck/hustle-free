import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { getRusBetweenDate, localStorageSetItem } from '../../../helpers/helpers'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import FileUploaderBig from '../../ui/LKui/FileUploaderBig'
import { formDataHttp } from '../../../helpers/formDataHttp'
import { fetchOgEvents, selectOgEvents } from '../../../redux/components/user'
import ParticipantsAreFilledModal from './EventModal/ParticipantsAreFilledModal'
import $api from '../../../services/axios'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'
import { useMediaQuery } from '@mui/material'
import RegistrationAccordion from '../../AuthAthleteToEventAccordions/RegistrationAccordion'
import { theme } from '../../../styles/theme'
import EventEditDropdown from './EventEditDropdown'
import { createEventEditingSteps } from '../../layouts/EventsCreateLayout'

const getIsUserInEvent = async (eventId) => {
  try {
    const { data } = await $api.get(`/events/events/${eventId}/check_athlete/`)
    return data
  } catch (e) {
    console.log(e)
  }
}

const dateKeys = [
  {
    start: 'earlyRegStart',
    end: 'earlyRegEnd',
  },
  {
    start: 'lateRegStart',
    end: 'lateRegEnd',
  },
  {
    start: 'standartRegStart',
    end: 'standartRegEnd',
  },
]

const getRegDates = (start, end) => {
  const startDate = new Date(start).setHours(0, 0, 0, 0)
  const endDate = new Date(end).setHours(0, 0, 0, 0)
  const today = new Date().setHours(0, 0, 0, 0)
  return { startDate, endDate, today }
}

const getIsEventOnRegistration = (registration) => {
  return dateKeys.some(({ start, end }) => {
    if (registration[start] && registration[end]) {
      const { today, endDate, startDate } = getRegDates(registration[start], registration[end])
      return startDate <= today && today <= endDate
    }
  })
}

const regArray = (event) => {
  return [
    {
      id: 'earlyReg_1',
      label: 'event.EDGeneralInfo.earlyRegistration',
      value:
        event.registration.earlyRegActive &&
        getRusBetweenDate(event.registration.earlyRegStart, event.registration.earlyRegEnd),
      icon: EarlyRegIcon,
    },
    {
      id: 'standardReg_2',
      label: 'event.EDGeneralInfo.standartRegistration',
      value: getRusBetweenDate(
        event.registration.standartRegStart,
        event.registration.standartRegEnd,
      ),
      icon: StandardRegIcon,
    },
    {
      id: 'lateReg_3',
      label: 'event.EDGeneralInfo.lateRegistration',
      value:
        event.registration.lateRegActive &&
        getRusBetweenDate(event.registration.lateRegStart, event.registration.lateRegEnd),
      icon: LateRegIcon,
    },
    {
      id: 'durationReg_1',
      label: 'event.EDGeneralInfo.durationEvent',
      value: getRusBetweenDate(event.dateStart, event.dateEnd),
      icon: RegDurationIcon,
    },
  ]
}

function EdGeneralInfo({ event }) {
  const { t: tEventDetail } = useTranslation('eventDetail')
  const { user, userAuthenticated } = useSelector((state) => state.user)
  const [ogEventsId] = useSelector(selectOgEvents)
  const [openFullPcModal, setOpenFullPcModal] = useState(false)
  const [userStatusInEvent, setUserStatusInTeam] = useState()
  const lg = useMediaQuery('(max-width: 992px)')
  const md = useMediaQuery('(max-width: 768px)')
  const { t: tLkOg } = useTranslation('lkOg')
  const [openLkOgEDDropdown, setOpenLkOgEDDropdown] = useState(false)

  const regData = useMemo(() => regArray(event), [event])

  const {
    query: { id: eventId },
    push: routerPush,
  } = useRouter()
  const dispatch = useDispatch()
  const ogAndIsMyEvent = user?.role === 'organizer' && (ogEventsId || []).includes(+eventId)

  useEffect(() => {
    user?.role === 'organizer' && dispatch(fetchOgEvents({ organizer: user?.organizerId }))
  }, [user])

  const checkUserStatusInTeam = useCallback(() => {
    eventId && getIsUserInEvent(eventId).then(setUserStatusInTeam)
  }, [eventId])

  useEffect(() => {
    checkUserStatusInTeam()
  }, [eventId])

  const onUploadNewImage = useCallback(
    async (file) => {
      user?.role === 'organizer' &&
        (await formDataHttp(
          {
            banner: file,
          },
          `events/event_descriptions/${event?.description?.id}/`,
          'patch',
        ))
    },
    [user, eventId],
  )

  const canApplyToEventByDate = useMemo(() => {
    return event && getIsEventOnRegistration(event.registration)
  }, [event, eventId])

  const onClickApply = useCallback(
    (id) => {
      if (userAuthenticated && user?.role === 'athlete') {
        event?.registration?.maxParticipantCount !== event?.participantsCount
          ? routerPush(`/events/${id}/tournament-rules`)
          : setOpenFullPcModal(true)
      } else {
        toast.info(tEventDetail('event.EDGeneralInfo.registerAsAnAthlete'), {
          autoClose: 5000,
        })
        routerPush('/login')
      }
    },
    [eventId, userAuthenticated, user, event],
  )

  const { regDisabled, regText } = useMemo(() => {
    let regDisabled = false,
      regText = ''
    if (
      !userAuthenticated ||
      userStatusInEvent?.message === 'User is not athlete' ||
      userStatusInEvent?.message === 'User is not event'
    ) {
      if (canApplyToEventByDate) {
        regText = tEventDetail('event.EDGeneralInfo.registrationEvent')
      } else {
        regText = tEventDetail('event.EDGeneralInfo.registrationClosed')
        regDisabled = true
      }
    } else if (userStatusInEvent?.message === 'User in waiting list') {
      regText = tEventDetail('event.EDGeneralInfo.requested')
      regDisabled = true
    } else if (userStatusInEvent?.message === 'User in event') {
      regText = tEventDetail('event.EDGeneralInfo.alreadyInEvent')
      regDisabled = true
    }
    return { regDisabled, regText }
  }, [canApplyToEventByDate, eventId, userStatusInEvent, userAuthenticated])

  return (
    <>
      {!ogAndIsMyEvent ? (
        <EventBanner src={event?.description.banner} />
      ) : (
        <div style={{ height: md ? '281px' : '448px' }}>
          <FileUploaderBig
            defaultBanner={event?.description?.banner}
            onChange={async (file) => {
              await onUploadNewImage(file)
            }}
          />
        </div>
      )}
      <TitlePart>
        <h1>{event.name}</h1>
        {!userAuthenticated || (user?.role || '') === 'athlete' ? (
          <>
            <ERegBtn
              onClick={() => onClickApply(eventId)}
              disabled={regDisabled}
              active={!regDisabled}
            >
              {regText}
            </ERegBtn>
            <ParticipantsAreFilledModal open={openFullPcModal} setOpen={setOpenFullPcModal} />
          </>
        ) : (
          ogAndIsMyEvent && (
            <EventEditDropdown
              open={openLkOgEDDropdown}
              onClose={() => setOpenLkOgEDDropdown(false)}
              items={createEventEditingSteps({ eventId, tLkOg }).map(({ title, ctxKey, path }) => ({
                title: title,
                onClick: () => (path ? routerPush(path) : null),
              }))}
            >
              <ERegBtn active onClick={() => setOpenLkOgEDDropdown((s) => !s)}>
                <EditIcon />
                <span>{tEventDetail('event.EDGeneralInfo.editEvent')}</span>
              </ERegBtn>
            </EventEditDropdown>
          )
        )}
      </TitlePart>
      {lg ? (
        <RegistrationAccordion event={event} />
      ) : (
        <RegInfoUl>
          {!!regData?.length &&
            regData.map(({ id, label, value, icon }) =>
              !!value ? (
                <RegInfoLi key={`EdGeneralInfo_${id}`}>
                  {icon}
                  <div>
                    <span>{tEventDetail(label)}</span>
                    <p>{value}</p>
                  </div>
                </RegInfoLi>
              ) : (
                ''
              ),
            )}
        </RegInfoUl>
      )}
    </>
  )
}

export default EdGeneralInfo

const EventBanner = styled.div`
  width: 100%;
  height: 448px;
  background: no-repeat ${({ src }) => (src ? 'url("' + src + '")' : '#333333')} center/cover;
  border: 1px solid #333333;
  box-sizing: border-box;
  border-radius: 20px;

  ${theme.mqMax('md')} {
    height: 240px;
    width: calc(100% + 32px);
    margin: 0 -16px;
    border-radius: 0;
  }
`

const TitlePart = styled.div`
  display: grid;
  grid-template-columns: 2.2fr 1fr;
  grid-gap: 32px;

  ${theme.mqMax('lg')} {
    grid-template: auto 1fr / 1fr;
    grid-gap: 16px;
  }

  h1 {
    font-weight: 800;
    font-size: 48px;
    color: #f2f2f2;
    word-break: break-word;

    ${theme.mqMax('md')} {
      font-size: 24px;
      line-height: 32px;
    }
  }
`

const ERegBtn = styled.button`
  height: min-content;
  width: 100%;
  background: ${({ active }) =>
    active ? 'linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%)' : '#333'};
  border-radius: 16px;
  font-size: 20px;
  color: #ffffff;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column-gap: 20px;

  ${theme.mqMax('md')} {
    padding: 16px 20px;
    font-size: 16px;
  }
`

const RegInfoUl = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const RegInfoLi = styled.li`
  width: 100%;
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-column-gap: 12px;
  border-right: 1px solid #333333;
  padding: 0 0 0 24px;
  &:last-child {
    border-right: none;
  }

  div {
    span {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: #828282;
    }

    p {
      font-weight: 400;
      font-size: 20px;
      line-height: 32px;
      color: #f2f2f2;
    }
  }
`

const EarlyRegIcon = (
  <svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M9.30956 35.6905L10.0167 34.9834L10.0167 34.9834L9.30956 35.6905ZM30.6903 35.6905L29.9832 34.9834V34.9834L30.6903 35.6905ZM31.1048 9.81493L30.2733 10.3705V10.3705L31.1048 9.81493ZM30.1852 8.89526L29.6296 9.72673V9.72673L30.1852 8.89526ZM8.89502 9.81493L9.72649 10.3705L8.89502 9.81493ZM9.81468 8.89526L10.3703 9.72673L9.81468 8.89526ZM30.6666 14.1668V30.0002H32.6666V14.1668H30.6666ZM24.9999 35.6668H14.9999V37.6668H24.9999V35.6668ZM9.33325 30.0002V14.1668H7.33325V30.0002H9.33325ZM14.9999 35.6668C13.4003 35.6668 12.3012 35.6647 11.4756 35.5537C10.6788 35.4466 10.2881 35.2548 10.0167 34.9834L8.60246 36.3976C9.30738 37.1026 10.1905 37.3989 11.2091 37.5359C12.1989 37.669 13.4568 37.6668 14.9999 37.6668V35.6668ZM7.33325 30.0002C7.33325 31.5432 7.33113 32.8012 7.46421 33.791C7.60116 34.8096 7.89753 35.6927 8.60246 36.3976L10.0167 34.9834C9.74528 34.712 9.5535 34.3213 9.44637 33.5245C9.33538 32.6989 9.33325 31.5998 9.33325 30.0002H7.33325ZM30.6666 30.0002C30.6666 31.5998 30.6645 32.6989 30.5535 33.5245C30.4463 34.3213 30.2546 34.712 29.9832 34.9834L31.3974 36.3976C32.1023 35.6927 32.3987 34.8096 32.5356 33.791C32.6687 32.8012 32.6666 31.5432 32.6666 30.0002H30.6666ZM24.9999 37.6668C26.543 37.6668 27.8009 37.669 28.7907 37.5359C29.8093 37.3989 30.6925 37.1026 31.3974 36.3976L29.9832 34.9834C29.7118 35.2548 29.3211 35.4466 28.5242 35.5537C27.6987 35.6647 26.5995 35.6668 24.9999 35.6668V37.6668ZM32.6666 14.1668C32.6666 13.0173 32.6678 12.0798 32.5912 11.3272C32.513 10.5578 32.3453 9.87143 31.9363 9.25936L30.2733 10.3705C30.4261 10.5992 30.5393 10.9184 30.6015 11.5296C30.6654 12.1575 30.6666 12.9756 30.6666 14.1668H32.6666ZM25.8333 9.3335C27.0245 9.3335 27.8426 9.3347 28.4705 9.39858C29.0817 9.46076 29.4009 9.57394 29.6296 9.72673L30.7407 8.06379C30.1287 7.65482 29.4423 7.48712 28.6729 7.40885C27.9203 7.33229 26.9828 7.3335 25.8333 7.3335V9.3335ZM31.9363 9.25936C31.6201 8.7862 31.2139 8.37995 30.7407 8.06379L29.6296 9.72673C29.8844 9.89697 30.1031 10.1157 30.2733 10.3705L31.9363 9.25936ZM9.33325 14.1668C9.33325 12.9756 9.33446 12.1575 9.39834 11.5296C9.46052 10.9184 9.57369 10.5992 9.72649 10.3705L8.06355 9.25936C7.65458 9.87143 7.48687 10.5578 7.40861 11.3272C7.33204 12.0798 7.33325 13.0173 7.33325 14.1668H9.33325ZM14.1666 7.3335C13.017 7.3335 12.0796 7.33229 11.3269 7.40885C10.5576 7.48712 9.87118 7.65482 9.25911 8.06379L10.3703 9.72673C10.5989 9.57394 10.9181 9.46076 11.5293 9.39858C12.1573 9.3347 12.9754 9.3335 14.1666 9.3335V7.3335ZM9.72649 10.3705C9.89673 10.1157 10.1155 9.89697 10.3703 9.72673L9.25911 8.06379C8.78596 8.37995 8.3797 8.7862 8.06355 9.25936L9.72649 10.3705Z'
      fill='#27AE60'
    />
    <path
      d='M15 8.33333C15 6.49238 16.4924 5 18.3333 5H21.6667C23.5076 5 25 6.49238 25 8.33333C25 10.1743 23.5076 11.6667 21.6667 11.6667H18.3333C16.4924 11.6667 15 10.1743 15 8.33333Z'
      stroke='#27AE60'
      strokeWidth='2'
    />
    <path d='M15 20L25 20' stroke='#27AE60' strokeWidth='2' strokeLinecap='round' />
    <path d='M15 26.6665L21.6667 26.6665' stroke='#27AE60' strokeWidth='2' strokeLinecap='round' />
  </svg>
)

const StandardRegIcon = (
  <svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M9.30981 35.6905L10.0169 34.9834L10.0169 34.9834L9.30981 35.6905ZM30.6905 35.6905L29.9834 34.9834V34.9834L30.6905 35.6905ZM31.1051 9.81493L30.2736 10.3705V10.3705L31.1051 9.81493ZM30.1854 8.89526L29.6298 9.72673V9.72673L30.1854 8.89526ZM8.89526 9.81493L9.72673 10.3705L8.89526 9.81493ZM9.81493 8.89526L10.3705 9.72673L9.81493 8.89526ZM30.6668 14.1668V30.0002H32.6668V14.1668H30.6668ZM25.0002 35.6668H15.0002V37.6668H25.0002V35.6668ZM9.3335 30.0002V14.1668H7.3335V30.0002H9.3335ZM15.0002 35.6668C13.4005 35.6668 12.3014 35.6647 11.4758 35.5537C10.679 35.4466 10.2883 35.2548 10.0169 34.9834L8.6027 36.3976C9.30762 37.1026 10.1907 37.3989 11.2093 37.5359C12.1992 37.669 13.4571 37.6668 15.0002 37.6668V35.6668ZM7.3335 30.0002C7.3335 31.5432 7.33137 32.8012 7.46445 33.791C7.6014 34.8096 7.89778 35.6927 8.6027 36.3976L10.0169 34.9834C9.74553 34.712 9.55375 34.3213 9.44662 33.5245C9.33562 32.6989 9.3335 31.5998 9.3335 30.0002H7.3335ZM30.6668 30.0002C30.6668 31.5998 30.6647 32.6989 30.5537 33.5245C30.4466 34.3213 30.2548 34.712 29.9834 34.9834L31.3976 36.3976C32.1026 35.6927 32.3989 34.8096 32.5359 33.791C32.669 32.8012 32.6668 31.5432 32.6668 30.0002H30.6668ZM25.0002 37.6668C26.5432 37.6668 27.8012 37.669 28.791 37.5359C29.8096 37.3989 30.6927 37.1026 31.3976 36.3976L29.9834 34.9834C29.712 35.2548 29.3213 35.4466 28.5245 35.5537C27.6989 35.6647 26.5998 35.6668 25.0002 35.6668V37.6668ZM32.6668 14.1668C32.6668 13.0173 32.668 12.0798 32.5915 11.3272C32.5132 10.5578 32.3455 9.87143 31.9365 9.25936L30.2736 10.3705C30.4264 10.5992 30.5396 10.9184 30.6017 11.5296C30.6656 12.1575 30.6668 12.9756 30.6668 14.1668H32.6668ZM25.8335 9.3335C27.0247 9.3335 27.8428 9.3347 28.4708 9.39858C29.082 9.46076 29.4012 9.57394 29.6298 9.72673L30.741 8.06379C30.1289 7.65482 29.4425 7.48712 28.6732 7.40885C27.9205 7.33229 26.9831 7.3335 25.8335 7.3335V9.3335ZM31.9365 9.25936C31.6204 8.7862 31.2141 8.37995 30.741 8.06379L29.6298 9.72673C29.8846 9.89697 30.1034 10.1157 30.2736 10.3705L31.9365 9.25936ZM9.3335 14.1668C9.3335 12.9756 9.3347 12.1575 9.39858 11.5296C9.46076 10.9184 9.57394 10.5992 9.72673 10.3705L8.06379 9.25936C7.65482 9.87143 7.48712 10.5578 7.40885 11.3272C7.33229 12.0798 7.3335 13.0173 7.3335 14.1668H9.3335ZM14.1668 7.3335C13.0173 7.3335 12.0798 7.33229 11.3272 7.40885C10.5578 7.48712 9.87143 7.65482 9.25936 8.06379L10.3705 9.72673C10.5992 9.57394 10.9184 9.46076 11.5296 9.39858C12.1575 9.3347 12.9756 9.3335 14.1668 9.3335V7.3335ZM9.72673 10.3705C9.89697 10.1157 10.1157 9.89697 10.3705 9.72673L9.25936 8.06379C8.7862 8.37995 8.37995 8.7862 8.06379 9.25936L9.72673 10.3705Z'
      fill='#2E79DD'
    />
    <path
      d='M15 8.33333C15 6.49238 16.4924 5 18.3333 5H21.6667C23.5076 5 25 6.49238 25 8.33333C25 10.1743 23.5076 11.6667 21.6667 11.6667H18.3333C16.4924 11.6667 15 10.1743 15 8.33333Z'
      stroke='#2E79DD'
      strokeWidth='2'
    />
    <path d='M15 20L25 20' stroke='#2E79DD' strokeWidth='2' strokeLinecap='round' />
    <path d='M15 26.6665L21.6667 26.6665' stroke='#2E79DD' strokeWidth='2' strokeLinecap='round' />
  </svg>
)

const LateRegIcon = (
  <svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M9.30981 35.6905L10.0169 34.9834L10.0169 34.9834L9.30981 35.6905ZM30.6905 35.6905L29.9834 34.9834V34.9834L30.6905 35.6905ZM31.1051 9.81493L30.2736 10.3705V10.3705L31.1051 9.81493ZM30.1854 8.89526L29.6298 9.72673V9.72673L30.1854 8.89526ZM8.89526 9.81493L9.72673 10.3705L8.89526 9.81493ZM9.81493 8.89526L10.3705 9.72673L9.81493 8.89526ZM30.6668 14.1668V30.0002H32.6668V14.1668H30.6668ZM25.0002 35.6668H15.0002V37.6668H25.0002V35.6668ZM9.3335 30.0002V14.1668H7.3335V30.0002H9.3335ZM15.0002 35.6668C13.4005 35.6668 12.3014 35.6647 11.4758 35.5537C10.679 35.4466 10.2883 35.2548 10.0169 34.9834L8.6027 36.3976C9.30762 37.1026 10.1907 37.3989 11.2093 37.5359C12.1992 37.669 13.4571 37.6668 15.0002 37.6668V35.6668ZM7.3335 30.0002C7.3335 31.5432 7.33137 32.8012 7.46445 33.791C7.6014 34.8096 7.89778 35.6927 8.6027 36.3976L10.0169 34.9834C9.74553 34.712 9.55375 34.3213 9.44662 33.5245C9.33562 32.6989 9.3335 31.5998 9.3335 30.0002H7.3335ZM30.6668 30.0002C30.6668 31.5998 30.6647 32.6989 30.5537 33.5245C30.4466 34.3213 30.2548 34.712 29.9834 34.9834L31.3976 36.3976C32.1026 35.6927 32.3989 34.8096 32.5359 33.791C32.669 32.8012 32.6668 31.5432 32.6668 30.0002H30.6668ZM25.0002 37.6668C26.5432 37.6668 27.8012 37.669 28.791 37.5359C29.8096 37.3989 30.6927 37.1026 31.3976 36.3976L29.9834 34.9834C29.712 35.2548 29.3213 35.4466 28.5245 35.5537C27.6989 35.6647 26.5998 35.6668 25.0002 35.6668V37.6668ZM32.6668 14.1668C32.6668 13.0173 32.668 12.0798 32.5915 11.3272C32.5132 10.5578 32.3455 9.87143 31.9365 9.25936L30.2736 10.3705C30.4264 10.5992 30.5396 10.9184 30.6017 11.5296C30.6656 12.1575 30.6668 12.9756 30.6668 14.1668H32.6668ZM25.8335 9.3335C27.0247 9.3335 27.8428 9.3347 28.4708 9.39858C29.082 9.46076 29.4012 9.57394 29.6298 9.72673L30.741 8.06379C30.1289 7.65482 29.4425 7.48712 28.6732 7.40885C27.9205 7.33229 26.9831 7.3335 25.8335 7.3335V9.3335ZM31.9365 9.25936C31.6204 8.7862 31.2141 8.37995 30.741 8.06379L29.6298 9.72673C29.8846 9.89697 30.1034 10.1157 30.2736 10.3705L31.9365 9.25936ZM9.3335 14.1668C9.3335 12.9756 9.3347 12.1575 9.39858 11.5296C9.46076 10.9184 9.57394 10.5992 9.72673 10.3705L8.06379 9.25936C7.65482 9.87143 7.48712 10.5578 7.40885 11.3272C7.33229 12.0798 7.3335 13.0173 7.3335 14.1668H9.3335ZM14.1668 7.3335C13.0173 7.3335 12.0798 7.33229 11.3272 7.40885C10.5578 7.48712 9.87143 7.65482 9.25936 8.06379L10.3705 9.72673C10.5992 9.57394 10.9184 9.46076 11.5296 9.39858C12.1575 9.3347 12.9756 9.3335 14.1668 9.3335V7.3335ZM9.72673 10.3705C9.89697 10.1157 10.1157 9.89697 10.3705 9.72673L9.25936 8.06379C8.7862 8.37995 8.37995 8.7862 8.06379 9.25936L9.72673 10.3705Z'
      fill='#EB5757'
    />
    <path
      d='M15 8.33333C15 6.49238 16.4924 5 18.3333 5H21.6667C23.5076 5 25 6.49238 25 8.33333C25 10.1743 23.5076 11.6667 21.6667 11.6667H18.3333C16.4924 11.6667 15 10.1743 15 8.33333Z'
      stroke='#EB5757'
      strokeWidth='2'
    />
    <path d='M15 20L25 20' stroke='#EB5757' strokeWidth='2' strokeLinecap='round' />
    <path d='M15 26.6665L21.6667 26.6665' stroke='#EB5757' strokeWidth='2' strokeLinecap='round' />
  </svg>
)

const RegDurationIcon = (
  <svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect x='5' y='10' width='30' height='25' rx='2' stroke='#BDBDBD' strokeWidth='2' />
    <path
      d='M5 14C5 12.1144 5 11.1716 5.58579 10.5858C6.17157 10 7.11438 10 9 10H31C32.8856 10 33.8284 10 34.4142 10.5858C35 11.1716 35 12.1144 35 14V16.6667H5V14Z'
      fill='#BDBDBD'
    />
    <path d='M11.6665 5L11.6665 10' stroke='#BDBDBD' strokeWidth='2' strokeLinecap='round' />
    <path d='M28.3335 5L28.3335 10' stroke='#BDBDBD' strokeWidth='2' strokeLinecap='round' />
  </svg>
)

const EditIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M17.204 10.7957L19 8.9997C19.5453 8.45445 19.8179 8.18182 19.9636 7.88773C20.2409 7.32818 20.2409 6.67122 19.9636 6.11167C19.8179 5.81757 19.5453 5.54495 19 4.9997C18.4548 4.45445 18.1821 4.18182 17.888 4.03609C17.3285 3.7588 16.6715 3.7588 16.112 4.03609C15.8179 4.18182 15.5453 4.45445 15 4.9997L13.1814 6.81835C14.1452 8.46895 15.5314 9.84451 17.204 10.7957ZM11.7269 8.27281L4.8564 15.1433C4.43134 15.5684 4.21881 15.7809 4.07907 16.042C3.93934 16.3031 3.88039 16.5978 3.7625 17.1873L3.1471 20.2643C3.08058 20.5969 3.04732 20.7632 3.14193 20.8578C3.23654 20.9524 3.40284 20.9191 3.73545 20.8526L6.81243 20.2372C7.40189 20.1193 7.69661 20.0604 7.95771 19.9206C8.21881 19.7809 8.43134 19.5684 8.8564 19.1433L15.7458 12.2539C14.1241 11.2383 12.7524 9.87597 11.7269 8.27281Z'
      fill='white'
    />
  </svg>
)
