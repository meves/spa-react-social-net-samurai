import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Users } from './Users';
import Preloader from '../common/Preloader/Preloader';
import { withConnectedAuthRedirect } from '../../hoc/withAuthRedirect';
import { receiveIsFetching } from '../../redux/selectors/users-selectors';

type PropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const UsersPage: FC<PropsType> = (props) => {   
    const isFetching = useSelector(receiveIsFetching);
    return <>
            {isFetching ? <Preloader /> : null}
            <Users />
            </>
}


export default withConnectedAuthRedirect(UsersPage);
