import React, { useMemo, useState, useEffect } from "react";
import "./App.css";

// Tipos simples para las cuentas de origen
type Account = {
  id: string;
  alias: string; // texto visible (banco + últimos 4)
  last4: string;
  brand?: "visa" | "mastercard" | "amex" | "debit" | "other";
  balance?: number;
};

const App: React.FC = () => {
  // Estado ahorro/meta
  const [saved, setSaved] = useState<number>(1000);
  const goal: number = 5000;

  // Estado del Bottom Sheet (modal que sube desde abajo)
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [accountId, setAccountId] = useState<string>("");

  const remaining: number = Math.max(goal - saved, 0);
  const progress: number = Math.min((saved / goal) * 100, 100);

  const nmx = useMemo(
    () =>
      new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        maximumFractionDigits: 0,
      }),
    []
  );

  // Mock de cuentas (reemplaza por tu data real cuando la tengas)
  const accounts: Account[] = useMemo(
    () => [
      { id: "acc_1", alias: "BBVA •••• 9101", last4: "9101", brand: "debit" },
      { id: "acc_2", alias: "Santander •••• 2234", last4: "2234", brand: "visa" },
      { id: "acc_3", alias: "HSBC •••• 7788", last4: "7788", brand: "mastercard" },
    ],
    []
  );

  // Cierra con tecla ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSheetOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const resetSheet = () => {
    setAmount("");
    setAccountId("");
  };

  const openSheet = () => setIsSheetOpen(true);
  const closeSheet = () => {
    setIsSheetOpen(false);
    resetSheet();
  };

  const handleConfirmDeposit = (): void => {
    const val = parseFloat(amount);
    if (!accountId || isNaN(val) || val <= 0) return;
    setSaved((s) => Math.min(s + val, goal));
    closeSheet();
  };

  const isValid = accountId !== "" && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0;

  return (
    <div className="app-container">
      <header className="app-header">
        <button type="button" className="btn-back" aria-label="Regresar">
          <span className="chevron-left">‹</span>
        </button>
        <div className="seeds-pill" aria-live="polite">Tienes 245 semillas</div>
      </header>

      <main className="content-area">
        {/* Tarjeta de ahorro */}
        <section className="savings-card">
          <div className="savings-info">
            <h2>Has ahorrado {nmx.format(saved)}</h2>
            <p className="meta">
              Meta {nmx.format(goal)} - Faltan {nmx.format(remaining)}
            </p>
          </div>
          <div className="savings-yield">
            <span className="badge-rendimiento">Rendimiento</span>
            <p className="anual">7.5% Anual</p>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </section>

        {/* Planta (emoji) */}
        <section className="plant-section">
          <div className="plant-image" role="img" aria-label="Planta">
            🪴
          </div>
        </section>

        {/* Grid de estadísticas */}
        <section className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon">🔥</span>
            <p>Racha</p>
            <p className="stat-value red">5 Días</p>
          </div>
          <div className="stat-card">
            <span className="stat-icon">💧</span>
            <p>Agua</p>
            <p className="stat-value">10/20</p>
          </div>
          <div className="stat-card">
            <span className="stat-icon">☀️</span>
            <p>Sol</p>
            <p className="stat-value">5/10</p>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🌼</span>
            <p>Fertilizante</p>
            <p className="stat-value">5/10</p>
          </div>
        </section>

        {/* Misiones del día */}
        <section className="missions-section">
          <h3>Misiones de hoy</h3>
          <div className="mission-list">
            <div className="mission-card">
              <div className="mission-icon-bg bg-green" />
              <div className="mission-details">
                <p className="mission-title">Deposita 10 pesos</p>
                <p className="mission-rewards">
                  <span>🪙 2</span>
                  <span>💧 2</span>
                  <span>🌼 2</span>
                </p>
              </div>
              <span className="mission-arrow">&gt;</span>
            </div>

            <div className="mission-card">
              <div className="mission-icon-bg bg-pink" />
              <div className="mission-details">
                <p className="mission-title">[Necesidad]</p>
                <p className="mission-rewards">
                  <span>🪙 2</span>
                  <span>💧 2</span>
                  <span>🌼 2</span>
                </p>
              </div>
              <span className="mission-arrow">&gt;</span>
            </div>

            <div className="mission-card mission-card3">
              <div className="mission-icon-bg bg-orange" />
              <div className="mission-details">
                <p className="mission-title">[Necesidad]</p>
                <p className="mission-rewards">
                  <span>🪙 2</span>
                  <span>💧 2</span>
                  <span>🌼 2</span>
                </p>
              </div>
              <span className="mission-arrow">&gt;</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer con botón Depositar */}
      <footer className="app-footer">
        <button className="btn-depositar" onClick={openSheet}>
          Depositar
        </button>
      </footer>

      {/* Backdrop opaco */}
      <div
        className={`backdrop ${isSheetOpen ? "show" : ""}`}
        aria-hidden={isSheetOpen ? "false" : "true"}
        onClick={closeSheet}
      />

      {/* Bottom Sheet que sube desde abajo */}
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="transfer-title"
        className={`bottom-sheet ${isSheetOpen ? "show" : ""}`}
      >
        <div className="sheet-header">
          <h3 id="transfer-title">Transferir</h3>
        </div>

        <div className="field">
          <label htmlFor="account-select">Cuenta origen</label>
          <div className="select-wrapper">
            <select
              id="account-select"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
            >
              <option value="" disabled>
                Selecciona una cuenta
              </option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.alias}
                </option>
              ))}
            </select>
            <span className="chevron">▾</span>
          </div>
        </div>

        <div className="field">
          <label htmlFor="deposit-amount-input">¿Cuánto quieres depositar?</label>
          <input
            type="number"
            id="deposit-amount-input"
            placeholder="$ 100.00"
            min={0}
            step="0.01"
            inputMode="decimal"
            value={amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
          />
        </div>

        <div className="sheet-actions">
          <button
            className={`btn-primary ${!isValid ? "disabled" : ""}`}
            disabled={!isValid}
            onClick={handleConfirmDeposit}
          >
            Depositar
          </button>
          <button className="btn-outline" onClick={closeSheet}>
            Cancelar
          </button>
        </div>
      </section>
    </div>
  );
};

export default App;
