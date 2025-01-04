const Todo = ({ todo, deleteTodo, completeTodo }) => {
	const onClickDelete = () => {
		deleteTodo(todo);
	};
	const onClickComplete = () => {
		completeTodo(todo);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
			<div className="text">
				{todo.text}
			</div>
			{todo.done ? (
				<>
					<div>This todo is done</div>
					<div>
						<button onClick={onClickDelete}> Delete </button>
					</div>
				</>
			) : (
				<>
					<div>This todo is not done</div>
					<div>
						<button onClick={onClickDelete}> Delete </button>
						<button onClick={onClickComplete}> Set as done</button>
					</div>
				</>
			)}
		</div>
	);
};

export default Todo;
