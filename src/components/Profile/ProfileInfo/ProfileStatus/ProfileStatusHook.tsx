import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatus } from '../../../../redux/profile-reducer';
import { receiveStatus } from '../../../../redux/selectors/profile-selectors';


const ProfileStatus: FC = React.memo(() => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(useSelector(receiveStatus));

    const dispatch = useDispatch();

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        dispatch(updateStatus(status));
    }
    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value);
    }

    useEffect(() => {
        setStatus(status);
    }, [status]);
        
    return (
        <div>
            { !editMode 
                ? <div>
                    Статус: <span onClick={activateEditMode}>{status}</span>
                  </div> 
                : <div>
                    <input onBlur={deactivateEditMode} onChange={onStatusChange}
                            value={status}  autoFocus/>
                </div>
            }
        </div>
    );
   
})

export default ProfileStatus;
