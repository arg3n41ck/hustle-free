import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { getRusBetweenDate } from '../../../../../../helpers/helpers'
import { IconButton } from '@mui/material'
import { Edit } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

function EventsTable({ events }) {
  const [rewrittenData, setRewrittenData] = useState([])
  const { push: routerPush } = useRouter()
  const { t: tLkOg } = useTranslation('lkOg')

  const getEventStatus = useCallback((status) => {
    switch (status) {
      case 'published':
        return {
          name: tLkOg('myEvents.published'),
          value: status,
        }
      case 'in_proccessing':
        return {
          name: tLkOg('myEvents.nowGoes'),
          value: status,
        }
      default:
        return {
          name: tLkOg('myEvents.draft'),
          value: status,
        }
    }
  }, [])

  const createDataForTable = useCallback((events = []) => {
    return events.map((currentValue) => {
      const {
        id,
        name,
        dateEnd,
        dateStart,
        statusPublish,
        participantNotPaidCount,
        participantIsPaidCount,
        registration,
      } = currentValue
      return {
        id,
        name,
        date: getRusBetweenDate(dateStart, dateEnd),
        registration: `${participantNotPaidCount || 0}/${registration?.maxParticipantCount || 0}`,
        paid: `${participantIsPaidCount || 0}`,
        status: getEventStatus(statusPublish),
      }
    })
  }, [])

  const { current: columns } = useRef([
    {
      column: tLkOg('myEvents.event'),
      accessor: 'name',
    },
    {
      column: tLkOg('myEvents.date'),
      accessor: 'date',
    },
    {
      column: tLkOg('myEvents.registrations'),
      accessor: 'registration',
    },
    {
      column: tLkOg('myEvents.paid'),
      accessor: 'paid',
    },
    {
      column: tLkOg('myEvents.status'),
      accessor: 'status',
    },
  ])

  useEffect(() => {
    setRewrittenData(createDataForTable(events))
  }, [events])

  return (
    <Wrapper>
      <Scrollbar>
        <StyledTable>
          <Thead>
            <Tr>
              {columns.map(({ column, accessor }) => (
                <Th key={`${column}${accessor}`}>{column}</Th>
              ))}
            </Tr>
          </Thead>
          <TBody>
            {!!rewrittenData.length &&
              rewrittenData.map((cell) => {
                return (
                  <Tr
                    key={`table-row-${cell.id}`}
                    className={cell.status.value === 'in_proccessing' ? 'active' : ''}
                  >
                    {columns.map(({ accessor }) => (
                      <Td
                        key={`table-cell-${accessor}-${cell.id}`}
                        onClick={() =>
                          accessor === 'name' &&
                          cell.status.value === 'published' &&
                          routerPush(`/events/${cell.id}/`)
                        }
                      >
                        <div
                          className={`${
                            accessor === 'status' && cell[accessor]?.value === 'published'
                              ? 'green'
                              : cell[accessor]?.value === 'draft'
                              ? 'draft'
                              : ''
                          }`}
                        >
                          <CellWrapper>
                            <span>
                              {!!cell[accessor]?.name ? cell[accessor]?.name : cell[accessor]}
                            </span>
                            {accessor === 'status' && (
                              <Actions>
                                <IconButton
                                  onClick={() => {
                                    routerPush(`/lk-og/profile/events/edit/${cell.id}/`)
                                  }}
                                >
                                  <Edit />
                                </IconButton>
                              </Actions>
                            )}
                          </CellWrapper>
                        </div>
                      </Td>
                    ))}
                  </Tr>
                )
              })}
          </TBody>
        </StyledTable>
      </Scrollbar>
    </Wrapper>
  )
}

export default EventsTable

const CellWrapper = styled.div`
  position: relative;
  transition: 0.1s ease-in;
`

const Actions = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20px 30px;
`

const Wrapper = styled.div`
  overflow: hidden;
`

const Scrollbar = styled.div`
  position: sticky;
  top: 0;
  overflow: auto;
`

const StyledTable = styled.table`
  width: max-content;
  min-width: 100%;
  border-collapse: collapse;
`

const Thead = styled.thead`
  border-bottom: 1px solid #333;
`

const TBody = styled.tbody`
  tr:hover {
    background: #0f0f10;
    & td:nth-child(5) {
      span {
        opacity: 0;
      }
      & ${Actions} {
        opacity: 1;
      }
    }
  }
`

const Tr = styled.tr`
  position: relative;
  border-bottom: 1px solid #333;
  background: ${({ active }) =>
    active
      ? 'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(0deg, rgba(109, 78, 234, 0.2), rgba(109, 78, 234, 0.2)), #191A1F'
      : 'transparent'};

  &.active {
    background: linear-gradient(0deg, rgba(39, 174, 96, 0.05), rgba(39, 174, 96, 0.05)), #1b1c22;
  }

  &:last-child {
    border-bottom: none;
  }
`

const Th = styled.th`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #828282;
  text-align: start;
  padding: 20px;

  border-right: 1px solid #333;
  &:last-child {
    border-right: none;
  }
`

const Td = styled.td`
  position: relative;
  width: max-content;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #f2f2f2;
  padding: 20px;
  cursor: pointer;

  border-right: 1px solid #333;
  & > div {
    width: 100%;
    min-height: 60px;
    display: flex;
    align-items: center;
    color: #f2f2f2;

    &.green {
      color: #27ae60;
    }
    &.draft {
      color: #828282;
    }
  }

  &:first-child {
    max-width: 350px;
  }

  &:last-child {
    border-right: none;

    ${Actions} {
      opacity: 0;
    }
  }
`
