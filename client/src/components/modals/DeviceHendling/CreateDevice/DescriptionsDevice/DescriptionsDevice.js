import style from './DescriptionsDevice.module.scss'
import React, {useCallback} from 'react'
import FormsControls from '../../../../common/FormsControls/FormsControls'
import * as yup from 'yup'

const DescriptionDevice = ({info, setInfo}) => {

    const schema = yup.object().shape({
        title: yup.string()
            .required('!'),
        description: yup.string()
            .required('!'),
    })

    const addDescription = [
        {
            nameInput: 'title',
            typeInput: 'input',
            initialValues: '',
            tabIndex: '6',
            placeholder: 'Введите название свойства'
        },
        {
            nameInput: 'description',
            typeInput: 'input',
            initialValues: '',
            tabIndex: '7',
            placeholder: 'Введите описание свойства'
        },
    ]

    const addInfo = useCallback((value) => {
        setInfo([...info, {title: value.title, description: value.description, number: Date.now()}])
    }, [info, setInfo])

    const removeInfo = useCallback((value) => {
        setInfo(info.filter((item, index) => index !== value))
    }, [info, setInfo])

    return (
        <div className={style.descriptionBox}>
            <div className={style.form}>
                <FormsControls inputs={addDescription} createAction={addInfo} schema={schema}
                               nameButton={'Добавить новое свойство'}/>
            </div>
            <div className={style.listDescription}>
                {info.map((item, index) => (
                    <div key={item.number} className={style.itemDescription}>
                        <span>{`${index + 1}. ${item.title} :  ${item.description}`}</span>
                        <span className={style.removeDescription} onClick={() => removeInfo(index)}>&#11198;</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DescriptionDevice
