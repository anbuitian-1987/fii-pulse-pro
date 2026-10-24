import asyncio
import json
import datetime
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="FII Institutional Terminal Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Active live tick generator / Dhan feed connector
@app.websocket("/ws/orderflow")
async def websocket_orderflow(websocket: WebSocket):
    await websocket.accept()
    print("🟢 Institutional Terminal Client Connected!")
    try:
        spot_cmp = 22600.00
        while True:
            now_str = datetime.datetime.now().strftime("%H:%M:%S")
            
            payload = {
                "timestamp": now_str,
                "spot": {
                    "symbol": "NIFTY 50",
                    "cmp": round(spot_cmp, 2),
                    "change": -87.65,
                    "pct": -0.39
                },
                "auction_anchors": {
                    "high": 22618.50,
                    "low": 22578.00,
                    "vah": 22609.50,
                    "val": 22588.00,
                    "poc": 22597.00
                },
                "scenario": {
                    "title": "SCENARIO 4: NEUTRAL DAY (TWO-WAY TUG-OF-WAR CHOP)",
                    "action": "🔍 WAIT FOR BOUNDARY ACCEPTANCE: AVOID MID-ZONE CHASE TRAPS",
                    "color": "#38bdf8"
                },
                "golden_rules": {
                    "r1": {"label": "1. C1 (3M) RANGE", "status": "INSIDE C1", "color": "#f59e0b"},
                    "r2": {"label": "2. VWAP ALIGN", "status": "BELOW VWAP", "color": "#ff0055"},
                    "r3": {"label": "3. 50 EMA SUPPORT", "status": "BELOW 50 EMA", "color": "#ff0055"},
                    "r4": {"label": "4. FUTURES CVD", "status": "CUM DELTA: -280.1k", "color": "#ff0055"},
                    "r5": {"label": "5. TRAP / DELTA", "status": "PE BUYING / CE WRITE", "color": "#ff0055"},
                    "r6": {"label": "6. HW BREADTH", "status": "13/15 BELOW VWAP", "color": "#ff0055"},
                    "verdict": "🩸 HIGH CONFLUENCE SHORT (BUY PE ONLY)"
                },
                "tiers": [
                    {"vol": 143.63, "buy": 60.32, "sell": 83.31, "bar_delta": 0.0, "cum_delta": -280.1, "cvd_cr": -870.71},
                    {"vol": 63.78, "buy": 36.99, "sell": 26.79, "bar_delta": 0.0, "cum_delta": -106.5, "cvd_cr": -159.68},
                    {"vol": 76.14, "buy": 31.98, "sell": 44.16, "bar_delta": 0.0, "cum_delta": 162.1, "cvd_cr": 259.41},
                    {"strike": 22900, "side": "PE", "ltp": 23.89, "cum_delta": 34.1, "cvd_cr": 1.52}
                ],
                "heavyweights": [
                    {"sym": "HDFCBANK", "wt": 10.5, "chg": -12.9, "imp": -43.5, "vwap": "DOWN", "cvd": -91.4},
                    {"sym": "ICICIBANK", "wt": 8.8, "chg": +13.5, "imp": +19.4, "vwap": "UP", "cvd": +40.7},
                    {"sym": "RELIANCE", "wt": 7.5, "chg": -10.0, "imp": -11.3, "vwap": "DOWN", "cvd": -23.6},
                    {"sym": "INFY", "wt": 3.4, "chg": +0.5, "imp": +0.2, "vwap": "UP", "cvd": +0.7}
                ]
            }
            await websocket.send_json(payload)
            await asyncio.sleep(1.0)
    except WebSocketDisconnect:
        print("🔴 Client Disconnected")
