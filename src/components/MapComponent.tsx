import { useEffect, useRef } from "react";
import maplibregl, { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { usePmtilesProtocol } from "../hooks/usePmtilesProtocol";
import Legend from "./Legend";

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);

  usePmtilesProtocol();

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

      // PTN_2025をterrain sourceとして設定
      map.setTerrain({ source: "PTN_2025", exaggeration: 0.01 });

      map.on("click", (e) => {
        const elevation = map.queryTerrainElevation(e.lngLat);

        if (elevation !== null && elevation !== undefined) {
          const density = Math.round(elevation * 100000000 / 250 / 250);
          const formattedDensity = density.toLocaleString('ja-JP');
          
          new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<div style="padding: 8px;">
              <strong>2025年推計人口密度</strong><br/>
              ${formattedDensity} 人/km²
            </div>`)
            .addTo(map);
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
