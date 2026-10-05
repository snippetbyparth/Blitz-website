'use client';

import { useState } from 'react';
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
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const closeMenu = () => setIsMenuOpen(false);

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
			<button
				className={`nav-menu-toggle${isMenuOpen ? ' is-open' : ''}`}
				type="button"
				aria-expanded={isMenuOpen}
				aria-controls="primary-navigation-links"
				aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
				onClick={() => setIsMenuOpen((open) => !open)}
			>
				<span />
				<span />
				<span />
			</button>
			<div
				id="primary-navigation-links"
				className={`nav-links${isMenuOpen ? ' is-open' : ''}`}
			>
				{navigationLinks.map((link) => (
					<a href={link.href} key={link.href} onClick={closeMenu}>
						{link.label}
					</a>
				))}
			</div>
		</nav>
	);
}
