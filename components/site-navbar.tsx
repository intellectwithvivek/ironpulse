'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge, Button, Navbar, ThemeToggle } from '@the_viveksingh/vivek-ui'
import { SITE, VIVEKUI, utm } from '@/data/site'
import { GitHubIcon } from './icons'

const LINKS = [
  { href: '/classes', label: 'Classes' },
  { href: '/trainers', label: 'Trainers' },
  { href: '/join', label: 'Membership' },
  { href: '/built-with', label: 'Built with' },
]

/**
 * Client-side only for `usePathname`, which is what marks the current
 * destination with `aria-current="page"`. Every link renders as a real
 * `next/link` through `asChild`, so client-side navigation and prefetching
 * still apply.
 */
export function SiteNavbar() {
  const pathname = usePathname()

  return (
    <Navbar sticky size="lg" container="xl">
      <Navbar.Brand asChild>
        <Link href="/" aria-label="IronPulse — home">
          <span
            className="ip-display"
            style={{ fontSize: 'var(--vk-text-xl)', letterSpacing: '0.04em' }}
          >
            Iron<span style={{ color: 'var(--vk-color-primary)' }}>Pulse</span>
          </span>
        </Link>
      </Navbar.Brand>

      <Navbar.Links>
        {LINKS.map((link) => (
          <Navbar.Link key={link.href} asChild active={pathname === link.href}>
            <Link href={link.href}>{link.label}</Link>
          </Navbar.Link>
        ))}
      </Navbar.Links>

      <Navbar.Actions>
        <a
          href={utm(VIVEKUI.docs, 'navbar')}
          target="_blank"
          rel="noopener noreferrer"
          className="ip-plain ip-nav-badge"
        >
          <Badge variant="soft" tone="primary" pill>
            ⚡ Built with VivekUI
          </Badge>
        </a>

        {/*
          The repo, reachable from every page at every width. This is a showcase
          template, so "where do I get this?" is the first thing a developer
          wants — it earns a permanent slot and is the one action that never
          collapses. The word "Source" hides on narrow bars; the `aria-label`
          carries the name either way, so it never becomes an unnamed icon.
        */}
        <Button asChild variant="ghost" size="sm" className="ip-nav-repo">
          <a
            href={SITE.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${SITE.repo} source on GitHub — clone or fork it`}
          >
            <GitHubIcon />
            <span className="ip-nav-repo__text">Source</span>
          </a>
        </Button>

        <ThemeToggle mode="toggle" variant="ghost" />

        <Button asChild size="sm" className="ip-nav-cta">
          <Link href="/join">Start free week</Link>
        </Button>
      </Navbar.Actions>

      <Navbar.Toggle />
    </Navbar>
  )
}
