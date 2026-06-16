import EnvRow from './EnvRow'
import styles from './EnvGroup.module.css'

export default function EnvGroup({ group }) {
  const filled = group.vars.filter(v => v.value && v.value.trim() !== '').length
  const total  = group.vars.length

  return (
    <div className={`${styles.card} ${styles[group.color]}`}>
      <div className={styles.header}>
        <div className={styles.left}>
          <span className={styles.icon}>{group.icon}</span>
          <span className={styles.label}>{group.label}</span>
        </div>
        <span className={styles.badge}>
          {filled}/{total} set
        </span>
      </div>

      <div className={styles.rows}>
        {group.vars.map(v => (
          <EnvRow
            key={v.key}
            label={v.label}
            envKey={v.key}
            value={v.value}
            sensitive={v.sensitive}
          />
        ))}
      </div>
    </div>
  )
}