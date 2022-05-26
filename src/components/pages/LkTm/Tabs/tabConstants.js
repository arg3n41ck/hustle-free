import SettingsIcon from "../../../../assets/svg/settings.svg"
import ProfileIcon from "../../../../assets/svg/profile-icon.svg"
import AthletesIcon from "../../../../assets/svg/users.svg"
import StatisticsIcon from "../../../../assets/svg/statistics.svg"

export const lkTmTabs = [
  {
    name: "profile",
    href: "/lk-tm/profile",
    icon: <ProfileIcon />,
  },
  {
    name: "athletes",
    href: "/lk-tm/profile/athletes",
    icon: <AthletesIcon />,
  },
  {
    name: "statistic",
    href: "/lk-tm/profile/statistics",
    icon: <StatisticsIcon />,
  },
  {
    name: "settings",
    href: "/lk-tm/profile/",
    icon: <SettingsIcon />,
  },
]
