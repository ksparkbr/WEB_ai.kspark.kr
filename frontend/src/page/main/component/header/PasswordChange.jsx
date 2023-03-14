import axios from 'axios'
import { useRef, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
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

export function PasswordChange({ setModalState }) {
    const [frmdata, setFrmdata] = useState({
        password : '',
        newPassword : '',
        newPasswordConfirm : '',
    });
    const [renderAlert, setRenderAlert] = useState({
        msg : '',
        show : false
    });
    const alertModal = useRef();
    const doValidate = ()=>{   
        let passwordRegex = /^(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}[\]\\|:;"'<>,.?/])[^\s]{8,}$/
        if(!!!frmdata.newPassword.match(passwordRegex)){
            setRenderAlert({show: true, msg: '비밀번호는 최소 8자 이상, 영문, 특수문자, 숫자가 포함되어야 합니다.'});
            return;
        }

        if(!!!frmdata.newPasswordConfirm.match(passwordRegex)){
            setRenderAlert({show: true, msg: '비밀번호는 최소 8자 이상, 영문, 특수문자, 숫자가 포함되어야 합니다.'});
            return;
        }

        if(frmdata.newPassword !== frmdata.newPasswordConfirm){
            setRenderAlert({show: true, msg: '비밀번호 확인값이 다릅니다.'});
            return;
        }
        axios.post(process.env.REACT_APP_BACKEND + '/auth/changepass', frmdata, {withCredentials: true})
        .then(res => {console.log(res.data)})
        .catch(err => console.log(err))

    }
    return <Wrapper>
        <Flex style={{ marginBottom: '1rem' }}>
            <BackBtn onClick={(e) => setModalState(false)}>
                <img src="/image/back.png" />
            </BackBtn>
        </Flex>
        <FlexColumn>
            <Flex>
                <FormControl>
                    <Title>비밀번호</Title>
                    <input type="password" onChange={(e)=>{
                        setFrmdata({...frmdata, password : e.target.value})
                    }}/>
                </FormControl>
            </Flex>
            <Flex>
                <FormControl>
                    <Title>새 비밀번호</Title>
                    <input type="password" onChange={(e)=>{
                        setFrmdata({...frmdata, newPassword : e.target.value})
                    }}/>
                </FormControl>
            </Flex>
            <Flex>
                <FormControl>
                    <Title>비밀번호확인</Title>
                    <input type="password" onChange={(e)=>{
                        setFrmdata({...frmdata, newPasswordConfirm : e.target.value})
                    }}/>
                </FormControl>
            </Flex>
            <ButtonGroup>
                <Button onClick={(e)=>{
                    doValidate();
                }}>
                    변경
                </Button>
                <CancelButton 
                    onClick = {(e)=>{
                        setModalState(false);
                    }}
                >
                        취소
                </CancelButton>
            </ButtonGroup>
        </FlexColumn>
        {
            renderAlert.show ? (<dialog ref={alertModal} onClose={(e)=>{setRenderAlert({msg: '', show: false})}}>
                <div className="dialog-msg">{renderAlert.msg}</div>
                <ButtonGroup>
                    <Button onClick={(e)=>{
                        if(renderAlert.msg.search("가입완료") >= 0){
                            setModalState(false)
                        }
                        else{
                            setRenderAlert({show: false});
                        }
                    }}>확인</Button>
                </ButtonGroup>
            </dialog>) : ''
        }
    </Wrapper>
}