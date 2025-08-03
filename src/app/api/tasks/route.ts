// app/api/tasks/route.ts
import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  const client = await clientPromise
  const col = client.db('next-todo').collection('tasks')
  const tasks = await col.find({}).toArray()
  return NextResponse.json(tasks)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  if (!body.title) {
    return NextResponse.json({ error: 'title is required' }, { status: 400 })
  }
  const client = await clientPromise
  const col = client.db('next-todo').collection('tasks')
  const result = await col.insertOne({ title: body.title, done: false })
  const newTask = { _id: result.insertedId, title: body.title, done: false }
  return NextResponse.json(newTask, { status: 201 })
}