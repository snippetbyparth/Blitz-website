import type { RefObject } from 'react';
import Link from 'next/link';
import { BlitzLogo } from '../hero/BlitzLogo';

interface NavBarProps {
	logoRef: RefObject<HTMLDivElement | null>;
	staticLogo?: boolean;
}

const navigationLinks = [
	{ label: 'About', href: '#about' },
	{ label: 'Events', href: '#events' },
	{ label: 'Gallery', href: '#gallery' },
	{ label: 'Achievements', href: '#achievements' },
];

export function NavBar({ logoRef, staticLogo = false }: NavBarProps) {
	return (
		<nav className="introduction-nav" aria-label="Primary navigation">
			<Link className="nav-logo" href="/" aria-label="BLITZ home">
				BLITZ
			</Link>
			<div
				ref={logoRef}
				className={`transition-logo${staticLogo ? ' transition-logo--static' : ''}`}
				aria-label="BLITZ logo"
			>
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
