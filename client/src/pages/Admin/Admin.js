import style from './Admin.module.scss'
import React, {useState} from 'react'
import CreateDevice from '../../components/modals/DeviceHendling/CreateDevice'
import BrandTypeHandling from '../../components/modals/BrandTypeHandling/BrandTypeHandling'

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

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
                    onClick={() => setDeviceVisible(true)}
                    className={style.buttonAdmin}
                >
                    Добавить устройство
                </button>
                <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
                <BrandTypeHandling nameModal={'brands'} show={brandVisible} onHide={() => setBrandVisible(false)}/>
                <BrandTypeHandling nameModal={'types'} show={typeVisible} onHide={() => setTypeVisible(false)}/>
            </div>
        </div>
    )
}

export default Admin
