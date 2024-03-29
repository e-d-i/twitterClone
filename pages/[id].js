import React, { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { getProviders, getSession, useSession } from "next-auth/react"
import { useRecoilState } from "recoil"
import { modalState } from "../atoms/modalAtom"
import Modal from "../components/Modal"
import { collection, doc, onSnapshot, orderBy, query, } from "@firebase/firestore"
import { db } from "../firebase"
import Sidebar from "../components/Sidebar"
import Post from "../components/Post"
import Comment from "../components/Comment"
import Widgets from "../components/Widgets"
import Login from "../components/Login"
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined"

function PostPage({ trendingResults, followResults, providers }) {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const router = useRouter()
  const { id } = router.query
  const [post, setPost] = useState()
  const [comments, setComments] = useState([])

  useEffect(() => onSnapshot(doc(db, "posts", id), (snapshot) => {setPost(snapshot.data());}), [db])

  useEffect(() => onSnapshot(query(collection(db, "posts", id, "comments"),orderBy("timestamp", "desc")), 
    (snapshot) => setComments(snapshot.docs)), [db, id])

  if (!session) return <Login providers={providers}/>

  return (
    <div>
      <Head>
        <title>{post?.username} on Twitter: "{post?.text}"</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <div className="flex-grow border-l border-r border-twitterColor1 max-w-2xl sm:ml-[73px] xl:ml-[410px]">
          <div className="flex items-center px-1.5 py-2 border-b border-twitterColor1 text-twitterColor1 font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-[#7cc6f4]">
            <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0" onClick={() => router.push("/")}>
              <ArrowBackOutlinedIcon className="h-5 text-twitterColor1"/>
            </div>
            Tweet
          </div>
          <Post id={id} post={post} postPage />
          {comments.length > 0 && (
            <div className="pb-72">
              {comments.map(comment => (
                <Comment key={comment.id} id={comment.id} comment={comment.data()} />
              ))}
            </div>
          )}
        </div>
        <Widgets trendingResults={trendingResults} followResults={followResults} />

        {isOpen && <Modal />}
      </main>
    </div>
  )
}

export default PostPage

export async function getServerSideProps(context) {
  const trendingResults = await fetch("https://www.jsonkeeper.com/b/L3EE").then(
    (res) => res.json()
  )
  const followResults = await fetch("https://www.jsonkeeper.com/b/SPY7").then(
    (res) => res.json()
  )
  const providers = await getProviders()
  const session = await getSession(context)

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  }
}
