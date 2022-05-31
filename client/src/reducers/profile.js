import { FETCH_PROFILE, START_LOADING, END_LOADING } from "../constants/actionTypes";

export default (state = {isLoading: true, profile: []}, action) => {
    switch(action.type){
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_PROFILE: {
            return {...state, profile: action.payload.data};
        }
        default: 
            return state;
    }
}