/* eslint-disable no-useless-escape */
import axios from 'axios';
import {FetchFilms} from '@/API/methods'

const BASE_URL = 'https://localhost:7172/'





export async function refreshToken() {
    var token = await getCookie('Token').then(res => res)

/*     console.log((await FetchFilms(token).then(res => res))) */
    if(token === undefined || (await FetchFilms(token).then(res => res)) === undefined)
    {
        token = await RefreshToken(await getCookie('RefreshToken').then(res => res))
        .then(res => res)
    }
    return token
}

async function RefreshToken(token) {
    return await axios.post(BASE_URL + 'api/Auth/refresh-token?refreshToken=' + token)
    .then(res => {
        res = Object.assign(res.data)
        insertCookie(res)

        return res.token
    })
    .catch(e => console.log(e))
    
} 

export async function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

async function insertCookie(res) {
    let date = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
    date = date.toUTCString();
    document.cookie = `RefreshToken=${res.refreshToken}; expires=` + date;

    document.cookie = `UserID=${res.userId}; expires=` + date;

    date = new Date(Date.now() + 30 * 60 * 1000);
    date = date.toUTCString();
    document.cookie = `Token=${res.token}; expires=` + date;
}

export function logOut() {
    eraseCookie('RefreshToken')
    eraseCookie('Token')
    eraseCookie('UserID')
}

function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

export function getLink(film) {
    if(film.name != null && film.name != undefined)
        this.name = film.name.replace(/ /g, '').replace(/!/g, '').replace(/:/g, '')
    else
        this.name = "noFilm"
    return this.name
}

export async function isAdmin(token) {
    return await axios.get(BASE_URL + "api/Auth", { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => res.data)
    .catch(error => console.log(error)) 
} 
