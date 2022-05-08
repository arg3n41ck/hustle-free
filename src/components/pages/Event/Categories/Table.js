import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { getGender } from "../../LkOg/Tabs/Events/EventParticipantCategories"

const createDataForTable = (pc = []) => {
  const {
    id,
    fromAge,
    toAge,
    fromWeight,
    levels,
    toWeight,
    gender,
    price: { standartPrice, currency },
  } = pc
  return levels
    .map(({ id: lId, name: lName }, i) => ({
      id: `${id}-${lId}-${i}`,
      gender: getGender(gender, true),
      age: `${fromAge} - ${toAge} лет`,
      price: `${standartPrice} ${currency.toLowerCase()}`,
      weight: `${fromWeight} - ${toWeight} кг`,
      name: lName,
    }))
    .flat(Infinity)
}

function Table({ pc }) {
  const [rewrittenData, setRewrittenData] = useState([])

  const columns = useMemo(() => {
    return [
      {
        column: "Уровни",
        accessor: "name",
      },
      {
        column: "Пол",
        accessor: "gender",
      },
      {
        column: "Возраст",
        accessor: "age",
      },
      {
        column: "Вес",
        accessor: "weight",
      },
      {
        column: (
          <PriceHead>
            <span>Цена</span>
            <Info />
          </PriceHead>
        ),
        accessor: "price",
      },
    ]
  }, [])

  useEffect(() => {
    setRewrittenData(createDataForTable(pc))
  }, [pc])

  return (
    <Wrapper>
      <Scrollbar>
        <StyledTable>
          <Thead>
            <Tr>
              {columns.map(({ column, accessor }) => (
                <Th key={`pc-${column}${accessor}`}>{column}</Th>
              ))}
            </Tr>
          </Thead>
          <tbody>
            {!!rewrittenData.length &&
              rewrittenData.map((cell, index) => {
                return (
                  <Tr key={`pc-table-row-${cell.id}-${index}`}>
                    {columns.map(({ accessor }) => (
                      <Td key={`pc-table-cell-${cell[accessor]}-${cell.id}`}>
                        {cell[accessor]}
                      </Td>
                    ))}
                  </Tr>
                )
              })}
          </tbody>
        </StyledTable>
      </Scrollbar>
    </Wrapper>
  )
}

export default Table

const Wrapper = styled.div`
  overflow: hidden;
  margin: -32px;
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
  td {
    max-width: 150px;
  }
  & td:first-child {
    min-width: 200px;
  }

  &:hover {
    background: #0f0f10;
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
  &:last-child {
    border-right: none;
  }
`

const PriceHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Info = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.4467 18.2066C12.5245 18.0165 13.5542 17.6161 14.4772 17.0281C15.4001 16.4401 16.1982 15.6761 16.8259 14.7796C17.4536 13.8832 17.8986 12.8719 18.1355 11.8035C18.3723 10.7351 18.3964 9.63049 18.2064 8.55277C18.0164 7.47505 17.6159 6.4453 17.0279 5.52234C16.4399 4.59938 15.6759 3.80126 14.7795 3.17357C13.883 2.54588 12.8717 2.1009 11.8033 1.86404C10.7349 1.62718 9.63033 1.60307 8.5526 1.79311C7.47488 1.98314 6.44514 2.38358 5.52218 2.97158C4.59921 3.55957 3.8011 4.3236 3.17341 5.22004C2.54571 6.11647 2.10073 7.12777 1.86387 8.19618C1.62701 9.26458 1.60291 10.3692 1.79294 11.4469C1.98297 12.5246 2.38342 13.5544 2.97141 14.4773C3.55941 15.4003 4.32343 16.1984 5.21987 16.8261C6.11631 17.4538 7.1276 17.8988 8.19601 18.1356C9.26442 18.3725 10.369 18.3966 11.4467 18.2066L11.4467 18.2066Z"
      stroke="#828282"
      strokeWidth="2"
    />
    <path
      d="M10 10L10 15"
      stroke="#828282"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M10 5.8335L10 5.00016"
      stroke="#828282"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)
