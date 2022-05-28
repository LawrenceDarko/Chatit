import React, {useEffect, useState, useContext} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import FriendIdContext from "../ContextAPI/FriendContext"

const Chat = () => {

  const { friendId } = useContext(FriendIdContext);
  console.log("Friend ID: ",friendId)

  const [chatdata, setChatData] = useState([]);
  const [singleChatId, setSingleChatId] = useState(null)
  const [singleChat, setSingleChat] = useState([])
  const [newMessage, setnewMessage] = useState('')


  const userInfo = JSON.parse(localStorage.getItem("user info"));
  // console.log(userInfo)
  
  
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
    fetchChats();
    fetchMessages();
    // remove the following line and the newMessage dependency if you want no error in the console
    // handleNewMsg();
  }, [userInfo._id, friendId, singleChatId, newMessage])
  

  
    // console.log(chatdata)
    console.log("Single info: ",singleChat)
    const handleLogout = () => {
      localStorage.removeItem("user info");
      window.location.reload();
    }

  return (
    <ChatWrapper>
      <ChatHeader>
        <button onClick={() => handleLogout()}>Logout</button>
      </ChatHeader>
      <ChatBody>
      
        {singleChat.map(info => (<ChatItem msgfrom={info.sender} myId={userInfo._id} key={ info._id}>
          <p>{info.text}</p>
        </ChatItem>))}

        
      </ChatBody>
      <ChatInput>
        {friendId ? <><input  type="text" value={newMessage} onChange={(e)=>{setnewMessage(e.target.value)}} placeholder="Type a message..." />
        <button onClick={handleNewMsg}>Send</button></>:<p>Select a User to Start Conversation</p>}
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
  width: 100%;
  height: 13%;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.4);

  > button {
    margin-left: 80%;
    /* margin-right: auto; */
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
`
const ChatBody = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
  width: 100%;
  height: 74%;

  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* flex-direction: row; */
  /* border: 1px solid red; */
  width: auto;
  max-width: 50%;
  height: auto;
  padding: 10px;
  margin-top: 10px;
  background-color: ${props => props.msgfrom === props.myId ? "#D3D3D3" : "#007AFF"};
  color: ${props => props.msgfrom === props.myId ? "#333" : "white"};
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.4);
  margin-left: ${props => props.msgfrom === props.myId ? "45%" : "10px"};
`