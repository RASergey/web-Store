import style from './Pages.module.scss'
import React, {useCallback, useContext, useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {Context} from '../../index'
import {createForm} from '../common/FormsControls/FormsControls'
import * as yup from 'yup'

const Pages = observer(() => {
    const {device} = useContext(Context)
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        setPageCount(Math.ceil(device.totalCount / device.limit))
    }, [setPageCount, device.totalCount, device.limit])

    const pages = []

    for (let i = 1; i < pageCount; i++) {
        pages.push(i + 1)
    }

    const schema = yup.object().shape({
        limit: yup.number()
            .positive('не корректные данные')
            .integer()
    })

    const inputs = [{
        nameInput: 'limit',
        typeInput: 'input',
        id: 'input',
        initialValues: '',
    }]

    const setLimit = useCallback((value) => {
        device.setLimit(value.limit)
    }, [device])

    return (
        <div className={style.pagination}>
            <div className={style.rowPages}>
                {pages.map(page => <button
                    key={page}
                    className={`${style.paginationNumber} ${device.page === page ? style.active : null}`}
                    onClick={() => device.setPage(page)}
                >
                    {page}
                </button>)}
            </div>
            {pages.length !== 0 ?
                <div className={style.form}>
                    <label className={style.labelInput} htmlFor="input">Лимит девайсов.</label>
                    {createForm(inputs, setLimit, schema, 'Ok')}
                </div>
                : null
            }
        </div>
    )
})

export default Pages
