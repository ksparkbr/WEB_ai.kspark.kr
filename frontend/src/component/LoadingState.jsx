import styled, { keyframes } from 'styled-components';

const rotateAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const dotAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.2);
  }
  100% {
    transform: scale(1);
  }
`;

const LoadingSpinner = styled.div`
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${rotateAnimation} 2s linear infinite;
`;

const LoadingDots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    background-color: #3498db;
    border-radius: 50%;
    width: 5px;
    height: 5px;
    margin: 0 2px;
    animation: ${dotAnimation} 1.3s ease-in-out infinite;
  }

  & > div:nth-of-type(1) {
    animation-delay: 0s;
  }
  & > div:nth-of-type(2) {
    animation-delay: 0.15s;
  }
  & > div:nth-of-type(3) {
    animation-delay: 0.3s;
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: .5rem;
  margin-bottom: .3rem;
`
const Text = styled.div`
  font-size: .9rem;
  color: #3498db;
`
export function LoadingState(props) {
    return <Wrapper>
        <LoadingDots>
            <div/><div/><div/>
        </LoadingDots>
        <Text>
            {props.children}
        </Text>
    </Wrapper>
}