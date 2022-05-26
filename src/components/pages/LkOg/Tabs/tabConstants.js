import ProfileIcon from "../../../../assets/svg/profile-icon.svg"
import MyTournamentsIcon from "../../../../assets/svg/my-tournaments-icon.svg"
import SettingsIcon from "../../../../assets/svg/settings.svg"

export const lkOgTabs = [
  {
    name: "profile",
    icon: <ProfileIcon />,
    href: "/lk-og/profile",
    children: ["/lk-og/profile/edit"],
  },
  {
    name: "events",
    icon: <MyTournamentsIcon />,
    href: "/lk-og/profile/events",
    children: ["/lk-og/profile/events/edit"],
  },
  {
    name: "settings",
    icon: <SettingsIcon />,
    href: "/lk-og/profile/",
  },
]
