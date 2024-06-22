import { NextResponse } from "next/server"
import {users} from '../../users'
export async function GET(req) {
  return NextResponse.json(users.map(user => {
    return {
        id: user.id,
        name: user.name
    }
  }))
}