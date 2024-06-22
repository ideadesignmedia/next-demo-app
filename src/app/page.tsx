'use client'

import { useMemo } from "react";
import { RequestProps, useRequest } from "./hooks/useRequest";
import Link from "next/link";

type Usernames = {
  id: number,
  name: string
}
function UserList({users}: {users: Usernames[]}) {
  return <>
    <h3>Users</h3>
    <div className="flex flex-col w-full gap-1 m-1 p-1 align-top justify-start">
      {users.map((user, index) => <div key={index} className="user-name-card">
        <Link href={`/users/${user.id}`}><span className="bold text-cyan-950">{user.name}</span></Link>
      </div>)}
    </div>
  </>
}
export default function Home() {
  const requestProps: RequestProps = useMemo(() => ({
    url: '/api'
  }), [])
  const {data: users, error, loading} = useRequest(requestProps)
  return (<div id="home" className="flex w-full flex-col align-top justify-start" style={{minHeight: '100%'}}>
    {loading ? <div className="flex flex-col w-full p-2 align-middle justify-center h-full">
      <h3>Loading Users</h3>
      <div className="spinner"></div>
    </div> : (error || !(users instanceof Array)) ? <div className="flex flex-col w-full p-2 align-middle justify-center h-full">
      {error ? <>
        <h3>An Error Occurred</h3>
        <span>{error}</span>
      </> : <>
        <h3>Failed to load user data</h3>
      </>}
    </div> : <UserList users={users}/>}
  </div>);
}
