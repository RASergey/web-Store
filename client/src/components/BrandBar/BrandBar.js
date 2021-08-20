import style from './BrandBar.module.scss'
import React, {useContext} from 'react'
import {observer} from 'mobx-react-lite'
import {Context} from '../../index'

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <nav>
            <ul className={style.rowBrand}>
                {device.brands.map(brand =>
                    <li
                        onClick={() => device.setSelectedBrand(brand)}
                        key={brand.id}
                        className={`${style.itemBrand} ${brand.id === device.selectedBrand.id ? style.active : null}`}
                    >
                        {brand.name}
                    </li>
                )}
                <li

                    className={style.itemBrand}
                    onClick={() => device.setSelectedBrand(0)}
                >
                    Все...
                </li>
            </ul>
        </nav>
    )
})

export default BrandBar
