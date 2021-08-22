import style from './DeleteDevice.module.scss'
import {Context} from '../../../../index'
import FormsControls from '../../../common/FormsControls/FormsControls'
import {useCallback, useContext, useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {deleteDevice, fetchDevices} from '../../../../http/deviceAPI'

const DeleteDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [selectedDeviceId, setSelectedDeviceId] = useState('')
    const [selectDeleteDevice, setSelectDeleteDevice] = useState({})

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, 1, null).then(data => {
            device.setDevices(data.rows)
        })
    }, [device, device.selectedType.id, device.selectedBrand.id])

    const getSelectedDeviceId = useCallback(async (value) => {
        const selectDeleteDevice = device.devices.find(item => item.id === parseInt(value.deviceId))
        setSelectedDeviceId(value.deviceId)
        setSelectDeleteDevice(selectDeleteDevice)
    }, [setSelectedDeviceId, device.devices])

    const getSelectedTypeId = useCallback((value) => {
        device.setSelectedType({id: value.typeId})
    }, [device])

    const getSelectedBrandId = useCallback((value) => {
        device.setSelectedBrand({id: value.brandId})
    }, [device])

    const removeDevice = useCallback(async () => {
        await deleteDevice(selectedDeviceId)
        onHide()
    }, [selectedDeviceId, onHide])

    const selectDevice = {
        type:
            {
                select: 'types',
                nameInput: 'typeId',
                nameOptions: 'Укажите Тип',
            },
        brand:
            {
                select: 'brands',
                nameInput: 'brandId',
                nameOptions: 'Укажите Бранд',
            },
        device:
            {
                select: 'devices',
                nameInput: 'deviceId',
                nameOptions: 'Укажите Девайс',
            }
    }

    const getInput = useCallback((input) => {
        return [{
            ...{
                nameInput: input.nameInput,
                typeInput: 'select',
                initialValues: '',
                options: [{
                    value: '',
                    name: input.nameOptions
                }, ...device[input.select].map(item => ({value: item.id, name: item.name}))]
            }
        }]
    }, [device])

    return (
        <div className={`${style.wrapperModal} ${show ? style.hidden : null}`}>
            <section className={`${style.modelSection} ${show ? style.hidden : null}`}>
                <div className={style.modelDelete}>
                    <div className={style.buttonBox}>
                        <button className={style.button} onClick={onHide}>Закрыть</button>
                    </div>
                    <div className={style.form}>
                        <dir className={style.title}>
                            Удалить девайс
                        </dir>
                        <div>
                            <FormsControls inputs={getInput(selectDevice.type)} createAction={getSelectedTypeId}/>
                            <FormsControls inputs={getInput(selectDevice.brand)} createAction={getSelectedBrandId}/>
                            <FormsControls inputs={getInput(selectDevice.device)} createAction={getSelectedDeviceId}/>
                        </div>
                    </div>
                    <div className={style.selectDevice}>
                        <div className={style.imageBox}>
                            {selectDeleteDevice.img ?
                                <img
                                    className={style.image}
                                    src={`${process.env.REACT_APP_API_URL}/${selectDeleteDevice.img}`}
                                    alt='/'
                                />
                                : null
                            }
                        </div>
                        <p className={style.titleDevice}>
                            {selectDeleteDevice.name}
                        </p>
                    </div>
                </div>
                <div className={style.buttonBox}>
                    <button className={style.button} onClick={removeDevice} type='button'>Удалить</button>
                </div>
            </section>
        </div>
    )
})

export default DeleteDevice
