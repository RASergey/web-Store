import style from './Shop.module.scss'
import React, {useContext, useEffect} from 'react'
import {Context} from '../../index'
import {observer} from 'mobx-react-lite'
import {fetchBrands, fetchDevices, fetchTypes} from '../../http/deviceAPI'
import TypeBar from '../../components/TypeBar/TypeBar'
import BrandBar from '../../components/BrandBar/BrandBar'
import DeviceList from '../../components/DeviceList/DeviceList'
import Pages from '../../components/Pages/Pages'

const Shop = observer(() => {
    const {device} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, null).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device])

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device, device.page, device.selectedType, device.selectedBrand, device.limit])

    return (
        <main className='container'>
            <div className={style.mainSection}>
                <aside className={style.sidebar}>
                    <TypeBar/>
                </aside>
                <section className={style.mainPage}>
                    <div>
                        <BrandBar/>
                    </div>
                    <div className={style.deviceList}>
                        <DeviceList/>
                    </div>
                    <div className={style.pages}>
                        <Pages/>
                    </div>
                </section>
            </div>
        </main>
    )
})

export default Shop
