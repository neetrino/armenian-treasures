import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Armenian Treasures — a living archive of Armenia’s cultural heritage';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function HomeOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background:
            'linear-gradient(135deg, #1a1f2e 0%, #2a1f1f 60%, #b3261e 100%)',
          padding: '64px',
          color: '#f7f1e6',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: '#cba35c',
            }}
          >
            Armenian Treasures
          </span>
          <h1
            style={{
              fontSize: 88,
              lineHeight: 1.05,
              maxWidth: 900,
              margin: 0,
              fontWeight: 600,
            }}
          >
            A living archive of Armenia&apos;s cultural heritage.
          </h1>
        </div>
        <div style={{ flex: 1 }} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 22,
            color: 'rgba(247, 241, 230, 0.78)',
          }}
        >
          <span>Heritage · Technology · Stewardship</span>
          <span>armeniantreasures.org</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
