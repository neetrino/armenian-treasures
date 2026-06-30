const GRID_COLS = 16;
const GRID_ROWS = 11;

type CellTone = 'gold' | 'teal' | 'neutral';

interface GridCell {
  id: string;
  tone: CellTone;
  active: boolean;
  delay: number;
  duration: number;
}

function buildGridCells(): GridCell[] {
  const cells: GridCell[] = [];

  for (let row = 0; row < GRID_ROWS; row += 1) {
    for (let col = 0; col < GRID_COLS; col += 1) {
      const index = row * GRID_COLS + col;
      const wave = (row * 5 + col * 7 + index) % 17;
      const tone: CellTone = wave === 0 ? 'teal' : wave === 1 || wave === 2 ? 'gold' : 'neutral';
      const active = wave <= 2 || (index + row) % 9 === 0;

      cells.push({
        id: `${row}-${col}`,
        tone,
        active,
        delay: (index % 12) * 0.35,
        duration: 3.6 + (index % 5) * 0.55,
      });
    }
  }

  return cells;
}

const GRID_CELLS = buildGridCells();

export function AuthGridBackground() {
  return (
    <div aria-hidden className="auth-grid-bg">
      <div className="auth-grid-bg__mesh" />
      <div
        className="auth-grid-bg__cells"
        style={{
          gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${GRID_ROWS}, minmax(0, 1fr))`,
        }}
      >
        {GRID_CELLS.map((cell) => (
          <span
            key={cell.id}
            className={[
              'auth-grid-cell',
              cell.active ? 'auth-grid-cell--active' : '',
              cell.tone === 'gold' ? 'auth-grid-cell--gold' : '',
              cell.tone === 'teal' ? 'auth-grid-cell--teal' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{
              animationDelay: `${cell.delay}s`,
              animationDuration: `${cell.duration}s`,
            }}
          />
        ))}
      </div>
      <div className="auth-grid-bg__scan" />
      <div className="auth-grid-bg__vignette" />
    </div>
  );
}
