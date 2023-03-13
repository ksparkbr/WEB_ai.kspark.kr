import styled from "styled-components"


const Flex = styled.div`
    display: flex;
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

const LogoutBtn = styled.div`
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: .3s;
    margin-right: 1rem;
    &:hover{
        color: grey;
    }
`


const Logo = styled.img`
    width: 300px;
    margin-left: 1rem;
`

export function Header(){
    return <HeaderWrapper>
        <Flex>
            <Logo src="/image/logo-medium.png" />
        </Flex>
        <Flex>
            <LogoutBtn>
                LOGOUT
            </LogoutBtn>
        </Flex>
    </HeaderWrapper>
}