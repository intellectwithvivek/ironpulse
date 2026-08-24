/**
 * The anti-flash theme script, as a plain server-safe string.
 *
 * VivekUI exports an identical `themeScript`, but it lives in the same
 * `'use client'` module as `ThemeProvider`. Under React Server Components every
 * export of a client module reaches the server as a client *reference* rather
 * than its value, so reading it inside `app/layout.tsx` would serialise a proxy
 * into the `<script>` instead of the code. Re-declaring it here — same storage
 * key, same attribute, same query as the library's defaults — keeps the layout a
 * Server Component.
 *
 * Keep `DEFAULT_THEME` in step with `ThemeProvider`'s `defaultTheme` prop, or the
 * first paint and the first render will disagree.
 */

const STORAGE_KEY = 'vk-theme'
const ATTRIBUTE = 'data-theme'
const DEFAULT_THEME = 'dark'

export const themeScript = `!function(){try{var s=localStorage.getItem("${STORAGE_KEY}"),t=s==="light"||s==="dark"||s==="system"?s:"${DEFAULT_THEME}",r=t==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):t,e=document.documentElement;e.setAttribute("${ATTRIBUTE}",r);e.style.colorScheme=r}catch(_){}}()`
