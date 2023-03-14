import { createStore } from "redux";

const initState = {
    prompt : '',
    answer : '',
    history : [],
    session: {},
}

const reducer = (state = initState, action)=>{
    switch(action.type){
        case 'PROMPT':
            return {
                ...state,
                prompt : action.data
            }
        case 'ANSWER':
            return {
                ...state,
                answer : action.data
            }
        case 'HISTORY':
            return {
                ...state,
                history : [...state.history, action.data]
            }
        case 'REFRESH':
            return {
                ...state,
                history : []
            }
        case 'SESSION':
            return {
                ...state,
                session: action.data,
            }
        default:
            return state;
    }
}

export const reduxStore = createStore(reducer);