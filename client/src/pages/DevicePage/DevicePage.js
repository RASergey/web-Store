import style from './DevicePage.module.scss'
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {fetchOneDevice} from '../../http/deviceAPI'
import StarsRating from '../../components/StarsRating/StarsRating'
import {observer} from 'mobx-react-lite'


const DevicePage = observer(() => {
    const [userRating, setUserRating] = useState(0)
    const [device, setDevice] = useState({info: []})
    const [image, setImage] = useState(null)
    const {id} = useParams()

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [id, userRating]);

    useEffect(() => {
        if (device.img) {
            setImage(`${process.env.REACT_APP_API_URL}/${device.img}`)
        }
    }, [device.img])

    return (
        <div className='container'>
            <div className={style.rowPage}>
                <div className={style.imageBox}>
                    <img className={style.image} src={image} alt='/'/>
                </div>
                <div className={style.rowInfo}>
                    <h2 className={style.name}>{device.name}</h2>
                    <div className={style.rowStar}>
                        {device.rating}
                    </div>
                    {device.id && <StarsRating deviceId={id} setUserRating={setUserRating}/>}
                </div>
                <div className={style.infoPrice}>
                    <h3>от: {device.price} руб.</h3>
                    <button className={style.addBasket}>Добавить в корзину</button>
                </div>
            </div>
            <div className={style.rowDescriptions}>
                <p className={style.title}>Характеристики</p>
                {device.info.map((info, index) =>
                    <p className={style.description} key={info.id}>
                        {info.title}: {info.description}
                    </p>
                )}
            </div>
        </div>
    )
})

export default DevicePage
