import style from './CreateDevice.module.scss'
import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Context} from '../../../../index'
import {createDevice, fetchBrands, fetchDevices, fetchTypes} from '../../../../http/deviceAPI'
import {observer} from 'mobx-react-lite'
import FormsControls from '../../../common/FormsControls/FormsControls'
import * as yup from 'yup'
import DescriptionDevice from './DescriptionsDevice/DescriptionsDevice'

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [info, setInfo] = useState([])
    const [isReadyDevice, setIsReadyDevice] = useState(false)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices().then(data => device.setDevices(data.rows))
    }, [device])

    useEffect(() => {
        setIsReadyDevice(
            device.selectedDevice.name
            && device.selectedDevice.price
            && device.selectedDevice.brandId
            && device.selectedDevice.typeId
            && device.selectedDevice.image
            && info.length !== 0
        )
    }, [device.selectedDevice, setIsReadyDevice, info.length])

    const addInfoDevice = useCallback((value) => {
        device.setSelectedDevice({...device.selectedDevice, ...value})
    }, [device])

    const addDevice = useCallback(() => {
        const formData = new FormData()
        formData.append('name', device.selectedDevice.name)
        formData.append('price', device.selectedDevice.price)
        formData.append('brandId', device.selectedDevice.brandId)
        formData.append('typeId', device.selectedDevice.typeId)
        formData.append('img', device.selectedDevice.image)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(() => onHide())
    }, [device.selectedDevice, info, onHide])

    const schemaName = yup.object().shape({
        name: yup.string()
            .min(2, 'Минимум 2 символов')
            .max(50, 'Максимум 50 символов')
            .required('!'),
    })

    const schemaPrice = yup.object().shape({
        price: yup.number()
            .required('!')
            .typeError('не корректная цена')
            .positive('не корректные данные')
            .integer('не корректные данные'),
    })

    const layoutDevice = {
        name: {
            nameInput: 'name',
            typeInput: 'input',
            placeholder: 'Введите название устройства',
            tabIndex: '1',
        },
        price: {
            nameInput: 'price',
            typeInput: 'input',
            placeholder: 'Введите стоимость устройства',
            tabIndex: '2',
        },
        types: {
            nameInput: 'typeId',
            typeInput: 'select',
            tabIndex: '3',
            options: [{value: '', name: 'Выберите тип'}, ...device.types.map(item => {
                return {value: item.id, name: item.name}
            })]
        },
        brands: {
            nameInput: 'brandId',
            typeInput: 'select',
            tabIndex: '4',
            options: [{value: '', name: 'Выберите бранд'}, ...device.brands.map(item => {
                return {value: item.id, name: item.name}
            })]
        },
        image: {
            nameInput: 'image',
            typeInput: 'file',
            tabIndex: '5',
        }
    }

    const getInput = useCallback((input) => [{...input, ...{initialValues: ''}}], [])

    return (
        <div className={`${style.wrapperModal} ${show ? style.hidden : null}`}>
            <section className={`${style.modelSection} ${show ? style.hidden : null}`}>
                <div className={style.buttonBox}>
                    <button className={style.buttonClose} onClick={onHide}>Закрыть</button>
                </div>
                <div className={style.createBox}>
                    <div className={style.formBox}>
                        <div className={style.form}>
                            <div className={style.title}>
                                Создать Девайс
                            </div>
                            <div>
                                <FormsControls inputs={getInput(layoutDevice.name)} createAction={addInfoDevice}
                                               schema={schemaName}/>
                                <FormsControls inputs={getInput(layoutDevice.price)} createAction={addInfoDevice}
                                               schema={schemaPrice}/>
                                <div className={style.formSelects}>
                                    <FormsControls inputs={getInput(layoutDevice.types)} createAction={addInfoDevice}/>
                                    <FormsControls inputs={getInput(layoutDevice.brands)} createAction={addInfoDevice}/>
                                </div>
                                <FormsControls inputs={getInput(layoutDevice.image)} createAction={addInfoDevice}/>
                            </div>
                        </div>
                    </div>
                    <div className={style.descriptionBox}>
                        <DescriptionDevice info={info} setInfo={setInfo}/>
                    </div>
                </div>
                <div className={`${style.buttonBox} ${!isReadyDevice ? style.btnBoxDisabled : null}`}>
                    <button className={!isReadyDevice ? style.btnDisabled : null} onClick={addDevice}
                            type='button'>Создать девайс
                    </button>
                </div>
            </section>
        </div>
    )
})

export default CreateDevice
