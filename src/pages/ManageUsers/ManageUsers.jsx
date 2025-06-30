import './ManageUsers.css';
import UserForm from '../../components/userForm/Userform';
import UserList from '../../components/userList/UserList';
import { use, useEffect } from 'react';
import { Await } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchUsers } from '../../service/UserService';
import { useState } from 'react';
const ManageUsers=()=>
{
    const[users, setUsers]=useState([]);
    const [loading, setLoading] = useState(false);
useEffect(() => { 
    async function loadUsers() {
        try{
        setLoading(true);
        const response =await fetchUsers();
        setUsers(response.data);
        }catch(error){
            console.error("Error fetching users:", error);  
toast.error("Failed to fetch users, please try again later");
        }
finally {
            setLoading(false);
        }
        }  
        loadUsers() ;
},[]);

    return(
 <div className="users-container text-light">
<div className="left-column">
<UserForm setUsers={setUsers}/>
</div>
<div className="right-column">
    <UserList users={users} setUsers={setUsers}/>
</div>

      </div>

    )
}
export default ManageUsers;