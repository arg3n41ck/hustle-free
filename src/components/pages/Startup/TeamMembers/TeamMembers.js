import React, { useCallback, useEffect, useState } from "react"
import HorizontalTabs from "../../../ui/tabs/HorizontalTabs"
import { Avatar, TextField } from "@mui/material"
import styled from "styled-components"
import StatusUserSelect from "../../../ui/tabs/StatusUserSelect"
import $api from "../../../../services/axios"
import TeamMemberAddModal from "./TeamMemberAddModal"
import { useDispatch, useSelector } from "react-redux"
import { changeTeamMembers } from "../../../../redux/components/navigations"
import { toast } from "react-toastify"

const deleteMember = async (id) => {
  try {
    await $api.delete(`/startup/team_members/${id}/`)
    toast.success("Вы успешно удалили сотрудника")
  } catch (e) {
    console.log(e.response)
  }
}

const applyMember = async ({ userID, startupID, status }) => {
  try {
    const { data } = await $api.post(
      `/startup/team_members/${userID}/accept_team_member/`,
      {
        startup: startupID,
        user: userID,
        statusInTeam: status,
      }
    )
    toast.success("Вы успешно приняли сотрудника")
    return data
  } catch (e) {
    console.log(e)
  }
}

const setStatusInTeamOfMember = async (id, value) => {
  toast.info("Идет изменение статуса ...")
  try {
    const { data } = await $api.put(`/startup/team_members/${id}/`, {
      statusInTeam: value,
    })
    toast.success("Измениние прошло успешно")

    return data
  } catch (e) {
    console.log(e.response)
  }
}

const filterBySearch = (value, array) => {
  return !![...(array || [])].length
    ? array.filter(({ user: { firstName, lastName } }) => {
        const name = `${firstName}${lastName}`.toLowerCase().replace(" ", "")
        return name.indexOf(value) >= 0
      })
    : []
}

const getAcceptStaffs = async (id) => {
  try {
    const { data } = await $api.get(
      `/startup/startups/${id}/startup_staff_accept/`
    )
    return data.filter(({ user }) => user)
  } catch (e) {
    return e.response
  }
}

const getStuffMembers = async (id) => {
  try {
    const { data } = await $api.get(`/startup/startups/${id}/startup_staff/`)
    return data.filter(({ user }) => user)
  } catch (e) {
    console.log(e)
  }
}

function TeamMembers({ startupID, openModal, closeModal, startupOwner }) {
  const [searchValue, setSearchValue] = useState("")
  const [underConsider, setUnderConsider] = useState(null)
  const [startupTeamMembers, setStartupTeamMembers] = useState(null)
  const [allTeamMembersId, setAllTeamMembersId] = useState([])
  const currentUser = useSelector((state) => state.user.user)
  const { teamMembersValue } = useSelector((state) => state.profileMenu)
  const dispatch = useDispatch()

  const tabs = [
    {
      value: "all",
      name: "Все",
    },
    {
      value: "A",
      name: "Администраторы",
    },
    {
      value: "E",
      name: "Сотрудники",
    },
    {
      value: "apply",
      name: `Принять (${underConsider?.length || 0})`,
    },
  ]

  const viewHandler = (view) => {
    dispatch(changeTeamMembers(view))
  }

  const updateMembers = useCallback(
    (id, value) => {
      setStatusInTeamOfMember(id, value).then(() => {
        teamMembersValue !== "apply"
          ? updateStuffMembers()
          : updateAcceptStaffs()
      })
    },
    [teamMembersValue]
  )

  const onApplyMember = (value) => {
    applyMember(value).then(() => {
      updateAllMembers()
    })
  }

  const onDeleteMember = (id) => {
    deleteMember(id).then(() => {
      updateAllMembers()
    })
  }

  const updateStuffMembers = useCallback(() => {
    getStuffMembers(startupID).then((res) =>
      setStartupTeamMembers(
        res.filter(({ user: { id } }) => id !== currentUser.id)
      )
    )
  }, [startupID])
  const updateAcceptStaffs = useCallback(() => {
    getAcceptStaffs(startupID).then((res) => {
      setUnderConsider(
        res.length
          ? res.filter(({ user: { id } }) => id !== currentUser.id)
          : []
      )
    })
  }, [startupID])

  const updateAllMembers = useCallback(() => {
    updateStuffMembers()
    updateAcceptStaffs()
  }, [])

  useEffect(() => {
    const idCollector = []
    underConsider?.length &&
      underConsider.forEach(({ user: { id } }) => idCollector.push(id))
    startupTeamMembers?.length &&
      startupTeamMembers.forEach(({ user: { id } }) => idCollector.push(id))
    idCollector.filter((item, index) => idCollector.indexOf(item) === index)

    setAllTeamMembersId(idCollector)
  }, [underConsider, startupTeamMembers])

  useEffect(() => {
    updateAllMembers()
  }, [])

  const stuffMembersToRender =
    teamMembersValue === "apply"
      ? underConsider
      : startupTeamMembers?.length &&
        startupTeamMembers.filter(({ statusInTeam }) =>
          teamMembersValue === "all"
            ? statusInTeam
            : statusInTeam === teamMembersValue
        )

  return (
    <Wrapper>
      <HorizontalTabs
        arrayTab={tabs}
        valueTab={teamMembersValue}
        onChangeHandler={viewHandler}
      >
        {openModal && (
          <TeamMemberAddModal
            open={openModal}
            handleClose={closeModal}
            startupID={startupID}
            allTeamMembersId={allTeamMembersId}
            updateAllMembers={updateAllMembers}
            startupTeamMembers={startupTeamMembers}
            currentUserId={currentUser.id}
            startupOwner={startupOwner}
          />
        )}
        <TextField
          placeholder="Поиск участника"
          fullWidth
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          InputProps={{
            startAdornment: (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="#828282"
                  strokeWidth="2"
                />
                <path
                  d="M20 20L17 17"
                  stroke="#828282"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ),
          }}
        />

        <StuffsWrapper>
          {filterBySearch(searchValue, stuffMembersToRender).map(
            ({
              id,
              user: { firstName, lastName, avatar, skills },
              statusInTeam,
            }) => (
              <TeamMember key={id}>
                <UserContent>
                  <Avatar
                    sx={{ width: 56, height: 56 }}
                    alt={firstName}
                    src={avatar}
                  />
                  <UserInfoWrapper>
                    <div>
                      <StuffName>
                        {firstName} {lastName}
                      </StuffName>
                      {!!skills?.length && (
                        <p>{skills[skills.length - 1].title}</p>
                      )}
                    </div>
                  </UserInfoWrapper>
                  <StatusUserSelect
                    id={id}
                    onDelete={onDeleteMember}
                    state={statusInTeam}
                    minWidth
                    setState={(value) => updateMembers(id, value)}
                  />
                </UserContent>
                {teamMembersValue === "apply" && (
                  <StaffApply>
                    <Button onClick={() => onDeleteMember(id)}>Отказать</Button>
                    <Button
                      type="filled"
                      onClick={() =>
                        onApplyMember({
                          startupID,
                          userID: id,
                          status: statusInTeam,
                        })
                      }
                    >
                      Принять
                    </Button>
                  </StaffApply>
                )}
              </TeamMember>
            )
          )}
        </StuffsWrapper>
      </HorizontalTabs>
    </Wrapper>
  )
}

export default TeamMembers

const Wrapper = styled.div`
  border: 1px solid #e5e5e5;
`
const StuffsWrapper = styled.div`
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  grid-gap: 40px;
`

const UserInfoWrapper = styled.div`
  display: flex;
  margin: 0 auto 0 0;
  color: #333333;
  font-size: 16px;
`

const TeamMember = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 16px;

  &:last-child {
    div:nth-child(2) {
      border: none;
      padding: 0;
    }
  }
`

const StuffName = styled.p`
  font-weight: 700;
  font-size: 20px;
  line-height: 32px;
`

const Button = styled.button`
  width: 175px;
  height: 48px;
  background: ${({ type }) => (type === "filled" ? "#27AE60" : "transparent")};
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid ${({ type }) => (type === "filled" ? "#27AE60" : "#E5E5E5")};
  color: ${({ type }) => (type === "filled" ? "#FFFFFF" : "#828282")};
`
const UserContent = styled.div`
  width: 100%;
  display: flex;
  grid-gap: 16px;
`

const StaffApply = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  grid-gap: 16px;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 0 32px 0;
`
