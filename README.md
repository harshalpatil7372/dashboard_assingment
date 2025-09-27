# Marketing Ops Dashboard - Frontend (MVP)

Tech stack:
- React + TypeScript (Vite)
- Tailwind CSS
- Recharts
- Mock JSON under `public/mock`

## Setup
1. Clone repo
2. `npm install` or `pnpm install`
3. `npm run dev`
4. Open `http://localhost:5173`

## Project structure
`src/
├─ components/
│ ├─ cards/ (MetricCard, ChartCard, TableCard)
│ ├─ charts/ (StackedBarConversion, FunnelChart, DonutChart, LineBarSocial)
│ ├─ chat/ (ChatPanel)
│ └─ layout/ (TopNav)
├─ hooks/ (useFetchMock)
├─ pages/ (Dashboard)
public/
├─ mock/ (metrics.json, charts.json)`

## Notes
- Charts use Recharts and the data is fetched from `public/mock/*.json`.
- Funnel uses a simple visual approximation. If you want a true funnel, integrate a specialized library or custom SVG.
- To deploy: build with `npm run build` and host `dist` on Vercel/Netlify.