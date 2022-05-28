import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import FriendIdContext from "../ContextAPI/FriendContext"

const ChatListItem = () => {

    const { setFriendId } = useContext(FriendIdContext);

    // console.log(id)

    const [data, setData] = useState([]);
    // const [chatdata, setChatData] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem("user info"));


    const handleFunc = async (id) => { 
        const userChatData = await axios.get("/api/conversations/" + userInfo._id);
        // setChatData(userChatData.data);
        console.log("User conversations: ",userChatData.data)

        const singleChatObj = userChatData.data?.find((i) => i.members.find((a) => a  === id));
        
        if(!singleChatObj){
            // console.log("One on One Conversation ",singleChatObj)
            // console.log("No conversation found")
            // const singleChatId = singleChatObj?._id
            // console.log("Private chat ID onClick: ",singleChatId)
            const conversationObj = {
                senderId: userInfo._id,
                receiverId: id,
            } 

            await axios.post('/api/conversations', conversationObj)
            // console.log("Private chat ID onClick: ",singleChatObj?._id)
        }
       
        // console.log(id)
        setFriendId(id)
     }


    const fetchData = async () => {
        const data = await axios.get('/api/users')
        console.log(data);
        setData(data.data.filter(info => info._id !== userInfo._id));
    }

    useEffect(() => {
        fetchData()
    }, [])



    return (
        data.map(info => (<ItemWrapper onClick={()=>handleFunc(info._id)} key={ info._id}>
            <UserProfile>
                <UserProfileImage src="/jennie.jpg" />
            </UserProfile>
            <ChatInfo>
                <p style={{ color: '#fff', fontWeight: '500' }}>{info.name}</p>
                <p style={{ color: '#fff', fontSize: '12px' }}>Hey, how are you?</p>
            </ChatInfo>
        </ItemWrapper>))
    )
}

export default ChatListItem

const ItemWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 15px;
    /* border: 1px solid #e5e5e5; */
    width: 90%;
    /* justify-content: center; */
    cursor: pointer;
`
const UserProfile = styled.div`

    > img {
        width: 50px;
        height: 50px;
        border-radius: 50%;

    }
`

const UserProfileImage = styled.img``

const ChatInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    /* border: 1px solid #e5e5e5; */
  `
