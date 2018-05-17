import { GET_ERRORS } from "./types";
import axios from "axios";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/auth/register", userData)
    .then(res => history.push("/auth/sign-in"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};