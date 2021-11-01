import React from 'react';
import style from './FormsControls.module.css';

export const Textarea = ({input, label, cols, rows, meta: {touched, error, warning}}) => {
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

export const Input = ({input, type, label, meta: {touched, error, warning}}) => {
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

export const Checkbox = ({input, type, label, meta: {touched, error, warning}}) => {
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
