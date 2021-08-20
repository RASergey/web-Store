import style from '../Handling.module.scss'
import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Context} from '../../../index'
import {createDevice, fetchBrands, fetchDevices, fetchTypes} from '../../../http/deviceAPI'
import {observer} from 'mobx-react-lite'
import {createForm} from '../../common/FormsControls/FormsControls'
import * as yup from 'yup'
import DescriptionDevice from './DescriptionsDevice/DescriptionsDevice'

const DeviceHandling = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [brandId, setBrandId] = useState('')
    const [typeId, setTypeId] = useState('')
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices().then(data => device.setDevices(data.rows))
    }, [device])

    const selectDevice = useCallback((value) => {
        setBrandId(value.brandId)
        setTypeId(value.typeId)
        setName(value.name)
        setPrice(value.price)
    }, [])

    const selectFile = event => {
        setFile(event.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('brandId', brandId)
        formData.append('typeId', typeId)
        formData.append('img', file)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(() => onHide())
    }

    const schema = yup.object().shape({
        name: yup.string()
            .min(1, 'Must be 1 characters or more')
            .max(20, 'Must be 20 characters or less')
            .required('!'),
        price: yup.number()
            .required('!')
            .positive('не корректные данные')
            .integer('не корректные данные'),
        typeId: yup.string()
            .required('!'),
        brandId: yup.string()
            .required('!'),
    })

    const inputs = [
        {
            nameInput: 'typeId',
            typeInput: 'select',
            initialValues: '',
            tabIndex: '1',
            options: [{value: '', name: 'Выберите тип'}, ...device.types.map(item => {
                return {value: item.id, name: item.name}
            })]
        },
        {
            nameInput: 'brandId',
            typeInput: 'select',
            initialValues: '',
            tabIndex: '2',
            options: [{value: '', name: 'Выберите бранд'}, ...device.brands.map(item => {
                return {value: item.id, name: item.name}
            })]
        },
        {
            nameInput: 'name',
            typeInput: 'input',
            initialValues: '',
            tabIndex: '3',
            placeholder: 'Введите название устройства'
        },
        {
            nameInput: 'price',
            typeInput: 'input',
            initialValues: '',
            tabIndex: '4',
            placeholder: 'Введите стоимость устройства'
        },
    ]

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
                                Добавить новый тип
                            </div>
                            <div>
                                {createForm(inputs, selectDevice, schema, 'Добавить')}
                            </div>
                        </div>
                        <input
                            className={style.inputFile}
                            type='file'
                            onChange={selectFile}
                            tabIndex='5'
                        />
                    </div>
                    <div className={style.descriptionBox}>
                        <DescriptionDevice info={info} setInfo={setInfo}/>
                    </div>
                </div>
                <div className={style.buttonBox}>
                    <button onClick={addDevice} type='button'>Создать девайс</button>
                </div>
            </section>
        </div>
    )
})

export default DeviceHandling
