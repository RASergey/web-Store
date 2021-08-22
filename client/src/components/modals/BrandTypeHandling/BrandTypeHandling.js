import style from './BrandTypeHandling.module.scss'
import React, {useCallback, useContext} from 'react'
import {createBrand, createType, deleteBrand, deleteType} from '../../../http/deviceAPI'
import {Context} from '../../../index'
import {observer} from 'mobx-react-lite'
import * as yup from 'yup'
import FormsControls from '../../common/FormsControls/FormsControls'

const BrandTypeHandling = observer(({nameModal, show, onHide}) => {
    const {device} = useContext(Context)

    const actionDevice = useCallback(async (value) => {
        switch (nameModal) {
            case ('brands'): {
                value.name ? await createBrand({name: value.name}) : await deleteBrand(value.deviceId)
                break
            }
            case ('types'): {
                value.name ? await createType({name: value.name}) : await deleteType(value.deviceId)
                break
            }
            default:
                break
        }
        onHide()
    }, [nameModal, onHide])

    const schema = yup.object().shape({
        name: yup.string()
            .min(1, 'Must be 1 characters or more')
            .max(20, 'Must be 20 characters or less')
            .required('!')
    })

    const add = [
        {
            nameInput: 'name',
            typeInput: 'input',
            initialValues: '',
            placeholder: `Введите название ${nameModal === 'brands' ? 'Брендa' : 'Типa'}`
        }
    ]

    const remove = [
        {
            nameInput: 'deviceId',
            typeInput: 'select',
            initialValues: '',
            options: [{
                value: '',
                name: `Выберите ${nameModal === 'brands' ? 'Бренд' : 'Тип'}`
            }, ...device[nameModal].map(item => {
                return {value: item.id, name: item.name}
            })]
        }
    ]

    return (
        <div className={`${style.wrapperModal} ${show ? style.hidden : null}`}>
            <section className={`${style.modelSection} ${show ? style.hidden : null}`}>
                <div className={style.buttonBox}>
                    <button className={style.buttonClose} onClick={onHide}>Закрыть</button>
                </div>
                <div className={style.form}>
                    <div className={style.title}>
                        Добавить новый {nameModal === 'brands' ? 'Бренд' : 'Тип'}
                    </div>
                    <div>
                        <FormsControls inputs={add} createAction={actionDevice} schema={schema}
                                       nameButton={'Добавить'}/>
                    </div>
                </div>
                <div className={style.form}>
                    <dir className={style.title}>
                        Удалить {nameModal === 'brands' ? 'Бренд' : 'Тип'}
                    </dir>
                    <div>
                        <FormsControls inputs={remove} createAction={actionDevice} nameButton={'Удалить'}/>
                    </div>
                </div>
            </section>
        </div>
    )
})

export default BrandTypeHandling
