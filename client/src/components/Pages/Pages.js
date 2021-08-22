import style from './Pages.module.scss'
import React, {useCallback, useContext, useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {Context} from '../../index'
import * as yup from 'yup'
import FormsControls from '../common/FormsControls/FormsControls'

const Pages = observer(() => {
    const {device} = useContext(Context)
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        setPageCount(Math.ceil(device.totalCount / device.limit))
    }, [setPageCount, device.totalCount, device.limit])

    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }
    const schema = yup.object().shape({
        limit: yup.number()
            .typeError('введите число')
            .integer('не корректные данные')
    })

    const inputs = [{
        nameInput: 'limit',
        typeInput: 'input',
        id: 'input',
        initialValues: '',
        placeholder: device.limit < 100 ? `${device.limit}` : ''
    }]

    const setLimit = useCallback((value) => {
        if (+value.limit) {
            device.setLimit(Math.abs(value.limit))
        } else {
            device.setLimit(20)
        }
    }, [device])

    return (
        <div className={style.pagination}>
            {pages.length > 1 ?
                <div className={style.rowPages}>
                    {pages.map(page => <button
                        key={page}
                        className={`${style.paginationNumber} ${device.page === page ? style.active : null}`}
                        onClick={() => device.setPage(page)}
                    >
                        {page}
                    </button>)}
                </div>
                : null
            }
            <div className={style.form}>
                <label className={style.limitLabel} htmlFor="input">
                    <span className={style.limitTitle}>Кол-во:</span>
                    <FormsControls inputs={inputs} createAction={setLimit} schema={schema} nameButton={'Ok'}/>
                </label>
            </div>
        </div>
    )
})

export default Pages
