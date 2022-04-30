import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { getRusBetweenDate } from "../../../../../../helpers/helpers"
import { IconButton } from "@mui/material"
import { Edit } from "@mui/icons-material"
import { useRouter } from "next/router"

const createDataForTable = (events = []) => {
  return events.map((currentValue) => {
    const { id, name, dateEnd, dateStart } = currentValue
    return {
      id,
      name,
      date: getRusBetweenDate(dateStart, dateEnd),
      registration: "5/10",
      paid: "2/5",
      status: "Сейчас идет",
    }
  })
}

function EventsTable({ events }) {
  const [rewrittenData, setRewrittenData] = useState([])
  const { push: routerPush } = useRouter()

  const columns = useMemo(() => {
    return [
      {
        column: "Турнир",
        accessor: "name",
      },
      {
        column: "Дата",
        accessor: "date",
      },
      {
        column: "Регистрации",
        accessor: "registration",
      },
      {
        column: "Оплачено",
        accessor: "paid",
      },
      {
        column: "Статус",
        accessor: "status",
      },
    ]
  }, [])

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
          <tbody>
            {!!rewrittenData.length &&
              rewrittenData.map((cell) => {
                return (
                  <Tr
                    key={`table-row-${cell.id}`}
                    className={cell.status === "Сейчас идет" ? "active" : ""}
                  >
                    {columns.map(({ accessor }) => (
                      <Td
                        key={`table-cell-${cell[accessor]}-${cell.id}`}
                        onClick={() =>
                          accessor === "name" &&
                          routerPush(`/events/${cell.id}/`)
                        }
                      >
                        <div
                          className={
                            accessor === "status" &&
                            cell[accessor] === "Сейчас идет"
                              ? "green"
                              : cell[accessor] === "Черновик"
                              ? "draft"
                              : ""
                          }
                        >
                          {cell[accessor]}
                        </div>
                      </Td>
                    ))}
                    <Actions>
                      <IconButton
                        onClick={() => {
                          routerPush(`/lk-og/profile/events/edit/${cell.id}/`)
                        }}
                      >
                        <Edit />
                      </IconButton>
                    </Actions>
                  </Tr>
                )
              })}
          </tbody>
        </StyledTable>
      </Scrollbar>
    </Wrapper>
  )
}

export default EventsTable

const Actions = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 179px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20px 30px;
  opacity: 0;
  transition: 0.1s ease-in;
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

const Tr = styled.tr`
  position: relative;
  border-bottom: 1px solid #333;
  background: ${({ active }) =>
    active
      ? "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(0deg, rgba(109, 78, 234, 0.2), rgba(109, 78, 234, 0.2)), #191A1F"
      : "transparent"};

  &.active {
    background: linear-gradient(
        0deg,
        rgba(39, 174, 96, 0.05),
        rgba(39, 174, 96, 0.05)
      ),
      #1b1c22;
  }

  & td:nth-child(5) {
    div {
      min-width: 112px;
    }
  }

  &:hover {
    background: #0f0f10;
    & td:nth-child(5) {
      div {
        display: none;
      }
    }

    & ${Actions} {
      opacity: 1;
    }
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
  & div {
    min-height: 60px;
    display: flex;
    align-items: center;

    &.green {
      color: #27ae60;
    }
    &.draft {
      color: #828282;
    }
  }
  &:last-child {
    border-right: none;
  }
`
