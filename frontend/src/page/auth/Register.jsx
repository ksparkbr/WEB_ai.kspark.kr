import styled from "styled-components"


const RegisterFormWrapper = styled.div`
    width: 500px;
    height: 500px;
`

const Flex = styled.div`
    display: flex;
`

const FlexEnd = styled(Flex)`
    justify-content: end;
`
const BackBtn = styled.div`
    & img{
        width: 30px;
        height: 30px;
    }
    cursor: pointer;
`

export function RegisterModal({renderState}){
    return <RegisterFormWrapper>
        <Flex>
            <BackBtn onClick={(e)=>{renderState(0)}}>
                <img src="/image/back.png" />
            </BackBtn>
        </Flex>
    </RegisterFormWrapper>
}