import { Collapse } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { theme } from '../../../../../styles/theme'
import Radio from '../../../../ui/Radio'
import { EPFieldTitle, EPTitle } from './EPFormPCField'

const doubleChilds = [
  {
    id: 41,
    name: 'qualifyLoserBracketType',
    title: 'Everyone',
    secondaryText: 'Everyone gets a second chance',
    value: 1,
    defaultChecket: true,
  },
  {
    id: 42,
    name: 'qualifyLoserBracketType',
    title: 'Final 8',
    secondaryText: 'Final 8 gets second chance',
    value: 2,
  },
  {
    id: 43,
    name: 'qualifyLoserBracketType',
    title: 'Final 16',
    secondaryText: 'Final 16 gets second chance',
    value: 3,
  },
  {
    id: 44,
    name: 'qualifyLoserBracketType',
    title: 'Final 32',
    secondaryText: 'Final 32 gets second chance',
    value: 4,
  },
]

const bracketsChoises = [
  {
    id: 1,
    title: 'Single elimination bracket (without bronze fight)',
    src: '/assets/png/singleOutBronze.png',
    min: 1,
    max: 1024,
  },
  {
    id: 2,
    title: 'Single elimination bracket (with a bronze fight)',
    src: '/assets/png/singleWithBF.png',
    min: 1,
    max: 1024,
  },
  {
    id: 3,
    title: 'Double elimination bracket (without bronze fight)',
    src: '/assets/png/doubleWithoutBf.png',
    min: 5,
    max: 1024,
    childFields: doubleChilds,
  },
  {
    id: 4,
    title: 'Double elimination bracket (with a bronze fight)',
    src: '/assets/png/doubleWithBF.png',
    min: 5,
    max: 1024,
    childFields: doubleChilds,
  },
  {
    id: 5,
    title: 'Three man bracket, comeback',
    src: '/assets/png/ThreeMan.png',
    min: 3,
    max: 3,
  },
  {
    id: 6,
    title: 'Three man bracket, shortcut winner',
    src: '/assets/png/ThreeMan.png',
    min: 3,
    max: 3,
  },
  {
    id: 7,
    title: 'Round Robin brackets',
    src: '/assets/png/RobinRound.png',
    min: 3,
    max: 6,
  },
]

const compareCountAndGetError = (count, min, max) => {
  if (+count < +min) {
    return `Минимальное количестов участников для создания этой сетки - ${min}`
  } else if (+count > +max) {
    return `Maксимальное количестов участников для создания этой сетки - ${max}`
  } else {
    return undefined
  }
}

function EPFormBrackets({ formik, selectedEPCDetailed, bracketError, onBracketError }) {
  const { values, errors, touched, setFieldValue } = formik
  const [selectedBracketOption, setSelectedBracketOption] = useState(null)
  const [optionsRefresher, setOptionsRefresher] = useState(Math.random())

  useEffect(() => {
    setOptionsRefresher(Math.random())
    if (selectedBracketOption) {
      setFieldValue('brackets', selectedBracketOption)
      setFieldValue('qualifyLoserBracketType', null)

      const selectedBracket = bracketsChoises.find(({ id }) => id == selectedBracketOption)

      if (values.epc?.length && selectedBracket) {
        const detailedEPCValues = selectedEPCDetailed.filter(({ id }) => values.epc.includes(id))
        const brError = detailedEPCValues.reduce(
          (prev, cur) => {
            const check = compareCountAndGetError(
              cur.participantsCount,
              selectedBracket.min,
              selectedBracket.max,
            )
            if (check) {
              prev.id = cur.id
              prev.text = check
            }
            return prev
          },

          { text: '', id: null },
        )
        onBracketError(brError)
      }
    }
  }, [selectedBracketOption])

  return (
    <EPFieldMainWrapper
      className={`${
        (Boolean(touched?.brackets) && errors?.brackets) || bracketError ? 'error' : ''
      }`}
    >
      <EPFieldTitle>2. Выберите тип сетки</EPFieldTitle>

      <BracketsWrapper>
        {bracketsChoises.map(({ id, title, src, childFields }) => (
          <Bracket
            className={`${values.brackets == id ? 'selected' : ''}`}
            key={`EPForm_brackets_${id}`}
          >
            <BracketMain onClick={() => setSelectedBracketOption(id)}>
              <img src={src} />
              <Radio text={title} checked={values.brackets == id} readOnly />
            </BracketMain>

            {!!childFields && (
              <Collapse in={values.brackets == id}>
                <ChildsWrapper>
                  <ChildsTitle>How many will able to qualify to the loser bracket</ChildsTitle>
                  {childFields.map((child) => {
                    return (
                      <ChildOptions
                        key={`Brackets_childs_options_${optionsRefresher}_${child.id}`}
                        values={values}
                        setFieldValue={setFieldValue}
                        {...child}
                      />
                    )
                  })}
                </ChildsWrapper>
              </Collapse>
            )}
          </Bracket>
        ))}
      </BracketsWrapper>
      {(Boolean(touched?.brackets) && errors?.brackets) ||
        (bracketError && (
          <EPTitle className='error'>
            {(touched?.brackets && errors.brackets) || bracketError}
          </EPTitle>
        ))}
    </EPFieldMainWrapper>
  )
}

export default EPFormBrackets

const ChildOptions = ({
  name,
  value,
  title,
  setFieldValue,
  values,
  defaultChecket,
  secondaryText,
}) => {
  useEffect(() => {
    defaultChecket && setFieldValue(name, value)
  }, [])

  return (
    <ChildRadios>
      <Radio
        text={title}
        checked={+values[name] === +value}
        onChange={({ target: { checked } }) => checked && setFieldValue(name, value)}
        secondaryText={secondaryText}
      />
    </ChildRadios>
  )
}

export const EPFieldMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #141519;
  border-radius: 16px;
  gap: 32px;
  padding: 20px;

  &.error {
    border: 2px solid #eb5757;
    background: linear-gradient(0deg, rgba(235, 87, 87, 0.07), rgba(235, 87, 87, 0.07)), #141519;
  }
`

const BracketsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  ${theme.mqMax('md')} {
    justify-content: center;
  }
`

const Bracket = styled.div`
  max-width: 313px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${theme.mqMax('md')} {
    max-width: unset;
  }

  & img {
    width: 100%;
    height: 251px;
    object-fit: contain;
    border: 3px solid transparent;
    border-radius: 19px;
  }

  &.selected {
    img {
      border: 3px solid #6d4eea;
    }
  }

  &.error {
    img {
      border: 3px solid #eb5757;
    }
  }
`

const BracketMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ChildsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 8px;
`

const ChildRadios = styled.div``

const ChildsTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #f2f2f2;

  margin-bottom: 8px;
`
