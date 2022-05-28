import React, {useState} from "react";
// import { Button } from "@mui/material"
import styled from "styled-components"
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom"


const Login = () => {

    const [warnig, setWarnig] = useState()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signIn = (e) => {
        e.preventDefault()
        if(!(email && password)){
            setWarnig("All fields are required")
        }
        
        else{
            try {
                const config = {
                        headers: {
                            "Content-Type": "application/json"
                        },
                   
                };
                axios.post("/api/users/login" ,{email, password}, config)
                .then(res => {
                    console.log(res)
                    console.log(res.data)
                    localStorage.setItem("user info", JSON.stringify(res.data))

                    navigate("/")
                    console.log("User successfully logged in")
                })
               
                

            }
                catch (error) {
                console.log(error)
            }
        }
    }
    

    return (
        <LoginContainer>
            <LoginInnerContainer>
                {/* <img src="/image/logo.png" alt="" /> */}
                <h1>Welcome to Chat It!</h1>
                <p>Don't have an Account Already? Sign up <Link to="/register" >here</Link></p>
                <form action="" onSubmit={signIn}>
                    <input type="text" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                    <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    <input type="submit" value="Sign In"/>
                </form>
                <p>{warnig}</p>
                {/* <Button onClick={signIn}>Sign in</Button> */}
            </LoginInnerContainer>
        </LoginContainer>
    )
}

export default Login

const LoginContainer = styled.div`
    background-color: #f8f8f8;
    height: 100vh;
    display: grid;
    place-items: center;
`
const LoginInnerContainer = styled.div`
    padding: 100px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

    >img {
        object-fit: contain;
        height: 100px;
        margin-bottom: 40px;
    }

    >p >a {
        text-decoration: none;
        color: blue;
    }

    >button {
        margin-top: 50px;
        text-transform: inherit;
        background-color: #0a8d48;
        color: white;

        :hover {
            background-color: #0a8d48;
            opacity: 0.5;
        }
    }

    >form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        >input {
            width: 250px;
            height: 30px;
            margin-bottom: 10px;
        }

        
    }
`