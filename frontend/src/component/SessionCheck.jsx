import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function SessionCheck(props){
    let navigate = useNavigate();
    let [render, setRender] = useState(false);
    const checkSession = async ()=>{
        return (await axios.get(`${process.env.REACT_APP_BACKEND}/auth/check`, {withCredentials: true}).then(res => res.data))
    }
    useEffect(()=>{
        checkSession().then(res => {
            if(!res?.is_logined){
                setRender(false);
                navigate("/login")
            }
            else{
                setRender(true);
            }
        })
    },[])
    return <>{(render && props.children)}</>
}