export const reduxAction = {
    PROMPT : (data) => {
        return {
            type : 'PROMPT',
            data
        }
    },
    ANSWER : (data) => {
        return {
            type : 'ANSWER',
            data
        }
    },
    HISTORY : (data) => {
        return {
            type : 'HISTORY',
            data
        }
    },
    REFRESH : () => { return {type : 'REFRESH'} },
    SESSION : (data) => {
        return {
            type : 'SESSION',
            data
        }
    },
    REMEMBER : (data) => {
        return {
            type : 'REMEMBER',
            data
        }
    },
    LOADING : (data) => {
        return {
            type : 'LOADING',
            data
        }
    }

}