import { task1, task2 } from "./data";

export default function PromptBlock({ task }: { task: 1 | 2 }) {
  const t = task === 1 ? task1 : task2;
  return (
    <div className="rounded-xl border border-line bg-surface p-4 text-sm text-ink">
      <p className="font-bold">
        {t.label} · about {t.minutes} minutes · at least {t.min} words
      </p>
      <p className="mt-2">{t.prompt}</p>
      {task === 1 && (
        <table className="mt-3 w-full max-w-sm border-collapse text-left">
          <caption className="sr-only">Households with internet access</caption>
          <thead>
            <tr>
              {task1.table.head.map((h) => (
                <th key={h} className="border-b border-line py-1.5 pr-4 font-bold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {task1.table.rows.map((r) => (
              <tr key={r[0]}>
                {r.map((c, i) => (
                  <td key={i} className="border-b border-line py-1.5 pr-4">{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
