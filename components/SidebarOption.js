import React from "react"

function SidebarOption({ active, Icon, text }) {
  return (
    <div className={`text-twitterColor1 flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation ${active && "font-bold"}`}>
      <Icon className="h-7" />
      <span className="hidden xl:inline">{text}</span>
    </div>
  )
}

export default SidebarOption