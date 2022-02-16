import React, { FC } from 'react';
import style from './FormsControls.module.css';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from "redux-form";

type TextareaPropsType = {
    input: WrappedFieldInputProps
    label: string
    cols: number | undefined
    rows: number | undefined
    meta: WrappedFieldMetaProps
}

export const Textarea: FC<TextareaPropsType> = ({input, label, cols, rows, meta: {touched, error, warning}}) => {
    const hasError = touched && (error || warning);
    return (
        <div>
            <div>
                <label>{label}</label>
            </div>
            <div className={`${style.formControl} ${hasError ? style.error : ''}`}>
                <textarea {...input} placeholder={label} cols={cols} rows={rows}/>
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
}

type InputPropsType = {
    input: WrappedFieldInputProps
    type: string
    label: string
    meta: WrappedFieldMetaProps
} 

export const Input: FC<InputPropsType> = ({input, type, label, meta: {touched, error, warning}}) => {
    const hasError = touched && (error || warning);
    return (
        <div>
            <div>
                <label>{label && label}</label>
            </div>
            <div className={`${style.formControl} ${hasError ? style.error : ''}`}>
                <input {...input} type={type} placeholder={label}/>
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
}

export const Checkbox: FC<InputPropsType> = ({input, type, label, meta: {touched, error, warning}}) => {
    const hasError = touched && (error || warning);
    return (
        <div>
            <div>
                <label>{label && label} </label>
            </div>
            <div className={`${style.formControl} ${hasError ? style.error : ''}`}>
                <input {...input} type={type} />
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
}
