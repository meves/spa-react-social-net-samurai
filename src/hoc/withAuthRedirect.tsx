import React, { ComponentType } from 'react';
import { Redirect } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { AppStateType } from '../redux/redux-store';
import { receiveIsAuth } from '../redux/selectors/auth-selectors';

export function withConnectedAuthRedirect<PropsType>(Component: ComponentType<PropsType>) {
    function RedirectComponent (props: {}) {
        const isAuth = useSelector(receiveIsAuth);
        if (!isAuth) {
            return (
                <Redirect to="/login" />
            );       
        }
        return (
            <Component {...props as PropsType} />
        );
    }
    
    return RedirectComponent;    
}
