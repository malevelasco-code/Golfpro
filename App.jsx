import { useState, useEffect, useRef } from "react";

// ─── DESIGN SYSTEM ───────────────────────────────────────────────────────────
const COLORS = {
  bg: "#0a0f0d",
  surface: "#111a14",
  card: "#16231a",
  border: "#1e3325",
  green: "#2ecc71",
  greenDark: "#27ae60",
  greenGlow: "#1a5c35",
  gold: "#f0c040",
  goldDark: "#c9a227",
  red: "#e74c3c",
  blue: "#3498db",
  text: "#e8f5e9",
  muted: "#6b8f72",
  white: "#ffffff",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${COLORS.bg};
    color: ${COLORS.text};
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.greenGlow}; border-radius: 2px; }

  .app-shell {
    display: flex;
    min-height: 100vh;
  }

  /* SIDEBAR */
  .sidebar {
    width: 240px;
    min-height: 100vh;
    background: ${COLORS.surface};
    border-right: 1px solid ${COLORS.border};
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0; left: 0;
    z-index: 100;
  }

  .sidebar-logo {
    padding: 28px 24px 20px;
    border-bottom: 1px solid ${COLORS.border};
  }

  .sidebar-logo h1 {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 900;
    color: ${COLORS.green};
    letter-spacing: -0.5px;
    line-height: 1.1;
  }

  .sidebar-logo span {
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 500;
    color: ${COLORS.muted};
    letter-spacing: 3px;
    text-transform: uppercase;
    display: block;
    margin-top: 4px;
  }

  .sidebar-nav {
    padding: 16px 12px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .nav-section-label {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${COLORS.muted};
    padding: 12px 12px 4px;
    margin-top: 8px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s;
    font-size: 13.5px;
    font-weight: 400;
    color: ${COLORS.muted};
    border: none;
    background: none;
    width: 100%;
    text-align: left;
  }

  .nav-item:hover { background: ${COLORS.card}; color: ${COLORS.text}; }
  .nav-item.active {
    background: ${COLORS.greenGlow};
    color: ${COLORS.green};
    font-weight: 600;
  }

  .nav-icon { font-size: 16px; width: 20px; text-align: center; }

  .sidebar-footer {
    padding: 16px 24px;
    border-top: 1px solid ${COLORS.border};
  }

  .sidebar-status {
    display: flex; align-items: center; gap: 8px;
    font-size: 11px; color: ${COLORS.muted};
  }

  .status-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: ${COLORS.green};
    box-shadow: 0 0 8px ${COLORS.green};
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  /* MAIN */
  .main {
    margin-left: 240px;
    flex: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .topbar {
    height: 60px;
    background: ${COLORS.surface};
    border-bottom: 1px solid ${COLORS.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .topbar-title {
    font-size: 15px;
    font-weight: 600;
    color: ${COLORS.text};
  }

  .topbar-right { display: flex; align-items: center; gap: 12px; }

  .badge {
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .badge-green { background: ${COLORS.greenGlow}; color: ${COLORS.green}; }
  .badge-gold { background: #3a2e00; color: ${COLORS.gold}; }
  .badge-red { background: #3a0e0e; color: ${COLORS.red}; }
  .badge-blue { background: #0e2a3a; color: ${COLORS.blue}; }

  .page { padding: 32px; flex: 1; }

  /* CARDS */
  .card {
    background: ${COLORS.card};
    border: 1px solid ${COLORS.border};
    border-radius: 12px;
    padding: 24px;
  }

  .card-sm { padding: 16px; }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .card-title {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 700;
    color: ${COLORS.text};
  }

  .card-subtitle {
    font-size: 12px;
    color: ${COLORS.muted};
    margin-top: 2px;
  }

  /* GRID */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }

  /* STAT CARDS */
  .stat-card {
    background: ${COLORS.card};
    border: 1px solid ${COLORS.border};
    border-radius: 12px;
    padding: 20px;
    position: relative;
    overflow: hidden;
  }

  .stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--accent, ${COLORS.green});
  }

  .stat-value {
    font-family: 'JetBrains Mono', monospace;
    font-size: 32px;
    font-weight: 600;
    color: var(--accent, ${COLORS.green});
    line-height: 1;
    margin-bottom: 6px;
  }

  .stat-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: ${COLORS.muted};
  }

  .stat-icon {
    position: absolute;
    top: 16px; right: 16px;
    font-size: 24px;
    opacity: 0.3;
  }

  /* BUTTONS */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 9px 18px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
    border: none;
    font-family: 'DM Sans', sans-serif;
  }

  .btn-primary {
    background: ${COLORS.green};
    color: #000;
  }
  .btn-primary:hover { background: ${COLORS.greenDark}; transform: translateY(-1px); }

  .btn-outline {
    background: transparent;
    color: ${COLORS.green};
    border: 1px solid ${COLORS.border};
  }
  .btn-outline:hover { border-color: ${COLORS.green}; background: ${COLORS.greenGlow}; }

  .btn-ghost {
    background: transparent;
    color: ${COLORS.muted};
    border: none;
  }
  .btn-ghost:hover { color: ${COLORS.text}; }

  .btn-gold {
    background: ${COLORS.gold};
    color: #000;
  }
  .btn-gold:hover { background: ${COLORS.goldDark}; }

  .btn-sm { padding: 5px 12px; font-size: 12px; }
  .btn-danger { background: ${COLORS.red}; color: #fff; }

  /* TABLE */
  .table-wrap { overflow-x: auto; }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }

  th {
    text-align: left;
    padding: 10px 14px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: ${COLORS.muted};
    border-bottom: 1px solid ${COLORS.border};
  }

  td {
    padding: 12px 14px;
    border-bottom: 1px solid ${COLORS.border}10;
    color: ${COLORS.text};
  }

  tr:hover td { background: ${COLORS.surface}; }

  /* FORM */
  .form-group { margin-bottom: 16px; }

  label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${COLORS.muted};
    margin-bottom: 6px;
  }

  input, select, textarea {
    width: 100%;
    background: ${COLORS.surface};
    border: 1px solid ${COLORS.border};
    border-radius: 8px;
    padding: 10px 14px;
    color: ${COLORS.text};
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.15s;
    outline: none;
  }

  input:focus, select:focus, textarea:focus {
    border-color: ${COLORS.green};
    box-shadow: 0 0 0 3px ${COLORS.greenGlow}40;
  }

  select option { background: ${COLORS.surface}; }

  /* LEADERBOARD */
  .lb-row {
    display: flex;
    align-items: center;
    padding: 14px 18px;
    border-bottom: 1px solid ${COLORS.border}30;
    gap: 16px;
    transition: background 0.1s;
    border-radius: 8px;
  }
  .lb-row:hover { background: ${COLORS.surface}; }

  .lb-pos {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 600;
    width: 28px;
    text-align: center;
    color: ${COLORS.muted};
  }

  .lb-pos.top1 { color: ${COLORS.gold}; font-size: 16px; }
  .lb-pos.top2 { color: #c0c0c0; }
  .lb-pos.top3 { color: #cd7f32; }

  .lb-name {
    flex: 1;
    font-weight: 500;
    font-size: 14px;
  }

  .lb-club { font-size: 11px; color: ${COLORS.muted}; }

  .lb-score {
    font-family: 'JetBrains Mono', monospace;
    font-size: 15px;
    font-weight: 600;
    min-width: 50px;
    text-align: right;
  }

  .score-under { color: ${COLORS.green}; }
  .score-over { color: ${COLORS.red}; }
  .score-even { color: ${COLORS.text}; }

  /* TEE TIMES */
  .tee-group {
    background: ${COLORS.surface};
    border: 1px solid ${COLORS.border};
    border-radius: 10px;
    padding: 16px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 16px;
    transition: all 0.15s;
  }

  .tee-group:hover { border-color: ${COLORS.green}30; }

  .tee-time {
    font-family: 'JetBrains Mono', monospace;
    font-size: 16px;
    font-weight: 600;
    color: ${COLORS.green};
    min-width: 70px;
  }

  .tee-hole {
    font-size: 11px;
    color: ${COLORS.muted};
    background: ${COLORS.card};
    padding: 3px 8px;
    border-radius: 4px;
    min-width: 40px;
    text-align: center;
  }

  .tee-players {
    flex: 1;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .player-chip {
    background: ${COLORS.card};
    border: 1px solid ${COLORS.border};
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 12px;
    font-weight: 500;
    color: ${COLORS.text};
  }

  .player-chip .hcp {
    color: ${COLORS.muted};
    font-size: 10px;
    margin-left: 4px;
  }

  /* SCORECARD */
  .scorecard {
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid ${COLORS.border};
  }

  .sc-header {
    background: ${COLORS.green};
    color: #000;
    padding: 12px 16px;
    font-weight: 700;
    font-size: 13px;
    display: grid;
    grid-template-columns: 40px repeat(9, 1fr) 60px;
    text-align: center;
  }

  .sc-row {
    display: grid;
    grid-template-columns: 40px repeat(9, 1fr) 60px;
    text-align: center;
    border-bottom: 1px solid ${COLORS.border}50;
  }

  .sc-cell {
    padding: 10px 4px;
    font-size: 12px;
    font-family: 'JetBrains Mono', monospace;
    border-right: 1px solid ${COLORS.border}30;
  }

  .sc-label {
    background: ${COLORS.surface};
    color: ${COLORS.muted};
    font-size: 10px;
    font-weight: 600;
    padding: 8px 4px;
  }

  .sc-par { color: ${COLORS.muted}; font-size: 11px; }
  .sc-birdie { background: ${COLORS.green}20; color: ${COLORS.green}; border-radius: 2px; }
  .sc-bogey { background: ${COLORS.red}15; color: ${COLORS.red}; }
  .sc-eagle { background: ${COLORS.gold}20; color: ${COLORS.gold}; }

  /* MODAL */
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.7);
    z-index: 1000;
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(4px);
  }

  .modal {
    background: ${COLORS.card};
    border: 1px solid ${COLORS.border};
    border-radius: 16px;
    padding: 32px;
    width: 500px;
    max-width: 95vw;
    max-height: 90vh;
    overflow-y: auto;
    animation: modalIn 0.2s ease;
  }

  @keyframes modalIn {
    from { opacity: 0; transform: scale(0.96) translateY(8px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  .modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 24px;
    color: ${COLORS.text};
  }

  /* DIVIDER */
  .divider {
    height: 1px;
    background: ${COLORS.border};
    margin: 24px 0;
  }

  /* TAG */
  .tag {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    background: ${COLORS.greenGlow};
    color: ${COLORS.green};
  }

  /* PROGRESS */
  .progress-bar {
    height: 6px;
    background: ${COLORS.border};
    border-radius: 3px;
    overflow: hidden;
    margin-top: 8px;
  }

  .progress-fill {
    height: 100%;
    background: ${COLORS.green};
    border-radius: 3px;
    transition: width 0.5s ease;
  }

  /* NOTIFICATION */
  .notif {
    position: fixed;
    top: 20px; right: 20px;
    background: ${COLORS.card};
    border: 1px solid ${COLORS.green};
    border-radius: 10px;
    padding: 14px 20px;
    font-size: 13px;
    font-weight: 500;
    color: ${COLORS.text};
    z-index: 2000;
    animation: slideIn 0.3s ease;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }

  /* MISC */
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .gap-2 { gap: 8px; }
  .gap-3 { gap: 12px; }
  .gap-4 { gap: 16px; }
  .mb-2 { margin-bottom: 8px; }
  .mb-3 { margin-bottom: 12px; }
  .mb-4 { margin-bottom: 16px; }
  .mb-6 { margin-bottom: 24px; }
  .mt-2 { margin-top: 8px; }
  .mt-4 { margin-top: 16px; }
  .text-muted { color: ${COLORS.muted}; font-size: 12px; }
  .text-green { color: ${COLORS.green}; }
  .text-gold { color: ${COLORS.gold}; }
  .text-red { color: ${COLORS.red}; }
  .font-mono { font-family: 'JetBrains Mono', monospace; }
  .font-serif { font-family: 'Playfair Display', serif; }
  .full-width { width: 100%; }
  .text-right { text-align: right; }
  .text-center { text-align: center; }
`;

// ─── DATA ────────────────────────────────────────────────────────────────────
const PLAYERS = [
  { id: 1, name: "Carlos Mendoza", hcp: 8.4, cat: "A", club: "San Isidro GC", checkin: true, scores: [4,3,5,4,4,3,5,4,4] },
  { id: 2, name: "Roberto Silva", hcp: 12.1, cat: "B", club: "Olivos GC", checkin: true, scores: [5,4,4,5,3,4,6,3,5] },
  { id: 3, name: "María García", hcp: 18.0, cat: "C", club: "Hindu CC", checkin: false, scores: [6,4,5,5,4,5,5,4,6] },
  { id: 4, name: "James Wilson", hcp: 4.2, cat: "A", club: "Ranelagh GC", checkin: true, scores: [4,3,4,4,3,3,4,3,4] },
  { id: 5, name: "Laura Chen", hcp: 15.6, cat: "B", club: "San Isidro GC", checkin: true, scores: [5,4,5,4,4,4,5,4,5] },
  { id: 6, name: "Diego Torres", hcp: 6.8, cat: "A", club: "GEBA", checkin: false, scores: [4,4,5,4,3,4,5,3,4] },
  { id: 7, name: "Ana Rodríguez", hcp: 22.3, cat: "C", club: "Olivos GC", checkin: true, scores: [6,5,6,5,5,5,6,5,6] },
  { id: 8, name: "Michael Brown", hcp: 9.9, cat: "A", club: "GEBA", checkin: true, scores: [5,4,5,4,4,4,5,4,5] },
];

const COURSE = {
  name: "San Isidro Golf Club",
  holes: 9,
  par: [4,3,5,4,4,3,5,4,4],
  si:  [5,9,1,7,3,8,2,6,4],
  tees: { ladies: [68,72], mens: [71,130], pros: [73,145] }
};

const PAR_TOTAL = COURSE.par.reduce((a,b)=>a+b,0);

function calcStableford(scores, par, hcp) {
  const strokes = Math.round(hcp * (COURSE.holes / 18));
  const pts = scores.map((s, i) => {
    const si = COURSE.si[i];
    const extraStrokes = si <= strokes ? 1 : 0;
    const netScore = s - extraStrokes;
    const diff = par[i] - netScore;
    return Math.max(0, diff + 2);
  });
  return pts.reduce((a,b)=>a+b,0);
}

function calcResults(players) {
  return players.map(p => {
    const bruto = p.scores.reduce((a,b)=>a+b,0);
    const strokesHcp = Math.round(p.hcp * (COURSE.holes / 18));
    const neto = bruto - strokesHcp;
    const stableford = calcStableford(p.scores, COURSE.par, p.hcp);
    const toPar = bruto - PAR_TOTAL;
    return { ...p, bruto, neto, stableford, toPar, strokesHcp };
  }).sort((a,b) => a.neto - b.neto);
}

const TEE_GROUPS = [
  { time: "07:00", tee: "1", players: [PLAYERS[0], PLAYERS[1], PLAYERS[2]] },
  { time: "07:08", tee: "1", players: [PLAYERS[3], PLAYERS[4]] },
  { time: "07:16", tee: "10", players: [PLAYERS[5], PLAYERS[6], PLAYERS[7]] },
  { time: "07:24", tee: "10", players: [PLAYERS[1], PLAYERS[4]] },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Notif({ msg, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, []);
  return <div className="notif">✅ {msg}</div>;
}

// DASHBOARD
function Dashboard({ setPage, notif }) {
  const results = calcResults(PLAYERS);
  const leader = results[0];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif" style={{ fontSize: 28, fontWeight: 900, color: COLORS.text }}>
            Torneo Primavera 2025
          </h2>
          <p className="text-muted mt-2">San Isidro Golf Club · Stroke Play + Stableford · 18 hoyos</p>
        </div>
        <div className="flex gap-2">
          <span className="badge badge-green">🟢 En Curso</span>
          <span className="badge badge-gold">⛳ Ronda 1</span>
        </div>
      </div>

      {/* STATS */}
      <div className="grid-4 mb-6">
        {[
          { val: "8", label: "Jugadores", icon: "👤", accent: COLORS.green },
          { val: "3", label: "Grupos Activos", icon: "⛳", accent: COLORS.gold },
          { val: "6", label: "Check-in", icon: "✅", accent: COLORS.blue },
          { val: "9", label: "Hoyos", icon: "🏌️", accent: COLORS.red },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{"--accent": s.accent}}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.val}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid-2 mb-6">
        {/* LEADERBOARD MINI */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">🏆 Leaderboard</div>
              <div className="card-subtitle">Score Neto · Top 5</div>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => setPage("leaderboard")}>Ver todo</button>
          </div>
          {results.slice(0, 5).map((p, i) => (
            <div key={p.id} className="lb-row">
              <div className={`lb-pos ${i===0?"top1":i===1?"top2":i===2?"top3":""}`}>
                {i===0?"🥇":i===1?"🥈":i===2?"🥉":i+1}
              </div>
              <div style={{ flex: 1 }}>
                <div className="lb-name">{p.name}</div>
                <div className="lb-club">{p.club} · HCP {p.hcp}</div>
              </div>
              <div className={`lb-score ${p.toPar<0?"score-under":p.toPar>0?"score-over":"score-even"}`}>
                {p.toPar===0?"E":p.toPar>0?`+${p.toPar}`:p.toPar}
              </div>
              <div style={{ fontSize: 12, color: COLORS.muted, minWidth: 50, textAlign: "right" }}>
                {p.neto} neto
              </div>
            </div>
          ))}
        </div>

        {/* SALIDAS */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">⏰ Próximas Salidas</div>
              <div className="card-subtitle">Horarios del día</div>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => setPage("teetimes")}>Gestionar</button>
          </div>
          {TEE_GROUPS.map((g, i) => (
            <div key={i} className="tee-group">
              <div className="tee-time">{g.time}</div>
              <div className="tee-hole">Tee {g.tee}</div>
              <div className="tee-players">
                {g.players.map(pl => (
                  <div key={pl.id} className="player-chip">
                    {pl.name.split(" ")[0]}
                    <span className="hcp">HCP {pl.hcp}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHECK-IN + PROGRESS */}
      <div className="grid-2">
        <div className="card">
          <div className="card-title mb-4">✅ Estado Check-in</div>
          {PLAYERS.map(p => (
            <div key={p.id} className="flex items-center justify-between mb-2" style={{ fontSize: 13 }}>
              <div>{p.name}</div>
              <span className={`badge ${p.checkin ? "badge-green" : "badge-red"}`}>
                {p.checkin ? "✅ Presente" : "⏳ Pendiente"}
              </span>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-title mb-4">📊 Progreso del Torneo</div>
          <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 16 }}>
            75% de grupos han completado 5+ hoyos
          </div>
          {TEE_GROUPS.map((g, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between text-muted">
                <span>Grupo {g.time} — Tee {g.tee}</span>
                <span>{[7, 5, 4, 3][i]}/9 hoyos</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${[77, 55, 44, 33][i]}%` }} />
              </div>
            </div>
          ))}
          <div className="divider" />
          <div className="flex justify-between" style={{ fontSize: 13 }}>
            <span className="text-muted">Líder actual</span>
            <span className="text-green font-mono">{leader.name} — {leader.toPar === 0 ? "E" : leader.toPar < 0 ? leader.toPar : `+${leader.toPar}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// PLAYERS PAGE
function PlayersPage({ notif }) {
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");
  const [players, setPlayers] = useState(PLAYERS);
  const [form, setForm] = useState({ name: "", hcp: "", cat: "A", club: "" });

  const filtered = players.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.club.toLowerCase().includes(search.toLowerCase())
  );

  const addPlayer = () => {
    if (!form.name || !form.hcp) return;
    const newP = { ...form, id: Date.now(), hcp: parseFloat(form.hcp), checkin: false, scores: Array(9).fill(0) };
    setPlayers(prev => [...prev, newP]);
    setModal(false);
    setForm({ name: "", hcp: "", cat: "A", club: "" });
    notif("Jugador agregado exitosamente");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif" style={{ fontSize: 26, fontWeight: 900 }}>Gestión de Jugadores</h2>
          <p className="text-muted mt-2">{players.length} jugadores registrados</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline">📁 Importar CSV</button>
          <button className="btn btn-primary" onClick={() => setModal(true)}>+ Agregar Jugador</button>
        </div>
      </div>

      <div className="card mb-6">
        <input
          placeholder="🔍  Buscar por nombre o club..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: 0 }}
        />
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Jugador</th>
                <th>HCP</th>
                <th>Categoría</th>
                <th>Club</th>
                <th>Check-in</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id}>
                  <td className="font-mono text-muted">{String(i+1).padStart(2,"0")}</td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{p.name}</div>
                  </td>
                  <td>
                    <span className="font-mono" style={{ color: COLORS.green }}>{p.hcp}</span>
                  </td>
                  <td>
                    <span className="badge badge-blue">Cat. {p.cat}</span>
                  </td>
                  <td className="text-muted">{p.club}</td>
                  <td>
                    <span className={`badge ${p.checkin ? "badge-green" : "badge-red"}`}>
                      {p.checkin ? "✅" : "⏳"}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-ghost btn-sm">✏️</button>
                      <button className="btn btn-ghost btn-sm">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">➕ Nuevo Jugador</div>
            <div className="form-group">
              <label>Nombre completo</label>
              <input placeholder="Ej: Juan Pérez" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label>Handicap</label>
                <input type="number" step="0.1" placeholder="Ej: 12.4" value={form.hcp} onChange={e => setForm(f=>({...f,hcp:e.target.value}))} />
              </div>
              <div className="form-group">
                <label>Categoría</label>
                <select value={form.cat} onChange={e => setForm(f=>({...f,cat:e.target.value}))}>
                  <option>A</option><option>B</option><option>C</option><option>PRO</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Club</label>
              <input placeholder="Ej: San Isidro GC" value={form.club} onChange={e => setForm(f=>({...f,club:e.target.value}))} />
            </div>
            <div className="flex gap-2 mt-4">
              <button className="btn btn-primary full-width" onClick={addPlayer}>Agregar Jugador</button>
              <button className="btn btn-outline" onClick={() => setModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// LEADERBOARD
function LeaderboardPage() {
  const [format, setFormat] = useState("neto");
  const results = calcResults(PLAYERS);
  const sorted = format === "neto"
    ? [...results].sort((a,b) => a.neto - b.neto)
    : format === "bruto"
    ? [...results].sort((a,b) => a.bruto - b.bruto)
    : [...results].sort((a,b) => b.stableford - a.stableford);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif" style={{ fontSize: 26, fontWeight: 900 }}>🏆 Leaderboard en Vivo</h2>
          <p className="text-muted mt-2">Actualización automática · Torneo Primavera 2025</p>
        </div>
        <div className="flex gap-2">
          {["neto","bruto","stableford"].map(f => (
            <button
              key={f}
              className={`btn ${format===f ? "btn-primary" : "btn-outline"} btn-sm`}
              onClick={() => setFormat(f)}
            >
              {f.charAt(0).toUpperCase()+f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${COLORS.border}` }}>
          {/* HEADER */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "50px 1fr 80px 80px 80px 100px",
            background: COLORS.surface,
            padding: "10px 18px",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: COLORS.muted,
            gap: 8,
          }}>
            <div>Pos</div>
            <div>Jugador</div>
            <div className="text-right">Bruto</div>
            <div className="text-right">HCP</div>
            <div className="text-right">Neto</div>
            <div className="text-right">Stableford</div>
          </div>

          {sorted.map((p, i) => (
            <div key={p.id} style={{
              display: "grid",
              gridTemplateColumns: "50px 1fr 80px 80px 80px 100px",
              padding: "16px 18px",
              borderBottom: `1px solid ${COLORS.border}30`,
              gap: 8,
              alignItems: "center",
              background: i === 0 ? `${COLORS.gold}08` : "transparent",
            }}>
              <div className={`lb-pos ${i===0?"top1":i===1?"top2":i===2?"top3":""}`}>
                {i===0?"🥇":i===1?"🥈":i===2?"🥉":i+1}
              </div>
              <div>
                <div style={{ fontWeight: 500, fontSize: 14 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: COLORS.muted }}>{p.club} · Cat. {p.cat}</div>
              </div>
              <div className="font-mono text-right" style={{ fontSize: 14 }}>{p.bruto}</div>
              <div className="font-mono text-right text-muted" style={{ fontSize: 13 }}>-{p.strokesHcp}</div>
              <div className={`font-mono text-right ${p.toPar<0?"text-green":p.toPar>0?"text-red":""}`} style={{ fontSize: 15, fontWeight: 700 }}>
                {p.neto}
              </div>
              <div className="font-mono text-right text-gold" style={{ fontSize: 14, fontWeight: 700 }}>
                {p.stableford} pts
              </div>
            </div>
          ))}
        </div>

        {/* DESEMPATE INFO */}
        <div className="divider" />
        <div className="flex gap-3" style={{ fontSize: 12, color: COLORS.muted }}>
          <span>⚖️ Criterios de desempate:</span>
          <span>1. Últimos 9 hoyos</span>
          <span>·</span>
          <span>2. Últimos 6 hoyos</span>
          <span>·</span>
          <span>3. Últimos 3 hoyos</span>
          <span>·</span>
          <span>4. HCP más bajo</span>
        </div>
      </div>
    </div>
  );
}

// TEE TIMES
function TeeTimesPage({ notif }) {
  const [interval, setInterval] = useState(8);
  const [startTime, setStartTime] = useState("07:00");
  const [startTee, setStartTee] = useState("both");
  const [groups, setGroups] = useState(TEE_GROUPS);

  const regenerate = () => {
    const newGroups = [];
    let mins = parseInt(startTime.split(":")[0])*60 + parseInt(startTime.split(":")[1]);
    const chunks = [];
    for (let i = 0; i < PLAYERS.length; i += 3) {
      chunks.push(PLAYERS.slice(i, i+3));
    }
    chunks.forEach((ch, i) => {
      const h = String(Math.floor((mins + i*interval)/60)).padStart(2,"0");
      const m = String((mins + i*interval)%60).padStart(2,"0");
      const tee = startTee === "both" ? (i%2===0?"1":"10") : startTee;
      newGroups.push({ time: `${h}:${m}`, tee, players: ch });
    });
    setGroups(newGroups);
    notif("Salidas generadas automáticamente");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif" style={{ fontSize: 26, fontWeight: 900 }}>⏰ Sistema de Salidas</h2>
          <p className="text-muted mt-2">Tee Times · Generación automática con agrupamiento inteligente</p>
        </div>
      </div>

      <div className="card mb-6">
        <div className="card-title mb-4">⚙️ Configuración de Salidas</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 16, alignItems: "end" }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Hora de inicio</label>
            <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Intervalo (minutos)</label>
            <select value={interval} onChange={e => setInterval(Number(e.target.value))}>
              {[6,7,8,9,10,12].map(v => <option key={v} value={v}>{v} minutos</option>)}
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Tipo de salida</label>
            <select value={startTee} onChange={e => setStartTee(e.target.value)}>
              <option value="1">Solo Tee 1</option>
              <option value="10">Solo Tee 10</option>
              <option value="both">Simultáneas (1 y 10)</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={regenerate}>🔄 Regenerar</button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Grupos del Día</div>
            <div className="card-subtitle">{groups.length} grupos · {groups.reduce((a,g)=>a+g.players.length,0)} jugadores</div>
          </div>
          <button className="btn btn-outline btn-sm">📋 Imprimir</button>
        </div>
        {groups.map((g, i) => (
          <div key={i} className="tee-group">
            <div className="tee-time">{g.time}</div>
            <div className="tee-hole">Tee {g.tee}</div>
            <div className="tee-players">
              {g.players.map(pl => (
                <div key={pl.id} className="player-chip">
                  {pl.name}
                  <span className="hcp"> · HCP {pl.hcp}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="btn btn-ghost btn-sm">✏️ Editar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// SCORECARD
function ScorecardPage({ notif }) {
  const [selected, setSelected] = useState(PLAYERS[0]);
  const [scores, setScores] = useState({});

  const getScore = (playerId, hole) => {
    const key = `${playerId}-${hole}`;
    if (scores[key] !== undefined) return scores[key];
    const p = PLAYERS.find(p => p.id === playerId);
    return p ? p.scores[hole] : "";
  };

  const setScore = (playerId, hole, val) => {
    setScores(prev => ({ ...prev, [`${playerId}-${hole}`]: parseInt(val) || 0 }));
  };

  const bruto = COURSE.par.map((_, i) => getScore(selected.id, i)).reduce((a, b) => (parseInt(a)||0) + (parseInt(b)||0), 0);
  const toPar = bruto - PAR_TOTAL;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif" style={{ fontSize: 26, fontWeight: 900 }}>📋 Carga de Scores</h2>
          <p className="text-muted mt-2">Tarjeta digital · Validación cruzada automática</p>
        </div>
        <button className="btn btn-gold" onClick={() => notif("Score guardado y validado")}>💾 Guardar & Validar</button>
      </div>

      {/* SELECTOR */}
      <div className="card mb-6">
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label>Seleccionar Jugador</label>
          <select value={selected.id} onChange={e => setSelected(PLAYERS.find(p => p.id === parseInt(e.target.value)))}>
            {PLAYERS.map(p => (
              <option key={p.id} value={p.id}>{p.name} — HCP {p.hcp} — Cat. {p.cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* SCORECARD */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{selected.name}</div>
            <div className="text-muted">{selected.club} · HCP {selected.hcp} · Cat. {selected.cat}</div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="text-center">
              <div className="font-mono" style={{ fontSize: 24, fontWeight: 700, color: COLORS.green }}>{bruto}</div>
              <div className="text-muted">Bruto</div>
            </div>
            <div className="text-center">
              <div className={`font-mono ${toPar < 0 ? "text-green" : toPar > 0 ? "text-red" : ""}`} style={{ fontSize: 24, fontWeight: 700 }}>
                {toPar === 0 ? "E" : toPar > 0 ? `+${toPar}` : toPar}
              </div>
              <div className="text-muted">vs Par</div>
            </div>
          </div>
        </div>

        <div className="scorecard">
          <div className="sc-header">
            <div>H</div>
            {COURSE.par.map((_, i) => <div key={i}>{i+1}</div>)}
            <div>TOT</div>
          </div>
          <div className="sc-row">
            <div className="sc-cell sc-label">Par</div>
            {COURSE.par.map((p, i) => <div key={i} className="sc-cell sc-par">{p}</div>)}
            <div className="sc-cell sc-par" style={{ fontWeight: 700 }}>{PAR_TOTAL}</div>
          </div>
          <div className="sc-row">
            <div className="sc-cell sc-label">SI</div>
            {COURSE.si.map((s, i) => <div key={i} className="sc-cell sc-par">{s}</div>)}
            <div className="sc-cell sc-par">—</div>
          </div>
          <div className="sc-row">
            <div className="sc-cell sc-label">Score</div>
            {COURSE.par.map((par, i) => {
              const val = getScore(selected.id, i);
              const diff = val - par;
              let cls = "";
              if (diff <= -2) cls = "sc-eagle";
              else if (diff === -1) cls = "sc-birdie";
              else if (diff >= 1) cls = "sc-bogey";
              return (
                <div key={i} className={`sc-cell ${cls}`}>
                  <input
                    type="number"
                    min={1} max={15}
                    value={val}
                    onChange={e => setScore(selected.id, i, e.target.value)}
                    style={{
                      width: "100%", border: "none", background: "transparent",
                      textAlign: "center", color: "inherit", fontSize: 13,
                      fontFamily: "'JetBrains Mono', monospace", padding: 0,
                    }}
                  />
                </div>
              );
            })}
            <div className="sc-cell" style={{ fontWeight: 700, color: COLORS.text }}>{bruto}</div>
          </div>
        </div>

        <div className="divider" />
        <div className="flex gap-4 text-muted" style={{ fontSize: 12 }}>
          <span style={{ color: COLORS.gold }}>🦅 Eagle: -2 o más</span>
          <span style={{ color: COLORS.green }}>🐦 Birdie: -1</span>
          <span style={{ color: COLORS.text }}>Par</span>
          <span style={{ color: COLORS.red }}>Bogey+: +1 o más</span>
        </div>
      </div>
    </div>
  );
}

// COURSE
function CoursePage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif" style={{ fontSize: 26, fontWeight: 900 }}>⛳ Gestión de Cancha</h2>
          <p className="text-muted mt-2">{COURSE.name} · 9 hoyos</p>
        </div>
        <button className="btn btn-primary">+ Nueva Cancha</button>
      </div>

      <div className="grid-2 mb-6">
        <div className="card">
          <div className="card-title mb-4">Datos de la Cancha</div>
          <div className="form-group">
            <label>Nombre</label>
            <input defaultValue={COURSE.name} />
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label>Hoyos</label>
              <select defaultValue="9">
                <option value="9">9 hoyos</option>
                <option value="18">18 hoyos</option>
              </select>
            </div>
            <div className="form-group">
              <label>Par Total</label>
              <input defaultValue={PAR_TOTAL} readOnly />
            </div>
          </div>
          <div className="form-group">
            <label>Configuración de Tees</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {[
                { label: "🔴 Damas", val: "68/72" },
                { label: "🔵 Caballeros", val: "71/130" },
                { label: "⚫ Profesionales", val: "73/145" },
              ].map((t, i) => (
                <div key={i} className="card card-sm" style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{t.label}</div>
                  <div className="font-mono text-green" style={{ fontSize: 13 }}>{t.val}</div>
                  <div className="text-muted" style={{ fontSize: 10 }}>CR/Slope</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title mb-4">Tabla de Hoyos</div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Hoyo</th>
                  <th>Par</th>
                  <th>Stroke Index</th>
                  <th>Yardas</th>
                </tr>
              </thead>
              <tbody>
                {COURSE.par.map((par, i) => (
                  <tr key={i}>
                    <td className="font-mono text-green">{i+1}</td>
                    <td className="font-mono">{par}</td>
                    <td className="font-mono text-muted">{COURSE.si[i]}</td>
                    <td className="text-muted">{[380,150,510,420,350,170,490,400,380][i]}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ fontWeight: 700 }}>TOTAL</td>
                  <td className="font-mono" style={{ fontWeight: 700, color: COLORS.green }}>{PAR_TOTAL}</td>
                  <td>—</td>
                  <td className="text-muted">3,250</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// FORMATS PAGE
function FormatsPage() {
  const [selected, setSelected] = useState("stroke");
  const formats = {
    stroke: {
      name: "Stroke Play (Medal)",
      icon: "🏌️",
      desc: "Se cuentan todos los golpes de cada hoyo. Gana quien acumule la menor cantidad de golpes totales.",
      hcp: "Se resta el handicap completo del score bruto para obtener el score neto.",
      winner: "Menor score neto (o bruto en categoría scratch).",
      color: COLORS.green,
    },
    stableford: {
      name: "Stableford",
      icon: "⭐",
      desc: "Se asignan puntos según el resultado en cada hoyo relativo al par. Eagle=4pts, Birdie=3pts, Par=2pts, Bogey=1pt, Doble bogey+=0pts.",
      hcp: "El handicap determina en qué hoyos el jugador recibe golpes extra según el Stroke Index.",
      winner: "Mayor cantidad de puntos Stableford acumulados.",
      color: COLORS.gold,
    },
    matchplay: {
      name: "Match Play",
      icon: "⚔️",
      desc: "Se juega hoyo por hoyo. Quien hace menos golpes en un hoyo gana ese hoyo. El partido termina cuando un jugador lleva ventaja irrecuperable.",
      hcp: "La diferencia de handicap se distribuye en los hoyos más difíciles (SI más bajo).",
      winner: "El jugador que gana más hoyos. Se expresa como '3&2' (3 hoyos de ventaja con 2 por jugar).",
      color: COLORS.red,
    },
    scramble: {
      name: "Scramble",
      icon: "🤝",
      desc: "Formato en equipo: todos los jugadores golpean y se elige el mejor tiro. Luego todos juegan desde ese punto. Se repite hasta el hoyo.",
      hcp: "Se calcula un handicap combinado del equipo (ej: 35% del mejor + 15% del resto).",
      winner: "El equipo con menor score bruto gana.",
      color: COLORS.blue,
    },
    bestball: {
      name: "Best Ball (Fourball)",
      icon: "🏅",
      desc: "Cada jugador juega su propia pelota. Se toma el mejor score neto del equipo en cada hoyo.",
      hcp: "Cada jugador usa su handicap individual completo.",
      winner: "El equipo que tenga el mejor score neto total sumando los mejores hoyos.",
      color: "#9b59b6",
    },
    foursomes: {
      name: "Foursomes",
      icon: "🔄",
      desc: "Dos jugadores por equipo, una sola pelota. Los jugadores alternan los golpes (A-B-A-B). El que salida en el hoyo 1 hace la salida en el hoyo 2, etc.",
      hcp: "Se suma el handicap de ambos y se divide por 2.",
      winner: "El equipo que gane más hoyos (match play) o tenga menor score.",
      color: "#e67e22",
    },
    chapman: {
      name: "Chapman (Pinehurst)",
      icon: "🎯",
      desc: "Ambos jugadores hacen su primer golpe, luego intercambian pelotas para el segundo. A partir del tercer golpe, se elige una pelota y se juega alternadamente.",
      hcp: "60% del handicap del jugador mayor + 40% del menor.",
      winner: "Equipo con menor score neto.",
      color: "#1abc9c",
    },
  };
  const f = formats[selected];

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-serif" style={{ fontSize: 26, fontWeight: 900 }}>📚 Formatos de Juego</h2>
        <p className="text-muted mt-2">7 formatos oficiales con cálculo automático de scores y handicap</p>
      </div>

      <div className="flex gap-2 mb-6" style={{ flexWrap: "wrap" }}>
        {Object.entries(formats).map(([key, fmt]) => (
          <button
            key={key}
            className={`btn ${selected === key ? "btn-primary" : "btn-outline"} btn-sm`}
            onClick={() => setSelected(key)}
          >
            {fmt.icon} {fmt.name.split(" ")[0]}
          </button>
        ))}
      </div>

      <div className="grid-2">
        <div className="card" style={{ borderTop: `3px solid ${f.color}` }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>{f.icon}</div>
          <div className="font-serif" style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>{f.name}</div>
          <div style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.7, marginBottom: 20 }}>{f.desc}</div>
          <div className="divider" />
          <div className="mb-3">
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: COLORS.muted, marginBottom: 6 }}>Impacto del Handicap</div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>{f.hcp}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: COLORS.muted, marginBottom: 6 }}>Determinación del Ganador</div>
            <div style={{ fontSize: 13, color: f.color, fontWeight: 600 }}>{f.winner}</div>
          </div>
        </div>

        <div className="card">
          <div className="card-title mb-4">Ejemplo de Score — {f.name}</div>
          {selected === "stableford" && (
            <div>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Hoyo</th><th>Par</th><th>Score</th><th>Resultado</th><th>Puntos</th></tr></thead>
                  <tbody>
                    {[
                      [1,4,3,"Birdie",3],[2,3,3,"Par",2],[3,5,6,"Bogey",1],
                      [4,4,2,"Eagle",4],[5,4,4,"Par",2],[6,3,5,"D.Bogey",0],
                      [7,5,4,"Birdie",3],[8,4,4,"Par",2],[9,4,5,"Bogey",1],
                    ].map(([h,par,sc,res,pts]) => (
                      <tr key={h}>
                        <td className="font-mono">{h}</td>
                        <td className="font-mono text-muted">{par}</td>
                        <td className="font-mono">{sc}</td>
                        <td><span className={`badge ${res==="Eagle"?"badge-gold":res==="Birdie"?"badge-green":res.includes("Bogey")?"badge-red":"badge-blue"}`}>{res}</span></td>
                        <td className="font-mono text-gold" style={{ fontWeight: 700 }}>{pts}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={4} style={{ fontWeight: 700 }}>TOTAL</td>
                      <td className="font-mono text-gold" style={{ fontWeight: 700, fontSize: 16 }}>18 pts</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {selected !== "stableford" && (
            <div style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.8 }}>
              <div className="mb-3" style={{ padding: 16, background: COLORS.surface, borderRadius: 8 }}>
                <div style={{ color: COLORS.text, fontWeight: 600, marginBottom: 8 }}>Ejemplo práctico:</div>
                {selected === "stroke" && "Jugador A hace 85 bruto con HCP 12 → 85-12 = 73 neto. Jugador B hace 88 bruto con HCP 18 → 88-18 = 70 neto. Gana B."}
                {selected === "matchplay" && "Hoyo 1: A=4, B=5 → A gana el hoyo (1 UP). Hoyo 2: A=5, B=5 → Empatado (AS). Hoyo 3: A=6, B=4 → B gana (AS). Resultado final: se juega hasta que alguien lleva ventaja irrecuperable."}
                {selected === "scramble" && "4 jugadores hacen sus salidas. La mejor queda a 180y en calle. Todos van a ese punto. A hace un gran approach a 2m del hoyo. Todos putean desde ahí. C emboca → score del hoyo = 1 bajo par."}
                {selected === "bestball" && "Hoyo 5: Jugador A neto 4, B neto 3, C neto 5, D neto 3. El team score del hoyo 5 = 3 (mejor de los 4)."}
                {selected === "foursomes" && "Hoyo 1: A sale, B pone en calle. A approach al green. B puttea → Par. Hoyo 2: B sale, A segunda. B tercer golpe. A puttea → Bogey."}
                {selected === "chapman" && "Jugadores A y B. A golpea 200y calle, B golpea 180y rough. Intercambian: A juega la de B desde rough, B juega la de A desde calle. Eligen la de B (ahora jugada por A) y alternan desde ahí."}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// SETTINGS / ARCHITECTURE PAGE
function ArchPage() {
  const layers = [
    {
      title: "Frontend", color: COLORS.blue,
      items: ["React 18 + TypeScript", "Tailwind CSS + shadcn/ui", "TanStack Query (caché + real-time)", "Socket.io Client (leaderboard live)", "PWA para uso offline en cancha"],
    },
    {
      title: "Backend / API", color: COLORS.green,
      items: ["Node.js + Express / Fastify", "REST API + WebSockets", "JWT Auth con roles granulares", "Rate limiting + CORS", "Bull (jobs asíncronos)"],
    },
    {
      title: "Base de Datos", color: COLORS.gold,
      items: ["PostgreSQL (datos principales)", "Redis (caché + sesiones)", "Firebase Realtime (leaderboard)", "S3 / Cloudflare R2 (archivos)", "Backups automáticos diarios"],
    },
    {
      title: "Infraestructura", color: "#9b59b6",
      items: ["AWS / Railway / Render", "Docker + Docker Compose", "CI/CD con GitHub Actions", "Cloudflare CDN + DDoS protection", "Monitoreo: Sentry + Datadog"],
    },
  ];

  const roles = [
    { rol: "Administrador", permisos: "Acceso total. Gestiona clubes, usuarios, configuración global.", icon: "👑" },
    { rol: "Organizador", permisos: "Crea torneos, carga jugadores, configura formatos, genera salidas.", icon: "📋" },
    { rol: "Starter", permisos: "Ve y edita salidas del día. Check-in de jugadores. Control de ritmo.", icon: "🚦" },
    { rol: "Marcador", permisos: "Carga scores por hoyo. Valida tarjetas. Firma digital.", icon: "✏️" },
    { rol: "Jugador", permisos: "Ve su score, tarjeta, leaderboard. Carga su propio score (app).", icon: "⛳" },
  ];

  const innovations = [
    {
      title: "AI Caddie en Tiempo Real",
      icon: "🤖",
      desc: "IA que analiza el juego del jugador hole por hole y sugiere estrategias, clubes y líneas de putt basadas en su historial y las condiciones del día.",
      badge: "Innovación #1",
    },
    {
      title: "Pace of Play Predictivo",
      icon: "⏱️",
      desc: "Algoritmo que monitorea el ritmo de juego de cada grupo en tiempo real, predice delays y notifica al starter antes de que ocurran para intervenir.",
      badge: "Innovación #2",
    },
    {
      title: "Social Golf Network",
      icon: "🌐",
      desc: "Perfil público de jugador con historial de torneos, evolución de handicap, highlights de mejores rondas. Compartible a redes. Viralizador natural.",
      badge: "Innovación #3",
    },
  ];

  const monetization = [
    { plan: "Club Básico", precio: "$49/mes", items: ["1 torneo activo", "50 jugadores", "Leaderboard básico"] },
    { plan: "Club Pro", precio: "$149/mes", items: ["Torneos ilimitados", "500 jugadores", "App móvil + notificaciones", "Reportes PDF"] },
    { plan: "Enterprise", precio: "$499/mes", items: ["Multi-club", "API access", "Branding propio", "Soporte 24/7", "AI Caddie"] },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-serif" style={{ fontSize: 26, fontWeight: 900 }}>🏗️ Arquitectura & Estrategia</h2>
        <p className="text-muted mt-2">Stack tecnológico, roles, innovaciones y modelo de negocio</p>
      </div>

      <div className="grid-2 mb-6">
        {layers.map((l, i) => (
          <div key={i} className="card" style={{ borderLeft: `3px solid ${l.color}` }}>
            <div className="font-serif" style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, color: l.color }}>{l.title}</div>
            {l.items.map((it, j) => (
              <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontSize: 13 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: l.color, flexShrink: 0 }} />
                {it}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ROLES */}
      <div className="card mb-6">
        <div className="card-title mb-4">👥 Roles del Sistema</div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Rol</th><th>Permisos y Responsabilidades</th></tr></thead>
            <tbody>
              {roles.map((r, i) => (
                <tr key={i}>
                  <td><span style={{ fontSize: 18 }}>{r.icon}</span> <span style={{ fontWeight: 600, marginLeft: 8 }}>{r.rol}</span></td>
                  <td className="text-muted">{r.permisos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* INNOVACIONES */}
      <div className="card mb-6">
        <div className="card-title mb-4">🚀 3 Innovaciones Diferenciales</div>
        <div className="grid-3">
          {innovations.map((inn, i) => (
            <div key={i} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{inn.icon}</div>
              <div style={{ fontSize: 11, color: COLORS.green, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{inn.badge}</div>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>{inn.title}</div>
              <div style={{ fontSize: 12, color: COLORS.muted, lineHeight: 1.7 }}>{inn.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MONETIZACIÓN */}
      <div className="card">
        <div className="card-title mb-4">💰 Modelo de Monetización SaaS</div>
        <div className="grid-3">
          {monetization.map((p, i) => (
            <div key={i} style={{
              background: i === 1 ? COLORS.greenGlow : COLORS.surface,
              border: `1px solid ${i === 1 ? COLORS.green : COLORS.border}`,
              borderRadius: 12, padding: 24, textAlign: "center",
            }}>
              {i === 1 && <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: COLORS.green, marginBottom: 8 }}>⭐ MÁS POPULAR</div>}
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{p.plan}</div>
              <div className="font-mono" style={{ fontSize: 28, fontWeight: 700, color: COLORS.green, marginBottom: 16 }}>{p.precio}</div>
              {p.items.map((it, j) => (
                <div key={j} style={{ fontSize: 12, color: COLORS.muted, marginBottom: 6 }}>✓ {it}</div>
              ))}
              <button className={`btn ${i === 1 ? "btn-primary" : "btn-outline"} full-width mt-4`}>Seleccionar</button>
            </div>
          ))}
        </div>
        <div className="divider" />
        <div className="flex gap-4" style={{ fontSize: 12, color: COLORS.muted, flexWrap: "wrap" }}>
          <span>💼 <strong style={{ color: COLORS.text }}>B2B:</strong> Vender a clubs directamente con demo gratuita de 30 días</span>
          <span>🏆 <strong style={{ color: COLORS.text }}>Sponsors:</strong> Branding en leaderboards y tarjetas digitales</span>
          <span>📲 <strong style={{ color: COLORS.text }}>Viral:</strong> Jugadores comparten su scorecard en redes → awareness orgánico</span>
        </div>
      </div>
    </div>
  );
}

// ─── APP SHELL ────────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "📊", section: "TORNEO" },
  { id: "players", label: "Jugadores", icon: "👤", section: "TORNEO" },
  { id: "teetimes", label: "Salidas (Tee Times)", icon: "⏰", section: "TORNEO" },
  { id: "scorecard", label: "Carga de Scores", icon: "📋", section: "TORNEO" },
  { id: "leaderboard", label: "Leaderboard", icon: "🏆", section: "TORNEO" },
  { id: "course", label: "Cancha", icon: "⛳", section: "CONFIGURACIÓN" },
  { id: "formats", label: "Formatos de Juego", icon: "📚", section: "CONFIGURACIÓN" },
  { id: "architecture", label: "Arquitectura & Negocio", icon: "🏗️", section: "SISTEMA" },
];

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [notifMsg, setNotifMsg] = useState(null);

  const notify = (msg) => setNotifMsg(msg);

  const sections = [...new Set(NAV.map(n => n.section))];

  const pageTitle = NAV.find(n => n.id === page)?.label || "Dashboard";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {notifMsg && <Notif msg={notifMsg} onClose={() => setNotifMsg(null)} />}
      <div className="app-shell">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <h1>⛳ GolfPro</h1>
            <span>Tournament Manager</span>
          </div>
          <nav className="sidebar-nav">
            {sections.map(sec => (
              <div key={sec}>
                <div className="nav-section-label">{sec}</div>
                {NAV.filter(n => n.section === sec).map(n => (
                  <button
                    key={n.id}
                    className={`nav-item ${page === n.id ? "active" : ""}`}
                    onClick={() => setPage(n.id)}
                  >
                    <span className="nav-icon">{n.icon}</span>
                    {n.label}
                  </button>
                ))}
              </div>
            ))}
          </nav>
          <div className="sidebar-footer">
            <div className="sidebar-status">
              <div className="status-dot" />
              Sistema operativo
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="main">
          <div className="topbar">
            <div className="topbar-title">{pageTitle}</div>
            <div className="topbar-right">
              <span className="badge badge-green">Torneo Primavera 2025</span>
              <span className="badge badge-gold">🔴 Live</span>
            </div>
          </div>
          <div className="page">
            {page === "dashboard" && <Dashboard setPage={setPage} notif={notify} />}
            {page === "players" && <PlayersPage notif={notify} />}
            {page === "teetimes" && <TeeTimesPage notif={notify} />}
            {page === "scorecard" && <ScorecardPage notif={notify} />}
            {page === "leaderboard" && <LeaderboardPage />}
            {page === "course" && <CoursePage />}
            {page === "formats" && <FormatsPage />}
            {page === "architecture" && <ArchPage />}
          </div>
        </main>
      </div>
    </>
  );
}
