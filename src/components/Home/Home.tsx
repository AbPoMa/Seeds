import React from "react";
import "./Home.css";

type HomeProps = {
  saved: number;
  goal: number;
  currency: Intl.NumberFormat;
};

const Home: React.FC<HomeProps> = ({ saved, goal, currency }) => {
  const remaining = Math.max(goal - saved, 0);
  const progress = Math.min((saved / goal) * 100, 100);

  return (
    <>
      {/* Tarjeta ahorro */}
      <section className="home-savings-card">
        <div className="home-savings-info">
          <h2>Has ahorrado {currency.format(saved)}</h2>
          <p className="home-meta">
            Meta {currency.format(goal)} - Faltan {currency.format(remaining)}
          </p>
        </div>

        <div className="home-savings-yield">
          <span className="home-badge">Rendimiento</span>
          <p className="home-anual">7.5% Anual</p>
        </div>

        <div className="home-progress-bar">
          <div className="home-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </section>

      {/* Planta */}
      <section className="home-plant-section">
        <div className="home-plant-image" role="img" aria-label="Planta">
          🪴
        </div>
      </section>

      {/* Stats */}
      <section className="home-stats-grid">
        <div className="home-stat-card">
          <span className="home-stat-icon">🔥</span>
          <p>Racha</p>
          <p className="home-stat-value home-red">5 Días</p>
        </div>
        <div className="home-stat-card">
          <span className="home-stat-icon">💧</span>
          <p>Agua</p>
          <p className="home-stat-value">10/20</p>
        </div>
        <div className="home-stat-card">
          <span className="home-stat-icon">☀️</span>
          <p>Sol</p>
          <p className="home-stat-value">5/10</p>
        </div>
        <div className="home-stat-card">
          <span className="home-stat-icon">🌼</span>
          <p>Fertilizante</p>
          <p className="home-stat-value">5/10</p>
        </div>
      </section>

      {/* Misiones */}
      <section className="home-missions-section">
        <h3>Misiones de hoy</h3>
        <div className="home-mission-list">
          <div className="home-mission-card">
            <div className="home-mission-icon-bg home-bg-green">🌼</div>
            <div className="home-mission-details">
              <p className="home-mission-title">Deposita 10 pesos</p>
              <p className="home-mission-rewards">
                <span>🪙 2</span><span>💧 2</span><span>🌼 2</span>
              </p>
            </div>
            <span className="home-mission-arrow">&gt;</span>
          </div>

          <div className="home-mission-card">
            <div className="home-mission-icon-bg home-bg-pink">🌼</div>
            <div className="home-mission-details">
              <p className="home-mission-title">[Necesidad]</p>
              <p className="home-mission-rewards">
                <span>🪙 2</span><span>💧 2</span><span>🌼 2</span>
              </p>
            </div>
            <span className="home-mission-arrow">&gt;</span>
          </div>

          <div className="home-mission-card home-mission-card3">
            <div className="home-mission-icon-bg home-bg-orange">🌼</div>
            <div className="home-mission-details">
              <p className="home-mission-title">[Necesidad]</p>
              <p className="home-mission-rewards">
                <span>🪙 2</span><span>💧 2</span><span>🌼 2</span>
              </p>
            </div>
            <span className="home-mission-arrow">&gt;</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
