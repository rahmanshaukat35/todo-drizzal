'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { NewTodo } from '@/lib/drizzle';
import { useRouter } from 'next/navigation';
const AddTodo = () => {
	const [task, setTask] = useState<NewTodo | null>(null);
	const { refresh } = useRouter();
	const handleSubmit = async () => {
		try {
			if (task) {
				const res = await fetch('/api/todo', {
					method: 'POST',
					body: JSON.stringify({ task: task.task }),
				});

				console.log(res.ok);
				refresh();
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div>
			<form className='w-full flex gap-x-3'>
				<input
					onChange={(e) => setTask({ task: e.target.value })}
					type='text'
					className='rounded-full w-full py-3.5 px-5 border focus:outline-secondary'
				/>
				<button type='button' className='shrink-0' onClick={handleSubmit}>
					<Image src={'/arrow.jpg'} width={40} height={40} alt='vector' />
				</button>
			</form>
		</div>
	);
};

export default AddTodo;
