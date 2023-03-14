import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { ConversationMemory } from "../../../../component/ConversationMemory"
import { reduxAction } from "../../../../redux/redux-action"
import { PasswordChange } from "./PasswordChange"


const Flex = styled.div`
    display: flex;
    gap: 1rem;
`

const RightComps = styled.div`
    display: flex;
    flex-direction: column;
    align-items : end;
    margin-right: 2rem;
`



const HeaderWrapper = styled(Flex)`
    width: 100vw;
    height: 70px;
    background-color: black;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    box-shadow: 0px 3px 3px 0px #00000077
`

const Btn = styled.div`
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: .3s;
    &:hover{
        color: grey;
    }
`


const Logo = styled.img`
    width: 250px;
    margin-left: 2rem;
`

export function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const session = useSelector(s => s.session);
    const [renderModal, setRenderModal] = useState(false);
    const modalRef = useRef();
    const remember = useSelector(s => s.remember);
    const logoutHandler = (e) => {
        axios.get(process.env.REACT_APP_BACKEND + "/auth/logout", { withCredentials: true }).then(res => {
            dispatch(reduxAction.REFRESH());
            navigate('/login');
        }).catch(e => { })
    }

    useEffect(() => {
        renderModal && modalRef.current.showModal();
    }, [renderModal])

    return <div>
        <HeaderWrapper>
            <Flex>
                <Logo src="/image/logo-medium.png" />
            </Flex>
            <RightComps>
                <Btn onClick={(e) => { setRenderModal(true) }}>
                    {session.user_id}
                </Btn>
                <Flex>
                    {
                        session.role === 'admin' && (
                            <Btn>ADMIN</Btn>
                        )
                    }
                    <Btn onClick={(e) => { logoutHandler(e) }}>
                        LOGOUT
                    </Btn>
                </Flex>
            </RightComps>

            {
                renderModal && (
                    <dialog ref={modalRef} onClose={(e) => { setRenderModal(false) }}>
                        <PasswordChange setModalState={setRenderModal} />
                    </dialog>
                )
            }
        </HeaderWrapper>
        <Flex style={{justifyContent: 'end', marginRight: '1rem', alignItems:'center'}}>
            <div style={{
                fontSize: ".8rem",
                fontWeight: 'bold',
                color: 'blue',
            }}>기억력</div>
            <ConversationMemory />
            <div style={{
                fontSize: '.8rem',
                width: '10px',
                fontWeight: 'bold',
                color: 'blue',
            }}>
                {remember}
            </div>
        </Flex>
    </div>
}