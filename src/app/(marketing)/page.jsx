import Link from "next/link";

export const metadata = {
  title: "TaskFlow - Master Your Day, Digitally",
  description:
    "Experience digital calm. Organize tasks, track progress, and achieve peak productivity in a clutter-free, high-performance environment.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center relative">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(59,130,246,0.12) 0%, transparent 70%)",
          }}
        />
        <h1
          className="font-sans font-bold text-on-surface mb-4 max-w-3xl leading-tight tracking-tight"
          style={{ fontSize: "clamp(2rem, 6vw, 3rem)", letterSpacing: "-0.02em" }}
        >
          Master Your Day, Digitally.
        </h1>
        <p className="font-sans text-lg text-on-surface-variant max-w-2xl mb-8 leading-relaxed">
          Experience digital calm. Organize tasks, track progress, and achieve
          peak productivity in a clutter-free, high-performance environment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/app"
            className="bg-primary text-white font-sans font-medium text-sm px-8 py-3 rounded-lg hover:opacity-90 active:scale-95 transition-all"
            style={{ boxShadow: "0 0 20px rgba(59,130,246,0.3)" }}
          >
            Go to App
          </Link>
          <Link
            href="/about"
            className="font-sans font-medium text-sm px-8 py-3 rounded-lg text-on-surface border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* How it Works */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="text-center mb-8">
          <h2 className="font-sans font-semibold text-on-surface mb-2" style={{ fontSize: "32px", letterSpacing: "-0.01em" }}>
            The Workflow
          </h2>
          <p className="text-on-surface-variant">Three steps to digital mastery.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: "add_task",
              title: "Capture",
              desc: "Instantly record thoughts, tasks, and deadlines before they slip away into the digital noise.",
            },
            {
              icon: "account_tree",
              title: "Organize",
              desc: "Structure your workload with tags, projects, and priorities in a clear, distraction-free interface.",
            },
            {
              icon: "check_circle",
              title: "Complete",
              desc: "Execute with precision. Track progress with satisfying, glowing indicators of success.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group flex flex-col items-center text-center p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-white/25 hover:bg-white/[0.08] transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-4 border border-white/5 group-hover:border-primary/50 transition-colors">
                <span className="material-symbols-outlined text-primary text-3xl">
                  {item.icon}
                </span>
              </div>
              <h3 className="font-sans font-medium text-on-surface mb-2" style={{ fontSize: "24px" }}>
                {item.title}
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-[1200px] mx-auto px-6 py-20 border-t border-outline-variant/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Left col */}
          <div className="md:col-span-5 flex flex-col gap-8">
            <div>
              <h2 className="font-sans font-semibold text-on-surface mb-4" style={{ fontSize: "32px", letterSpacing: "-0.01em" }}>
                Engineered for Focus.
              </h2>
              <p className="text-on-surface-variant leading-relaxed">
                Experience a tool that works as fast as you think, designed to stay out of your way.
              </p>
            </div>
            {[
              {
                icon: "schedule",
                title: "Smart Scheduling",
                desc: "AI-driven suggestions for optimal task placement throughout your day.",
              },
              {
                icon: "sync",
                title: "Cross-Platform Sync",
                desc: "Seamless transition between desktop, mobile, and web. Your tasks, everywhere.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-4 p-4 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md"
              >
                <span className="material-symbols-outlined text-primary mt-1">{f.icon}</span>
                <div>
                  <h4 className="font-sans font-bold text-on-surface text-sm mb-1">{f.title}</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right col — abstract UI mockup */}
          <div className="md:col-span-7 h-96 bg-surface-container-highest rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center">
            <div className="w-3/4 h-3/4 rounded-lg flex flex-col p-4 shadow-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="h-4 w-1/3 bg-surface-variant rounded mb-6" />
              <div className="space-y-4">
                {[0.5, 0.75, 0.33].map((w, i) => (
                  <div
                    key={i}
                    className="h-10 w-full rounded flex items-center px-4 border border-white/10 bg-white/5 backdrop-blur-md"
                  >
                    {i === 1 ? (
                      <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="material-symbols-outlined text-white" style={{ fontSize: "10px" }}>
                          check
                        </span>
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-primary/50 mr-4 flex-shrink-0" />
                    )}
                    <div className="h-2 bg-surface-variant rounded" style={{ width: `${w * 100}%` }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div
          className="rounded-2xl p-12 text-center border border-white/10 bg-white/5 backdrop-blur-md"
          style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(255,255,255,0.03) 100%)" }}
        >
          <h2 className="font-sans font-semibold text-on-surface mb-4" style={{ fontSize: "32px" }}>
            Ready to achieve digital calm?
          </h2>
          <p className="text-on-surface-variant mb-8 max-w-xl mx-auto leading-relaxed">
            Join thousands of professionals who use TaskFlow to stay focused and productive every day.
          </p>
          <Link
            href="/app"
            className="inline-block bg-primary text-white font-sans font-medium text-sm px-10 py-3 rounded-lg hover:opacity-90 active:scale-95 transition-all"
            style={{ boxShadow: "0 0 24px rgba(59,130,246,0.35)" }}
          >
            Start for Free
          </Link>
        </div>
      </section>
    </>
  );
}
