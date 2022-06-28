import React from "react"
import Image from "next/image"
import Trending from "./Trending"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"


function Widgets({ trendingResults, followResults }) {
  return (
    <div className="hidden lg:inline ml-8 xl:w-[450px] py-1 space-y-5">
      <div className="sticky top-0 py-0 z-50 bg-[#7cc6f4] rounded-full xl:w-96">
        <div className="flex items-center p-3 bg-[#7cc6f4] rounded-full relative">
          <SearchOutlinedIcon className="text-slate-500 h-5 z-50" />
          <input type="text" placeholder="Search Twitter" className="bg-transparent placeholder-slate-500 outline-none text-twitterColor1 absolute inset-0 pl-11 border border-transparent w-full focus:border-twitterColor0 rounded-full focus:shadow-lg"/>
        </div>
      </div>

      <div className="text-twitterColor1 bg-[#7cc6f4] space-y-3 pt-2 rounded-xl xl:w-96">
        <h4 className="font-bold text-xl px-4 animate-pulse">What's happening</h4>
        {trendingResults.map((result, index) => (
          <Trending key={index} result={result} />
        ))}
        <button className="hover:bg-white hover:bg-opacity-10 hover:rounded-xl px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#4092C4] font-light text-sm">Show more</button>
      </div>

      <div className="text-twitterColor1 bg-[#7cc6f4] space-y-3 pt-2 rounded-xl xl:w-96">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        {followResults.map((result, index) => (
          <div key={index} className="hover:bg-white hover:bg-opacity-10 hover:rounded-xl px-4 py-2 cursor-pointer transition duration-200 ease-out hover:shadow-md flex items-center">
            <Image src={result.userImg} width={50} height={50} objectFit="cover" className="rounded-full" />
            <div className="ml-4 leading-5 group">
              <h4 className="font-bold group-hover:underline">{result.username}</h4>
              <h5 className="text-slate-500 text-[15px]">{result.tag}</h5>
            </div>
            <button className="ml-auto bg-twitterColor1 text-twitterColor0 rounded-full font-bold text-sm py-1.5 px-2 transition duration-500 hover:scale-110">Follow</button>
          </div>
        ))}
        <button className="hover:bg-white hover:bg-opacity-10 hover:rounded-xl px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#4092C4] font-light text-sm">Show more</button>
      </div>
    </div>
  )
}

export default Widgets