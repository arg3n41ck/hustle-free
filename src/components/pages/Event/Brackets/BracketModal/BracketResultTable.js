import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import $api from '../../../../../services/axios'
import { selectBrackets } from '../../../../../redux/components/eventBrackets'

const getResults = async (bracket) => {
  try {
    const { data } = await $api.get(`/brackets/brackets/${bracket}/bracket_results/`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export default function BracketResultTable({ bracketId }) {
  const [results, setResults] = useState([])
  const [, bracketsFights] = useSelector(selectBrackets)

  useEffect(() => {
    getResults(bracketId).then(setResults)
  }, [bracketId, bracketsFights])

  return (
    <>
      <Title>Результаты</Title>
      <Table>
        <thead>
          <Tr>
            <Th>Место</Th>
            <Th>Атлет</Th>
            <Th>Команда</Th>
          </Tr>
        </thead>
        <tbody>
          {!!results?.length ? (
            results.map(({ id, place, athlete, team }) => {
              return (
                <Tr key={`brackets_results_${id}`}>
                  <Td>{place}</Td>
                  <Td>{athlete}</Td>
                  <Td>{team}</Td>
                </Tr>
              )
            })
          ) : (
            <Tr>
              <Td>0</Td>
              <Td>Места не заданы</Td>
            </Tr>
          )}
        </tbody>
      </Table>
    </>
  )
}

const Title = styled.h3`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;

  margin: 5px 0 32px;
`

const Table = styled.table`
  background: #141519;
  border-collapse: collapse;
  border-radius: 16px;
  overflow: hidden;
  padding: 0;

  & thead {
    background: #1b1c22;
  }
  & tbody {
    background: #141519;
    border-collapse: collapse;
  }
`

const Tr = styled.tr`
  border-bottom: 1px solid #1b1c22;
  &:last-child {
    border-bottom: none;
  }
`

const Th = styled.th`
  padding: 20px;
  color: #828282;
  text-align: start;
`

const Td = styled.td`
  padding: 20px;
  border-right: 1px solid #1b1c22;

  &:last-child {
    border-right: none;
  }

  &:first-child {
    width: 104px;
  }
`
