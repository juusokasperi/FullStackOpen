import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todo from './Todo';

describe('Todo test', () => {
	test('renders todo', () => {
		const todo = {
			text: 'Testing Todo Component',
			done: false
		};

		const mockHandler = vi.fn();

		render(<Todo todo={todo} deleteTodo={mockHandler} completeTodo={mockHandler}/>);
		const element = screen.getByText('Testing Todo Component');
		expect(element).toBeDefined();
	});

	test('clicking delete button calls handler once', async () => {
		const todo = {
			text: 'Testing Todo Component',
			done: false
		};

		const mockHandler = vi.fn();

		render(<Todo todo={todo} deleteTodo={mockHandler} completeTodo={mockHandler}/>);
		const user = userEvent.setup();
		const button = screen.getByText('Delete');
		await user.click(button);
		expect(mockHandler).toHaveBeenCalledTimes(1);
	});

	test('clicking set as done button calls handler once', async () => {
		const todo = {
			text: 'Testing Todo Component',
			done: false
		};

		const mockHandler = vi.fn();

		render(<Todo todo={todo} deleteTodo={mockHandler} completeTodo={mockHandler}/>);
		const user = userEvent.setup();
		const button = screen.getByText('Set as done');
		await user.click(button);
		expect(mockHandler).toHaveBeenCalledTimes(1);
	});
});
