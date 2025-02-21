import React from 'react';

export interface ButtonProps {
	children: React.ReactNode;
	loading?: boolean;
	disabled?: boolean;
	className?: string;
	fullWidth?: boolean;
	onClick?: (e: React.FormEvent) => void;
}
