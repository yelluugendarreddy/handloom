import React from 'react'

export default function DashboardStat({ title, value, label, color = '#ff6600', icon }) {
  return (
    <div className="stat-card" style={{ borderTop: `5px solid ${color}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 48, height: 48, borderRadius: 10, background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>{icon}</div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{value}</div>
          <div style={{ color: '#6b7280', fontSize: 13 }}>{title}</div>
        </div>
      </div>
      {label && <div style={{ marginTop: 12, color: '#9ca3af', fontSize: 13 }}>{label}</div>}
    </div>
  )
}
