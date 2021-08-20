import style from './DeviceItem.module.scss'
import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {DEVICE_ROUTE} from '../../../utils/consts'

const DeviceItem = ({deviceItem, device, userMarked}) => {

    const [isMarked, setIsMarked] = useState(false)

    useEffect(() => {
        if (userMarked.length !== 0) {
            setIsMarked(userMarked.includes(deviceItem.id))
        }
    }, [isMarked, deviceItem.id, userMarked]);


    return (
        <NavLink className={style.item} to={`${DEVICE_ROUTE}/${deviceItem.id}`}>
            <div>
                <div className={style.imageBox}>
                    <img
                        className={style.image}
                        src={`${process.env.REACT_APP_API_URL}/${deviceItem.img}`}
                        alt='/'
                    />
                </div>
                <div className={style.rowInfo}>
                    {device.brands.map(brand =>
                        <div key={deviceItem.id + brand.id}>{brand.id === deviceItem.brandId ? brand.name : null}</div>
                    )}
                    <div className={style.rowStar}>
                        <div>{deviceItem.rating}</div>
                        <svg viewBox="0 0 576 750" className={style.star}>
                            <path
                                d="M528.53 171.5l-146.36-21.3-65.43-132.39c-11.71-23.59-45.68-23.89-57.48 0L193.83 150.2 47.47 171.5c-26.27 3.79-36.79 36.08-17.75 54.58l105.91 103-25 145.49c-4.52 26.3 23.22 46 46.48 33.69L288 439.56l130.93 68.69c23.26 12.21 51-7.39 46.48-33.69l-25-145.49 105.91-103c19-18.49 8.48-50.78-17.79-54.57zm-90.89 71l-66.05 64.23 15.63 90.86a12 12 0 0 1-17.4 12.66L288 367.27l-81.82 42.94a12 12 0 0 1-17.4-12.66l15.63-90.86-66-64.23A12 12 0 0 1 145 222l91.34-13.28 40.9-82.81a12 12 0 0 1 21.52 0l40.9 82.81L431 222a12 12 0 0 1 6.64 20.46z"
                                className={isMarked ? style.active : style.faSecondary}>
                            </path>
                            <path
                                d="M437.64 242.46l-66.05 64.23 15.63 90.86a12 12 0 0 1-17.4 12.66L288 367.27l-81.82 42.94a12 12 0 0 1-17.4-12.66l15.63-90.86-66-64.23A12 12 0 0 1 145 222l91.34-13.28 40.9-82.81a12 12 0 0 1 21.52 0l40.9 82.81L431 222a12 12 0 0 1 6.64 20.46z"
                                className={isMarked ? style.active : style.faPrimary}>
                            </path>
                        </svg>
                    </div>
                </div>
                <div className={style.name}>{deviceItem.name}</div>
            </div>
        </NavLink>
    )
}

export default DeviceItem
