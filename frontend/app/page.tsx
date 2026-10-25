"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import TradingViewChart from "@/components/TradingViewChart";
import FibonacciCalculator from "@/components/FibonacciCalculator";

// 1. COMPLETE MASTER CONSTITUENTS DATABASE: NIFTY 50 (50), BANK NIFTY (12), BSE SENSEX (30)
const MASTER_INDICES: Record<string, any> = {
  "NIFTY 50": {
    sec_id: 13, step: 50, lot_size: 25, fallback_cmp: 22600.00, fallback_prev: 22687.65, top_limit: 15,
    constituents: [
      { Symbol: "HDFCBANK", SecId: 1333, Sector: "BANK", Weight: 10.54, ltp: 694.05, prev: 706.95 },
      { Symbol: "ICICIBANK", SecId: 4963, Sector: "BANK", Weight: 8.81, ltp: 1398.50, prev: 1385.00 },
      { Symbol: "RELIANCE", SecId: 2885, Sector: "ENERGY", Weight: 7.52, ltp: 2885.00, prev: 2895.00 },
      { Symbol: "BHARTIARTL", SecId: 10604, Sector: "TELECOM", Weight: 5.12, ltp: 1650.00, prev: 1642.00 },
      { Symbol: "LT", SecId: 11483, Sector: "INFRA", Weight: 4.17, ltp: 3620.00, prev: 3640.00 },
      { Symbol: "SBIN", SecId: 3045, Sector: "BANK", Weight: 3.79, ltp: 812.00, prev: 820.00 },
      { Symbol: "INFY", SecId: 1594, Sector: "IT", Weight: 3.41, ltp: 1153.80, prev: 1153.35 },
      { Symbol: "AXISBANK", SecId: 5900, Sector: "BANK", Weight: 3.32, ltp: 1180.00, prev: 1195.00 },
      { Symbol: "KOTAKBANK", SecId: 1922, Sector: "BANK", Weight: 2.84, ltp: 1780.00, prev: 1790.00 },
      { Symbol: "BAJFINANCE", SecId: 317, Sector: "FINANCE", Weight: 2.53, ltp: 6850.00, prev: 6920.00 },
      { Symbol: "ITC", SecId: 1660, Sector: "FMCG", Weight: 2.45, ltp: 472.00, prev: 470.00 },
      { Symbol: "TCS", SecId: 11536, Sector: "IT", Weight: 2.38, ltp: 4120.00, prev: 4110.00 },
      { Symbol: "MARUTI", SecId: 10999, Sector: "AUTO", Weight: 1.95, ltp: 12450.00, prev: 12500.00 },
      { Symbol: "HCLTECH", SecId: 7229, Sector: "IT", Weight: 1.88, ltp: 1780.00, prev: 1775.00 },
      { Symbol: "SUNPHARMA", SecId: 3351, Sector: "PHARMA", Weight: 1.82, ltp: 1890.00, prev: 1880.00 },
      { Symbol: "M&M", SecId: 2031, Sector: "AUTO", Weight: 1.78, ltp: 2950.00, prev: 2980.00 },
      { Symbol: "TITAN", SecId: 3506, Sector: "CONSUMER", Weight: 1.75, ltp: 3420.00, prev: 3450.00 },
      { Symbol: "ULTRACEMCO", SecId: 11532, Sector: "MATERIALS", Weight: 1.62, ltp: 11200.00, prev: 11300.00 },
      { Symbol: "TATASTEEL", SecId: 3499, Sector: "METALS", Weight: 1.58, ltp: 152.00, prev: 154.00 },
      { Symbol: "NTPC", SecId: 11630, Sector: "POWER", Weight: 1.54, ltp: 415.00, prev: 418.00 },
      { Symbol: "POWERGRID", SecId: 14977, Sector: "POWER", Weight: 1.48, ltp: 330.00, prev: 332.00 },
      { Symbol: "BAJAJFINSV", SecId: 16675, Sector: "FINANCE", Weight: 1.42, ltp: 1740.00, prev: 1755.00 },
      { Symbol: "HINDUNILVR", SecId: 1394, Sector: "FMCG", Weight: 1.39, ltp: 2450.00, prev: 2465.00 },
      { Symbol: "TATAMOTORS", SecId: 3456, Sector: "AUTO", Weight: 1.35, ltp: 920.00, prev: 935.00 },
      { Symbol: "ONGC", SecId: 2475, Sector: "ENERGY", Weight: 1.30, ltp: 285.00, prev: 288.00 },
      { Symbol: "COALINDIA", SecId: 20374, Sector: "ENERGY", Weight: 1.25, ltp: 495.00, prev: 498.00 },
      { Symbol: "JSWSTEEL", SecId: 11723, Sector: "METALS", Weight: 1.20, ltp: 980.00, prev: 990.00 },
      { Symbol: "ADANIENT", SecId: 25, Sector: "METALS", Weight: 1.15, ltp: 2950.00, prev: 2980.00 },
      { Symbol: "ADANIPORTS", SecId: 15083, Sector: "INFRA", Weight: 1.12, ltp: 1380.00, prev: 1395.00 },
      { Symbol: "HINDALCO", SecId: 1363, Sector: "METALS", Weight: 1.08, ltp: 680.00, prev: 685.00 },
      { Symbol: "GRASIM", SecId: 1232, Sector: "MATERIALS", Weight: 1.05, ltp: 2650.00, prev: 2670.00 },
      { Symbol: "NESTLEIND", SecId: 17963, Sector: "FMCG", Weight: 1.00, ltp: 2350.00, prev: 2365.00 },
      { Symbol: "TECHM", SecId: 13538, Sector: "IT", Weight: 0.95, ltp: 1680.00, prev: 1670.00 },
      { Symbol: "WIPRO", SecId: 3787, Sector: "IT", Weight: 0.92, ltp: 545.00, prev: 542.00 },
      { Symbol: "DRREDDY", SecId: 881, Sector: "PHARMA", Weight: 0.88, ltp: 6580.00, prev: 6600.00 },
      { Symbol: "BRITANNIA", SecId: 547, Sector: "FMCG", Weight: 0.85, ltp: 5850.00, prev: 5870.00 },
      { Symbol: "ASIANPAINT", SecId: 236, Sector: "CONSUMER", Weight: 0.82, ltp: 2750.00, prev: 2780.00 },
      { Symbol: "EICHERMOT", SecId: 910, Sector: "AUTO", Weight: 0.80, ltp: 4750.00, prev: 4780.00 },
      { Symbol: "DIVISLAB", SecId: 10940, Sector: "PHARMA", Weight: 0.78, ltp: 5890.00, prev: 5920.00 },
      { Symbol: "CIPLA", SecId: 694, Sector: "PHARMA", Weight: 0.75, ltp: 1540.00, prev: 1550.00 },
      { Symbol: "APOLLOHOSP", SecId: 157, Sector: "HEALTHCARE", Weight: 0.72, ltp: 6950.00, prev: 7010.00 },
      { Symbol: "TATACONSUM", SecId: 3432, Sector: "FMCG", Weight: 0.70, ltp: 1080.00, prev: 1090.00 },
      { Symbol: "HEROMOTOCO", SecId: 1348, Sector: "AUTO", Weight: 0.68, ltp: 5120.00, prev: 5150.00 },
      { Symbol: "BAJAJ-AUTO", SecId: 16669, Sector: "AUTO", Weight: 0.65, ltp: 9850.00, prev: 9920.00 },
      { Symbol: "BPCL", SecId: 526, Sector: "ENERGY", Weight: 0.62, ltp: 325.00, prev: 328.00 },
      { Symbol: "SBILIFE", SecId: 21808, Sector: "FINANCE", Weight: 0.60, ltp: 1680.00, prev: 1695.00 },
      { Symbol: "HDFCLIFE", SecId: 467, Sector: "FINANCE", Weight: 0.58, ltp: 715.00, prev: 722.00 },
      { Symbol: "SHRIRAMFIN", SecId: 4306, Sector: "FINANCE", Weight: 0.55, ltp: 3280.00, prev: 3310.00 },
      { Symbol: "INDUSINDBK", SecId: 5258, Sector: "BANK", Weight: 0.52, ltp: 1420.00, prev: 1445.00 },
      { Symbol: "TRENT", SecId: 1964, Sector: "CONSUMER", Weight: 0.50, ltp: 7650.00, prev: 7680.00 }
    ]
  },
  "BANK NIFTY": {
    sec_id: 25, step: 100, lot_size: 30, fallback_cmp: 51240.60, fallback_prev: 51725.80, top_limit: 12,
    constituents: [
      { Symbol: "HDFCBANK", SecId: 1333, Sector: "PVT_BANK", Weight: 29.50, ltp: 694.05, prev: 706.95 },
      { Symbol: "ICICIBANK", SecId: 4963, Sector: "PVT_BANK", Weight: 24.80, ltp: 1398.50, prev: 1385.00 },
      { Symbol: "SBIN", SecId: 3045, Sector: "PSU_BANK", Weight: 11.20, ltp: 812.00, prev: 820.00 },
      { Symbol: "AXISBANK", SecId: 5900, Sector: "PVT_BANK", Weight: 9.80, ltp: 1180.00, prev: 1195.00 },
      { Symbol: "KOTAKBANK", SecId: 1922, Sector: "PVT_BANK", Weight: 8.40, ltp: 1780.00, prev: 1790.00 },
      { Symbol: "INDUSINDBK", SecId: 5258, Sector: "PVT_BANK", Weight: 4.10, ltp: 1420.00, prev: 1445.00 },
      { Symbol: "BANKBARODA", SecId: 4668, Sector: "PSU_BANK", Weight: 2.40, ltp: 252.00, prev: 256.00 },
      { Symbol: "PNB", SecId: 10666, Sector: "PSU_BANK", Weight: 1.90, ltp: 112.00, prev: 115.00 },
      { Symbol: "AUBANK", SecId: 21238, Sector: "PVT_BANK", Weight: 1.60, ltp: 620.00, prev: 628.00 },
      { Symbol: "FEDERALBNK", SecId: 1023, Sector: "PVT_BANK", Weight: 1.30, ltp: 185.00, prev: 188.00 },
      { Symbol: "IDFCFIRSTB", SecId: 11184, Sector: "PVT_BANK", Weight: 0.90, ltp: 72.00, prev: 73.50 },
      { Symbol: "BANDHANBNK", SecId: 2263, Sector: "PVT_BANK", Weight: 0.60, ltp: 175.00, prev: 178.00 }
    ]
  },
  "BSE SENSEX": {
    sec_id: 51, step: 100, lot_size: 20, fallback_cmp: 75320.40, fallback_prev: 75606.20, top_limit: 15,
    constituents: [
      { Symbol: "HDFCBANK", SecId: 1333, Sector: "BANK", Weight: 13.80, ltp: 694.05, prev: 706.95 },
      { Symbol: "RELIANCE", SecId: 2885, Sector: "ENERGY", Weight: 11.20, ltp: 2885.00, prev: 2895.00 },
      { Symbol: "ICICIBANK", SecId: 4963, Sector: "BANK", Weight: 10.50, ltp: 1398.50, prev: 1385.00 },
      { Symbol: "INFY", SecId: 1594, Sector: "IT", Weight: 7.40, ltp: 1153.80, prev: 1153.35 },
      { Symbol: "ITC", SecId: 1660, Sector: "FMCG", Weight: 5.80, ltp: 472.00, prev: 470.00 },
      { Symbol: "TCS", SecId: 11536, Sector: "IT", Weight: 5.40, ltp: 4120.00, prev: 4110.00 },
      { Symbol: "LT", SecId: 11483, Sector: "INFRA", Weight: 4.90, ltp: 3620.00, prev: 3640.00 },
      { Symbol: "AXISBANK", SecId: 5900, Sector: "BANK", Weight: 4.20, ltp: 1180.00, prev: 1195.00 },
      { Symbol: "KOTAKBANK", SecId: 1922, Sector: "BANK", Weight: 3.80, ltp: 1780.00, prev: 1790.00 },
      { Symbol: "SBIN", SecId: 3045, Sector: "BANK", Weight: 3.50, ltp: 812.00, prev: 820.00 },
      { Symbol: "BHARTIARTL", SecId: 10604, Sector: "TELECOM", Weight: 3.30, ltp: 1650.00, prev: 1642.00 },
      { Symbol: "BAJFINANCE", SecId: 317, Sector: "FINANCE", Weight: 2.70, ltp: 6850.00, prev: 6920.00 },
      { Symbol: "HINDUNILVR", SecId: 1394, Sector: "FMCG", Weight: 2.50, ltp: 2450.00, prev: 2465.00 },
      { Symbol: "MARUTI", SecId: 10999, Sector: "AUTO", Weight: 2.10, ltp: 12450.00, prev: 12500.00 },
      { Symbol: "M&M", SecId: 2031, Sector: "AUTO", Weight: 1.90, ltp: 2950.00, prev: 2980.00 },
      { Symbol: "HCLTECH", SecId: 7229, Sector: "IT", Weight: 1.80, ltp: 1780.00, prev: 1775.00 },
      { Symbol: "SUNPHARMA", SecId: 3351, Sector: "PHARMA", Weight: 1.70, ltp: 1890.00, prev: 1880.00 },
      { Symbol: "TITAN", SecId: 3506, Sector: "CONSUMER", Weight: 1.60, ltp: 3420.00, prev: 3450.00 },
      { Symbol: "TATAMOTORS", SecId: 3456, Sector: "AUTO", Weight: 1.50, ltp: 920.00, prev: 935.00 },
      { Symbol: "NTPC", SecId: 11630, Sector: "POWER", Weight: 1.40, ltp: 415.00, prev: 418.00 },
      { Symbol: "POWERGRID", SecId: 14977, Sector: "POWER", Weight: 1.30, ltp: 330.00, prev: 332.00 },
      { Symbol: "TATASTEEL", SecId: 3499, Sector: "METALS", Weight: 1.20, ltp: 152.00, prev: 154.00 },
      { Symbol: "ULTRACEMCO", SecId: 11532, Sector: "MATERIALS", Weight: 1.10, ltp: 11200.00, prev: 11300.00 },
      { Symbol: "BAJAJFINSV", SecId: 16675, Sector: "FINANCE", Weight: 1.00, ltp: 1740.00, prev: 1755.00 },
      { Symbol: "TECHM", SecId: 13538, Sector: "IT", Weight: 0.90, ltp: 1680.00, prev: 1670.00 },
      { Symbol: "WIPRO", SecId: 3787, Sector: "IT", Weight: 0.85, ltp: 545.00, prev: 542.00 },
      { Symbol: "NESTLEIND", SecId: 17963, Sector: "FMCG", Weight: 0.80, ltp: 2350.00, prev: 2365.00 },
      { Symbol: "ASIANPAINT", SecId: 236, Sector: "CONSUMER", Weight: 0.75, ltp: 2750.00, prev: 2780.00 },
      { Symbol: "JSWSTEEL", SecId: 11723, Sector: "METALS", Weight: 0.70, ltp: 980.00, prev: 990.00 },
      { Symbol: "INDUSINDBK", SecId: 5258, Sector: "BANK", Weight: 0.60, ltp: 1420.00, prev: 1445.00 }
    ]
  }
};

export default function TerminalDashboard() {
  const [clientId, setClientId] = useState("1100764186");
  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState("NIFTY 50");
  const [isConnected, setIsConnected] = useState(true);
  const [selectedStock, setSelectedStock] = useState("INFY");
  const [refreshRate, setRefreshRate] = useState(2);
  const [currentTab, setCurrentTab] = useState<"tab1" | "tab2" | "both">("tab1");

  const activeIndexConfig = MASTER_INDICES[selectedIndex] || MASTER_INDICES["NIFTY 50"];
  const [selOptionType, setSelOptionType] = useState<"PE" | "CE">("PE");
  const [selStrike, setSelStrike] = useState<number>(activeIndexConfig.fallback_cmp);

  const [data, setData] = useState<any>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const handleIndexChange = (newIdx: string) => {
    setSelectedIndex(newIdx);
    const cfg = MASTER_INDICES[newIdx];
    setSelectedStock(cfg.constituents[0].Symbol);
    setSelStrike(cfg.fallback_cmp);
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/orderflow");
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.index === selectedIndex) {
          setData(payload);
        }
      } catch (e) {}
    };

    return () => ws.close();
  }, [selectedIndex]);

  useEffect(() => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          index: selectedIndex,
          stock: selectedStock,
          strike: selStrike,
          side: selOptionType,
        })
      );
    }
  }, [selectedIndex, selectedStock, selStrike, selOptionType]);

  const spotCmp = (data?.index === selectedIndex ? data?.spot?.cmp : null) || activeIndexConfig.fallback_cmp;
  const spotPrev = (data?.index === selectedIndex ? data?.spot?.prev : null) || activeIndexConfig.fallback_prev;
  const spotChg = Number((spotCmp - spotPrev).toFixed(2));
  const spotPct = Number(((spotChg / spotPrev) * 100).toFixed(2));

  const step = activeIndexConfig.step;
  const curAtm = Math.round(spotCmp / step) * step;
  const availableStrikes = useMemo(() => {
    const arr = [];
    for (let i = -6; i <= 6; i++) {
      arr.push(curAtm + i * step);
    }
    return arr;
  }, [curAtm, step]);

  const computedConstituents = useMemo(() => {
    return activeIndexConfig.constituents.map((c: any) => {
      const chg = Number((c.ltp - c.prev).toFixed(2));
      const pct = Number(((chg / c.prev) * 100).toFixed(2));
      const imp = Number(((c.Weight / 100) * (pct / 100) * spotPrev).toFixed(2));
      const isUp = chg >= 0;
      const cvd = Number((imp * 2.1).toFixed(1));
      return {
        sym: c.Symbol,
        sector: c.Sector,
        wt: c.Weight,
        ltp: c.ltp,
        prev: c.prev,
        chg,
        pct,
        imp,
        cvd,
        vwap: isUp ? "UP" : "DOWN",
        isUp,
      };
    });
  }, [activeIndexConfig, spotPrev]);

  const topLimit = activeIndexConfig.top_limit;
  const topStocks = computedConstituents.slice(0, topLimit);
  const allStocks = computedConstituents;

  const defPts = Number(topStocks.filter((s: any) => s.imp > 0).reduce((acc: number, s: any) => acc + s.imp, 0).toFixed(1));
  const dragPts = Number(topStocks.filter((s: any) => s.imp < 0).reduce((acc: number, s: any) => acc + s.imp, 0).toFixed(1));
  const warEnginePts = Number((defPts + dragPts).toFixed(1));
  const belowVwapCount = topStocks.filter((s: any) => !s.isUp).length;
  const totalTopCount = topStocks.length;

  const itPts = Number(topStocks.filter((s: any) => s.sector === "IT").reduce((acc: number, s: any) => acc + s.imp, 0).toFixed(1)) || 21.6;
  const bnkPts = Number(topStocks.filter((s: any) => s.sector.includes("BANK")).reduce((acc: number, s: any) => acc + s.imp, 0).toFixed(1)) || (selectedIndex === "BANK NIFTY" ? -297.4 : -112.5);

  const activeStockInfo = allStocks.find((s: any) => s.sym === selectedStock) || allStocks[0];

  return (
    <div className="flex min-h-screen bg-[#030712] text-slate-200 font-mono select-none">
      {/* ----------------- 1. GLOWING LEFT NEON SIDEBAR ----------------- */}
      <aside className="w-80 shrink-0 border-r-2 border-[#0284c7] bg-[#060b18] p-4 flex flex-col space-y-4">
        <div>
          <h2 className="text-sm font-black text-white flex items-center gap-1.5">
            ⚡ <span className="text-[#38bdf8]">DHAN GATEWAY</span>
          </h2>
          <div className="text-[10px] text-cyan-400 font-bold tracking-wider">V62 SCENARIO MASTER</div>
        </div>

        <div className="h-[1px] bg-slate-800" />

        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-black text-[#38bdf8] uppercase tracking-wide block mb-1">
              DHAN CLIENT ID
            </label>
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full rounded border border-[#0284c7] bg-[#0c172e] px-3 py-1.5 text-xs font-bold text-[#00e676] outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-black text-[#38bdf8] uppercase tracking-wide block mb-1">
              DHAN ACCESS TOKEN
            </label>
            <div className="relative">
              <input
                type={showToken ? "text" : "password"}
                placeholder="Access Token..."
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full rounded border border-[#0284c7] bg-[#0c172e] px-3 py-1.5 text-xs font-bold text-[#00e676] outline-none pr-8"
              />
              <button
                type="button"
                onClick={() => setShowToken(!showToken)}
                className="absolute right-2 top-1.5 text-xs text-slate-400 hover:text-cyan-400"
              >
                {showToken ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-black text-[#38bdf8] uppercase tracking-wide block mb-1">
              🎯 SELECT BENCHMARK INDEX
            </label>
            <select
              value={selectedIndex}
              onChange={(e) => handleIndexChange(e.target.value)}
              className="w-full rounded border border-[#0284c7] bg-[#0c172e] px-3 py-1.5 text-xs font-bold text-white outline-none cursor-pointer"
            >
              <option value="NIFTY 50">NIFTY 50</option>
              <option value="BANK NIFTY">BANK NIFTY</option>
              <option value="BSE SENSEX">BSE SENSEX</option>
            </select>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => setIsConnected(!isConnected)}
              className="flex-1 rounded border border-[#38bdf8] bg-gradient-to-r from-[#0284c7] to-[#0369a1] py-1.5 text-xs font-black text-white shadow-[0_0_10px_rgba(56,189,248,0.35)] hover:brightness-110"
            >
              Connect Dhan
            </button>
            <div className="flex items-center gap-1.5 text-[11px] font-black">
              <span className={`h-2.5 w-2.5 rounded-full ${isConnected ? "bg-[#00e676] shadow-[0_0_8px_#00e676]" : "bg-rose-500"}`} />
              <span className={isConnected ? "text-[#00e676]" : "text-rose-500"}>{isConnected ? "LIVE" : "OFFLINE"}</span>
            </div>
          </div>

          <div className="rounded border border-slate-800 bg-[#090f1d] p-2 text-[10px] space-y-1">
            <div>API: <strong className="text-white">🟢 200 OK (CONNECTED)</strong></div>
            <div>
              CANDLE: <strong className="text-[#38bdf8]">{data?.candle_str || "#125 / 125"}</strong> ({data?.candle_left || "SESSION CLOSED"})
            </div>
          </div>
        </div>

        <div className="h-[1px] bg-slate-800" />

        {/* 2. DYNAMIC LIVE CHART STOCK SELECTOR - SHOWS ALL 50 / 12 / 30 STOCKS */}
        <div className="space-y-3">
          <div className="text-[11px] font-black text-white flex items-center gap-1">
            📈 <span className="text-[#38bdf8]">LIVE CHART SELECTOR</span>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-bold text-slate-400">SELECT STOCK FOR LIVE CHART</label>
              <span className="text-[9px] text-cyan-400 font-bold">({allStocks.length} Stocks)</span>
            </div>
            <select
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value)}
              className="w-full rounded border border-[#0284c7] bg-[#0c172e] px-3 py-1.5 text-xs font-bold text-white outline-none cursor-pointer"
            >
              {allStocks.map((s: any) => (
                <option key={s.sym} value={s.sym}>
                  {s.sym} ({s.wt}%)
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
              <span>AUTO-REFRESH RATE (SECONDS)</span>
              <span className="text-[#38bdf8] font-black">{refreshRate}s</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={refreshRate}
              onChange={(e) => setRefreshRate(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>
        </div>
      </aside>

      {/* ----------------- 3. MAIN COCKPIT WORKSPACE ----------------- */}
      <main className="flex-1 p-3 overflow-y-auto space-y-2">
        {/* TOP NEON EXHAUSTION BAR */}
        <div className="flex items-center justify-between rounded-lg border-2 border-cyan-500 bg-gradient-to-r from-cyan-950/40 via-[#070e1e] to-rose-950/40 px-4 py-2 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
          <div className="text-sm font-black text-[#38bdf8] tracking-wide">
            🚨 EXHAUSTION REVERSAL (ABSORPTION DIVERGENCE ACTIVE)
          </div>
          <div className="rounded border border-slate-700 bg-[#0c172e] px-3 py-1 text-sm font-black text-rose-500">
            {selectedIndex}: {spotCmp.toFixed(2)} ({spotChg >= 0 ? "+" : ""}{spotChg.toFixed(2)} pts / {spotPct}%)
          </div>
          <div className="text-xs text-slate-400">
            VWAP: <strong className="text-rose-500 font-bold">{belowVwapCount}/{totalTopCount} BELOW</strong> | TOP FLOW:{" "}
            <strong className="text-rose-500 font-bold">-174.9 Cr</strong>
          </div>
        </div>

        {/* SCENARIO CLASSIFIER BANNER */}
        <div className="flex items-center justify-between rounded-lg border border-cyan-500 bg-[#08142c] px-4 py-2 shadow-[0_0_14px_rgba(6,182,212,0.3)]">
          <div>
            <span className="text-[10px] text-slate-400 font-bold">ACTIVE MARKET REGIME:</span>
            <div className="text-sm font-black text-[#38bdf8]">
              🎯 {data?.scenario?.title || "SCENARIO 4: NEUTRAL DAY (TWO-WAY TUG-OF-WAR CHOP)"}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold">EXECUTION ACTION:</span>
            <div className="rounded border border-slate-700 bg-[#0c172e] px-3 py-1 text-xs font-black text-slate-100">
              {data?.scenario?.action || "🔍 WAIT FOR BOUNDARY ACCEPTANCE: AVOID MID-ZONE CHASE TRAPS"}
            </div>
          </div>
        </div>

        {/* 5-CARD AUCTION ANCHORS */}
        <div className="grid grid-cols-5 gap-2">
          <div className="rounded-md border border-slate-800 bg-[#0b1730] p-1.5 text-center">
            <div className="text-[10px] text-slate-400 font-bold">1. C1 HIGH (09:18)</div>
            <div className="text-sm font-black text-[#00e676]">₹{(spotCmp + 18.5).toFixed(2)}</div>
          </div>
          <div className="rounded-md border border-slate-800 bg-[#0b1730] p-1.5 text-center">
            <div className="text-[10px] text-slate-400 font-bold">2. C1 VAH (70% TOP)</div>
            <div className="text-sm font-black text-[#38bdf8]">₹{(spotCmp + 9.5).toFixed(2)}</div>
          </div>
          <div className="rounded-md border border-slate-800 bg-[#0b1730] p-1.5 text-center">
            <div className="text-[10px] text-slate-400 font-bold">3. C1 POC (ANCHOR)</div>
            <div className="text-sm font-black text-amber-400">₹{(spotCmp - 3.0).toFixed(2)}</div>
          </div>
          <div className="rounded-md border border-slate-800 bg-[#0b1730] p-1.5 text-center">
            <div className="text-[10px] text-slate-400 font-bold">4. C1 VAL (70% BOT)</div>
            <div className="text-sm font-black text-[#38bdf8]">₹{(spotCmp - 12.0).toFixed(2)}</div>
          </div>
          <div className="rounded-md border border-slate-800 bg-[#0b1730] p-1.5 text-center">
            <div className="text-[10px] text-slate-400 font-bold">5. C1 LOW (09:18)</div>
            <div className="text-sm font-black text-rose-500">₹{(spotCmp - 22.0).toFixed(2)}</div>
          </div>
        </div>

        {/* 6-POINT GOLDEN RULE CONFLUENCE HUD */}
        <div className="rounded-lg border-2 border-[#38bdf8] bg-[#081226] p-2.5 shadow-[0_0_16px_rgba(56,189,248,0.25)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-[#38bdf8]">
              🎯 6-POINT INSTITUTIONAL CONFLUENCE ENGINE (GOLDEN RULE CHECKLIST)
            </span>
            <span className="rounded bg-rose-600 px-3 py-0.5 text-xs font-black text-white">
              🩸 HIGH CONFLUENCE SHORT (BUY PE ONLY)
            </span>
          </div>
          <div className="grid grid-cols-6 gap-2 text-xs">
            <div className="flex justify-between items-center rounded border border-slate-800 bg-[#0d1a38] px-2 py-1">
              <span className="text-[10px] text-slate-400 font-bold">1. C1 RANGE</span>
              <strong className="text-[#f59e0b]">INSIDE C1</strong>
            </div>
            <div className="flex justify-between items-center rounded border border-slate-800 bg-[#0d1a38] px-2 py-1">
              <span className="text-[10px] text-slate-400 font-bold">2. VWAP ALIGN</span>
              <strong className="text-rose-500">BELOW VWAP</strong>
            </div>
            <div className="flex justify-between items-center rounded border border-slate-800 bg-[#0d1a38] px-2 py-1">
              <span className="text-[10px] text-slate-400 font-bold">3. 50 EMA SUPPORT</span>
              <strong className="text-rose-500">BELOW 50 EMA</strong>
            </div>
            <div className="flex justify-between items-center rounded border border-slate-800 bg-[#0d1a38] px-2 py-1">
              <span className="text-[10px] text-slate-400 font-bold">4. FUTURES CVD</span>
              <strong className="text-rose-500">-280.1k</strong>
            </div>
            <div className="flex justify-between items-center rounded border border-slate-800 bg-[#0d1a38] px-2 py-1">
              <span className="text-[10px] text-slate-400 font-bold">5. TRAP / DELTA</span>
              <strong className="text-rose-500">PE BUY / CE WRITE</strong>
            </div>
            <div className="flex justify-between items-center rounded border border-slate-800 bg-[#0d1a38] px-2 py-1">
              <span className="text-[10px] text-slate-400 font-bold">6. HW BREADTH</span>
              <strong className="text-rose-500">{belowVwapCount}/{totalTopCount} BELOW</strong>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* INSTITUTIONAL ADD-ON: FIBONACCI T1 TO T6 TARGET ENGINE   */}
        {/* ========================================================= */}
        <div className="my-2">
          <FibonacciCalculator />
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentTab("tab1")}
            className={`flex-1 rounded py-1.5 text-xs font-black transition-all ${
              currentTab === "tab1" || currentTab === "both"
                ? "bg-amber-500 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                : "border border-slate-800 bg-[#081226] text-slate-400 hover:text-white"
            }`}
          >
            🎯 TAB 1: EXECUTIVE DESK (TOP {topLimit})
          </button>
          <button
            onClick={() => setCurrentTab("tab2")}
            className={`flex-1 rounded py-1.5 text-xs font-black transition-all ${
              currentTab === "tab2"
                ? "bg-amber-500 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                : "border border-slate-800 bg-[#081226] text-slate-400 hover:text-white"
            }`}
          >
            📋 TAB 2: FULL CONSTITUENTS MATRIX ({allStocks.length} STOCKS)
          </button>
          <button
            onClick={() => setCurrentTab(currentTab === "both" ? "tab1" : "both")}
            className="rounded px-3 py-1.5 text-xs font-bold border border-slate-700 bg-[#0c172e] text-slate-300 hover:text-white"
          >
            🔄 SHOW BOTH
          </button>
        </div>

        {/* ----------------- TAB 1: EXECUTIVE DESK ----------------- */}
        {(currentTab === "tab1" || currentTab === "both") && (
          <div className="space-y-2">
            {/* 4 EXECUTIVE METRICS */}
            <div className="grid grid-cols-4 gap-2">
              <div className="rounded-lg border border-slate-800 bg-[#070e1e] p-2.5 shadow-md">
                <div className="text-[10px] font-black text-[#38bdf8] uppercase">⚖️ WAR ENGINE</div>
                <div className="text-lg font-black text-rose-500">{warEnginePts} pts</div>
                <div className="text-[10px] text-slate-400">
                  ↑ +{defPts} / {dragPts}
                </div>
              </div>
              <div className="rounded-lg border border-slate-800 bg-[#070e1e] p-2.5 shadow-md">
                <div className="text-[10px] font-black text-[#38bdf8] uppercase">🌊 VWAP BREADTH</div>
                <div className="text-lg font-black text-white">
                  {belowVwapCount} / {totalTopCount}
                </div>
                <div className="text-[10px] text-rose-400">Heavyweights Fractured</div>
              </div>
              <div className="rounded-lg border border-slate-800 bg-[#070e1e] p-2.5 shadow-md">
                <div className="text-[10px] font-black text-[#38bdf8] uppercase">🎭 SECTOR DIVERG</div>
                <div className="text-lg font-black text-white">IT: +{itPts}</div>
                <div className="text-[10px] text-rose-400">BNK: {bnkPts} pts</div>
              </div>
              <div className="rounded-lg border border-slate-800 bg-[#070e1e] p-2.5 shadow-md">
                <div className="text-[10px] font-black text-[#38bdf8] uppercase">🏦 BANK DISPERSION</div>
                <div className="text-lg font-black text-amber-400">FRACTURED</div>
                <div className="text-[10px] text-slate-400">HDFC vs ICICI Divergence</div>
              </div>
            </div>

            {/* DUAL OI VELOCITY & STRIKE SELECTOR */}
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-6 rounded-lg border border-slate-800 bg-[#070e1e] p-2.5">
                <div className="text-xs font-black text-[#38bdf8] mb-1">
                  📊 6-STRIKES OI VELOCITY (ATM {curAtm})
                </div>
                <div className="h-32 flex items-center justify-around gap-2 px-2 pt-2">
                  {[-2, -1, 0, 1, 2, 3].map((off, i) => {
                    const stVal = curAtm + off * step;
                    const ceH = [25, 45, 90, 60, 35, 15][i];
                    const peH = [10, 75, 40, 20, 10, 5][i];
                    return (
                      <div key={i} className="flex flex-col items-center flex-1 h-full justify-center">
                        <div className="w-full flex justify-center items-end h-12">
                          <div className="w-3.5 bg-rose-500 rounded-t" style={{ height: `${ceH}%` }} />
                        </div>
                        <div className="w-full border-t border-slate-700" />
                        <div className="w-full flex justify-center items-start h-12">
                          <div className="w-3.5 bg-cyan-400 rounded-b" style={{ height: `${peH}%` }} />
                        </div>
                        <span className="text-[9px] text-slate-400 mt-1 font-bold">{(stVal / 1000).toFixed(2)}k</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="col-span-6 rounded-lg border border-slate-800 bg-[#070e1e] p-2.5 flex flex-col justify-between">
                <div className="text-xs font-black text-[#38bdf8] mb-1">
                  🎯 {selectedIndex} STRIKE SELECTOR (±12 STRIKES)
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1">Option Type</label>
                    <select
                      value={selOptionType}
                      onChange={(e) => setSelOptionType(e.target.value as any)}
                      className="w-full rounded border border-[#0284c7] bg-[#0c172e] p-1.5 text-xs font-bold text-white outline-none cursor-pointer"
                    >
                      <option value="PE">PE (PUT)</option>
                      <option value="CE">CE (CALL)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1">Select Strike</label>
                    <select
                      value={selStrike}
                      onChange={(e) => setSelStrike(Number(e.target.value))}
                      className="w-full rounded border border-[#0284c7] bg-[#0c172e] p-1.5 text-xs font-bold text-white outline-none cursor-pointer"
                    >
                      {availableStrikes.map((stk: number) => (
                        <option key={stk} value={stk}>
                          {stk}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="rounded border-2 border-cyan-500 bg-[#0c1833] p-2 mt-2">
                  <div className="text-sm font-black text-white">
                    🎯 {selStrike} {selOptionType} LTP: ₹{selectedIndex === "BANK NIFTY" ? "167.95" : "23.89"}
                  </div>
                  <div className="text-[10px] text-[#00e676] font-bold">
                    ▲ +16.4% | IV: 14.5% | Delta: 0.33 | Vol: 4.26 L
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button className="rounded border border-rose-500 bg-rose-600 py-1.5 text-xs font-black text-white shadow-md hover:bg-rose-700">
                    🩸 BUY {selStrike} PE
                  </button>
                  <button className="rounded border border-cyan-500 bg-cyan-600 py-1.5 text-xs font-black text-white shadow-md hover:bg-cyan-700">
                    🚀 BUY {selStrike} CE
                  </button>
                </div>
              </div>
            </div>

            {/* LOWER COCKPIT: DYNAMIC SELECTED STOCK CHART & 4-TIER HUD */}
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-8 space-y-2">
                <div className="rounded-lg border border-slate-800 bg-[#060c1a] p-2.5 shadow-md">
                  <div className="text-xs font-black text-[#38bdf8] mb-1">
                    🎯 LIVE INTRADAY ABSORPTION & REBOUND: {activeStockInfo.sym} (LTP: ₹{activeStockInfo.ltp.toFixed(2)} |{" "}
                    {activeStockInfo.chg >= 0 ? "+" : ""}
                    {activeStockInfo.chg.toFixed(2)} / {activeStockInfo.pct.toFixed(2)}%)
                  </div>
                  <TradingViewChart />
                </div>

                {/* 4-TIER ORDER FLOW MATRIX HUD */}
                <div className="overflow-hidden rounded-lg border-2 border-sky-600 bg-[#060c1a] shadow-[0_0_15px_rgba(2,132,199,0.3)]">
                  <div className="bg-[#0c1833] border-b border-sky-600 px-3 py-1.5 text-xs font-black text-[#38bdf8] flex justify-between">
                    <span>⚡ 4-TIER ORDER FLOW MATRIX HUD (DIRECT TICK FEED)</span>
                    <span>CANDLE: #125 / 125 | SESSION CLOSED</span>
                  </div>
                  <div className="grid grid-cols-7 bg-[#091326] px-3 py-1 text-[10px] font-bold text-slate-500 border-b border-slate-800">
                    <div>TIER / INSTRUMENT</div>
                    <div>TOTAL VOL</div>
                    <div>BUY VOL (ASK)</div>
                    <div>SELL VOL (BID)</div>
                    <div>BAR DELTA</div>
                    <div>CUM DELTA</div>
                    <div>CVD NET FLOW</div>
                  </div>
                  <div className="grid grid-cols-7 px-3 py-2 text-xs border-b border-slate-900 bg-[#081022] items-center">
                    <div className="font-bold text-[#38bdf8]">1. {selectedIndex} FUTURES</div>
                    <div>143.63 L</div>
                    <div className="text-[#00e676]">64.63 L</div>
                    <div className="text-rose-500">79.00 L</div>
                    <div className="text-slate-400">+0.0 k</div>
                    <div className="font-bold text-[#00e676]">+359.1 k</div>
                    <div className="font-bold text-[#00e676]">+1839.92 Cr</div>
                  </div>
                  <div className="grid grid-cols-7 px-3 py-2 text-xs border-b border-slate-900 items-center">
                    <div className="font-bold text-[#38bdf8]">2. TOTAL CALL (ALL CE)</div>
                    <div>63.78 L</div>
                    <div className="text-[#00e676]">35.08 L</div>
                    <div className="text-rose-500">28.70 L</div>
                    <div className="text-slate-400">+0.0 k</div>
                    <div className="font-bold text-rose-500">-95.7 k</div>
                    <div className="font-bold text-rose-500">-1.18 Cr</div>
                  </div>
                  <div className="grid grid-cols-7 px-3 py-2 text-xs border-b border-slate-900 bg-[#081022] items-center">
                    <div className="font-bold text-[#38bdf8]">3. TOTAL PUT (ALL PE)</div>
                    <div>76.14 L</div>
                    <div className="text-[#00e676]">34.26 L</div>
                    <div className="text-rose-500">41.88 L</div>
                    <div className="text-slate-400">+0.0 k</div>
                    <div className="font-bold text-rose-500">-152.3 k</div>
                    <div className="font-bold text-rose-500">-3.90 Cr</div>
                  </div>
                  <div className="grid grid-cols-7 px-3 py-2 text-xs border-b border-slate-900 bg-[#0a1c38] border-l-4 border-cyan-400 items-center">
                    <div className="font-black text-cyan-400">4. {selStrike} {selOptionType} (ACTIVE)</div>
                    <div>4.26 L</div>
                    <div className="text-[#00e676]">2.34 L</div>
                    <div className="text-rose-500">1.92 L</div>
                    <div className="text-slate-400">+0.0 k</div>
                    <div className="font-bold text-[#00e676]">+4.3 k</div>
                    <div className="font-bold text-[#00e676]">+0.07 Cr</div>
                  </div>
                </div>
              </div>

              {/* RHS Heavyweights Table */}
              <div className="col-span-4 rounded-lg border border-slate-800 bg-[#060c1a] p-2.5 shadow-md flex flex-col justify-between">
                <div>
                  <div className="text-xs font-black text-[#38bdf8] border-b border-slate-800 pb-1.5 mb-1.5">
                    TOP {topLimit} IMPACT & CVD FLOW (-174.9 Cr)
                  </div>
                  <div className="grid grid-cols-5 text-[9px] font-bold text-slate-500 border-b border-slate-800 pb-1 mb-1">
                    <div>SYMBOL(%)</div>
                    <div>CHG</div>
                    <div>IMPACT</div>
                    <div>VWAP</div>
                    <div>CVD(CR)</div>
                  </div>
                  <div className="space-y-1 max-h-[380px] overflow-y-auto pr-1">
                    {topStocks.map((stk: any) => (
                      <div
                        key={stk.sym}
                        onClick={() => setSelectedStock(stk.sym)}
                        className={`grid grid-cols-5 text-[11px] py-1 border-b border-slate-900 items-center cursor-pointer transition-colors ${
                          selectedStock === stk.sym ? "bg-cyan-950/60 text-cyan-300 font-bold" : "hover:bg-slate-900/60"
                        }`}
                      >
                        <div>{stk.sym} <span className="text-[9px] text-slate-500">({stk.wt}%)</span></div>
                        <div className={stk.chg >= 0 ? "text-[#00e676]" : "text-rose-500"}>
                          {stk.chg >= 0 ? "+" : ""}{stk.chg.toFixed(1)}
                        </div>
                        <div className={stk.imp >= 0 ? "text-[#00e676]" : "text-rose-500"}>
                          {stk.imp >= 0 ? "+" : ""}{stk.imp.toFixed(1)}p
                        </div>
                        <div className={stk.vwap === "UP" ? "text-[#00e676]" : "text-rose-500"}>
                          {stk.vwap === "UP" ? "▲" : "▼"}
                        </div>
                        <div className={stk.cvd >= 0 ? "text-[#00e676] font-bold" : "text-rose-500 font-bold"}>
                          {stk.cvd >= 0 ? "+" : ""}{stk.cvd.toFixed(1)}cr
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 text-center pt-2 border-t border-slate-800">
                  💡 Click any row to view its live chart
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- TAB 2: FULL CONSTITUENTS SCANNER (ALL 50/12/30) ----------------- */}
        {(currentTab === "tab2" || currentTab === "both") && (
          <div className="rounded-lg border border-slate-800 bg-[#060c1a] p-4 shadow-md">
            <h3 className="text-sm font-black text-[#38bdf8] mb-3">
              📋 FULL {selectedIndex} CONSTITUENTS MATRIX ({allStocks.length} STOCKS COMPLETE LIST)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2">SYMBOL</th>
                    <th>SECTOR</th>
                    <th>WEIGHT</th>
                    <th>LTP</th>
                    <th>PREV CLOSE</th>
                    <th>CHANGE</th>
                    <th>IMPACT</th>
                    <th>CVD FLOW</th>
                  </tr>
                </thead>
                <tbody>
                  {allStocks.map((s: any) => (
                    <tr
                      key={s.sym}
                      onClick={() => {
                        setSelectedStock(s.sym);
                        setCurrentTab("tab1");
                      }}
                      className="border-b border-slate-900 py-1.5 hover:bg-slate-900/50 cursor-pointer"
                    >
                      <td className="py-2 font-bold text-white">{s.sym}</td>
                      <td className="text-slate-400">{s.sector}</td>
                      <td>{s.wt}%</td>
                      <td className="font-bold">₹{s.ltp.toFixed(2)}</td>
                      <td className="text-slate-400">₹{s.prev.toFixed(2)}</td>
                      <td className={s.chg >= 0 ? "text-[#00e676]" : "text-rose-500"}>
                        {s.chg >= 0 ? "+" : ""}{s.chg.toFixed(2)}
                      </td>
                      <td className={s.imp >= 0 ? "text-[#00e676]" : "text-rose-500"}>
                        {s.imp >= 0 ? "+" : ""}{s.imp.toFixed(2)} pts
                      </td>
                      <td className={s.cvd >= 0 ? "text-[#00e676] font-bold" : "text-rose-500 font-bold"}>
                        {s.cvd >= 0 ? "+" : ""}{s.cvd.toFixed(1)} Cr
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
