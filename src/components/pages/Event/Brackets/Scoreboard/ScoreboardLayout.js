import React, { useCallback, useEffect, useState } from 'react'
import { ScoreboardContext } from './context'
import { useMediaQuery } from '@mui/material'
import Scoreboard from './Scoreboard'
import { ScoreboardClient } from '../../../../../services/apiClients/scoreboardClient'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import CustomToast from './CustomToast'
import { getScoreFullDateObj } from './utils'
import { scoreTimeActTypes } from './const'
import useDebounce from '../../../../../hooks/useDebounce'
import { format, isBefore } from 'date-fns'
import { selectOgEvents } from '../../../../../redux/components/user'
import { useSelector } from 'react-redux'

const scoreboardClient = new ScoreboardClient()

const initialState = {
  openScoreboard: false,
  loading: false,
  scoreboard: null,
  error: null,
}

export default function ScoreboardLayout({ children }) {
  const [state, setState] = useState(initialState)
  const [, setIsLeaving] = useState(false)
  const [submissions, setSubmissions] = useState(null)
  const {
    query: { id: eventId },
  } = useRouter()
  const [timerState, setTimerState] = useState({
    fightStartTime: null,
    remainTimeInSec: 0,
    fightEndTime: null,
    roundTime: null,
    isTimerActive: false,
    loading: false,
    roundDurationTime: 0,
  })
  const [openSubmissions, setOpenSubmissions] = useState(false)
  const [roundSubmission, setRoundSubmission] = useState({
    isEnd: false,
    winType: null,
    submissionType: null,
    readyToSave: false,
    fighterId: null,
    openWinWindow: false,
  })
  const [submissionSearch, setSubmissionSearch] = useState('')
  const [reverseFighters, setReverse] = useState(false)
  const [scoringActions, setScoringActions] = useState([])
  const [scoringLoading, setScoringLoading] = useState(false)
  const lg = useMediaQuery('(max-width: 1200px)')
  const debouncedSubmissionSearch = useDebounce(submissionSearch, 300)
  const { user } = useSelector((state) => state.user)
  const [ogEventsId] = useSelector(selectOgEvents)
  const ogAndIsMyEvent = user?.role === 'organizer' && (ogEventsId || []).includes(+eventId)

  const pullScoreboardByFighters = async (scoreboardId) => {
    try {
      const { data } = await scoreboardClient.scoreboard(scoreboardId)
      setState((state) => ({
        ...state,
        loading: false,
        scoreboard: data,
        error: null,
        openScoreboard: true,
      }))

      if (data?.fight && !timerState.roundTime && timerState.roundDurationTime <= 0) {
        const { fightStartTime, fightEndTime, roundTime } = data.fight
        const fightStartTimeObj = getScoreFullDateObj(fightStartTime)
        const fightEndTimeObj = getScoreFullDateObj(fightEndTime)
        const [, minutes, seconds] = roundTime.split(':')
        setTimerState((state) => ({
          ...state,
          roundTime,
          fightStartTime: fightStartTimeObj,
          fightEndTime: fightEndTimeObj,
          remainTimeInSec: (+minutes * 60 || 0) + +seconds,
        }))
      }
      return data
    } catch (error) {
      if (error?.response?.data) {
        console.error(error?.response?.data)
        setState(() => ({ ...initialState, error: error?.response?.data, openScoreboard: false }))
      }
      setState((state) => ({ ...state, loading: false }))
      return error
    }
  }

  const handleOpenSubmissions = () => {
    setOpenSubmissions(true)
  }

  const handleCloseSubmissions = () => {
    if (!roundSubmission.submissionType) {
      toast.warning('Выберите вариант сабмишна!')
      return
    }
    setOpenSubmissions(false)
  }

  const onOpenScoreboard = useCallback(async (scoreboardId, fightId) => {
    setState((state) => ({ ...state, loading: true }))

    if (!scoreboardId && fightId) {
      await scoreboardClient
        .createScoreboard({ fight: fightId })
        .then(({ data }) => data?.id && pullScoreboardByFighters(data.id))
    } else if (scoreboardId) {
      await pullScoreboardByFighters(scoreboardId)
    }

    if (state.scoreboard && state.scoreboard?.id) {
      setState((state) => ({ ...state, openScoreboard: true }))
    }
  }, [])

  const closeScoreboard = () => {
    setState(initialState)
    setScoringActions([])
    setRoundSubmission({
      isEnd: false,
      winType: null,
      submissionType: null,
      readyToSave: false,
      fighterId: null,
      openWinWindow: false,
    })
    setTimerState({
      fightStartTime: null,
      remainTimeInSec: 0,
      fightEndTime: null,
      roundTime: null,
      isTimerActive: false,
      loading: false,
      roundDurationTime: 0,
    })
    setOpenSubmissions(false)
  }

  const handleUserDecision = (shouldLeave) => {
    if (shouldLeave) {
      // User clicked "Yes"
      closeScoreboard()
      // return router.push(url) // Now we manually change the route
    } else {
      return
      // User clicked "No"
      // Do nothing, just close the toast
    }
  }

  const showToast = () => {
    toast.warning(<CustomToast handleUserDecision={handleUserDecision} />, {
      onClose: () => setIsLeaving(false),
      theme: 'dark',
    })
  }

  const changeScore = async ({ fighterId, changeType, changeValue }, saveAction = true) => {
    setScoringLoading(true)
    try {
      if (state?.scoreboard?.id && fighterId) {
        saveAction &&
          setScoringActions((state) => [
            ...state,
            { fighterId, changeType, changeValue: changeValue * -1 },
          ])
        await scoreboardClient.changeScores(fighterId, { changeType, changeValue })
        await pullScoreboardByFighters(state.scoreboard.id)
        setScoringLoading(false)
      }
    } catch (error) {
      console.error(error?.response?.data)
      setScoringLoading(false)
    }
  }

  const switchSides = () => {
    setReverse((prev) => !prev)
    // try {
    //   if (state?.scoreboard?.id && state.scoreboard?.fighters?.length === 2) {
    //     const fighterId = state.scoreboard.fighters[1]?.id
    //     await scoreboardClient.changeScores(fighterId, { changeType: 4, changeValue: 0 })
    //     await pullScoreboardByFighters(state.scoreboard.id)
    //   }
    // } catch (error) {
    //   console.error(error?.response?.data)
    // }
  }

  const onStartTimer = async () => {
    try {
      if (timerState.roundTime && timerState.fightStartTime) {
        const now = new Date()
        const isBeforeStart = isBefore(now, timerState.fightStartTime)

        let changeType = 3
        if (timerState.roundDurationTime == 0) {
          changeType = isBeforeStart ? 1 : 2
        } else if (timerState.roundDurationTime > 0) {
          changeType = !timerState.isTimerActive ? 4 : 3
        }

        await scoreboardClient.handleEvent(state.scoreboard?.id, {
          eventTime: format(new Date(), 'hh:mm:ss'),
          changeType,
        })
      }
    } catch (error) {
      console.error()
    }
  }

  const handleTimerChange = async (actionType) => {
    if (!timerState.loading) {
      setTimerState((state) => ({
        ...state,
        loading: false,
      }))
      try {
      } catch (error) {}

      switch (actionType) {
        case scoreTimeActTypes.decM:
          setTimerState((state) => ({
            ...state,
            remainTimeInSec: state.remainTimeInSec - 60 <= 0 ? 0 : state.remainTimeInSec - 60,
          }))
          return
        case scoreTimeActTypes.decTenS:
          setTimerState((state) => ({
            ...state,
            remainTimeInSec: state.remainTimeInSec - 10 < 0 ? 0 : state.remainTimeInSec - 10,
          }))
          return
        case scoreTimeActTypes.decS:
          setTimerState((state) => ({
            ...state,
            remainTimeInSec: state.remainTimeInSec - 1 < 0 ? 0 : state.remainTimeInSec - 1,
          }))
          return
        case scoreTimeActTypes.toggle:
          setTimerState((state) => ({ ...state, isTimerActive: !state.isTimerActive }))
          onStartTimer()
          return
        case scoreTimeActTypes.incM:
          setTimerState((state) => ({ ...state, remainTimeInSec: state.remainTimeInSec + 60 }))
          return
        case scoreTimeActTypes.incTenSec:
          setTimerState((state) => ({ ...state, remainTimeInSec: state.remainTimeInSec + 10 }))
          return
        case scoreTimeActTypes.incOneSec:
          setTimerState((state) => ({ ...state, remainTimeInSec: state.remainTimeInSec + 1 }))
          return

        default:
          break
      }
    }
  }

  useEffect(() => {
    let interval = null
    if (timerState.isTimerActive && timerState.remainTimeInSec > 0 && !roundSubmission.isEnd) {
      interval = setInterval(() => {
        setTimerState((state) => ({
          ...state,
          remainTimeInSec: (state.remainTimeInSec || 0) - 1,
          roundDurationTime: (state.roundDurationTime || 0) + 1,
        }))
      }, 1000)
    } else if (!timerState.isTimerActive && timerState.remainTimeInSec !== 0) {
      clearInterval(interval)
    } else if (timerState.remainTimeInSec == 0) {
      clearInterval(interval)
      setTimerState((state) => ({ ...state, isTimerActive: false }))
    }
    return () => clearInterval(interval)
  }, [timerState.isTimerActive, timerState.remainTimeInSec])

  useEffect(() => {
    lg && setState(initialState)
  }, [lg])

  const undoScoringAction = async () => {
    if (scoringActions?.length) {
      await changeScore(scoringActions[scoringActions.length - 1], false)
      const remainActions = scoringActions.slice(0, -1)
      setScoringActions(remainActions)
    }
  }

  const onEnd = () => {
    setTimerState((state) => ({ ...state, isTimerActive: false }))

    // "BACK" || "END"
    if (roundSubmission.isEnd) {
      // "BACK"
      setRoundSubmission((state) => ({
        ...state,
        isEnd: false,
        winType: null,
        submissionType: null,
        readyToSave: false,
        fighterId: null,
        openWinWindow: false,
      }))
      return
    }
    // "END"
    setRoundSubmission((state) => ({ ...state, isEnd: true }))
  }

  const onSelectWinType = (winType, fighterId) => {
    if (winType == 2) {
      handleOpenSubmissions()
    }
    setRoundSubmission((state) => ({ ...state, winType, fighterId }))
  }

  const onSelectSubmissionType = (submitType) => {
    setRoundSubmission((state) => ({ ...state, submissionType: submitType }))
  }

  useEffect(() => {
    if (roundSubmission.winType) {
      if (roundSubmission.winType == 2) {
        setRoundSubmission((state) => ({
          ...state,
          readyToSave: !!roundSubmission.submissionType,
        }))
        return
      }
      setRoundSubmission((state) => ({
        ...state,
        readyToSave: true,
        submissionType: null,
      }))
    }
  }, [roundSubmission.winType, roundSubmission.submissionType])

  useEffect(async () => {
    scoreboardClient
      .submissions({ search: submissionSearch })
      .then(({ data }) => setSubmissions(data?.results))
  }, [debouncedSubmissionSearch])

  const onSearch = (value) => {
    setSubmissionSearch(value)
  }

  const onWin = async () => {
    try {
      if (roundSubmission.fighterId && roundSubmission.winType) {
        const body = {}

        if (roundSubmission.winType == 2) {
          body['winType'] = roundSubmission.winType
          body['submissionType'] = roundSubmission.submissionType
        } else {
          body['winType'] = roundSubmission.winType
        }

        // const minutes = Math.floor(timerState.roundDurationTime / 60)
        // const seconds = timerState.roundDurationTime - minutes * 60
        // const roundDurationTime = `00:${minutes.toString().padStart(2, '0')}:${seconds
        //   .toString()
        //   .padStart(2, '0')}`
        const now = new Date()
        const hours = now.getHours()
        const minutes = now.getMinutes()
        const seconds = now.getSeconds()
        const roundDurationTime = `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        await scoreboardClient.saveRoundEndTime(state.scoreboard.id, {
          fightEndTime: roundDurationTime,
        })
        await scoreboardClient.submitWinType(roundSubmission?.fighterId, body).then(() => {
          setRoundSubmission((state) => ({ ...state, openWinWindow: true }))
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (roundSubmission.openWinWindow) {
      const timer = setTimeout(() => {
        closeScoreboard()
      }, 3000)
      // Clear the timeout if the component is unmounted
      return () => clearTimeout(timer)
    }
  }, [roundSubmission.openWinWindow])

  return (
    <ScoreboardContext.Provider
      value={{
        loading: state.loading,
        error: state.error,
        open: state.openScoreboard,
        onOpen: onOpenScoreboard,
        onClose: showToast,
        undoScoringAction,
        disableScoring: scoringLoading,
        scoreboard: state.scoreboard,
        changeScore,
        switchSides,
        reverseFighters,
        timerState,
        handleTimerChange,
        roundSubmission,
        onEnd,
        onSelectWinType,
        onSelectSubmissionType,
        handleOpenSubmissions,
        handleCloseSubmissions,
        openSubmissions,
        submissions,
        onSearch,
        onWin,
        ogAndIsMyEvent,
      }}
    >
      <Scoreboard />
      {children}
    </ScoreboardContext.Provider>
  )
}
