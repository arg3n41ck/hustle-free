import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import ResultsChart from '../LkAh/Tabs/Profile/Stories/ResultsChart'

function PublicAthleteChartStats() {
  const { statistics } = useSelector((state) => state?.stories?.statistics)
  return (
    <MainWrapper>
      <ResultsChart
        wins={statistics?.winsCount || 0}
        defeats={statistics?.loses || 0}
        chartWHSize={140}
      />
      <Legends>
        <li>
          <span>{statistics?.winsCount || 0} </span>побед
        </li>
        <li>
          <span>{statistics?.loses || 0} </span>поражений
        </li>
      </Legends>
    </MainWrapper>
  )
}

export default PublicAthleteChartStats

const MainWrapper = styled.div`
  display: flex;
  padding: 20px;

  background: #141519;
  border-radius: 8px;

  @media screen and (max-width: 1200px) {
    padding: 0;
    border: none;
  }
`

const Legends = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;

  li {
    font-size: 22px;
    line-height: 150%;
    display: grid;
    grid-template: 1fr/ 32px auto;
    grid-gap: 10;

    & span {
      justify-self: center;
      font-weight: 700;
    }
  }

  li:first-child {
    & span {
      color: #27ae60;
    }
  }
  li:nth-child(2) {
    & span {
      color: #eb5757;
    }
  }
`
