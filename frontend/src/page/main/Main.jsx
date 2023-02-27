import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { SessionCheck } from "../../component/SessionCheck";

export function MainPage(){
    const navigate = useNavigate();
    const doLogout = async ()=>{
        await axios.get(`${process.env.REACT_APP_BACKEND}/auth/logout`, {withCredentials: true});
    }
    return <>
        <SessionCheck>
            메인페이지
            <div onClick={e=>doLogout()}>로그아웃</div>
        </SessionCheck>
    </>

}