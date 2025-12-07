# Population Map - AI Coding Agent Instructions

## Project Overview
React + TypeScript + Vite アプリケーション。MapLibre GL JSとPMTilesを使用して、日本の人口密度データ（2025年推計）を地図上に可視化します。

## Architecture

### Core Components
- **MapComponent** (`src/components/MapComponent.tsx`): メインの地図コンポーネント
  - MapLibre GL JSインスタンスを管理
  - PMTilesプロトコルを使用してラスタDEMタイルを読み込み
  - クリックイベントで人口密度を取得・表示
- **Legend** (`src/components/Legend.tsx`): 人口密度の凡例コンポーネント
  - 絶対位置配置（左下）
  - インラインスタイルで実装

### Data Flow Pattern
1. PMTilesプロトコル登録（`usePmtilesProtocol`フック）
2. MapLibreスタイル読み込み（`public/styles/style.json`）
3. Terrain source設定（`exaggeration: 0.01`で視覚的起伏を最小化）
4. `queryTerrainElevation()`でクリック地点の標高値取得
5. 標高値を人口密度に変換：`elevation * 100000000 / 250 / 250`

## Key Technical Patterns

### PMTiles Integration
- **Protocol Registration**: グローバルフラグで重複登録を防止（`usePmtilesProtocol.ts`）
- **URL Pattern**: `pmtiles:///population-map/data/tiles_pop2025_rgb.pmtiles`
  - base path `/population-map/` は GitHub Pages デプロイ用

### Raster-DEM Encoding
`style.json`の`PTN_2025`ソース:
```json
"encoding": "custom",
"redFactor": 65536,
"greenFactor": 256,
"blueFactor": 1
```
RGB値からelevation値を計算: `R * 65536 + G * 256 + B`

### Population Density Calculation
- 元データ: 250mメッシュ（0.0625 km²）の人口数
- 変換式: `elevation * 100000000 / 250 / 250` = 人/km²
- 表示: `toLocaleString('ja-JP')`で3桁カンマ区切り

## Development Commands
- `npm run dev` - 開発サーバー起動
- `npm run build` - TypeScriptコンパイル + Vite ビルド
- `npm run preview` - ビルド結果のプレビュー
- `npm run deploy` - GitHub Pages へデプロイ

## Important Conventions
- **Styling**: インラインスタイル使用（CSS モジュール未使用）
- **State Management**: React hooks のみ（外部ライブラリなし）
- **Map Instance**: `useRef`で管理、再初期化を防ぐ
- **Terrain Source**: データ取得のみに使用（`exaggeration: 0.01`で視覚的表示を抑制）

## Data Source
国土数値情報「250mメッシュ別将来推計人口データ」
- URL: https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-mesh250r6.html
- Zoom levels: 5-10
- Tile format: RGB-encoded raster-dem

## Critical Notes
- `queryTerrainElevation()` を使うには `setTerrain()` が必須
- PMTilesプロトコルは一度だけ登録する（重複登録でエラー）
- GitHub Pages用に `vite.config.ts` で `base: "/population-map/"` 設定済み
