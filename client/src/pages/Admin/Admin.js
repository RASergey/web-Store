import style from './Admin.module.scss'
import React, {useState} from 'react'
import CreateDevice from '../../components/modals/DeviceHendling/CreateDevice/CreateDevice'
import BrandTypeHandling from '../../components/modals/BrandTypeHandling/BrandTypeHandling'
import DeleteDevice from '../../components/modals/DeviceHendling/DeleteDevice/DeleteDevice'

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [createDeviceVisible, setCreateDeviceVisible] = useState(false)
    const [deleteDeviceVisible, setDeleteDeviceVisible] = useState(false)

    return (
        <div className='container'>
            <div className={style.adminBox}>
                <button
                    onClick={() => setTypeVisible(true)}
                    className={style.buttonAdmin}
                >
                    Добавить / Удалить тип
                </button>
                <button
                    onClick={() => setBrandVisible(true)}
                    className={style.buttonAdmin}
                >
                    Добавить / Удалить Бренд
                </button>
                <button
                    onClick={() => setCreateDeviceVisible(true)}
                    className={style.buttonAdmin}
                >
                    Добавить устройство
                </button>
                <button
                    onClick={() => setDeleteDeviceVisible(true)}
                    className={style.buttonAdmin}
                >
                    Удалить устройство
                </button>
                <BrandTypeHandling nameModal={'brands'} show={brandVisible} onHide={() => setBrandVisible(false)}/>
                <BrandTypeHandling nameModal={'types'} show={typeVisible} onHide={() => setTypeVisible(false)}/>
                <CreateDevice show={createDeviceVisible} onHide={() => setCreateDeviceVisible(false)}/>
                <DeleteDevice show={deleteDeviceVisible} onHide={() => setDeleteDeviceVisible(false)}/>
            </div>
        </div>
    )
}

export default Admin
