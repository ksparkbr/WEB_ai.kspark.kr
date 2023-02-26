import { useEffect, useRef, useState } from 'react'
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
    background: linear-gradient(0deg, #ccc, #f1f1f1);
`

const LoginForm = styled(FlexCenter)`
    width: 300px;
    height: 200px;
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

    const [renderDialog, setRenderDialog] = useState(false);

    useEffect(()=>{
        inputID.current.focus();
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
                        <input type="text" ref={inputID}/>
                    </FormControl>
                    <FormControl>
                        <img src="/image/password.png" />
                        <input type="password" ref={inputPW}/>
                    </FormControl>
                    <ButtonGroup>
                        <Button>LOGIN</Button>
                        <Button onClick={(e)=>{
                            setRenderDialog(1);
                        }}>REGISTER</Button>
                    </ButtonGroup>
                </div>
            </LoginForm>
        </div>
        {
            renderDialog ? (<dialog ref={dialogRef}>
                <RegisterModal renderState={setRenderDialog}/>
            </dialog>) : ''
        }
        
    </Wrapper>
}