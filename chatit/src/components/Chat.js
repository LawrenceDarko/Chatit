import React, {useEffect, useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import FriendIdContext from "../ContextAPI/FriendContext"
import  { format } from 'timeago.js';
import { io } from 'socket.io-client';

const Chat = () => {

  const { friendId, friendName } = useContext(FriendIdContext);
  console.log("Friend ID: ",friendId)

  const [chatdata, setChatData] = useState([]);
  const [singleChatId, setSingleChatId] = useState(null)
  const [singleChat, setSingleChat] = useState([])
  const [newMessage, setnewMessage] = useState('')
  const [socket, setSocket] = useState(null)


  const userInfo = JSON.parse(localStorage.getItem("user info"));
  // console.log(userInfo)

  const chatRef = useRef(null);

  

  useEffect(() => {
    setSocket(io('ws://localhost:8000'))
  }, [])

  // useEffect(() => {
  //   socket.on('message', data => {
  //     console.log("Chat message: ",data)
  //     // setChatData(data)
  //   })
  // },[socket])
  
  
  const handleNewMsg = async (e) => {
    e.preventDefault()
    console.log(newMessage)
    const newMsg = {
      sender: userInfo._id,
      text: newMessage,
      conversationId: singleChatId,
    }

    const myMsg = await axios.post('/api/messages', newMsg)
    setnewMessage([...newMessage, myMsg.data])

    setnewMessage('')

  }

  const fetchChats = async () => {
    try {
      const data = await axios.get("/api/conversations/" + userInfo._id)
      // console.log(data);
      setChatData(data.data); 
      console.log(data.data)

      const singleChatObj = chatdata?.find((i) => i.members.find((a) => a  === friendId));

      setSingleChatId(singleChatObj?._id)
      console.log("Private chat ID: ",singleChatId)

    } catch (error) {
      console.log(error)
    }
    
  }

  const fetchMessages = async () => {
    try {
      const msg = await axios.get("/api/messages/" + singleChatId)
      setSingleChat(msg.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    chatRef.current.scrollIntoView({
        behavior: "smooth"
    });
  }) //,[newMessage, userInfo._id] Uncomment this to scroll to bottom on new message

  useEffect(() => {
    fetchChats();
    fetchMessages();
    // remove the following line and the newMessage dependency if you want no error in the console
    // handleNewMsg();
  }, [userInfo._id, friendId, singleChatId, newMessage])
  
  useEffect(() => {
    console.log("This is where socket will be")
  }, [socket])
  
  
    // console.log(chatdata)
    console.log("Single info: ",singleChat)
    const handleLogout = () => {
      localStorage.removeItem("user info");
      window.location.reload();
    }

  return (
    <ChatWrapper>
      <ChatHeader>
        <p>{friendName}</p>
        <button onClick={() => handleLogout()}>Logout</button>
      </ChatHeader>
      <ChatBody>
      {singleChat?.map(info => (<ChatItemWrapper  msgfrom={info.sender} myId={userInfo._id} key={ info._id}>
        <ChatItem msgfrom={info.sender} myId={userInfo._id} >
          <p>{info.text}</p>
          <p style={{fontSize: "9px"}}>{format(info.createdAt)}</p>
          
        </ChatItem>
      </ChatItemWrapper>))}
      <ChatBottom ref={chatRef}/>
      </ChatBody>
      <ChatInput>
        {friendId ? <><input type="text" value={newMessage} onChange={(e)=>{setnewMessage(e.target.value)}} placeholder="Type a message..." />
        {!newMessage?<button style={{backgroundColor:"#C5F8C2", color:"#D5D8D5"}} disabled>Send</button>:<button onClick={handleNewMsg}>Send</button>}</>:<p>Select a User to Start Conversation</p>}
      </ChatInput>
    </ChatWrapper>
  )
}

export default Chat

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
  width: 70%;
`

const ChatHeader = styled.div`
  display: flex;
  flex-direction: row;
  /* border: 1px solid red; */
  justify-content: space-between;
  width: 100%;
  height: 13%;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.4);

  > button {
    /* margin-left: 80%; */
    margin-top: auto;
    margin-bottom: auto;
    padding: 10px;
    border: none;
    background-color: #FF6140;
    border-radius: 5px;
    font-size: 1.2rem;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
  }

  > p {
    font-size: 1.5rem;
    font-weight: bold;
    /* color: #fff; */
    margin-left: 10px;
    margin-top: auto;
    margin-bottom: auto;
  }
`
const ChatBody = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
  width: 100%;
  height: 74%;

  overflow-y: scroll;
  -ms-overflow-style: none; 
  scrollbar-width: none;
  scroll-behavior: smooth;
  /* border-right: 1px solid #e5e5e5; */

  ::-webkit-scrollbar {
      display: none;
  }
`

const ChatInput = styled.div`
  display: flex;
  flex-direction: row;
  /* border: 1px solid red; */
  width: 100%;
  height: 13%;
  background-color: #D3D3D3;
  justify-content: center;
  align-items: center;
  /* transform: translate(0%, 600%); */
  /* box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.4); */

  > input {
        width: 80%;
        height: 70%;
        border: none;
        border-radius: 5px;
        padding-left: 10px;
        font-size: 14px;
        color: #333;
        background-color: #D3D3D3;
        outline: 0px solid transparent;
    }

    > button {
        width: 10%;
        height: 70%;
        background-color: green;
        color: #fff;
        border: none;
        outline: 0px;
    }
`
const ChatItem = styled.div`
  /* border: 1px solid red; */
  width: fit-content;
  /* max-width: 50%; */
  height: auto;
  padding: 10px;
  margin-top: 10px;
  background-color: ${props => props.msgfrom === props.myId ? "#D3D3D3" : "#007AFF"};
  color: ${props => props.msgfrom === props.myId ? "#333" : "white"};
  border-radius: 30px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.4);
  margin-left: ${props => props.msgfrom === props.myId ? "auto" : "10px"};
  margin-right: ${props => props.msgfrom === props.myId ? "10px" : "auto"};

  > p {
    font-size: 1rem;
    margin-left: 10px;
    margin-top: auto;
    margin-bottom: auto;
    /* width: auto; */
    /* border: 1px solid red; */
  }
`
const ChatItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
  width: 100%;
  /* border: 1px solid #e5e5e5; */
  align-items: ${props => props.msgfrom === props.myId ? "flex-end" : "flex-start"};
`

const ChatBottom = styled.div`
  margin-top: 100px;
`