import { NextResponse } from 'next/server';

// import {db} from '@vercel/postgres'
export function GET(request: Request) {
	return NextResponse.json({ Message: 'you called this api' });
}
