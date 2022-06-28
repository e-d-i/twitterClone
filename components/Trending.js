import React from "react"
import Image from "next/image"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"

function Trending({ result }) {
  return (
    <div className="hover:bg-white hover:bg-opacity-10 hover:rounded-xl px-4 py-3 cursor-pointer transition duration-200 ease-out hover:shadow-md flex items-center justify-between">
      <div className="space-y-0.5 ">
        <p className="text-slate-500 text-xs font-medium">{result.heading}</p>
        <h6 className="font-bold max-w-[250px] text-sm">{result.description}</h6>
        <p className="text-slate-500 text-xs font-medium max-w-[250px]">Trending with {result.tags.map((tag, index) => (
          <span key={index} className="tag text-[#3880AB]">{tag}</span>
        ))}</p>
      </div>

      {result.img ? (
        <Image src={result.img} width={70} height={70} objectFit="cover" className="rounded-2xl" />
      ) : (
        <div className="icon group">
          <MoreHorizIcon className="h-5 text-slate-500 group-hover:text-[#1d9bf0]" />
        </div>
      )}
    </div>
  )
}

export default Trending