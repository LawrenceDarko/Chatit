// import React, { useState, useEffect } from 'react';
import Chat from './Chat';
import Sidebar from './Sidebar';
import styled from 'styled-components';
// import { useNavigate } from "react-router-dom";

const MainApp = () => {



  return (
    <ParentWrapper>
        <PageWrapper>
            <Sidebar />
            <Chat />
        </PageWrapper>
    </ParentWrapper>
  );
}

export default MainApp

const PageWrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: 500px;
    width: 900px;
    box-shadow: 3px 2px 20px 2px rgba(0,0,0,0.7);
    /* justify-content: center; */
    /* align-items: center; */
    
    /* border: 1px solid red; */
`
const ParentWrapper = styled.div`
    display: relative;
    top: 50%;
    left: 50%;
    margin: 50px 10px 10px 220px;
    /* transform: translate(-50%,-50%); */

`