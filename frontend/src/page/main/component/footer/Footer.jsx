import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { reduxAction } from "../../../../redux/redux-action";
import { LoadingState } from "../../../../component/LoadingState";

const Wrapper = styled.div`
    position: absolute!important;
    width: 100vw;
    bottom: 1rem;
`

const AutoMargin = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    height: auto;
    justify-content: center;
    @media screen and (min-width: 992px) and (max-width: 1199px){
        max-width: 992px;
    }
    @media screen and (min-width: 768px) and (max-width: 991px){
        max-width: 768px;
    }
    @media screen and (max-width: 767px){
        max-width: 767px;
    }
`

const AutoMarginLeft = styled(AutoMargin)`
    justify-content: start;
`

const Btn = styled.div`
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    & img{
        width: 1rem;
    }
`
const TextAreaWrapper = styled.div`
    height: auto;
    display: flex;
    justify-content: center;
    align-items: end;
    width: 100%;
    position: relative;
    bottom: 0px;
    box-shadow: 1px 1px 3px 0px #00000077;
    background-color: #e3e3e3;
    border-radius: .5rem;
    max-height: 300px;
    padding: .5rem;
    padding-left: 1rem;
`

const TextArea = styled.textarea`
    background-color: transparent;
    position: relative;
    width: 100%;
    resize: none;
    max-height: 292px!important;
    &:focus-visible{
        outline-width: 0;
    }
`

export function Footer(){
    const textarea = useRef();
    const textareaWrapper = useRef();
    const dispatch = useDispatch();
    const history = useSelector(s => s.history);
    const remember = useSelector(s => s.remember);
    const loadingState = useSelector(s => s.loadingState);
    //const [loadingState, setLoadingState] = useState(false);

    useEffect(()=>{
        sendPrompt('인사', true)
    },[])
    
    const handleInput = (e) => {
        textarea.current.style.height = 'auto';
        let style = window.getComputedStyle(textarea.current);
        let adjust = parseInt(style.padding) * 2
        textarea.current.style.height = `${textarea.current.scrollHeight - adjust}px`;
        //textareaWrapper.current.scrollTo(0, textareaWrapper.current.scrollHeight);
    };

    const sendPrompt = async (prompt, init = false)=>{
        if(!!prompt){
            if(!(prompt === history[history.length-1]?.msg)){
                !init && dispatch(reduxAction.HISTORY({type : 'prompt', msg : prompt, msgTime : new Date().toLocaleTimeString('en-US', {hour12: false})}))
                textarea.current.value = '';
                handleInput();
            }
        }
    };

    useEffect(()=>{
        let url = `${process.env.REACT_APP_BACKEND}/ai/prompt`;
        if(history.length === 0){
            dispatch(reduxAction.LOADING(true))
            axios.post(url, {prompt : []}, {withCredentials: true}).then(res => res.data).then(res =>{
                dispatch(reduxAction.HISTORY({type : 'answer', msg : res.message.content, msgTime : new Date().toLocaleTimeString('en-US', {hour12: false})}))
                //setLoadingState(false);
                dispatch(reduxAction.LOADING(false))
            });
        }
        if(history[history.length-1]?.type == 'prompt'){
            let historybuf = [...history];
            let maxLength = remember;
            if(historybuf.length >= maxLength){
                historybuf.splice(0, historybuf.length - maxLength);
            }
            dispatch(reduxAction.LOADING(true))
            axios.post(url, {prompt : historybuf.map(item => item.msg)}, {withCredentials: true}).then(res => res.data).then(res =>{
                dispatch(reduxAction.HISTORY({type : 'answer', msg : res.message.content, msgTime : new Date().toLocaleTimeString('en-US', {hour12: false})}))
                dispatch(reduxAction.LOADING(false))
            });
        }
    },[history])

    useEffect(()=>{
        if(textarea.current){
            try{
                const handleKeyDown = (e) => {
                    if(e.ctrlKey && e.key === 'Enter'){
                        sendPrompt(e.target.value);
                    }
                };
                textarea.current.addEventListener('keydown', handleKeyDown);
                textarea.current.addEventListener('input', handleInput);
            } catch(e){};
        }
    },[textarea])
    
    return <Wrapper>
        <AutoMargin>
            <TextAreaWrapper ref={textareaWrapper}>
                <TextArea ref={textarea} rows={1}></TextArea>
                <Btn>
                    <img src='/image/send.png' />   
                </Btn>
                <Btn onClick={(e)=>{
                    dispatch(reduxAction.REFRESH());
                    sendPrompt('인사', true);
                }}>
                    <img src='/image/refresh.png' />   
                </Btn>
            </TextAreaWrapper>
        </AutoMargin>
    </Wrapper>
}