"use client";
import React, { useState } from "react";

interface FibTargets {
  T1_382: number;
  T2_618: number;
  T3_1000: number;
  T4_1618: number;
  T5_2618: number;
  T6_4236: number;
}

export default function FibonacciCalculator() {
  const [symbol, setSymbol] = useState("RELIANCE");
  const [entryPrice, setEntryPrice] = useState<number>(231.15);
  const [slPrice, setSlPrice] = useState<number>(196.45);
  const [direction, setDirection] = useState<"LONG" | "SHORT">("LONG");
  const [targets, setTargets] = useState<FibTargets | null>({
    T1_382: 244.40,
    T2_618: 252.60,
    T3_1000: 265.85,
    T4_1618: 287.30,
    T5_2618: 322.00,
    T6_4236: 378.15,
  });

  const calculateTargets = () => {
    const risk = Math.abs(entryPrice - slPrice);
    if (direction === "LONG") {
      setTargets({
        T1_382: Number((entryPrice + risk * 0.382).toFixed(2)),
        T2_618: Number((entryPrice + risk * 0.618).toFixed(2)),
        T3_1000: Number((entryPrice + risk * 1.000).toFixed(2)),
        T4_1618: Number((entryPrice + risk * 1.618).toFixed(2)),
        T5_2618: Number((entryPrice + risk * 2.618).toFixed(2)),
        T6_4236: Number((entryPrice + risk * 4.236).toFixed(2)),
      });
    } else {
      setTargets({
        T1_382: Number((entryPrice - risk * 0.382).toFixed(2)),
        T2_618: Number((entryPrice - risk * 0.618).toFixed(2)),
        T3_1000: Number((entryPrice - risk * 1.000).toFixed(2)),
        T4_1618: Number((entryPrice - risk * 1.618).toFixed(2)),
        T5_2618: Number((entryPrice - risk * 2.618).toFixed(2)),
        T6_4236: Number((entryPrice - risk * 4.236).toFixed(2)),
      });
    }
  };

  return (
    <div style={{ background: "#0a0f1d", border: "1px solid #1e293b", borderRadius: "8px", padding: "16px", color: "#f8fafc", fontFamily: "monospace" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #334155", paddingBottom: "8px", marginBottom: "12px" }}>
        <span style={{ fontWeight: "bold", color: "#38bdf8", fontSize: "14px" }}>📐 FIBONACCI INSTITUTIONAL TARGET ENGINE</span>
        <span style={{ fontSize: "11px", background: "#0284c7", padding: "2px 8px", borderRadius: "4px" }}>DELTA 0.55-0.60 ITM</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "12px" }}>
        <div>
          <label style={{ fontSize: "11px", color: "#94a3b8" }}>SYMBOL</label>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            style={{ width: "100%", background: "#1e293b", border: "1px solid #475569", color: "#fff", padding: "6px", borderRadius: "4px" }}
          />
        </div>
        <div>
          <label style={{ fontSize: "11px", color: "#94a3b8" }}>ENTRY (TRIGGER)</label>
          <input
            type="number"
            value={entryPrice}
            onChange={(e) => setEntryPrice(Number(e.target.value))}
            style={{ width: "100%", background: "#1e293b", border: "1px solid #475569", color: "#00e676", padding: "6px", borderRadius: "4px", fontWeight: "bold" }}
          />
        </div>
        <div>
          <label style={{ fontSize: "11px", color: "#94a3b8" }}>STOP LOSS (PIVOT)</label>
          <input
            type="number"
            value={slPrice}
            onChange={(e) => setSlPrice(Number(e.target.value))}
            style={{ width: "100%", background: "#1e293b", border: "1px solid #475569", color: "#ef4444", padding: "6px", borderRadius: "4px", fontWeight: "bold" }}
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
        <button
          onClick={() => { setDirection("LONG"); calculateTargets(); }}
          style={{ flex: 1, padding: "8px", background: direction === "LONG" ? "#00e676" : "#1e293b", color: direction === "LONG" ? "#000" : "#fff", fontWeight: "bold", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          BUY CE (LONG)
        </button>
        <button
          onClick={() => { setDirection("SHORT"); calculateTargets(); }}
          style={{ flex: 1, padding: "8px", background: direction === "SHORT" ? "#ef4444" : "#1e293b", color: "#fff", fontWeight: "bold", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          BUY PE (SHORT)
        </button>
      </div>

      {/* Institutional Protocol Alert */}
      <div style={{ background: "#1e1b4b", border: "1px solid #6366f1", padding: "8px", borderRadius: "4px", marginBottom: "12px", fontSize: "12px", color: "#c7d2fe" }}>
        ⚡ <strong>INSTITUTIONAL RULE:</strong> At <strong>T1 (38.2%)</strong> $\rightarrow$ Book <strong>50% Quantity</strong> & Move SL to Entry (Cost: ₹{entryPrice})!
      </div>

      {/* Target Grid */}
      {targets && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
          <div style={{ background: "#0f172a", border: "1px solid #22c55e", padding: "8px", borderRadius: "4px", textAlign: "center" }}>
            <div style={{ fontSize: "11px", color: "#86efac" }}>T1 (0.382) - BOOK 50%</div>
            <div style={{ fontSize: "16px", fontWeight: "bold", color: "#22c55e" }}>₹{targets.T1_382}</div>
          </div>
          <div style={{ background: "#0f172a", border: "1px solid #38bdf8", padding: "8px", borderRadius: "4px", textAlign: "center" }}>
            <div style={{ fontSize: "11px", color: "#7dd3fc" }}>T2 (0.618) - GOLDEN</div>
            <div style={{ fontSize: "16px", fontWeight: "bold", color: "#38bdf8" }}>₹{targets.T2_618}</div>
          </div>
          <div style={{ background: "#0f172a", border: "1px solid #eab308", padding: "8px", borderRadius: "4px", textAlign: "center" }}>
            <div style={{ fontSize: "11px", color: "#fde047" }}>T3 (1.000) - 1:1 LEG</div>
            <div style={{ fontSize: "16px", fontWeight: "bold", color: "#eab308" }}>₹{targets.T3_1000}</div>
          </div>
          <div style={{ background: "#0f172a", border: "1px solid #a855f7", padding: "8px", borderRadius: "4px", textAlign: "center" }}>
            <div style={{ fontSize: "11px", color: "#d8b4fe" }}>T4 (1.618) - EXT 1</div>
            <div style={{ fontSize: "16px", fontWeight: "bold", color: "#a855f7" }}>₹{targets.T4_1618}</div>
          </div>
          <div style={{ background: "#0f172a", border: "1px solid #f97316", padding: "8px", borderRadius: "4px", textAlign: "center" }}>
            <div style={{ fontSize: "11px", color: "#fdba74" }}>T5 (2.618) - RUNNER</div>
            <div style={{ fontSize: "16px", fontWeight: "bold", color: "#f97316" }}>₹{targets.T5_2618}</div>
          </div>
          <div style={{ background: "#0f172a", border: "1px solid #ec4899", padding: "8px", borderRadius: "4px", textAlign: "center" }}>
            <div style={{ fontSize: "11px", color: "#f472b6" }}>T6 (4.236) - SUPER</div>
            <div style={{ fontSize: "16px", fontWeight: "bold", color: "#ec4899" }}>₹{targets.T6_4236}</div>
          </div>
        </div>
      )}
    </div>
  );
}
