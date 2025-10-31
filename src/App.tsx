import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import Benefits from "./components/Benefits/Benefits";

type Account = {
  id: string;
  alias: string;
  last4: string;
  brand?: "visa" | "mastercard" | "amex" | "debit" | "other";
  balance?: number;
};

type Tab = "home" | "benefits";

const App: React.FC = () => {
  // navegación
  const [tab, setTab] = useState<Tab>("home");

  // ahorro/meta
  const [saved, setSaved] = useState<number>(1000);
  const goal = 5000;

  // bottom sheet (depósito)
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [accountId, setAccountId] = useState("");

  const nmx = useMemo(
    () =>
      new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        maximumFractionDigits: 0,
      }),
    []
  );

  const accounts: Account[] = useMemo(
    () => [
      { id: "acc_1", alias: "BBVA •••• 1234", last4: "1234", brand: "debit" },
      { id: "acc_2", alias: "Santander •••• 2234", last4: "2234", brand: "visa" },
      { id: "acc_3", alias: "HSBC •••• 7788", last4: "7788", brand: "mastercard" },
    ],
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsSheetOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openSheet = () => setIsSheetOpen(true);
  const closeSheet = () => {
    setIsSheetOpen(false);
    setAmount("");
    setAccountId("");
  };

  const handleConfirmDeposit = () => {
    const val = parseFloat(amount);
    if (!accountId || isNaN(val) || val <= 0) return;
    setSaved((s) => Math.min(s + val, goal));
    closeSheet();
  };

  const isValid =
    accountId !== "" && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0;

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <button
          type="button"
          className="btn-back"
          aria-label="Regresar"
          onClick={() => tab === "benefits" && setTab("home")}
        >
          <span className="chevron-left">‹</span>
        </button>
        <div className="seeds-pill" aria-live="polite">
          Tienes 245 semillas
        </div>
      </header>

      {/* Contenido */}
      <main className="content-area">
        {tab === "home" ? (
          <Home saved={saved} goal={goal} currency={nmx} />
        ) : (
          <Benefits />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <button className="btn-beneficios" onClick={() => setTab("benefits")}>
          Beneficios
        </button>
        <button className="btn-depositar" onClick={openSheet}>
          Depositar
        </button>
      </footer>

      {/* Backdrop */}
      <div
        className={`backdrop ${isSheetOpen ? "show" : ""}`}
        aria-hidden={isSheetOpen ? "false" : "true"}
        onClick={closeSheet}
      />

      {/* Bottom Sheet */}
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
          <label htmlFor="deposit-amount-input">
            ¿Cuánto quieres depositar?
          </label>
          <input
            type="number"
            id="deposit-amount-input"
            placeholder="$ 100.00"
            min={0}
            step="0.01"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
