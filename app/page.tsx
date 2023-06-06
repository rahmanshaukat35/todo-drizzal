import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';

export default function Home() {
	return (
		<main className='bg-gradient-to-tr from-primary to-secondary h-screen flex justify-center items-center'>
			<div className='px-4 py-4 rounded-xl bg-white w-full max-w-md overflow-auto '>
				{/* @ts-ignore */}
				<TodoList />
				<AddTodo />
				<div className='w-1/2 h-1.5 bg-black/80 rounded mx-auto mt-6 '></div>
			</div>
		</main>
	);
}
