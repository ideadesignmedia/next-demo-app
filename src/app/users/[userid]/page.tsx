'use client'

import { useMemo } from "react";
import { RequestProps, useRequest } from "../../hooks/useRequest";
import { User } from "../../../types/User";
import { usePathname } from "next/navigation";

function UserInfo({user}: {user: User}) {
    return <div className="user-info flex flex-col gap-1 pad-1 bg-slate-50">
        <img src={user.image}/>
        <h3>{user.name}</h3>
        <span><strong>Age:</strong> {user.age}</span>
        <span><strong>Friends:</strong> {user.friends.length}</span>
        <span><strong>Family Members:</strong> {user.family.length}</span>
        <span><strong>Bio:</strong> {user.bio}</span>
    </div>
}
export default function UserPage() {
    const path = usePathname()
    const id: number | null = useMemo(() => {
        const param = path
        const num = parseInt(path.split('/').pop() || 'NaN')
        if (isNaN(num)) return null
        return num
    }, [path])
    const queryParams: RequestProps = useMemo(() => ({
        url: `/api/users/${id}`,
        shouldFetch: typeof id === 'number',
        deload: true
    }), [id])
    const {data, error, loading} = useRequest(queryParams)
    return (<div id="user" className="flex w-full flex-col align-top justify-start">
         {loading ? <div className="flex flex-col w-full p-2 align-middle justify-center h-full">
      <h3>Loading Users</h3>
      <div className="spinner"></div>
    </div> : (error || !data) ? <div className="flex flex-col w-full p-2 align-middle justify-center h-full">
      {error ? <>
        <h3>An Error Occurred</h3>
        <span>{error}</span>
      </> : <>
        <h3>Failed to load user data</h3>
      </>}
    </div> : <UserInfo user={data}/>}
    </div>);
}
