import { useEffect, useState } from "react";
import api from './api'

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    const fetchUsers = async () => {
      try{
        const res = await api.get('/api/users')
        setUsers(res.data)
      }catch(err) {
        console.error(err)
      }
    }
    fetchUsers()
  }, [])

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No user to display</p>
      )}
    </article>
  );
}

export default Users;
