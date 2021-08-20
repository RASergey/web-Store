import style from './FormsControls.module.scss'
import {Formik, Field, Form} from 'formik'

export const createForm = (inputs, createAction, schema, nameButton, tabindex = 0) => {

    const initialValues = {}
    inputs.forEach(i => initialValues[`${i.nameInput}`] = i.initialValues);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, { resetForm }) => {
                createAction(values);
                resetForm();
            }}
            validationSchema={schema}
        >
            {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
                <Form className={style.mainForm}>
                    {
                        inputs.map((input, index) => (
                            <div key={index}>
                                {(() => {
                                    switch (input.typeInput) {
                                        case 'input':
                                            return (
                                                <div>
                                                    <Field
                                                        type={input.nameInput}
                                                        as={input.typeInput}
                                                        name={input.nameInput}
                                                        value={values[`${input.nameInput}`]}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        id={input.id ? input.id : null}
                                                        placeholder={input.placeholder}
                                                        tabIndex={input.tabIndex ? `${+input.tabIndex + tabindex}` : `${index + 1}`}
                                                        className={errors[`${input.nameInput}`] && touched[`${input.nameInput}`]
                                                            ? style.error : null}
                                                    />
                                                    {errors[`${input.nameInput}`] && touched[`${input.nameInput}`]
                                                        ?
                                                        (<span className={style.errorMessage}>
                                            					{errors[`${input.nameInput}`]}
                                                        </span>) : null}
                                                </div>
                                            )
                                        case 'select':
                                            return (
                                                <div>
                                                    <Field
                                                        component={input.typeInput}
                                                        as={input.typeInput}
                                                        name={input.nameInput}
                                                        key={index}
                                                        tabIndex={input.tabIndex ? `${+input.tabIndex + tabindex}` : `${index + 1}`}
                                                    >
                                                        {
                                                            input.options.map(item => (
                                                                <option key={item.value}
                                                                        value={item.value}>{item.name}
                                                                </option>
                                                            ))
                                                        }
                                                    </Field>
                                                    {errors[`${input.nameInput}`] && touched[`${input.nameInput}`]
                                                        ?
                                                        (<span className={style.errorMessage}>
                                            					{errors[`${input.nameInput}`]}
                                                        </span>) : null}
                                                </div>
                                            )
                                        default:
                                            return null
                                    }
                                })()
                                }
                            < /div>
                        ))
                    }
                    <button
                        type={'submit'}
                        className={`${style.btnSubmit} ${dirty && isValid ? "" : style.btnDisabled}`}
                        disabled={!isValid && dirty}
                        onClick={handleSubmit}
                    >
                        {nameButton}
                    </button>
                </Form>
            )}
        </Formik>
    )
}


