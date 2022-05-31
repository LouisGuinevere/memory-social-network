import * as api from "../api";
import { FETCH_PROFILE, START_LOADING, END_LOADING } from "../constants/actionTypes";

export const getProfile = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchProfile(id);
        dispatch({ type: FETCH_PROFILE, payload: { data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}