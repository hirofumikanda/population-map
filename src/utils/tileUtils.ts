import { LngLat, Map } from "maplibre-gl";

// 定数
const MAX_TILE_ZOOM = 10; // タイルの最大ズームレベル
const TILE_SIZE = 256; // タイルのピクセルサイズ

// RGB エンコーディング係数
const RED_FACTOR = 65536;
const GREEN_FACTOR = 256;
const BLUE_FACTOR = 1;
const BASE_SHIFT = 0;

// メッシュサイズ（メートル）
const MESH_SIZE = 250;

/**
 * 経度緯度からタイル座標への変換
 */
export function lngLatToTile(lng: number, lat: number, z: number) {
  const x = ((lng + 180) / 360) * Math.pow(2, z);
  const y =
    ((1 -
      Math.log(
        Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)
      ) /
        Math.PI) /
      2) *
    Math.pow(2, z);
  return { x, y };
}

/**
 * PMTilesからラスタータイルのRGB値を取得
 */
export async function getRasterPixelColor(lngLat: LngLat, map: Map) {
  const zoom = map.getZoom();
  // タイルの最大ズームレベルに制限
  const z = Math.round(Math.min(zoom, MAX_TILE_ZOOM));
  const { x, y } = lngLatToTile(lngLat.lng, lngLat.lat, z);

  const tileX = Math.floor(x);
  const tileY = Math.floor(y);

  const pixelX = Math.floor((x - tileX) * TILE_SIZE);
  const pixelY = Math.floor((y - tileY) * TILE_SIZE);

  // Tile URL
  const basePath = import.meta.env.BASE_URL || "/";
  const url = `${basePath}tiles/PTN_2025/${z}/${tileX}/${tileY}.png`;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = url;

  await img.decode(); // 読み込み完了を待つ

  const canvas = document.createElement("canvas");
  canvas.width = TILE_SIZE;
  canvas.height = TILE_SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Failed to get canvas context");

  ctx.drawImage(img, 0, 0);

  const data = ctx.getImageData(pixelX, pixelY, 1, 1).data;
  const [r, g, b, a] = data;
  return { r, g, b, a };
}

/**
 * RGB値から人口密度を計算
 */
export function calculatePopulationDensity(r: number, g: number, b: number): number {
  // RGB値から人口推計値を計算（custom encoding: R*65536 + G*256 + B）
  const populationEstimate = (r * RED_FACTOR + g * GREEN_FACTOR + b * BLUE_FACTOR) + BASE_SHIFT;

  // 人口推計値から人口密度を計算（人/km²）
  const density = Math.round(populationEstimate * 1000000 / MESH_SIZE / MESH_SIZE);

  return density;
}
