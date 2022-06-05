import React, { useState } from 'react'
import data from "../../static.json"


function UsersList() {
    const {users} = data;
    const [userName, setUserName] = useState(1)

  return (
    <>
      <ul className="users items-list-nav">
        {users.map((u, i) => (
          <li key={u.id} className={i === userName ? "selected" : null}>
            <button className="btn" onClick={() => setUserName(i)}>
              {u.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default UsersList