import style from './TypeBar.module.scss'
import React, {useContext} from 'react'
import {observer} from 'mobx-react-lite'
import {Context} from '../../index'

const TypeBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <nav>
            <ul>
                {device.types.map(type =>
                    <li
                        className={`${style.itemType} ${type.id === device.selectedType.id ? style.active : null}`}
                        onClick={() => device.setSelectedType(type)}
                        key={type.id}
                    >
                        {type.name}
                    </li>
                )}
                <li
                    className={style.itemType}
                    onClick={() => device.setSelectedType(0)}
                >
                    Все...
                </li>
            </ul>
        </nav>
    )
})

export default TypeBar
