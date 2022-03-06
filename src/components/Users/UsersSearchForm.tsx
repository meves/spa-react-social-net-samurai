import React from 'react';
import { Field, Form, Formik } from 'formik';
import { FilterType } from '../../redux/user-reducer';

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
type ValuesType = {
    term: string,
    friend: string
}
const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
    const submit = (values: ValuesType, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}) => {        
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null 
            : values.friend === "true" ? true 
            :                            false
        }
        props.onFilterChanged(filter);     
        setSubmitting(false);                
    }    
    return (
        <div>
            <Formik
                initialValues={{ term: "", friend: "null" }}
                validate={usersSearchFormValidate}
                onSubmit={submit}
                >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field name="friend" as="select">
                            <option value="null">All users</option>
                            <option value="true">Followed only</option>
                            <option value="false">Unfollowed only</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
})

export default UsersSearchForm