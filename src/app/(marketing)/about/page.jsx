export const metadata = {
  title: "About - TaskFlow",
  description:
    "Learn about TaskFlow — the digital productivity suite built to simplify your workflow and achieve deep focus.",
};

export default function AboutPage() {
  const team = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8MaWP6rzzHAzx4qJAO-dct2-vPIfQFj9pU8FB_84fVAUAqN9XqyLPOwGv8eB-htmMoqHi5V_0rkMFeeFH79Mg4sbttbaeokNG2GDdb6Rylr1Vp7hdSMSvoTPdakaAOUw-oo5ixp71phkU0tbrt4zp9IvwqtyP_rFkCrTDXTlPcK9FYH74KJPXa7UlZjBjacnqmyfRWV9-8i6YPNiyjcoUNV4jbg7Tjpez5ogdfUpPd5GL1P0EQzDi0g",
    },
    {
      name: "Sarah Jenkins",
      role: "Head of Design",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnTDv6o2iP9GqYHfdoxk0mB0xBSE9pAT-gCmMkNnmX8OsI1tc42N4biCBDmHnFthxQWLiX4xPobNC71QRV3TC9onkWWOJC8YuP_ksgJhZ_36J7jZejKKa6nRq7WKKCNI8cCsay2mH0uDupv4rDsYKqCgBqF13NWGJkCwGYeMX_tr1RLdgJJHZU9V0WAV5e_SxL2-GRSpw_ix81FuoC4jwYiNMeWQ-PfdRENZvfdDXsfHxDaov8l4FR9A",
    },
    {
      name: "Marcus Vance",
      role: "Lead Engineer",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-E9DEjfE1q6THXnFG1pXgq_YkAF4POXSov3gqKOpDh7BIux3U3AGhEhfC7danVSSUSDIZAdrtwruLWvws_ODVSUKVWEaTWWFxY8exKOXoaQBvPUnOEMrgZ6dte9Xl0BRU23YODLwAB7xaRf0Y82HxMWokzJDWUKR6IbTkKXU_BEI2ojfccVB1BEs4wD_OBni0-1hVExEmnFqFCehUCWhavwn367PkQWaOuCYrEKjBvfoMuf8Y4oieOQ",
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-6 pb-20 flex flex-col gap-8 mt-8">
      {/* Hero */}
      <section className="py-16 md:py-24 text-center max-w-3xl mx-auto">
        <h1
          className="font-sans font-bold text-on-surface mb-4"
          style={{
            fontSize: "clamp(2rem, 6vw, 3rem)",
            letterSpacing: "-0.02em",
            textShadow: "0 0 20px rgba(173,198,255,0.3)",
          }}
        >
          Simplifying productivity for the modern digital nomad.
        </h1>
        <p className="font-sans text-lg text-on-surface-variant mt-4 leading-relaxed">
          We build tools that get out of your way, so you can focus on what actually matters.
          Deep work, from anywhere.
        </p>
      </section>

      {/* Our Story */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <div className="md:col-span-12">
          <h2
            className="font-sans font-semibold text-on-surface mb-4 border-b border-outline-variant/20 pb-2"
            style={{ fontSize: "32px", letterSpacing: "-0.01em" }}
          >
            Our Story
          </h2>
        </div>
        <div className="md:col-span-7 rounded-xl p-6 flex flex-col gap-4 justify-center border border-white/10 bg-white/5 backdrop-blur-md">
          <h3 className="font-sans font-medium text-primary text-2xl">Born from chaos.</h3>
          <p className="font-sans text-on-surface-variant leading-relaxed">
            TaskFlow began as an internal tool in 2022. We were a distributed team struggling to
            maintain alignment across timezones. Existing tools were either too rigid or too loose.
            We needed a digital workspace that felt as crisp as a well-organized physical desk.
          </p>
          <p className="font-sans text-on-surface-variant leading-relaxed">
            We stripped away everything non-essential. No feature bloat. No distracting
            notifications. Just a clean, glassy interface that prioritized cognitive clarity and
            deep focus.
          </p>
        </div>
        <div className="md:col-span-5 h-64 md:h-auto rounded-xl overflow-hidden relative border border-white/10 bg-white/5 backdrop-blur-md">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW7hehSVPOeMjrFXeov4T8r0eazIVARZGBSXRVnBc_UbjP58Hb-fUf7Wg4GBq7m9RPlZtIsiJU63oZM1OHA6Xi8SxaPVJG_jrJlmBvyqSoA-wvX9rb8kPzms_QEPci-mLTpQaWTysCxGqwcXwmebKjih1CJ4RtQq5Dtav1eYnrc5Gj-i62gbrHH1MIZffW_8lyKnPAHxf-gPRB_E2y9t6DfZcugymrtms1rgddR67AdjNdVg28Q21zsg"
            alt="A clean, minimalist dark workspace setup"
            className="w-full h-full object-cover opacity-80 mix-blend-luminosity absolute inset-0"
          />
        </div>
      </section>

      {/* Vision */}
      <section className="rounded-xl p-8 md:p-12 text-center border border-white/10 bg-white/5 backdrop-blur-md">
        <span className="material-symbols-outlined text-primary mb-4" style={{ fontSize: "40px" }}>
          visibility
        </span>
        <h2
          className="font-sans font-semibold text-on-surface mb-3"
          style={{ fontSize: "32px", letterSpacing: "-0.01em" }}
        >
          Our Vision
        </h2>
        <p className="font-sans text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          To become the invisible layer of productivity. We envision a future where software
          doesn't demand your attention, but quietly empowers your flow state.
        </p>
      </section>

      {/* Team */}
      <section>
        <h2
          className="font-sans font-semibold text-on-surface mb-4 border-b border-outline-variant/20 pb-2"
          style={{ fontSize: "32px", letterSpacing: "-0.01em" }}
        >
          The Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-lg overflow-hidden flex flex-col border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <div className="h-48 relative overflow-hidden">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="p-4 bg-surface-container/50">
                <h4 className="font-sans font-medium text-on-surface text-base">{member.name}</h4>
                <p className="font-sans text-xs text-primary font-semibold tracking-wide mt-0.5">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
          {/* Hiring card */}
          <div className="rounded-lg overflow-hidden flex flex-col border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="h-48 flex items-center justify-center bg-surface-container-high text-outline-variant group">
              <span className="material-symbols-outlined group-hover:text-primary transition-colors" style={{ fontSize: "60px" }}>
                group_add
              </span>
            </div>
            <div className="p-4 bg-surface-container/50">
              <h4 className="font-sans font-medium text-on-surface text-base">We&apos;re Hiring</h4>
              <p className="font-sans text-xs text-on-surface-variant hover:text-primary cursor-pointer transition-colors tracking-wide mt-0.5">
                View open roles
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
