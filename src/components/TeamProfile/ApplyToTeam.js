import React, { useCallback, useState } from "react"
import { CreateEventBTN, PlusIcon } from "../pages/Team/TeamProfile"
import $api from "../../services/axios"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"

function ApplyToTeam({ checkUserStatus, userStatusInTeam }) {
  const {
    query: { id: teamId },
  } = useRouter()
  const [athHasBeenReq, setAthHasBeenReq] = useState(false)
  const user = useSelector((state) => state.user.user)
  const sendReq = useCallback(async () => {
    try {
      await $api.post("/teams/teams/requests/", { team: teamId })
      setAthHasBeenReq(true)
      checkUserStatus()
    } catch (e) {
      setAthHasBeenReq(true)
    }
  }, [user])
  return (
    <CreateEventBTN
      disabled={athHasBeenReq || userStatusInTeam?.message !== "not found"}
      active={userStatusInTeam?.message === "not found"}
      onClick={() => sendReq()}
    >
      {userStatusInTeam?.message === "not found" ? (
        <>
          <PlusIcon /> Вступить в команду
        </>
      ) : userStatusInTeam?.message === "user in pending" ? (
        "Запрошено"
      ) : (
        "Вы уже в команде"
      )}
    </CreateEventBTN>
  )
}

export default ApplyToTeam
