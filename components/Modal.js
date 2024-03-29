import React from "react"
import { Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Moment from "react-moment"
import { useRecoilState } from "recoil"
import { modalState, postIdState } from "../atoms/modalAtom"
import { onSnapshot, doc, addDoc, collection, serverTimestamp, } from "@firebase/firestore"
import { db } from "../firebase"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import BarChartIcon from "@mui/icons-material/BarChart"
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon"
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined"
import CloseIcon from "@mui/icons-material/Close"


function Modal() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const [postId, setPostId] = useRecoilState(postIdState)
  const [post, setPost] = useState()
  const [comment, setComment] = useState("")
  const router = useRouter()

  useEffect(() => onSnapshot(doc(db, "posts", postId), (snapshot) => {setPost(snapshot.data());}), [db])

  const sendComment = async(e) => {
    e.preventDefault()

    await addDoc(collection(db, "posts", postId, "comments"), {
      comment: comment,
      username: session.user.name,
      tag: session.user.tag,
      userImg: session.user.image,
      timestamp: serverTimestamp()
    })

    setIsOpen(false)
    setComment("")

    router.push(`/${postId}`)
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 pt-8" onClose={setIsOpen}>
        <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-gradient-to-br from-twitterColor0 to-twitterColor1 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
              <div className="flex items-center px-1.5 py-2 border-b border-twitterColor1">
                <div  className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0" 
                      onClick={() => setIsOpen(false)}
                >
                  <CloseIcon className="h[22px] text-twitterColor1"/>
                </div>
              </div>
              <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                <div className="w-full">
                  <div className="text-twitterColor1 flex gap-x-3 relative">
                    <span className="w-0.5 h-full z-[-1] absolute left-5 top-11 bg-gray-600"/>
                    <img src={post?.userImg} alt="user image" className="h-11 w-11 rounded-full"/>
                    <div>
                      <div className="inline-block group">
                        <h4 className="font-bold text-[15px] sm:text-base text-twitterColor1 inline-block">{post?.username}</h4>
                        <span className="ml-1.5 text-sm sm:text-[15px]">@{post?.tag}</span>
                      </div>{" "}
                      ·{" "}
                      <span className="hover:underline text-sm sm:text-[15px]">
                        <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                      </span>
                      <p className="text-twitterColor1 text-[15px] sm:text-base">{post?.text}</p>
                    </div>
                  </div>
                  <div className="mt-7 flex space-x-3 w-full">
                    <img src={session.user.image} alt="user image" className="h-11 w-11 rounded-full"/>
                    <div className="flex-grow mt-2">
                      <textarea value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Tweet your reply"
                                rows="2"
                                className="bg-transparent outline-none text-twitterColor1 text-lg placeholder-slate-500 tracking-wide w-full min-h-[80px]"
                        />
                      <div className="flex items-center justify-between pt-2.5">
                        <div className="flex items-center">
                          <div className="icon">
                            <InsertPhotoOutlinedIcon className="text-[#1da1f2] h-[22px]" />
                          </div>

                          <div className="icon rotate-90">
                            <BarChartIcon className="text-[#1da1f2] h-[22px]" />
                          </div>

                          <div className="icon">
                            <InsertEmoticonIcon className="text-[#1da1f2] h-[22px]" />
                          </div>

                          <div className="icon">
                            <CalendarMonthIcon className="text-[#1da1f2] h-[22px]" />
                          </div>
                        </div>
                        <button
                          className="bg-twitterColor0 text-twitterColor1 rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1da1f2] disabled:hover:bg-[#1da1f2] disabled:opacity-50 disabled:cursor-default"
                          type="submit"
                          onClick={sendComment}
                          disabled={!comment.trim()}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal