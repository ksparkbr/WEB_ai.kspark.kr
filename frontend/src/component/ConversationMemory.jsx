import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { reduxAction } from "../redux/redux-action";

const Slider = styled.div`
  width: 100%;
  height: 2px;
  background: blue;
  position: relative;
  top: 0px;
`;

const SliderBar = styled.div`
  background: blue;
  height: 100%;
  position: absolute;
  left: 0;
`;

const SliderThumb = styled.div`
  width: 10px;
  height: 20px;
  background: #fff;
  border: 1px solid blue;
  border-radius: 4px;
  position: absolute;
  top: -10px;
  left: 0;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  }

  &:active {
    //transform: translateY(10px);
  }

  &:after {
    content: "";
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid blue;
    position: absolute;
    top: 50%;
    margin-top: -5px;
    right: -5px;
  }
`;

export function ConversationMemory() {
    const dispatch = useDispatch();

    const [thumbPosition, setThumbPosition] = useState(0);
    const [sliderWidth, setSliderWidth] = useState(0);
    const thumbRef = useRef(null);
    const barRef = useRef(null);
    const wrapperRef = useRef();
    
    const remember = useSelector(s => s.remember);

    useEffect(() => {
        setSliderWidth(thumbRef.current.parentNode.clientWidth);
        setThumbPosition(thumbRef.current.parentNode.clientWidth / 2);
    }, []);

    function handleMouseDown(event) {
        event.preventDefault();
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    }

    function handleMouseMove(event) {
        const thumbX = event.clientX-wrapperRef.current.offsetLeft;
        const minThumbPos = 0;
        const maxThumbPos = sliderWidth - thumbRef.current.clientWidth;

        if (thumbX < minThumbPos) {
            setThumbPosition(minThumbPos);
        } else if (thumbX > maxThumbPos) {
            setThumbPosition(maxThumbPos);
        } else {
            setThumbPosition(thumbX);
        }
    }

    useEffect(()=>{
        const maxThumbPos = sliderWidth - thumbRef.current.clientWidth;
        dispatch(reduxAction.REMEMBER(parseInt(thumbPosition / maxThumbPos * 9) + 1))
    },[thumbPosition])

    function handleMouseUp(event) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
    }
    return <div style={{width: "10%"}} ref={wrapperRef}>
            <Slider>
                <SliderBar ref={barRef}/>
                <SliderThumb ref={thumbRef}
                    style={{ left: `${thumbPosition}px` }}
                    onMouseDown={handleMouseDown}
                />
            </Slider>
        </div>
}