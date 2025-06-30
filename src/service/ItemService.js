import axios from "axios";  
export const addItems = async (items) => {           
    return await axios.post('http://localhost:8080/api/v1.0/admin/items', items, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
}   
export const deleteItem = async (itemId) => {
    return await axios.delete(`http://localhost:8080/api/v1.0/admin/items/${itemId}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
}
export const fetchItems = async () => {
    return await axios.get('http://localhost:8080/api/v1.0/items', { headers : { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });                       
}