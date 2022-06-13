import { ProfileIcon } from "../../../assets/svg/icons"
import { UserIcon } from "../../../assets/svg/icons"
import { StatisticsIcon } from "../../../assets/svg/icons"

export const teamProfileTabs = (teamId) => [
  {
    name: "profile",
    role: "public.team",
    href: `/team/${teamId}`,
    icon: <ProfileIcon />,
  },
  {
    name: "athletes",
    role: "public.team",
    href: `/team/${teamId}/athletes`,
    icon: <UserIcon />,
  },
  {
    name: "statistic",
    role: "public.team",
    href: `/team/${teamId}/statistics`,
    icon: <StatisticsIcon />,
  },
]
