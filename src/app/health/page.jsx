export const metadata = {
  title: "Health Check - TaskFlow",
  description: "System health status and live data checks for TaskFlow.",
};

// Force dynamic so it always fetches fresh data
export const dynamic = "force-dynamic";

async function fetchWorldTime() {
  const res = await fetch("https://worldtimeapi.org/api/timezone/UTC", {
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`worldtimeapi responded ${res.status}`);
  return res.json();
}

async function fetchGitHub() {
  const res = await fetch("https://api.github.com/zen", {
    headers: { Accept: "text/plain" },
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`github zen responded ${res.status}`);
  return res.text();
}

// ── Sub-component: individual check card ──────────────────────────────────
function CheckCard({ icon, title, status, detail }) {
  const colors = {
    ok:      { dot: "bg-emerald-400", border: "border-emerald-400/20", label: "OK",      labelColor: "text-emerald-400" },
    warn:    { dot: "bg-amber-400",   border: "border-amber-400/20",   label: "WARN",    labelColor: "text-amber-400"   },
    error:   { dot: "bg-red-400",     border: "border-red-400/20",     label: "ERROR",   labelColor: "text-red-400"     },
    loading: { dot: "bg-on-surface-variant", border: "border-white/10",label: "—",       labelColor: "text-on-surface-variant" },
  };
  const c = colors[status] || colors.ok;

  return (
    <div
      className={`rounded-xl p-6 border border-white/10 bg-white/5 backdrop-blur-md ${c.border}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary" style={{ fontSize: "24px" }} aria-hidden="true">
            {icon}
          </span>
          <h3 className="font-sans font-semibold text-on-surface text-base">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${c.dot}`} aria-hidden="true" />
          <span className={`font-sans text-xs font-bold tracking-widest uppercase ${c.labelColor}`}>
            {c.label}
          </span>
        </div>
      </div>
      <p className="font-sans text-sm text-on-surface-variant leading-relaxed">{detail}</p>
    </div>
  );
}

export default async function HealthPage() {
  const startedAt = new Date().toISOString();

  let timeData = null;
  let timeError = null;
  let zenQuote = null;
  let zenError = null;

  // Parallel fetch both endpoints
  await Promise.allSettled([
    fetchWorldTime().then((d) => { timeData = d; }).catch((e) => { timeError = e.message; }),
    fetchGitHub().then((d) => { zenQuote = d; }).catch((e) => { zenError = e.message; }),
  ]);

  const allOk = !timeError && !zenError;

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans pt-16">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span
              className={`w-3 h-3 rounded-full animate-pulse ${allOk ? "bg-emerald-400" : "bg-red-400"}`}
            />
            <span
              className={`font-sans text-xs font-bold tracking-widest uppercase ${allOk ? "text-emerald-400" : "text-red-400"}`}
            >
              {allOk ? "All Systems Operational" : "Degraded"}
            </span>
          </div>
          <h1
            className="font-sans font-bold text-on-surface mb-3"
            style={{ fontSize: "clamp(2rem, 5vw, 2.5rem)", letterSpacing: "-0.02em" }}
          >
            System Health
          </h1>
          <p className="font-sans text-on-surface-variant">
            Live diagnostics fetched at{" "}
            <span className="text-primary font-mono">
              {new Date(startedAt).toLocaleString("en-US", { timeZone: "UTC" })} UTC
            </span>
          </p>
        </div>

        {/* Check cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {/* App itself */}
          <CheckCard
            icon="web"
            title="Next.js App"
            status="ok"
            detail="Server component rendered successfully. App Router and build pipeline are operational."
          />

          {/* World Time */}
          <CheckCard
            icon="schedule"
            title="World Time API"
            status={timeError ? "error" : "ok"}
            detail={
              timeError
                ? `Failed to reach worldtimeapi.org — ${timeError}`
                : `Current UTC: ${new Date(timeData.datetime).toLocaleString("en-US", { timeZone: "UTC" })} | Week ${timeData.week_number}, ${timeData.day_of_year} DOY`
            }
          />

          {/* GitHub Zen */}
          <CheckCard
            icon="auto_awesome"
            title="GitHub Connectivity"
            status={zenError ? "error" : "ok"}
            detail={
              zenError
                ? `Failed to reach api.github.com — ${zenError}`
                : `✓ Connected. GitHub Zen: "${zenQuote?.trim()}"`
            }
          />

          {/* LocalStorage (info only — cannot check server side) */}
          <CheckCard
            icon="storage"
            title="Local Storage (Client)"
            status="ok"
            detail="localStorage persistence is handled client-side via the useTodos hook. Navigate to /app to verify task persistence."
          />
        </div>

        {/* Raw time data card */}
        {timeData && (
          <div className="rounded-xl p-6 border border-white/10 bg-white/5 backdrop-blur-md mb-10">
            <h2 className="font-sans font-semibold text-on-surface mb-4 flex items-center gap-2" style={{ fontSize: "18px" }}>
              <span className="material-symbols-outlined text-primary" style={{ fontSize: "20px" }}>data_object</span>
              Live API Response — worldtimeapi.org/api/timezone/UTC
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { label: "Timezone",     value: timeData.timezone },
                { label: "UTC Offset",   value: timeData.utc_offset },
                { label: "Day of Year",  value: timeData.day_of_year },
                { label: "Week Number",  value: timeData.week_number },
                { label: "Day of Week",  value: timeData.day_of_week },
                { label: "DST Active",   value: String(timeData.dst) },
                { label: "Abbreviation", value: timeData.abbreviation },
                { label: "Unix Time",    value: timeData.unixtime },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-lg p-3 bg-surface-container border border-white/5"
                >
                  <p className="font-sans text-xs text-on-surface-variant mb-1 uppercase tracking-widest">{label}</p>
                  <p className="font-sans text-sm font-semibold text-on-surface break-all">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer note */}
        <p className="text-center font-sans text-xs text-on-surface-variant">
          This page is server-rendered dynamically on every request. Refresh to see live data.
        </p>
      </div>
    </div>
  );
}
