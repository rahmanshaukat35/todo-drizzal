import { db } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const client = await db.connect();
	try {
		await client.sql`CREATE TABLE IF NOT EXISTS Todos(id serial, Task varchar(255));`;
		const res = await client.sql`SELECT * FROM Todos`;
		console.log(res.rows.find((item) => item.id === 1));

		return NextResponse.json({ data: res });
	} catch (err) {
		console.log(err);

		return NextResponse.json({ message: 'something went wrong' });
	}
}

export async function POST(request: NextRequest) {
	const client = await db.connect();
	const req = await request.json();
	try {
		if (req.task) {
			const res =
				await client.sql`INSERT INTO Todos (Task) VALUES (${req.task});`;
			console.log(res);

			return NextResponse.json({ Message: 'you added data' });
		} else {
			throw new Error('task field is required');
		}
	} catch (error) {
		return NextResponse.json({
			message: (error as { message: string }).message,
		});
	}
}
