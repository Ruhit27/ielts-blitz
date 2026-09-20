"use client";

import QuestionDemo from "../reading/QuestionDemo";
import AudioPlayer from "./AudioPlayer";
import type { ListeningType } from "./data";

export default function ListeningDrill({ type }: { type: ListeningType }) {
  return (
    <QuestionDemo
      type={{ id: type.id, name: type.name, short: type.short, difficulty: type.difficulty, demo: type.demo }}
      kind="listening"
      before={<AudioPlayer lines={type.script} />}
      after={(checked) =>
        checked && (
          <details className="mt-6 rounded-xl border border-line">
            <summary className="cursor-pointer px-4 py-3 text-sm font-bold text-ink">Read the transcript</summary>
            <div className="space-y-2 border-t border-line px-4 py-3 text-sm text-ink">
              {type.script.map((l, i) => (
                <p key={i}><span className="mr-2 font-bold text-brand">{l.speaker}:</span>{l.text}</p>
              ))}
            </div>
          </details>
        )
      }
    />
  );
}
