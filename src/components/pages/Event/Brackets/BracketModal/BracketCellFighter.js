import React, { useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { BracketsAthAva } from '../../../../../assets/svg/icons'
import { truncateString } from '../../../../../helpers/helpers'
import {
  fetchBracketsFightsByParams,
  selectBrackets,
} from '../../../../../redux/components/eventBrackets'
import { BF_DND_ACCEPT_TYPE, getFighterPlace } from './bracketsUtils'
import BracketWin from './BracketWin'
import { useDrag, useDrop } from 'react-dnd'
import $api from '../../../../../services/axios'

const replaceBFCell = async (fromBF, toBF, draggedPr, hoverPr) => {
  try {
    const body = {
      fromBracketFight: fromBF,
      changingParticipant: draggedPr,
      toBracketFight: toBF,
      replacedParticipant: hoverPr,
    }
    const data = await $api.post(
      '/brackets/brackets_fights/change_participant_bracket_fight/',
      body,
    )
    return data
  } catch (error) {
    console.error(error)
  }
}

export default function BracketCellFighter({ cell, fighter, onWin, opponent, orientation }) {
  const { id: bfId, fighters, winner, disabled, fightNumber, place: cellPlace } = cell
  const [, bracketsFights, , bracketsResults] = useSelector(selectBrackets)
  const bracket = useSelector((state) => state.brackets.bracket)
  const dragNDropRef = useRef(null)
  const dispatch = useDispatch()
  const fighterPlace = useMemo(() => {
    if ([5, 6].includes(bracket?.bracketType) && fightNumber >= 8) {
      const threeManFinal = bracketsFights.data.find(({ fightNumber }) => fightNumber == 9)

      if (threeManFinal?.fighters?.length === 2) {
        if (fightNumber === 9 && winner) {
          return winner == fighter?.id ? 1 : 2
        } else if (fightNumber == 8 && winner !== fighter?.id) {
          return 3
        }
      } else if (threeManFinal?.fighters?.length !== 2 && !!threeManFinal.winner) {
        if (fightNumber === 9 && winner == fighter?.id) {
          return 1
        } else if (fightNumber === 8) {
          return winner == fighter?.id ? 2 : 3
        }
      }
    }

    return getFighterPlace({
      bracketType: bracket?.bracketType,
      winner,
      cellPlace,
      fighter: fighter?.id,
    })
  }, [bracketsResults, fighters, winner, bracket, fighter, fightNumber])

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: BF_DND_ACCEPT_TYPE,
    drop: async (item) => {
      if (!dragNDropRef.current) {
        return
      }
      if (!item?.fighterId || !fighter?.id || item.bfId === bfId || winner) {
        return
      }

      // const hoveredRect = dragNDropRef.current.getBoundingClientRect()
      // const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2
      // const mousePosition = monitor.getClientOffset()
      // const hoverClientY = mousePosition.y - hoveredRect.top

      // if (item.bfId < bfId && hoverClientY < hoverMiddleY) {
      //   return
      // }

      // if (item.bfId > bfId && hoverClientY > hoverMiddleY) {
      //   return
      // }

      await replaceBFCell(item.bfId, bfId, item.fighterId, fighter?.id || null).then(() => {
        dispatch(fetchBracketsFightsByParams({ bracket: bracket?.id, type: bracket?.bracketType }))
      })
    },
    collect: (monitor) => ({ isOver: monitor.isOver(), canDrop: monitor.canDrop() }),
  })

  const [{ isDragging }, drag] = useDrag({
    type: BF_DND_ACCEPT_TYPE,
    item: () => {
      if (!!fighter?.id && !winner) {
        return { type: BF_DND_ACCEPT_TYPE, bfId, fighterId: fighter?.id }
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  drag(drop(dragNDropRef))

  return (
    <FighterWrapper
      ref={dragNDropRef}
      className={`${orientation} ${isDragging ? 'dragging' : ''} ${
        isOver && canDrop ? 'isOver' : ''
      }`}
    >
      <UserInfoPart className={orientation} disabled={!!winner || disabled}>
        {!!fighter?.athlete?.user?.avatar ? (
          <FighterAva src={fighter?.athlete?.user?.avatar} />
        ) : (
          <BracketsAthAva />
        )}
        <FighterTexts>
          <NameFlagWrapper>
            {fighter?.countryCode && (
              <CountryFlag src={`https://flagsapi.com/${fighter?.countryCode}/flat/64.png`} />
            )}
            <FighterName>
              {fighter
                ? truncateString(
                    `${fighter?.athlete?.user?.firstName} ${fighter?.athlete?.user?.lastName}`,
                    12,
                    true,
                  )
                : '?'}
            </FighterName>
          </NameFlagWrapper>
          {fighter && fighter?.team && (
            <TeamName>{truncateString(fighter?.team?.name, 20, true)}</TeamName>
          )}
        </FighterTexts>
      </UserInfoPart>
      {!!fighterPlace && <PlaceBlock place={fighterPlace}>{fighterPlace}</PlaceBlock>}
      {!disabled && !!fighter && fighters?.length === 2 && opponent !== winner && (
        <BracketWin bfId={bfId} fighter={fighter.id} winner={winner} onWin={onWin} />
      )}
    </FighterWrapper>
  )
}

const FighterWrapper = styled.div`
  width: 208px;
  position: relative;
  min-height: 56px;
  z-index: 8;
  cursor: pointer;
  transform: translateY(-1px);
  border: 1px solid transparent;
  margin: 1px;

  &:hover {
    background-color: #0f0f10;
    border: 1px dotted #6d4eea;
  }

  &.dragging {
    border: 1px dotted #6d4eea;
  }

  &.isOver {
    border: 1px solid #6d4eea;
    background: linear-gradient(0deg, rgba(109, 78, 234, 0.1), rgba(109, 78, 234, 0.1)), #141519;
  }

  &.first {
    border-radius: 8px 8px 0 0;
  }

  &.second {
    border-radius: 0 0 8px 8px;
  }
`

const UserInfoPart = styled.div`
  display: flex;
  grid-gap: 8px;
  font-weight: 700;
  padding: 10px;

  &.first {
    border-bottom: 1px solid #333333;
  }

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`

const FighterAva = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;

  background: no-repeat ${({ src }) => (src ? `url('${src}')` : '#333333')} center / cover;
`

const FighterTexts = styled.div`
  display: flex;
  flex-direction: column;
`

const FighterName = styled.p`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #f2f2f2;
`

const NameFlagWrapper = styled.div`
  display: flex;
  grid-gap: 2px;
`

const TeamName = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #bdbdbd;
`

const CountryFlag = styled.img`
  max-width: 20px;
  object-fit: contain;
`

const PlaceBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 8px;
  gap: 8px;

  position: absolute;
  top: 50%;
  right: -45px;

  transform: translateY(-50%);

  font-weight: 600;
  font-size: 16px;
  line-height: 16px;

  color: #ffffff;
  background: ${({ place }) =>
    place == 1
      ? 'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #faa318'
      : place == 2
      ? '#A0A0A0'
      : place == 3 && '#9B5711'};

  border: 1px solid #333333;
  border-radius: 7px;
  overflow: hidden;
`
