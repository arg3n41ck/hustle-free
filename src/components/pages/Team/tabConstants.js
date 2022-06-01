import { ProfileIcon } from "../../../assets/svg/icons"
import { UserIcon } from "../../../assets/svg/icons"
import { StatisticsIcon } from "../../../assets/svg/icons"

export const teamProfileTabs = (teamId) => [
  {
    name: "Профиль",
    href: `/team/${teamId}`,
    icon: <ProfileIcon />,
  },
  {
    name: "Атлеты",
    href: `/team/${teamId}/athletes`,
    icon: <UserIcon />,
  },
  {
    name: "Статистика",
    href: `/team/${teamId}/statistics`,
    icon: <StatisticsIcon />,
  },
]
