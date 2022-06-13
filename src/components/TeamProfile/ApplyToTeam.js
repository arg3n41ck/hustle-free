import React, { useCallback, useState } from "react"
import { CreateEventBTN, PlusIcon } from "../pages/Team/TeamProfile"
import $api from "../../services/axios"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"

function ApplyToTeam({ checkUserStatus, userStatusInTeam }) {
  const {
    query: { id: teamId },
  } = useRouter()
  const [athHasBeenReq, setAthHasBeenReq] = useState(false)
  const { push } = useRouter()
  const user = useSelector((state) => state.user)
  const sendReq = useCallback(async () => {
    if (userStatusInTeam?.message === "not found") {
      try {
        await $api.post("/teams/teams/requests/", { team: teamId })
        setAthHasBeenReq(true)
        checkUserStatus()
      } catch (e) {
        setAthHasBeenReq(true)
      }
    } else if (userStatusInTeam?.message === "is anonymous") {
      toast.info("Войдите в систему в роли атлета", { autoClose: 5000 })
      await push("/#user-role")
    }
  }, [userStatusInTeam])
  return (
    (user.user?.role === "athlete" || !user?.userAuthenticated) && (
      <CreateEventBTN
        disabled={
          athHasBeenReq ||
          (userStatusInTeam?.message !== "not found" &&
            userStatusInTeam?.message !== "is anonymous")
        }
        active={
          userStatusInTeam?.message === "not found" ||
          userStatusInTeam?.message === "is anonymous"
        }
        onClick={() => sendReq()}
      >
        {userStatusInTeam?.message === "not found" ||
        userStatusInTeam?.message === "is anonymous" ? (
          <>
            <PlusIcon /> Вступить в команду
          </>
        ) : userStatusInTeam?.message === "user in pending" ? (
          "Запрошено"
        ) : userStatusInTeam?.message === "user rejected" ? (
          "Вас не приняли"
        ) : (
          "Вы уже в команде"
        )}
      </CreateEventBTN>
    )
  )
}

export default ApplyToTeam
