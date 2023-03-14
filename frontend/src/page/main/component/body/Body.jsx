import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux"
import styled from "styled-components"
import { ConversationMemory } from "../../../../component/ConversationMemory";
import { LoadingState } from "../../../../component/LoadingState";
import { Answer } from "./Answer";
import { Prompt } from "./Prompt";

const Wrapper = styled.div`
    margin: 0 auto;
    padding-left:1rem;
    padding-right: 1rem;
    max-width: 1200px;
    @media screen and (min-width: 992px) and (max-width: 1199px){
        max-width: 992px;
    }
    @media screen and (min-width: 768px) and (max-width: 991px){
        max-width: 768px;
    }
    @media screen and (max-width: 767px){
        max-width: 767px;
    }
    height: calc(100vh - 160px);
    overflow-y: auto;
`

const History = styled.pre`
    white-space: pre-wrap;
    font-family: "NotoSansKR";
    font-size: .8rem;
`

const Flex = styled.div`
    display: flex;
`

export function Body(){

    const history = useSelector(s => s.history);
    const wrapperRef = useRef();
    const loadingState = useSelector(s => s.loadingState);

    useEffect(()=>{
        wrapperRef.current.scrollTo(0, wrapperRef.current.scrollHeight);
    },[history])

    useEffect(()=>{
        loadingState && wrapperRef.current.scrollTo(0, wrapperRef.current.scrollHeight);
    }, [loadingState])

    return <Wrapper ref={wrapperRef}>
        {
            history.length > 0 && history.map((item, idx) => {
                return (
                    <History key={`history-${idx}`}>
                        {item.type == 'prompt' && <Prompt msgTime={item.msgTime}>{item.msg.trim()}</Prompt>}
                        {item.type == 'answer' && <Answer msgTime={item.msgTime}>{item.msg.trim()}</Answer>}
                    </History>
                )
            })
        }
        {
            loadingState && (
                <History>
                    <Answer>
                        <LoadingState>
                            잠시만 기다려주세요...
                        </LoadingState>
                    </Answer>
                </History>

            )
        }
    </Wrapper>
}