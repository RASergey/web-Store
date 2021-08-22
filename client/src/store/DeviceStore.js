import {makeAutoObservable} from 'mobx';

export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._selectedDevice = {}
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 20
        makeAutoObservable(this)
    }

    get types() {
        return this._types
    }

    setTypes(types) {
        this._types = types
    }

    get brands() {
        return this._brands
    }

    setBrands(brands) {
        this._brands = brands
    }

    get devices() {
        return this._devices
    }

    setDevices(device) {
        this._devices = device
    }


    get selectedDevice() {
        return this._selectedDevice
    }

    setSelectedDevice(value) {
        this._selectedDevice = value
    }

    get selectedType() {
        return this._selectedType
    }

    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }

    get selectedBrand() {
        return this._selectedBrand
    }

    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }

    get page() {
        return this._page
    }

    setPage(page) {
        this._page = page
    }

    get totalCount() {
        return this._totalCount
    }

    setTotalCount(count) {
        this._totalCount = count
    }

    get limit() {
        return this._limit
    }

    setLimit(value) {
        this._limit = value
    }
}