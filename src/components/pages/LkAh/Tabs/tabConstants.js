import ProfileIcon from "../../../../assets/svg/profile-icon.svg"
import MyTournamentsIcon from "../../../../assets/svg/my-tournaments-icon.svg"
import SettingsIcon from "../../../../assets/svg/settings.svg"
import TeamsIcon from "../../../../assets/svg/MyTeams.svg"
import StoriesIcon from "../../../../assets/svg/MyStories.svg"

export const lkAhTabs = [
  {
    name: "profile",
    icon: <ProfileIcon />,
    href: "/lk-ah/profile",
    children: ["/lk-ah/profile/edit"],
  },
  {
    name: "events",
    icon: <MyTournamentsIcon />,
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
