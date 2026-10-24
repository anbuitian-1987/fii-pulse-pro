"use client";

import { useEffect, useRef } from "react";
import * as LightweightCharts from "lightweight-charts";

export default function TradingViewChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const { createChart, ColorType, LineSeries } = LightweightCharts as any;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType?.Solid || "solid", color: "#060c1a" },
        textColor: "#94a3b8",
      },
      grid: {
        vertLines: { color: "#111e38" },
        horzLines: { color: "#111e38" },
      },
      width: chartContainerRef.current.clientWidth,
      height: 220,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    let lineSeries: any;
    if (typeof chart.addLineSeries === "function") {
      lineSeries = chart.addLineSeries({
        color: "#00e676",
        lineWidth: 2,
      });
    } else if (typeof chart.addSeries === "function" && LineSeries) {
      lineSeries = chart.addSeries(LineSeries, {
        color: "#00e676",
        lineWidth: 2,
      });
    }

    // UNIX timestamp (in seconds) - Lightweight Charts intraday standard format
    const baseTime = Math.floor(new Date("2026-10-24T09:15:00+05:30").getTime() / 1000);
    const chartData = [
      { time: (baseTime + 0) as any, value: 22680 },
      { time: (baseTime + 900) as any, value: 22695 },
      { time: (baseTime + 2700) as any, value: 22610 },
      { time: (baseTime + 6300) as any, value: 22560 },
      { time: (baseTime + 11700) as any, value: 22520 },
      { time: (baseTime + 17100) as any, value: 22580 },
      { time: (baseTime + 20700) as any, value: 22600 },
    ];

    if (lineSeries) {
      lineSeries.setData(chartData);
    }

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  return <div ref={chartContainerRef} className="w-full" />;
}
