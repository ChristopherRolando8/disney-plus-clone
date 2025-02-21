import SidebarButton from './side-bar-button';
import { render, screen } from '@testing-library/react';
import { Icon } from '@/constants/icon';

describe('Side Bar Button', () => {
	describe('View', () => {
		it('should render the icon by default', () => {
			render(<SidebarButton icon={Icon.Home} title="Home" url="/" />);

			const icon = screen.getByAltText(`Go to Home`);

			expect(icon).toBeInTheDocument();
		});

		it('should not render the title by default', () => {
			render(<SidebarButton icon={Icon.Home} title="Home" url="/" />);

			const title = screen.getByText('Home');

			expect(title).toHaveClass('font-h5 notExpanded');
		});

		it('should render the title if expanded is set to true', () => {
			render(<SidebarButton icon={Icon.Home} title="Home" url="/" expanded />);

			const title = screen.getByText('Home');

			expect(title).toHaveClass('font-h5 expanded');
		});
	});
});
