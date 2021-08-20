import {makeAutoObservable} from "mobx";

export  default  class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }

    get isAuth() {
        return this._isAuth
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    get user() {
        return this._user
    }

    setUser(user) {
        this._user = user
    }
}