import { useState } from 'react'
import styles from './EnvRow.module.css'

export default function EnvRow({ label, envKey, value, sensitive = false }) {
  const [revealed, setRevealed]   = useState(false)
  const [copied,   setCopied]     = useState(false)

  const isEmpty = !value || value.trim() === ''
  const display = sensitive && !revealed
    ? '•'.repeat(Math.min(value.length || 12, 24))
    : (isEmpty ? '—' : value)

  const handleCopy = async () => {
    if (isEmpty) return
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className={`${styles.row} ${isEmpty ? styles.empty : ''}`}>
      <div className={styles.meta}>
        <span className={styles.label}>{label}</span>
        <span className={styles.key}>{envKey}</span>
      </div>

      <div className={styles.valueWrap}>
        <span className={`${styles.value} ${sensitive && !revealed ? styles.hidden : ''}`}>
          {display}
        </span>

        <div className={styles.actions}>
          {sensitive && !isEmpty && (
            <button
              className={styles.btn}
              onClick={() => setRevealed(r => !r)}
              title={revealed ? 'Hide' : 'Reveal'}
            >
              {revealed ? '🙈' : '👁'}
            </button>
          )}
          <button
            className={`${styles.btn} ${copied ? styles.copied : ''}`}
            onClick={handleCopy}
            disabled={isEmpty}
            title="Copy value"
          >
            {copied ? '✓' : '⎘'}
          </button>
        </div>
      </div>
    </div>
  )
}