import * as api from './api.js';

const host='http://localhost:3030';
api.settings.host=host;

export const login=api.login;
export const register=api.register;
export const logout=api.logout;


//Implement application-specific requests

//Всички GET заявки
    //връща всички мебели
export async function getFurniture(){
    return await api.get(host + '/data/catalog');
}

    //връща конкретен мебел по ай, ще се използва при детайлите и при едита
export async function getItemById(id){
    return await api.get(host + '/data/catalog/'+id);
}

    //взимане на нашите мебели
export async function getMyFurniture(){
    const userId=sessionStorage.getItem('userId');
    return await api.get(host + `/data/catalog?where=_ownerId%3D%22${userId}%22`)
}

//Всички PUT/DEL заявки
    //Създаване на мебел/запис
export async function createRecord(data){
    return await api.post(host + '/data/catalog',data)
}

    //Редакция на мебел/запис
export async function editRecord(id,data){
    return await api.put(host + '/data/catalog/' + id,data);
}
    //Изтриване на мебел/запис
export async function deleteRecord(id){
    return await api.del(host + '/data/catalog/'+id)
}    

