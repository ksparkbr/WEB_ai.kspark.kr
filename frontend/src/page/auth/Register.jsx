import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import axios from 'axios';

const RegisterFormWrapper = styled.div`
    width: 430px;
    height: 280px;
`

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
`
const FlexCenter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const Flex = styled.div`
    display: flex;
`

const Button = styled.div`
    box-shadow: 3px 3px 5px 0px #00000077;
    padding: 0.5rem 1rem 0.5rem 1rem;
    border-radius: 1rem;
    transition: .3s;
    background-color: #0054b3;
    cursor: pointer;
    &:hover{
        background-color: #293e56;
    }
`
const CancelButton = styled(Button)`
    background-color: #e27b00;
    &:hover{
        background-color: #8b4c00;
    }
`

const ButtonGroup = styled(FlexCenter)`
    color: white;
    font-weight: bold;
    gap: 1rem;
`
const BackBtn = styled.div`
    & img{
        width: 30px;
        height: 30px;
    }
    cursor: pointer;
`

const FormControl = styled(Flex)`
    & input{
        border: 0;
        padding: .5rem;
        width: 260px;
    }
    & input:focus-visible{
        border: 0;
        outline: unset;
    }
    border-bottom: 1px solid #006eff;
`

const Title = styled.div`
    text-align: center;
    padding: .5rem;
    width: 100px;
    font-weight: bold;
    background-color: #006eff;
    border-radius: 1rem 0 1rem 0;
    color: white;
`

export function RegisterModal({renderState}){

    const frmUserID = useRef();
    const frmPassword = useRef();
    const frmPasswordConfirm = useRef();

    const alertModal = useRef();

    const [renderAlert, setRenderAlert] = useState({
        msg : '',
        show : false
    });

    useEffect(()=>{
        if(renderAlert.show) alertModal.current.showModal();
    },[renderAlert])

    const [info, setInfo] = useState({
        id : '',
        password: '',
        passwordConfirm : '',
    })

    const doRegister = ()=>{
        let emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
        let passwordRegex = /^(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}[\]\\|:;"'<>,.?/])[^\s]{8,}$/
        if(!!!info.id.match(emailRegex)){
            setRenderAlert({show: true, msg: '???????????? ????????? ??????????????? ?????????.'});
            return;
        }
        if(!!!info.password.match(passwordRegex)){
            setRenderAlert({show: true, msg: '??????????????? ?????? 8??? ??????, ??????, ????????????, ????????? ??????????????? ?????????.'})
            return;
        }
        if(info.password != info.passwordConfirm){
            setRenderAlert({show: true, msg: '???????????? ???????????? ????????????.'})
            return;
        }
        axios.post(process.env.REACT_APP_BACKEND + `/auth/register`, {
                ...info
            }, {withCredentials: true}
        ).then(res => {
            setRenderAlert({show: true, msg: res.data.msg});
            return;
        }).catch(err => {
            setRenderAlert({show: true, msg: err.response.data.msg});
            return;
        });
    }

    useEffect(()=>{},[info])

    return <RegisterFormWrapper>
            <Flex style={{marginBottom: "1rem"}}>
                <BackBtn onClick={(e)=>{renderState(0)}}>
                    <img src="/image/back.png" />
                </BackBtn>
            </Flex>
        <FlexColumn>
            <Flex>
                <FormControl>
                    <Title>?????????ID</Title>
                    <input type="text" placeholder="sample@sample.com" 
                        ref={frmUserID}
                        onChange = {(e)=>{
                            setInfo({
                                ...info,
                                id : e.target.value,
                            })
                        }}
                    />
                </FormControl>
            </Flex>
            <Flex>
                <FormControl>
                    <Title>????????????</Title>
                    <input type="password" placeholder="8?????????, ??????, ??????, ???????????? ??????"
                        ref={frmPassword}
                        onChange = {(e)=>{
                            setInfo({
                                ...info,
                                password : e.target.value,
                            })
                        }}
                    />
                </FormControl>
            </Flex>
            <Flex>
                <FormControl>
                    <Title>??????????????????</Title>
                    <input type="password" placeholder="8?????????, ??????, ??????, ???????????? ??????"
                        ref={frmPasswordConfirm}
                        onChange = {(e)=>{
                            setInfo({
                                ...info,
                                passwordConfirm : e.target.value,
                            })
                        }    
                        }
                        onKeyDown = {(e)=>{
                            if(e.key == "Enter"){
                                doRegister();
                            }
                        }}
                    />
                </FormControl>
            </Flex>
            <ButtonGroup>
                <Button onClick={(e)=>{doRegister()}}>
                    REGISTER
                </Button>
                <CancelButton 
                    onClick = {(e)=>{
                        renderState(0);
                    }}
                >
                        CANCEL
                </CancelButton>
            </ButtonGroup>
        </FlexColumn>
        {
            renderAlert.show ? (<dialog ref={alertModal} onClose={(e)=>{setRenderAlert({msg: '', show: false})}}>
                <div className="dialog-msg">{renderAlert.msg}</div>
                <ButtonGroup>
                    <Button onClick={(e)=>{
                        if(renderAlert.msg.search("????????????") >= 0){
                            renderState(0)
                        }
                        else{
                            setRenderAlert({show: false});
                        }
                    }}>??????</Button>
                </ButtonGroup>
            </dialog>) : ''
        }
    </RegisterFormWrapper>
}