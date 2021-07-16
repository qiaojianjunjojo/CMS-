const axios = require('axios')
const baseUrl = 'http://localhost:3000/'
const api = {}

const apiAxios = async (method, url, params) => {
    //项目app
    let headers = { fapp: 'book', 'Content-Type': 'application/json' }
    if (sessionStorage.getItem('token')) {
        headers.token = sessionStorage.getItem('token')
    }
    return await new Promise((resolve) => {
        axios({
            headers: headers,
            method: method,
            url: baseUrl + url,
            //数据内容
            data: method === 'POST' ? params : null,
            params: method === 'GET' ? params : null
        }).then((res) => {
            resolve(res.data)
        }).catch(e => {
            console.log(e)
        })
    })
}

//get请求
api.get = async (url, params,) => {
    return await apiAxios('GET', url, params)
}

api.post = async (url, params) => {
    return await apiAxios('POST', url, params)
}

module.exports = api;