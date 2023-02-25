
import axios from 'axios'
// Create instance called instance
const instance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('token')
    },
});
export default {
    getData: (id) =>
        instance({
            'method': 'GET',
            'url': `/user/item/list-item?id=${id}`,
            // 'params': {
            //     'search':'parameter',
            // },
        }),
    postData: (data) =>
        instance({
            'method': 'POST',
            'url': '/user/item/add-item',
            'data': data

        }),
    deleteData: (id) =>
        instance({
            'method': 'DELETE',
            'url': `/user/item/delete-item?id=${id}`,
            // 'params': {
            //     'search':'parameter',

        }),
    editData: (id,data) =>
        instance({
            'method': 'PUT',
            'url': `/user/item/update-item?id=${id}`,
            'data':data
            // 'params': {
            //     'search':'parameter',

        })
}