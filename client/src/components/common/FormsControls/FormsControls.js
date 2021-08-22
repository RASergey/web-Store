import style from './FormsControls.module.scss'
import {Formik, Field, Form} from 'formik'
import {useCallback, useState} from 'react'

const FormsControls = ({inputs, createAction, schema, nameButton}) => {
    const initialValues = {}
    const [fileURL, setFileURL] = useState(null)

    inputs.forEach(i => initialValues[`${i.nameInput}`] = i.initialValues)

    const createURLImage = useCallback((file) => {
        let url = URL.createObjectURL(file)
        setFileURL(url)
        return () => URL.revokeObjectURL(url)
    }, [setFileURL])

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, {resetForm}) => {
                createAction(values)
                if (nameButton) {
                    resetForm()
                }
            }}
            validationSchema={schema}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  isValid,
                  handleSubmit,
                  dirty
              }) => (
                <Form className={style.mainForm} autoсomplete='off' onChange={nameButton ? null : handleSubmit}>
                    {
                        inputs.map((input, index) => (
                            <div className={style.inputBox} key={index}>
                                {(() => {
                                    switch (input.typeInput) {
                                        case 'input':
                                            return (
                                                <div className={style.inputBox}>
                                                    <Field
                                                        type={input.typeInput}
                                                        as={input.typeInput}
                                                        name={input.nameInput}
                                                        value={values[`${input.nameInput}`]}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        id={input.id ? input.id : null}
                                                        placeholder={input.placeholder}
                                                        tabIndex={input.tabIndex}
                                                        className={errors[`${input.nameInput}`] && touched[`${input.nameInput}`]
                                                            ? style.error : null}
                                                        autoсomplete='off'
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
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        tabIndex={input.tabIndex}
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
                                        case 'file':
                                            return (
                                                <div>
                                                    <input
                                                        id={input.nameInput}
                                                        name={input.nameInput}
                                                        type={input.typeInput}
                                                        hidden={true}
                                                        onChange={event => {
                                                            let file = event.currentTarget.files[0]
                                                            createURLImage(file)
                                                            values[input.nameInput] = file
                                                        }}
                                                    />
                                                    {
                                                        errors[input.nameInput] && touched[input.nameInput] && (
                                                            <div className="input-feedback">
                                                                {errors[input.nameInput]}
                                                            </div>
                                                        )}
                                                    <div className={style.fileImageBox}>
                                                        <button className={style.btnFile} type='button'>
                                                            tabIndex={input.tabIndex}
                                                            <label
                                                                className={style.fileLabel}
                                                                htmlFor={input.nameInput}
                                                            >
                                                                {!fileURL ? 'Добавить картинку' : 'Изменить картинку'}
                                                            </label>
                                                        </button>
                                                        {
                                                            fileURL
                                                                ?
                                                                <img className={style.fileImage} src={fileURL} alt='/'/>
                                                                : null
                                                        }
                                                    </div>
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
                    {nameButton ?
                        <button
                            type='submit'
                            className={`${style.btnSubmit} ${dirty && isValid ? "" : style.btnDisabled}`}
                            disabled={!isValid && dirty}
                            onClick={handleSubmit}
                        >
                            {nameButton}
                        </button>
                        :
                        null
                    }
                </Form>
            )}
        </Formik>
    )
}

export default FormsControls