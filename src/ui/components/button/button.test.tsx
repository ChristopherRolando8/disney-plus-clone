import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './button';

describe('Button', () => {
	describe('View', () => {
		it('should render label based on children', () => {
			render(<Button>This is button label</Button>);

			const button = screen.getByRole('button', {
				name: /this is button label/i,
			});

			expect(button).toBeInTheDocument();
		});

		it('should NOT render label if loading props is true', () => {
			render(<Button loading>This is button label</Button>);

			const buttonLabel = screen.queryByText(/this is button label/i);

			expect(buttonLabel).not.toBeInTheDocument();
		});

		it('should render progressbar if loading props is true', () => {
			render(<Button loading>This is button label</Button>);

			const progressBar = screen.getByRole('progressbar');

			expect(progressBar).toBeInTheDocument();
		});
	});

	describe('Interaction & Logic', () => {
		it('should trigger onClick function, and button is clicked', async () => {
			const user = userEvent.setup();
			const onClick = jest.fn();

			render(<Button onClick={onClick}>This is button label</Button>);

			const button = screen.getByRole('button', {
				name: /this is button label/i,
			});

			await user.click(button);

			expect(onClick).toHaveBeenCalledTimes(1);
		});

		it('should NOT trigger onClick function, when button is disabled', async () => {
			const user = userEvent.setup();
			const onClick = jest.fn();

			render(
				<Button onClick={onClick} disabled>
					Disabled
				</Button>,
			);

			const button = screen.getByRole('button');

			await user.click(button);

			expect(onClick).toHaveBeenCalledTimes(0);
		});

		it('should NOT trigger onClick function, when button is loading', async () => {
			const user = userEvent.setup();
			const onClick = jest.fn();

			render(
				<Button onClick={onClick} loading>
					Loading
				</Button>,
			);

			const button = screen.getByRole('button');

			await user.click(button);

			expect(onClick).toHaveBeenCalledTimes(0);
		});
	});
});
