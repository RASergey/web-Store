import style from './DeviceList.module.scss'
import React, {useContext, useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {Context} from '../../index'
import DeviceItem from './DeviceItem/DeviceItem';
import {getDevicesUserMarked} from '../../http/deviceAPI'

const DeviceList = observer(() => {
    const {device} = useContext(Context)
    const [isDevicesMarked, setIsDevicesMarked] = useState([])

    useEffect(() => {
        if (isDevicesMarked.length === 0) {
            getDevicesUserMarked().then(data => setIsDevicesMarked(data.ratings))
        }
    }, [isDevicesMarked]);

    return (
        <section className={style.devicePage}>
            {device.devices.map(deviceItem =>
                <DeviceItem key={deviceItem.id} userMarked={isDevicesMarked} deviceItem={deviceItem}
                            device={device}/>
            )}
        </section>
    )
})

export default DeviceList
