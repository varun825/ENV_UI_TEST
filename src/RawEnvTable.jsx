import { useState } from 'react'
import { rawEnv } from './envConfig'
import styles from './RawEnvTable.module.css'

export default function RawEnvTable() {
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('')

  const entries = Object.entries(rawEnv).filter(([k]) =>
    k.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className={styles.wrap}>
      <button className={styles.toggle} onClick={() => setOpen(o => !o)}>
        <span className={styles.arrow}>{open ? '▾' : '▸'}</span>
        Raw <code>import.meta.env</code> — {Object.keys(rawEnv).length} keys
      </button>

      {open && (
        <div className={styles.panel}>
          <input
            className={styles.search}
            placeholder="Filter keys…"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(([k, v]) => (
                <tr key={k}>
                  <td className={styles.key}>{k}</td>
                  <td className={styles.val}>{String(v)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}