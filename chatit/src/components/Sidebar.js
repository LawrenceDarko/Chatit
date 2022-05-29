import React from 'react';
import styled from 'styled-components';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import MailIcon from '@mui/icons-material/Mail';
import ChatListItem from './ChatListItem';

const Sidebar = () => {
const userInfo = JSON.parse(localStorage.getItem("user info"));

  return (
    <SidebarWrapper>
        <Profile>
            <ProfilePicName>
                <img alt="" src="/avt.png" />
                <p>{userInfo.name}</p>
                <FiberManualRecordIcon style={{height: 10, width: 10, color: 'green', marginLeft: 10, }} />
                <MailIcon style={{height: 20, width: 40, color: '#fff', marginLeft: 10}}/>
            </ProfilePicName>
            
        </Profile>
        <SearchForm>
            <input type="text" placeholder="Search or start new chat" />
        </SearchForm>
        <ChatList>
            <ChatListItem />
        </ChatList>
    </SidebarWrapper>
  )
}

export default Sidebar

const SidebarWrapper = styled.div`
    display: flex;
    width: 30%;
    height: 100%;
    background-color: #007AFF;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;
    scroll-behavior: smooth;
    z-index: 1;
    /* border-right: 1px solid #e5e5e5; */

    ::-webkit-scrollbar {
        display: none;
    }

`
const Profile = styled.div`
    display: flex;
    flex-direction: column;
    /* padding: 30px; */
    /* border: 1px solid #e5e5e5; */
    margin-top: 10px;
    width: 90%;
`
const ProfilePicName = styled.div`
    display: flex;
    flex-direction: row;
    /* justify-content: center; */
    align-items: center;
    /* border: 1px solid #e5e5e5; */
    width: 100%;

    > p{
        margin-left: 10px;
        color: #fff;
    }

    > img {
        width: 50px;
        height: 50px;
        border-radius: 50%;

    }
`
const ChatList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
`
const SearchForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
    color: #fff;
    /* border: 1px solid #e5e5e5; */

    > input {
        width: 100%;
        height: 30px;
        border: none;
        border-radius: 5px;
        padding-left: 10px;
        font-size: 14px;
        color: #fff;
        background-color: #3596FF;
        outline: 0px solid transparent;
    }

`