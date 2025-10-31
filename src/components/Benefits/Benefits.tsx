import React, { useMemo, useState } from "react";
import "./Benefits.css";

export type BenefitCategory = "viajes" | "recarga" | "credito" | "compras" | "salud";
export type Benefit = {
  id: string;
  brand: string;
  description: string;
  cost: number; // semillas
  category: BenefitCategory;
  logoText?: string;
};

const Benefits: React.FC = () => {
  const [activeCat, setActiveCat] = useState<"all" | BenefitCategory>("all");

  const benefits: Benefit[] = useMemo(
    () => [
      { id:"b1", brand:"Uber", description:"20% descuento en 2 viajes", cost:30, category:"viajes", logoText:"U" },
      { id:"b2", brand:"Cinépolis", description:"2x1 boletos", cost:30, category:"viajes", logoText:"C" },
      { id:"b3", brand:"Starbucks", description:"Aumento de tamaño", cost:30, category:"compras", logoText:"S" },
      { id:"b4", brand:"Liverpool", description:"Envío exprés gratis", cost:30, category:"compras", logoText:"L" },
      { id:"b5", brand:"Palacio de Hierro", description:"Envoltura de regalo premium", cost:30, category:"compras", logoText:"PH" },
      { id:"b6", brand:"Vips", description:"Postre gratis", cost:30, category:"compras", logoText:"V" },
      { id:"b7", brand:"Amazon", description:"Envío gratis en 1 pedido", cost:30, category:"compras", logoText:"a" },
      { id:"b8", brand:"Farmacias del Ahorro", description:"Consulta gratis", cost:30, category:"salud", logoText:"FA" },
      { id:"b9", brand:"CFE", description:"$50 pesos menos en tu factura", cost:30, category:"recarga", logoText:"CFE" },
      { id:"b10", brand:"Naturgy", description:"$50 pesos menos en tu factura", cost:30, category:"recarga", logoText:"N" },
    ],
    []
  );

  const categories: { key: "all" | BenefitCategory; label: string; icon?: string }[] = [
    { key: "all", label: "Todo" },
    { key: "viajes", label: "Viajes", icon: "✈️" },
    { key: "recarga", label: "Recarga", icon: "📱" },
    { key: "credito", label: "Crédito", icon: "💳" },
    { key: "compras", label: "Compras", icon: "🛍️" },
    { key: "salud", label: "Salud", icon: "🩺" },
  ];

  const list = activeCat === "all" ? benefits : benefits.filter(b => b.category === activeCat);

  return (
    <>
      {/* Filtros */}
      <nav className="benefits-filters" aria-label="Filtros de beneficios">
        {categories.map((c) => (
          <button
            key={c.key}
            className={`benefits-chip ${activeCat === c.key ? "is-active" : ""}`}
            onClick={() => setActiveCat(c.key)}
            aria-pressed={activeCat === c.key}
          >
            {c.icon && <span className="benefits-chip-icon" aria-hidden="true">{c.icon}</span>}
            {c.label}
          </button>
        ))}
      </nav>

      {/* Lista */}
      <section className="benefits-section" aria-labelledby="benefits-title">
        <h3 id="benefits-title">Bonificaciones</h3>

        <div className="benefits-grid">
          {list.map((b) => (
            <article key={b.id} className="benefit-card">
              <div className="benefit-header">
                <div className="benefit-logo" aria-hidden="true">{b.logoText ?? "☆"}</div>
                <div className="benefit-texts">
                  <h4 className="benefit-brand">{b.brand}</h4>
                  <p className="benefit-desc">{b.description}</p>
                </div>
              </div>

              <div className="benefit-actions">
                <span className="benefit-cost">{b.cost} semillas</span>
                <button className="benefit-redeem">Canjear</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Benefits;
