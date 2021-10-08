export const required = value => value ? undefined : 'Required'

const maxLength = max => value => {
    return value && value.length > max ? `Must be ${max} characters or less ` : undefined;
}
export const maxLength10 = maxLength(10);

export const email = value => {
    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) 
            ? 'Invalid email address' : undefined;
} 

const minLength = min => value => {
    return value && value.length < min ? `Must be at least ${min} characters` : undefined;
}
export const minLength10 = minLength(10);
