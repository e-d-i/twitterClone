import React from "react"
import { useState, useRef } from "react"
import { useSession } from "next-auth/react"
import { db, storage } from "../firebase"
import { getDownloadURL, ref, uploadString } from "@firebase/storage"
import { addDoc, collection, doc, serverTimestamp, updateDoc, } from "@firebase/firestore"
import CloseIcon from "@mui/icons-material/Close"
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined"
import BarChartIcon from "@mui/icons-material/BarChart"
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"

import dynamic from "next/dynamic" // fix for error message "document is not defined in SSR (nextJs)" & rendering duplicate emoji pickers
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false }) // ~

function FeedInput() {
  const [input, setInput] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [displayEmojis, setDisplayEmojis] = useState(false)
  const [loading, setLoading] = useState(false)
  const filePickerRef = useRef(null)
  const { data: session } = useSession()

  const sendPost = async () => {
    if (loading) return
    setLoading(true)

    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    })
    const imageRef = ref(storage, `posts/${docRef.id}/image`)

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef)
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL
        })
      })
    }

    setLoading(false)
    setInput("")
    setSelectedFile(null)
    setDisplayEmojis(false)
  }

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }

  const onEmojiClick = (event, emojiObject) => {
    setInput(prevInput => prevInput + emojiObject.emoji)
  }

  return (
    <div className={`border-b border-twitterColor1 p-3 flex space-x-3 overflow-y-scroll scrollbar-hide ${loading && "opacity-60"}`}>
      <img src={session.user.image} alt="user image" className="h-10 w-10 rounded-full cursor-pointer"/>
      <div className="w-full divide-y divide-twitterColor1">
        <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea value={input} 
                    onChange={(e)=> setInput(e.target.value)} 
                    rows="2" 
                    placeholder="What's happening?"
                    className="bg-transparent outline-none text-twitterColor1 text-lg placeholder-slate-500 tracking-wide w-full min-h-[50px]"
            />

          {selectedFile && (
            <div className="relative">
              <div  className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer" 
                    onClick={() => setSelectedFile(null)}>
                <CloseIcon className="text-twitterColor1 h-5"/>
              </div>
              <img src={selectedFile} alt="selected file" className="rounded-2xl max-h-80 object-contain"/>
            </div>
          )}
        </div>

        {!loading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-baseline">
              <div className="icon" onClick={() => filePickerRef.current.click()}>
                <InsertPhotoOutlinedIcon className="h-[22px] text-[#1da1f2]"/>
                <input type="file" hidden onChange={addImageToPost} ref={filePickerRef}/>
              </div>

              <div className="icon rotate-90">
                <BarChartIcon className="text-[#1da1f2] h-[22px]"/>
              </div>

              <div className="icon" onClick={() => setDisplayEmojis(!displayEmojis)}>
                <InsertEmoticonIcon className="text-[#1da1f2] h-[22px]"/>
              </div>

              <div className="icon">
                <CalendarMonthIcon className="text-[#1da1f2] h-[22px]"/>
              </div>

              {displayEmojis && (
                <Picker onEmojiClick={onEmojiClick}/>
              )}
            </div>

            <button disabled={!input.trim() && !selectedFile} onClick={sendPost}
                    className="flex self-start bg-twitterColor0 text-twitterColor1 rounded-full px-4 py-1.5 font-bold shadow-lg hover:bg-[#1da1f2] disabled:hover:bg-twitterColor0 disabled:opacity-60 disabled:cursor-default"
              >
                Tweet
            </button>
         </div>
        )}
      </div>
    </div>
  )
}

export default FeedInput