import React from "react"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore"
import { db } from "../firebase"
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined"
import FeedInput from "./FeedInput"
import Post from "./Post"


function Feed() {
  const [posts, setPosts] = useState([])

  useEffect( () => onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")),
    (snapshot) => {setPosts(snapshot.docs)}), [db])

  return (
    <div className="flex-1 border-l border-r border-twitterColor1 max-w-2xl sm:ml-[73px] xl:ml-[290px]">
      <div className="text-twitterColor1 flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-[#7cc6f4] border-b border-twitterColor1">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        <div className=" w-9 h-9 flex items-center justify-center hoverAnimation xl:px-0 ml-auto">
          <AutoAwesomeOutlinedIcon className="h-5 text-twitterColor1"/>
        </div>
      </div>

      <FeedInput />

      <div className="pb-72">
        {posts.map(post => (
          <Post key={post.id} id={post.id} post={post.data()} />
        ))}
      </div>
    </div>
  )
}

export default Feed