import Head from "next/head";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUserInfos } from "redux_/slices/userSlice";

export default function Home() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const users = useSelector(selectUserInfos);
  const addUserToStore = () => {
    const user = {
      name: name,
    };
    dispatch(login(user));
  };
  const deleteUserToStore = () => {
    const user = {
      name: name,
    };
    dispatch(logout(user));
  };
  // for local storage redux state
  useEffect(() => {
    const data_ = localStorage.getItem("user-state");
    if (data_) {
      const data__ = JSON.parse(data_);
      for (let index = 0; index < data__.length; index++) {
        dispatch(login(data__[index]));
      }
    }
    console.log("this ", JSON.parse(data_));
  }, []);
  useEffect(() => {
    localStorage.setItem("user-state", JSON.stringify(users));
  }, [users]);
  return (
    <div className="grid grid-cols-2 gap-2">
      <Head>
        <title>Create Next App</title>
      </Head>
      <div className="flex flex-col space-y-3 items-start justify-start">
        <input
          type="text"
          value={name}
          className="p-4 border-2 border-blue-300 text-base bg-transparent"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name"
        />
        <button onClick={addUserToStore}>Add User</button>
        {users.some(function (user_) {
          return user_.name === name;
        }) ? (
          <button onClick={deleteUserToStore}>Delete User</button>
        ) : null}
      </div>
      <div className="flex flex-col justify-start items-center p-4">
        {users?.map((user, index) => (
          <h1 className="mb-3" key={index}>
            {user.name}
          </h1>
        ))}
      </div>
    </div>
  );
}
