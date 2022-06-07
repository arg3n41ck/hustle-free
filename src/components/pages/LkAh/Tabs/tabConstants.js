import {
  ProfileIcon,
  BigCalendarIcon,
  SettingsIcon, StoriesIcon, TeamsIcon
} from "../../../../assets/svg/icons"

export const lkAhTabs = [
  {
    name: "profile",
    icon: <ProfileIcon />,
    href: "/lk-ah/profile",
    children: ["/lk-ah/profile/edit"],
  },
  {
    name: "events",
    icon: <BigCalendarIcon />,
    href: "/lk-ah/profile/events",
    children: ["/lk-ah/profile/events/create"],
  },
  {
    name: "history",
    icon: <StoriesIcon />,
    href: "/lk-ah/profile/stories",
    children: ["/lk-ah/profile/events/create"],
  },
  {
    name: "team",
    icon: <TeamsIcon />,
    href: "/lk-ah/profile/teams",
    children: ["/lk-ah/profile/events/create"],
  },
  {
    name: "settings",
    icon: <SettingsIcon />,
    href: "/lk-ah/profile/",
  },
]
