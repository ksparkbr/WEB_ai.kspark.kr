import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { RegisterModal } from './Register'


const FlexCenter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Wrapper = styled(FlexCenter)`
    width: 100wh;
    height: 100vh;
`

const LoginForm = styled(FlexCenter)`
    width: 300px;
    height: 250px;
    box-shadow: 3px 3px 5px 0px #00000077;
    border-radius: 1rem;
    background-color: white;
`
const FormControl = styled.div`
    display: flex;
    margin-bottom: 1rem;
    & input{
        padding: .5rem;
        border-radius: 0rem 1rem 1rem 0rem;
        border: 1px solid #b3b3b3;
        border-left: 0;
    }
    & input:focus-visible{
        outline: unset;
    }
    & img{
        width: 1.5rem;
        height: 1.5rem;
        padding : .5rem;
        border-radius: 1rem 0rem 0rem 1rem;
        border: 1px solid #b3b3b3;
        border-right: 0;
        background-color: white;
    }
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

const ButtonGroup = styled(FlexCenter)`
    color: white;
    font-weight: bold;
    gap: 1rem;
`

const Logo = styled.img`
    width: 300px;
    margin-bottom: 2rem;
`

export function LoginPage(){
    const dialogRef = useRef();
    const inputID = useRef();
    const inputPW = useRef();
    const checkRemember = useRef();
    const navigate = useNavigate();
    const [renderDialog, setRenderDialog] = useState(false);

    const alertModal = useRef();
    const [renderAlert, setRenderAlert] = useState({
        msg : '',
        show : false
    });

    const [loginInfo, setLoginInfo] = useState({
        user_id: '',
        password: '',
    })

    const doLogin = async ()=>{
        await axios.post(`${process.env.REACT_APP_BACKEND}/auth/login`, {
            ...loginInfo
        }, {withCredentials: true}).then(res => {
            if(checkRemember.current.checked){
                window.localStorage.setItem("SAVED_LOGIN_INFO", JSON.stringify({
                    ...loginInfo
                }))
            }
            else{
                window.localStorage.removeItem("SAVED_LOGIN_INFO");
            }
            res.data.is_logined && navigate("/");
        }).catch(err => {
            setRenderAlert({show: true, msg: '로그인 실패'})
        })
    }

    useEffect(()=>{
        if(renderAlert.show){
            alertModal.current.showModal();
        }
    },[renderAlert])

    const checkSession = async ()=>{
        return (await axios.get(`${process.env.REACT_APP_BACKEND}/auth/check`, {withCredentials: true}).then(res => res.data))
    }

    useEffect(()=>{
        //세션체크
        checkSession().then(res => {if(res.is_logined) navigate("/")})
        inputID.current.focus();
        try{
            let {user_id, password} = JSON.parse(window.localStorage.getItem("SAVED_LOGIN_INFO"))
            setLoginInfo({user_id, password});
            inputID.current.value = user_id;
            inputPW.current.value = password;
            checkRemember.current.checked = true;
        }
        catch(e){}
    },[])

    useEffect(()=>{
        if(renderDialog) dialogRef.current.showModal();
    }, [renderDialog])
    return <Wrapper>
        <div>
            <Logo src="/image/logo-full.png" />
            <LoginForm>
                <div>
                    <FormControl>
                        <img src="/image/user.png" />
                        <input type="text" ref={inputID} onChange={e=>{
                            setLoginInfo({
                                password : loginInfo.password,
                                user_id : e.target.value
                            })
                        }}/>
                    </FormControl>
                    <FormControl>
                        <img src="/image/password.png" />
                        <input type="password" ref={inputPW} onChange={e=>{
                            setLoginInfo({
                                user_id : loginInfo.user_id,
                                password : e.target.value
                            })
                        }}
                        onKeyDown={e => {
                            if(e.key == "Enter"){
                                doLogin();
                            }
                        }}
                        />
                    </FormControl>
                    <FormControl style={{display: "flex", justifyContent: "center"}}>
                        <input type="checkbox" 
                               name="remember-login-info" 
                               ref={checkRemember}
                        />
                        <label htmlFor="remember-login-info" 
                               style={{
                                    fontWeight: "bold",
                                    marginLeft: ".5rem"
                                }}
                        >로그인정보 저장</label>
                    </FormControl>
                    <ButtonGroup>
                        <Button onClick={e=>doLogin()}>LOGIN</Button>
                        <Button onClick={(e)=>{
                            setRenderDialog(1);
                        }}>REGISTER</Button>
                    </ButtonGroup>
                </div>
            </LoginForm>
        </div>
        {
            renderDialog ? (<dialog ref={dialogRef} onClose={(e)=>{setRenderDialog(0)}}>
                <RegisterModal renderState={setRenderDialog}/>
            </dialog>) : ''
        }
        {
            renderAlert.show ? (<dialog ref={alertModal} onClose={(e)=>{setRenderAlert({msg: '', show: false})}}>
                <div className="dialog-msg">{renderAlert.msg}</div>
                <ButtonGroup>
                    <Button onClick={(e)=>{
                        setRenderAlert({msg: '', show: false})
                    }}>확인</Button>
                </ButtonGroup>
            </dialog>) : ''
        }
    </Wrapper>
}