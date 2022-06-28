import React from "react"
import Moment from "react-moment"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined"
import BarChartIcon from "@mui/icons-material/BarChart"

function Comment({ id, comment }) {
  return (
    <div className="p-3 flex cursor-pointer border-b border-twitterColor1">
      <img src={comment?.userImg} alt="user image" className="h-11 w-11 rounded-full mr-4"/>
      <div className="flex flex-col space-y-2 w-full">
        <div className="flex justify-between">
          <div className="text-slate-500">
            <div className="inline-block group">
              <h4 className="font-bold text-twitterColor1 text-[15px] sm:text-base inline-block group-hover:underline">
                {comment?.username}
              </h4>
              <span className="ml-1.5 text-sm sm:text-[15px]">
                @{comment?.tag}{" "}
              </span>
            </div>{" "}
            ·{" "}
            <span className="hover:underline text-sm sm:text-[15px]">
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </span>
            <p className="text-twitterColor1 mt-0.5 max-w-lg overflow-scroll text-[15px] sm:text-base">
              {comment?.comment}
            </p>
          </div>

          <div className="icon group flex-shrink-0">
            <MoreHorizIcon className="h-5 text-slate-600 group-hover:text-[#1da1f2]" />
          </div>
        </div>

        <div className="text-slate-600 flex justify-between w-10/12">
          <div className="icon group">
            <ChatOutlinedIcon className="h-5 group-hover:text-[#1da1f2]" />
          </div>

          <div className="flex items-center space-x-1 group">
            <div className="icon group-hover:bg-pink-600/10">
              <FavoriteBorderOutlinedIcon className="h-5 group-hover:text-pink-600" />
            </div>
            <span className="group-hover:text-pink-600 text-sm"></span>
          </div>

          <div className="icon group">
            <ShareOutlinedIcon className="h-5 group-hover:text-[#1da1f2]" />
          </div>

          <div className="icon group">
            <BarChartIcon className="h-5 group-hover:text-[#1da1f2]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment