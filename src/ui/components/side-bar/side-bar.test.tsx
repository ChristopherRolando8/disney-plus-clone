import { act, render, screen, waitFor } from '@testing-library/react';
import Sidebar from './side-bar';
import { Menus } from '@/constants/menu';
import userEvent from '@testing-library/user-event';

describe('Side Bar', () => {
	describe('View', () => {
		it('should render the base component as <nav/>', () => {
			render(<Sidebar menus={Menus} />);

			const sidebar = screen.getByRole('navigation');

			expect(sidebar).toBeInTheDocument();
		});

		it('should render correct side-bar-buttons from menu props', () => {
			render(<Sidebar menus={Menus} />);

			Menus.forEach((menu) => {
				const sidebarButton = screen.getByTestId(
					`${menu.title}-sidebar-button`,
				);

				expect(sidebarButton).toBeInTheDocument();
			});
		});

		it('should not expand the side-bar-buttons by default when not hovered', () => {
			render(<Sidebar menus={Menus} />);

			Menus.forEach((menu) => {
				const title = screen.getByText(menu.title);
				expect(title).toHaveClass('font-h5 notExpanded');
			});
		});

		it('should render a brand icon as a link to go back to home page', () => {
			render(<Sidebar menus={Menus} />);

			const homeLink = screen.getByAltText('Disney Hotstar');

			expect(homeLink).toBeInTheDocument();
		});
	});

	describe('Interaction & Logic', () => {
		it('should expand the side-bar-buttons when hovered', async () => {
			const user = userEvent.setup();

			render(<Sidebar menus={Menus} />);

			Menus.forEach((menu) => {
				const title = screen.getByText(menu.title);
				expect(title).toHaveClass('font-h5 notExpanded');
			});

			const sidebar = screen.getByRole('navigation');

			act(() => {
				user.hover(sidebar);
			});

			await waitFor(
				() => {
					Menus.forEach((menu) => {
						const title = screen.getByText(menu.title);
						expect(title).toHaveClass('title font-h5 expanded');
					});
				},
				{ timeout: 8000 },
			);
		});

		it('should de-expand the side-bar-buttons when unhovered after hovering in the first place', async () => {
			const user = userEvent.setup();

			render(<Sidebar menus={Menus} />);

			Menus.forEach((menu) => {
				const title = screen.getByText(menu.title);
				expect(title).toHaveClass('font-h5 notExpanded');
			});

			const sidebar = screen.getByRole('navigation');

			act(() => {
				user.hover(sidebar);
			});

			await waitFor(
				() => {
					Menus.forEach((menu) => {
						const title = screen.getByText(menu.title);
						expect(title).toHaveClass('title font-h5 expanded');
					});
				},
				{ timeout: 8000 },
			);

			act(() => {
				user.unhover(sidebar);
			});

			await waitFor(
				() => {
					Menus.forEach((menu) => {
						const title = screen.getByText(menu.title);
						expect(title).toHaveClass('title font-h5 notExpanded');
					});
				},
				{ timeout: 8000 },
			);
		});
	});
});
