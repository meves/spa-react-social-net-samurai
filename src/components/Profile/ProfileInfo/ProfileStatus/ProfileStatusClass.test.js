import React from "react";
import renderer, { create } from 'react-test-renderer';
import { updateStatus } from "../../../../redux/profile-reducer";
import ProfileStatus from "./ProfileStatusClass";

describe('ProfileStatusClass component', () => {
    test('status from props should be in the state', () => {
        // prepare data
        const component = create(<ProfileStatus status="Hello World!"/>); 
        // call function
        const instance = component.getInstance();
        // check result
        expect(instance.state.status).toBe('Hello World!');
    });    
    test('span should be displayed after creation', () => {
        const component = create(<ProfileStatus status="Hello World!"/>);
        const root = component.root;
        const span = root.findByType('span');
        expect(span).not.toBeNull();
    });
    test('span should contains correct status', () => {
        const component = create(<ProfileStatus status="Hello World!"/>);
        const root = component.root;
        const span = root.findByType('span');
        expect(span.children[0]).toBe('Hello World!');
    });
    test('input should not be displayed after creation', () => {
        const component = create(<ProfileStatus status="Hello World!"/>);
        const root = component.root;
        expect(() => {
            root.findByType('input')
        }).toThrow();
    });
    test('input should be displayed in editMode instead of span', () => {
        const component = create(<ProfileStatus status="Hello World!"/>);
        const root = component.root;
        const span = root.findByType('span');
        span.props.onClick();
        const input = root.findByType('input');
        expect(input.props.value).toBe('Hello World!');
    });
    test('callback should be called', () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status="Hello World!" updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});
