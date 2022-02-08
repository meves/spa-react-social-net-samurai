import React, { ChangeEvent } from 'react';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status
    };
    activateEditMode = () => {
        this.setState(() => ({
            editMode: true
        }));
    }
    deactivateEditMode = () => {
        this.setState(() => ({
            editMode: false
        }));
        this.props.updateStatus(this.state.status);
    }
    onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState(() => ({
            status: event.target.value
        }));
    }
    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps.status !== this.props.status) {
            this.setState(() => ({
                status: this.props.status
            }));
        }
    }
    render() {
        return (
            <div>
                { !this.state.editMode 
                    ? <div>
                        <span onClick={this.activateEditMode}>{this.props.status}</span>
                    </div> 
                    : <div>
                        <input onBlur={this.deactivateEditMode} onChange={this.onStatusChange}
                               value={this.state.status} autoFocus/>
                    </div>
                }
            </div>
        );
    }
}

export default ProfileStatus;
