'use client';

import { useCallback, useRef, useState } from 'react';
import { KHACHATURIAN_AUDIO_TRACKS } from '@/lib/constants/khachaturian-museum';

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--gold)" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--teal)" aria-hidden>
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

export function KhachaturianMuseumAudio() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleTrackClick = useCallback((index: number, url: string) => {
    if (activeIndex === index) {
      audioRef.current?.pause();
      audioRef.current = null;
      setActiveIndex(null);
      return;
    }

    audioRef.current?.pause();
    const audio = new Audio(url);
    audioRef.current = audio;
    setActiveIndex(index);
    void audio.play();
    audio.onended = () => {
      setActiveIndex(null);
      audioRef.current = null;
    };
  }, [activeIndex]);

  return (
    <section id="audio">
      <p className="sec-label">Audio Archive</p>
      <h2 className="sec-title">Listen to Khachaturian</h2>
      <p className="sec-desc">
        Fifteen recordings spanning ballets, concertos, and suites — let the music of Armenia&apos;s greatest composer
        fill the room.
      </p>
      <div className="audio-section reveal">
        <div className="audio-title">✦ Selected Works — Audio Library</div>
        <div className="audio-grid">
          {KHACHATURIAN_AUDIO_TRACKS.map((track, index) => (
            <button
              key={track.url}
              type="button"
              className={`audio-item${activeIndex === index ? ' playing' : ''}`}
              onClick={() => handleTrackClick(index, track.url)}
            >
              <div className="audio-btn">{activeIndex === index ? <PauseIcon /> : <PlayIcon />}</div>
              <div className="audio-track">
                <div className="audio-track-title">{track.title}</div>
                <div className="audio-track-sub">{track.sub}</div>
                <div className="audio-bar">
                  <div className="audio-progress" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
