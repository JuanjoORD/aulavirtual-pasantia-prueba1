import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";
import {setMe} from "./login";

const LOADER = 'LOGIN_LOADER';

export const constants = {
};

// ------------------------------------
// Pure Actions
// ------------------------------------

export const setLoader = loader => ({
    type: LOADER,
    loader,
});
// ------------------------------------
// Actions
// ------------------------------------

export const update = (data = {}, attachments=[]) => (dispatch, getStore) => {
    dispatch(setLoader(true));
    api.putAttachments('user/update_me', data, attachments).then((response) => {
        dispatch(setMe(response));
        NotificationManager.success('Datos actualizados exitosamente', 'ERROR', 1000);
        dispatch(push('/'));
    }).catch(() => {
        NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const initialProfile = () => (dispatch, getStore) => {
    const me = getStore().login.me
    dispatch(initializeForm('profile', me));
};

export const actions = {
    update,
    initialProfile
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
};

export const initialState = {
    loader: false,
};

export default handleActions(reducers, initialState);
