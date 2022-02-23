import React, { ComponentType } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppStateType } from '../redux/redux-store';
import { receiveIsAuth } from '../redux/selectors/auth-selectors';


const mapStateToProps = (state: AppStateType) => ({
    isAuth: receiveIsAuth(state)
})

type MapStatePropsType = ReturnType<typeof mapStateToProps>;

type BasePropsType = {
    isAuth: boolean
}
type InjectedPropsType = any;

export function withConnectedAuthRedirect<PropsType>(Component: ComponentType<PropsType>) {
    function RedirectComponent (props: BasePropsType & InjectedPropsType) {
        const {isAuth, ...restProps} = props;
            if (!props.isAuth) {
                return (
                    <Redirect to="/login" />
                );       
            }
            return (
                <Component {...restProps as PropsType} />
            );
    }
    
    return connect<MapStatePropsType, {}, {}, AppStateType>(mapStateToProps, {})(RedirectComponent);    
}
