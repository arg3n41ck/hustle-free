import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAthleteTeams } from '../../../../../../redux/components/teams'
import $api from '../../../../../../services/axios'
import TeamModeration from './TeamModeration'
import TeamSearchContent from './TeamSearchContent'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'calc(100% - 15px)',
  bgcolor: '#1b1c22',
  border: '1px solid #333333',
  boxShadow: '0px 0px 60px rgba(0, 0, 0, 0.5)',
  borderRadius: '16px',
  maxWidth: 728,
}

const getTeamsRequest = async (query) => {
  try {
    const { data } = await $api.get(`/teams/athlete_requests/`, { params: query })
    return data?.length ? data.map(({ team: { id } }) => id) : null
  } catch (e) {
    console.log(e)
  }
}

const applyToTeam = async (body) => {
  await $api.post('/teams/athlete_requests/', body)
}

function TeamsModalTemplate({ open, onClose }) {
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [teamsRequests, setTeamsRequests] = useState(null)
  const [modOpen, setModOpen] = useState(false)
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user?.athleteId) {
      getTeamsRequest({ athlete: user.athleteId }).then(setTeamsRequests)
      dispatch(fetchAthleteTeams({ athlete: user.athleteId }))
    }
  }, [user])

  const onModSubmit = async () => {
    selectedTeam && (await applyToTeam({ team: selectedTeam?.id, athlete: user?.athleteId }))
    dispatch(fetchAthleteTeams({ athlete: user.athleteId }))
    getTeamsRequest({ athlete: user.athleteId }).then(setTeamsRequests)
    setSelectedTeam(null)
    setModOpen(false)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {!modOpen ? (
          <TeamSearchContent
            onClose={onClose}
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
            setModOpen={setModOpen}
            teamsRequests={teamsRequests}
          />
        ) : (
          <TeamModeration
            selectedTeam={selectedTeam}
            isTeamWithModeration={!!selectedTeam?.preliminaryModeration}
            onClose={() => setModOpen(false)}
            onSubmit={onModSubmit}
          />
        )}
      </Box>
    </Modal>
  )
}

export default TeamsModalTemplate
