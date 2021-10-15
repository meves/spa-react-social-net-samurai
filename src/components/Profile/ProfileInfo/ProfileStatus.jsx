import React, { useState, useEffect } from 'react';
//import { style } from './ProfileInfo.module.css';

const ProfileStatus = (props) => {
    
    const [editMode, setEditMode] = useState(true);
    const [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(false);
    }
    const deactivateEditMode = () => {
        setEditMode(true);
        props.updateStatus(status);
    }
    const onStatusChange = (event) => {
        setStatus(event.target.value);
    }

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);
        
    return (
        <div>
            { editMode 
                ? <div>
                    <span onClick={activateEditMode}>{status}</span>
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
