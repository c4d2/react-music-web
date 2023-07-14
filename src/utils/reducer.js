import { reducerCases } from "./constants";

export const initialState = {
    token: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case reducerCases.SET_TOKEN: {
            return {
                ...state,
                token: action.token
            }
        }
        default:
            return state;
    }
}

export default reducer;