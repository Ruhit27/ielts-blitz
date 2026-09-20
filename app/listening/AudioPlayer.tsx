"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Line } from "./data";

const noop = () => () => {};

/** Reads the script aloud with the browser's own voices, switching voice for each speaker. */
export default function AudioPlayer({ lines }: { lines: Line[] }) {
  const supported = useSyncExternalStore(noop, () => "speechSynthesis" in window, () => true);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const run = useRef(0);

  function stop() {
    run.current++;
    window.speechSynthesis?.cancel();
    setPlaying(false);
  }

  function play() {
    const synth = window.speechSynthesis;
    synth.cancel();
    const id = ++run.current;
    const voices = synth.getVoices().filter((v) => v.lang.startsWith("en"));
    const speakers = [...new Set(lines.map((l) => l.speaker))];
    setPlaying(true);

    const speak = (i: number) => {
      if (id !== run.current) return;
      if (i >= lines.length) {
        setPlaying(false);
        return;
      }
      setCurrent(i);
      const s = speakers.indexOf(lines[i].speaker);
      const u = new SpeechSynthesisUtterance(lines[i].text);
      u.lang = "en-GB";
      u.rate = 0.95;
      u.pitch = s % 2 ? 1.2 : 0.9;
      if (voices.length) u.voice = voices[s % voices.length];
      u.onend = () => speak(i + 1);
      u.onerror = () => {
        if (id === run.current) setPlaying(false);
      };
      synth.speak(u);
    };
    speak(0);
  }

  useEffect(() => () => {
    run.current++;
    window.speechSynthesis?.cancel();
  }, []);

  if (!supported) {
    return <p className="mt-4 rounded-xl bg-surface p-4 text-sm text-muted">Audio isn&apos;t supported in this browser. Try Chrome, Edge or Safari.</p>;
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-4 rounded-xl border border-line bg-surface p-4">
      <button
        type="button"
        onClick={playing ? stop : play}
        className="flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-ink px-5 text-sm font-bold text-white transition-colors hover:bg-black"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{playing ? <path d="M6 5h4v14H6zM14 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}</svg>
        {playing ? "Stop" : "Play audio"}
      </button>
      <p className="text-sm text-muted" role="status">
        {playing ? `Playing ${current + 1} of ${lines.length}` : "Listen, then answer. In the real test the audio plays only once."}
      </p>
    </div>
  );
}
