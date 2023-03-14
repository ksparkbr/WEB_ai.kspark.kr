import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
import styled from "styled-components";
import LoadingSpinner from "../../component/LoadingSpinner";
import { SessionCheck } from "../../component/SessionCheck";
import { Body } from "./component/body/Body";
import { Footer } from "./component/footer/Footer";
import { Header } from "./component/header/Header";

const Wrapper = styled.div`
    width: 100wh;
    height: 100vh;
`
const Icon = styled.div`
    width: 64px;
    height: 64px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACxklEQVRoge2aQW5jQBiG/9fckI0mioiSiOEkUs7qjK/ItuS7VQjaDvcBxBDRj8z4XNmLPNcdFkZoDp8FmoWGOapWM1nksmrV5rdv81Q2tW/gC9kzPPnPe73z77v3e7PnCfsfQw7V+PNvY8I7jh4d4iFk7b/6Zuz8+/B/52xTxrblheTcMd6FvN6Ukdnf9X2jU81ujxcHeJ2hvhZxHZ65Ff6G0sxkNLp8mLlEg9Xbe0ijcZnJLZQ1/qKeTd89e6C+dczrtYnM8epH/Ld1bns+Fd7RZazlJL93h+TlT6TcT6xeGv6zPq6clX+XXQ1irG73+OPlcV7WXPPS/dN2V7RdX9y+Xlz/U0/KDWrnuWfdnhHlIwefLzC+k3/FhMX2ZZsYX9sP+jy3g3q8aW7ze1tZwTtZugPvM+TtTn/wX9zttx35EZza1Sb8tfV7h17npxw1Q7WXu4vB8V7pY9XJy7c+vnvSf8A/4D0/QfsZzVgAAAABJRU5ErkJggg==);
`
const Table = styled.table`
    border-collapse: collapse;
    height: 100vh;
`
const HeaderTr = styled.tr`
    height: 70px;
`
const FooterTr = styled.tr`
    height: 70px;
`
const BodyTr = styled.tr`
    & td{
        padding-top: 1rem;
    }
    vertical-align: top;
`

const Td = styled.td`
    padding: 0;
`
export function MainPage() {
    const navigate = useNavigate();
    const doLogout = async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND}/auth/logout`, { withCredentials: true });
        navigate("/login")
    }
    return <>
        <SessionCheck>
           <Header />
           <Body />
           <Footer />
        </SessionCheck>
    </>

}