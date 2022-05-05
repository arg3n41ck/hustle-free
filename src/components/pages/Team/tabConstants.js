import ProfileIcon from "../../../public/svg/profile-icon.svg"
import AthletesIcon from "../../../public/svg/users.svg"

export const teamProfileTabs = (teamId) => [
  {
    name: "Профиль",
    href: `/team/${teamId}`,
    icon: <ProfileIcon />,
  },
  {
    name: "Атлеты",
    href: `/team/${teamId}/athletes`,
    icon: <AthletesIcon />,
  },
  // {
  //   name: "Статистика",
  //   href: `/team/${teamId}/statistics`,
  //   icon: <StatisticsIcon />,
  // },
]
