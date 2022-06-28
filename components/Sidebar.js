import React from "react"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import SidebarOption from "./SidebarOption"
import TwitterIcon from "@mui/icons-material/Twitter"
import HomeIcon from "@mui/icons-material/Home"
import TagIcon from "@mui/icons-material/Tag"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import MailOutlineIcon from "@mui/icons-material/MailOutline"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import ListAltIcon from "@mui/icons-material/ListAlt"
import PermIdentityIcon from "@mui/icons-material/PermIdentity"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"

function Sidebar() {
  const { data: session } = useSession()

  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:ml-6 xl:w-[340px] p-2 fixed h-full">
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0">
        <TwitterIcon className="text-3xl text-twitterColor1 transition duration-200 hover:scale-110" />
      </div>

      <div className="space-y-1 mt-4 mb-2.5">
        <SidebarOption active Icon={HomeIcon} text="Home"/>
        <SidebarOption Icon={TagIcon} text="Explore"/>
        <SidebarOption Icon={NotificationsNoneIcon} text="Notifications"/>
        <SidebarOption Icon={MailOutlineIcon} text="Messages"/>
        <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks"/>
        <SidebarOption Icon={ListAltIcon} text="Lists"/>
        <SidebarOption Icon={PermIdentityIcon} text="Profile"/>
        <SidebarOption Icon={MoreHorizIcon} text="More"/>
      </div>

      <button className="hidden xl:inline bg-twitterColor0 text-twitterColor1 w-56 h-10 rounded-full text-lg font-bold shadow-lg hover:bg-[#1da1f2]">
        Tweet
      </button>

      <div className="text-twitterColor1 flex items-center justify-center xl:mt-auto hoverAnimation" onClick={signOut}>
        <img src={session.user.image} alt="user image" className="h-8 w-8 rounded-full xl:mr-2.5"/>
        <div className="hidden xl:inline leading-4">
          <h4 className="font-bold">{session.user.name}</h4>
          <p className="text-slate-500">@{session.user.tag}</p>
        </div>
        <MoreHorizIcon className="text-slate-600 h-5 hidden xl:inline ml-10" />
      </div>
    </div>
  )
}

export default Sidebar