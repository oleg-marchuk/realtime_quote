import { LOAD_DATA } from "./actionTypes";

export const loadData = (dispatch, data) => {
    dispatch({ type: LOAD_DATA, payload: { data: data.msg } })
}