import { Todo } from '@/lib/drizzle';
import React from 'react';

const getData = async () => {
	try {
		console.log('Fetching data...');
		const res = await fetch('http://127.0.0.1:3000/api/todo', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		console.log('API Response:', res);

		if (!res.ok) {
			throw new Error('Failed to fetch the data');
		}

		const result = await res.json();

		console.log('Result:', result);

		return result;
	} catch (err) {
		console.error(err);
	}
};

const TodoList = async () => {
	const res: { data: Todo[] } = await getData();
	return (
		<>
			{res.data.map((item, i) => {
				return (
					<div className='b-gray-100 items-center gap-x-3 py-2 px-3 flex shadow rounded-lg my-5'>
						<div
							className='h-3 w-3 bg-secondary rounded-full
            '
						></div>
						<p className='text-lg font-medium ' key={i}>
							{item.task}
						</p>
					</div>
				);
			})}
		</>
	);
};

export default TodoList;
