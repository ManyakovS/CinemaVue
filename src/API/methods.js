import axios from 'axios';
const BASE_URL = 'https://localhost:7172/'
//Users
export async function FetchUsers(token) {
    return await axios.get(BASE_URL + "api/User", { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => res.data)
    .catch(error => console.log(error)) 
}

export async function FetchUsersForId(token, userId) {
    return await axios.get(BASE_URL + "api/User/" + userId, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => res.data)
    .catch(error => console.log(error)) 
} 

export async function DeleteUser(token, userId) {
    return await axios.delete(BASE_URL + "api/User?id=" + userId, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => res.data)
    .catch(error => console.log(error)) 
} 



//Employee

/* export async function FetchEmployees(token) {
    return await axios.get(BASE_URL + "api/User", { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => res.data)
    .catch(error => console.log(error)) 
}

export async function FetchEmployeesForId(token, userId) {
    return await axios.get(BASE_URL + "api/User/" + userId, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => res.data)
    .catch(error => console.log(error)) 
} 

export async function DeleteEmployee(token, userId) {
    return await axios.delete(BASE_URL + "api/User?id=" + userId, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => res.data)
    .catch(error => console.log(error)) 
}  */




//Film
export async function FetchFilms(token) {
    return await axios.get(BASE_URL + "api/Film", { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => res.data)
    .catch(error => console.log(error)) 
}

export async function FetchAllFilms(token) {
    return await axios.get(BASE_URL + "api/Film/film/all", { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => res.data)
    .catch(error => console.log(error)) 
}

export async function FetchFilmsForId(token, filmId) {
    return await axios.get(BASE_URL + "api/Film/film/" + filmId, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => res.data)
    .catch(error => console.log(error)) 
} 

export async function FetchFilmsForFilmName(token, filmName) {
    return await axios.get(BASE_URL + "api/Film/filmName?filmName=" + filmName, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => res.data)
    .catch(error => console.log(error)) 
} 

export async function DeleteFilm(token, filmId) {
    return await axios.delete(BASE_URL + "api/Film?id=" + filmId, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => res.data)
    .catch(error => console.log(error)) 
} 




//Session
export async function FetchSessions(token) {
    return await axios.get(BASE_URL + "api/Session", { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => res.data)
    .catch(error => console.log(error)) 
}

export async function FetchSessionsForId(token, sessionId) {
    return await axios.get(BASE_URL + "api/Session/session" + sessionId, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => res.data)
    .catch(error => console.log(error)) 
} 

export async function DeleteSession(token, sessionId) {
    return await axios.delete(BASE_URL + "api/Session?id=" + sessionId, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => res.data)
    .catch(error => console.log(error)) 
} 





//Ticket
export async function FetchTickets(token) {
    return await axios.get(BASE_URL + "api/Ticket", { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => res.data)
    .catch(error => console.log(error)) 
}

export async function FetchTicketsForSessionId(token, sessionId) {
    return await axios.get(BASE_URL + "api/Ticket/" + sessionId, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => res.data)
    .catch(error => console.log(error)) 
} 

export async function FetchTicketsForUserId(token, userId) {
    return await axios.get(BASE_URL + "ticket/UserID/" + userId, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => res.data)
    .catch(error => console.log(error)) 
} 

export async function DeleteTicket(token, ticketId) {
    return await axios.delete(BASE_URL + "api/Ticket?id=" + ticketId, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => res.data)
    .catch(error => console.log(error)) 
} 


