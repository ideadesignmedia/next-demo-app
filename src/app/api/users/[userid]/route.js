import { NextResponse } from "next/server"
import {users} from '../../../../users'
export async function GET(req) {
  const user = users.find(a => a.id === parseInt(req.url.split('/').pop()))
  if (!user) return NextResponse.status(500).json({error: true, message: 'No data found for user'})
  return NextResponse.json(user)
}