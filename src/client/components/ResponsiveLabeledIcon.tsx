import {
	FC,
	ForwardRefExoticComponent,
	MouseEventHandler,
	ReactNode,
} from 'react';

import {
	IconButton,
	Tooltip,
} from '@mui/material';
import {
	Link,
	LinkOptions,
} from '@tanstack/router';
import { SvgIconComponent } from '@mui/icons-material';

interface ResponsiveLabeledIconProps {
	color?: 'default' | 'inherit' | 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning';
	icon: SvgIconComponent;
	title: ReactNode;
}

interface ResponsiveLabeledIconButtonProps extends ResponsiveLabeledIconProps {
	onClick: MouseEventHandler<HTMLButtonElement>;
}

interface ResponsiveLabeledIconLinkProps extends ResponsiveLabeledIconProps {
	to: string;
}

const ResponsiveLabeledIconButton: FC<ResponsiveLabeledIconButtonProps> = ({
	color = 'inherit',
	icon: Icon,
	onClick,
	title,
}) => (
	<IconButton
		color={color}
		onClick={onClick}
	>
		<Tooltip title={title}>
			<Icon />
		</Tooltip>
	</IconButton>
);

const ResponsiveLabeledIconLink: FC<ResponsiveLabeledIconLinkProps> = ({
	color = 'inherit',
	icon: Icon,
	title,
	to,
}) => (
	<IconButton
		color={color}
		component={Link as ForwardRefExoticComponent<LinkOptions>}
		to={to}
	>
		<Tooltip title={title}>
			<Icon />
		</Tooltip>
	</IconButton>
);

export {
	ResponsiveLabeledIconButton,
	ResponsiveLabeledIconLink,
};
