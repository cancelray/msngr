import type React from 'react';
import type { ReactNode } from 'react';

export interface DropdownMenuProps {
	children: ReactNode;
	ref: React.Ref<HTMLDivElement>;
	className?: string;
}
