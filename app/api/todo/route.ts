import { NextRequest, NextResponse } from 'next/server';
import { db, todoTable } from '@/lib/drizzle';
import { sql } from '@vercel/postgres';

// GET method
export async function GET(request: NextRequest) {
	try {
		await sql`CREATE TABLE IF NOT EXISTS Todos(id serial, Task varchar(255));`;
		const res = await db.select().from(todoTable);

		return NextResponse.json({ data: res });
	} catch (err) {
		console.log((err as { message: string }).message);

		return NextResponse.json({ message: 'something went wrong' });
	}
}

// create method

export async function POST(request: NextRequest) {
	const req = await request.json();
	try {
		if (req.task) {
			const res = await db
				.insert(todoTable)
				.values({
					task: req.task,
				})
				.returning();
			console.log(res);

			return NextResponse.json({ Message: 'you added data', data: res });
		} else {
			throw new Error('task field is required');
		}
	} catch (error) {
		return NextResponse.json({
			message: (error as { message: string }).message,
		});
	}
}

// update method

// export async function PUT(request:NextRequest) {
// 	try {
// 		const reqBody = await request.json();

// 		if (!reqBody.id) throw new Error('ID field is required');

//         // assuming `db` and `todoTables` are defined in another module or file
// 		await db.update(todoTable).set({ task : reqBody.task }).whereEqual({ id: reqBody.id });

// 	    console.log(`Data with ID ${reqBody.id} has been updated successfully`);

// 	    return NextResponse.json({ Message: `Data with ID ${reqBody.id} was updated successfully.` });

//     } catch (error) {

//     	console.error(error);

//         return NextResponse.json({
//         	message: error.message || "An unknown error occurred.",
//     	});
//     }
// }
