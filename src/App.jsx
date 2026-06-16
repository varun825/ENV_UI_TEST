import { useState } from 'react'
import { ENV_GROUPS, rawEnv } from './envConfig'
import EnvGroup from './EnvGroup'
import RawEnvTable from './RawEnvTable'
import styles from './App.module.css'

// Count how many VITE_ vars are actually set
const totalVars  = ENV_GROUPS.reduce((acc, g) => acc + g.vars.length, 0)
const setVars    = ENV_GROUPS.reduce(
  (acc, g) => acc + g.vars.filter(v => v.value && v.value.trim() !== '').length,
  0
)
const mode = rawEnv.MODE ?? 'unknown'

export default function App() {
  const [search, setSearch] = useState('')

  const filtered = search.trim()
    ? ENV_GROUPS.map(g => ({
        ...g,
        vars: g.vars.filter(
          v =>
            v.key.toLowerCase().includes(search.toLowerCase()) ||
            v.label.toLowerCase().includes(search.toLowerCase()) ||
            v.value.toLowerCase().includes(search.toLowerCase())
        ),
      })).filter(g => g.vars.length > 0)
    : ENV_GROUPS

  return (
    <div className={styles.layout}>
      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <span className={styles.logoMark}>{'{ }'}</span>
          <span className={styles.logoText}>ENV Viewer</span>
        </div>

        <div className={styles.modeChip} data-mode={mode}>
          <span className={styles.dot} />
          {mode}
        </div>

        <nav className={styles.nav}>
          {ENV_GROUPS.map(g => {
            const filled = g.vars.filter(v => v.value).length
            return (
              <a key={g.id} href={`#${g.id}`} className={styles.navItem}>
                <span className={styles.navIcon}>{g.icon}</span>
                <span className={styles.navLabel}>{g.label}</span>
                <span className={`${styles.navBadge} ${styles[g.color]}`}>
                  {filled}/{g.vars.length}
                </span>
              </a>
            )
          })}
        </nav>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{setVars}</span>
            <span className={styles.statLabel}>vars set</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>{totalVars - setVars}</span>
            <span className={styles.statLabel}>missing</span>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className={styles.main}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Environment Variables</h1>
            <p className={styles.subtitle}>
              Loaded from <code>.env</code> via <code>import.meta.env</code> — {setVars} of {totalVars} configured
            </p>
          </div>

          <input
            className={styles.search}
            placeholder="Search variables…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </header>

        {/* Progress bar */}
        <div className={styles.progressWrap}>
          <div
            className={styles.progress}
            style={{ width: `${Math.round((setVars / totalVars) * 100)}%` }}
          />
        </div>

        {/* Groups */}
        <div className={styles.groups}>
          {filtered.length === 0 ? (
            <div className={styles.empty}>No variables match "{search}"</div>
          ) : (
            filtered.map(g => (
              <div key={g.id} id={g.id}>
                <EnvGroup group={g} />
              </div>
            ))
          )}
        </div>

        {/* Raw table collapsible */}
        <RawEnvTable />

        <footer className={styles.footer}>
          Variables are exposed at build time by Vite. Only keys prefixed with <code>VITE_</code> are visible in the browser.
        </footer>
      </main>
    </div>
  )
}