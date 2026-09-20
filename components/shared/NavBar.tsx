import type { RefObject } from 'react';
import { BlitzLogo } from '../hero/BlitzLogo';

interface NavBarProps {
	logoRef: RefObject<HTMLDivElement | null>;
}

const navigationLinks = [
	{ label: 'About', href: '#department' },
	{ label: 'Events', href: '#events' },
	{ label: 'Gallery', href: '#gallery' },
	{ label: 'Achievements', href: '#achievements' },
];

export function NavBar({ logoRef }: NavBarProps) {
	return (
		<nav className="introduction-nav" aria-label="Primary navigation">
			<a className="nav-logo" href="#top" aria-label="BLITZ home">
				BLITZ
			</a>
			<div ref={logoRef} className="transition-logo" aria-label="BLITZ logo">
				<BlitzLogo />
			</div>
			<div className="nav-links">
				{navigationLinks.map((link) => (
					<a href={link.href} key={link.href}>
						{link.label}
					</a>
				))}
			</div>
		</nav>
	);
}
