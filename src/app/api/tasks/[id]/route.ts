// app/api/tasks/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'

type Ctx = { params: { id: string } }

export async function GET(_: NextRequest, { params }: Ctx) {
  const client = await clientPromise
  const col = client.db('next-todo').collection('tasks')
  const task = await col.findOne({ _id: new ObjectId(params.id) })
  if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 })
  return NextResponse.json(task)
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const body = await req.json()
  const client = await clientPromise
  const col = client.db('next-todo').collection('tasks')
  const result = await col.updateOne(
    { _id: new ObjectId(params.id) },
    { $set: body }
  )
  if (result.matchedCount === 0) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 })
  }
  const updated = await col.findOne({ _id: new ObjectId(params.id) })
  return NextResponse.json(updated)
}

export async function DELETE(_: NextRequest, { params }: Ctx) {
  const client = await clientPromise
  const col = client.db('next-todo').collection('tasks')
  const result = await col.deleteOne({ _id: new ObjectId(params.id) })
  if (result.deletedCount === 0) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 })
  }
  return NextResponse.json({ deleted: params.id })
}