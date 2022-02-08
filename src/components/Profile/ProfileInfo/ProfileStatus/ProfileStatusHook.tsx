import React, { FC, useState, useEffect, ChangeEvent } from 'react';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatus: FC<PropsType> = (props) => {
    
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }
    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value);
    }

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);
        
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
   
}

export default ProfileStatus;
