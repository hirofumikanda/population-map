import { useEffect, useRef } from "react";
import maplibregl, { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { getRasterPixelColor, calculatePopulationDensity } from "../utils/tileUtils";
import Legend from "./Legend";

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "./styles/style.json",
      center: [139.7671, 35.6812],
      zoom: 5,
      hash: true,
    });

    map.on("load", () => {
      // ナビゲーションコントロールを右上に追加
      map.addControl(new maplibregl.NavigationControl(), "top-right");

      map.on("click", async (e) => {
        try {
          const color = await getRasterPixelColor(e.lngLat, map);
          const density = calculatePopulationDensity(color.r, color.g, color.b);
          const formattedDensity = density.toLocaleString('ja-JP');
          
          new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<div style="padding: 8px;">
              <strong>2025年推計人口密度</strong><br/>
              ${formattedDensity} 人/km²
            </div>`)
            .addTo(map);
        } catch (error) {
          console.error("Failed to get population density:", error);
        }
      });
    });

    mapRef.current = map;
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
      <Legend />
    </div>
  );
};

export default MapComponent;
