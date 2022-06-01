import {
  SettingsIcon,
  ProfileIcon,
  UserIcon,
  StatisticsIcon,
} from "../../../../assets/svg/icons"

export const lkTmTabs = [
  {
    name: "profile",
    href: "/lk-tm/profile",
    icon: <ProfileIcon />,
  },
  {
    name: "athletes",
    href: "/lk-tm/profile/athletes",
    icon: <UserIcon />,
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
