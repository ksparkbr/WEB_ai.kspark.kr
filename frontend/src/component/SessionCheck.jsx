import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reduxAction } from "../redux/redux-action";

export function SessionCheck(props){
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let [render, setRender] = useState(false);
    const checkSession = async ()=>{
        return (await axios.get(`${process.env.REACT_APP_BACKEND}/auth/check`, {withCredentials: true}).then(res => res.data))
    }
    useEffect(()=>{
        checkSession().then((res) => {
            if(!res?.is_logined){
                setRender(false);
                navigate("/login")
            }
            else{
                setRender(true);
                console.log(res);
                dispatch(reduxAction.SESSION({user_id: res.user_id, is_logined : res.is_logined, role: res.role}));
            }
        }).catch(err => {
            console.log(err);
            setRender(false);
            navigate("/login")
        })
    },[])
    return <>{(render && props.children)}</>
}