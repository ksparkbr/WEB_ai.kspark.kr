import styled from "styled-components"

const Wrapper = styled.div`
    display: flex;
    gap: .5rem;
`

const Window = styled.div`
    background-color: white;
    padding: .5rem;
    max-width: 70%;
    border-radius: .5rem;
    box-shadow: 1px 1px 3px 0px #00000077;
`

const Icon = styled.img`
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
`
const TimeWrapper = styled.div`
    display: flex;
    font-size: .8rem;
    align-items: end;
    color: grey;
`
export function Answer(props){
    return <Wrapper>
        <Icon src="/image/bot.png" />
        <Window>
            {props.children}
        </Window>
        <TimeWrapper>
            <div>{props.msgTime}</div>
        </TimeWrapper>
    </Wrapper>

}