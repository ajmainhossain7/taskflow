"use client";

import { useState } from "react";

export default function ContactPage() {
  const faqs = [
    {
      q: "What are your support hours?",
      a: "Our dedicated support team is available Monday through Friday, from 9:00 AM to 6:00 PM Pacific Time. We aim to respond to all inquiries within 24 hours.",
    },
    {
      q: "Do you offer custom enterprise plans?",
      a: 'Yes, we provide tailored enterprise solutions including custom integrations, dedicated account management, and SLA guarantees. Please select "Sales Inquiry" in the contact form to discuss your needs.',
    },
    {
      q: "Where can I find documentation?",
      a: "Comprehensive API documentation and user guides are available in our Help Center. If you can't find what you're looking for there, feel free to submit a technical support request.",
    },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="flex flex-col items-center justify-start py-8 px-6 max-w-[1200px] mx-auto w-full gap-12 mt-8 pb-20">
      {/* Header */}
      <div className="text-center w-full max-w-2xl">
        <h1
          className="font-sans font-bold text-on-surface mb-3"
          style={{ fontSize: "clamp(2rem, 6vw, 3rem)", letterSpacing: "-0.02em" }}
        >
          Get in Touch
        </h1>
        <p className="font-sans text-lg text-on-surface-variant leading-relaxed">
          Have questions about TaskFlow? Our team is ready to help you optimize your digital
          productivity.
        </p>
      </div>

      {/* Form + Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 w-full">
        {/* Contact Form */}
        <div className="md:col-span-7 rounded-xl p-6 border border-white/10 bg-white/5 backdrop-blur-md">
          <h2 className="font-sans font-medium text-on-surface mb-4" style={{ fontSize: "24px" }}>
            Send a Message
          </h2>
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex flex-col gap-1 w-full">
                <label className="font-sans text-xs font-semibold text-on-surface-variant tracking-widest uppercase" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Jane Doe"
                  className="rounded-lg px-4 py-3 font-sans text-base text-on-surface placeholder-outline bg-white/[0.02] border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label className="font-sans text-xs font-semibold text-on-surface-variant tracking-widest uppercase" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="jane@example.com"
                  className="rounded-lg px-4 py-3 font-sans text-base text-on-surface placeholder-outline bg-white/[0.02] border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="font-sans text-xs font-semibold text-on-surface-variant tracking-widest uppercase" htmlFor="subject">
                Subject
              </label>
              <select
                id="subject"
                className="rounded-lg px-4 py-3 font-sans text-base text-on-surface bg-surface-container border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
              >
                <option value="support">Technical Support</option>
                <option value="sales">Sales Inquiry</option>
                <option value="feedback">Product Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="font-sans text-xs font-semibold text-on-surface-variant tracking-widest uppercase" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="How can we help you today?"
                className="rounded-lg px-4 py-3 font-sans text-base text-on-surface placeholder-outline bg-white/[0.02] border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
              />
            </div>
            <button
              type="button"
              className="mt-2 bg-primary text-white font-sans font-medium text-sm py-3 px-6 rounded-lg hover:opacity-90 active:scale-95 transition-all self-start"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="md:col-span-5 flex flex-col gap-5">
          <div className="rounded-xl p-6 flex flex-col gap-4 border border-white/10 bg-white/5 backdrop-blur-md">
            <h3 className="font-sans font-medium text-on-surface" style={{ fontSize: "24px" }}>
              Contact Information
            </h3>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary mt-1">mail</span>
              <div>
                <p className="font-sans text-sm font-medium text-on-surface-variant">Email</p>
                <a
                  href="mailto:support@taskflow.com"
                  className="font-sans text-on-surface hover:text-primary transition-colors"
                >
                  support@taskflow.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary mt-1">location_on</span>
              <div>
                <p className="font-sans text-sm font-medium text-on-surface-variant">Office</p>
                <p className="font-sans text-on-surface leading-relaxed">
                  123 Productivity Way
                  <br />
                  Tech District
                  <br />
                  San Francisco, CA 94107
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 mt-3 border-t border-outline-variant/10">
              <p className="font-sans text-xs font-semibold text-on-surface-variant mr-auto tracking-widest uppercase">
                Follow Us
              </p>
              {["public", "share"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-variant/50"
                >
                  <span className="material-symbols-outlined">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Map placeholder */}
          <div className="rounded-xl overflow-hidden h-48 relative border border-white/10 bg-surface-container-high flex items-center justify-center">
            <span className="material-symbols-outlined text-outline text-6xl">map</span>
            <p className="absolute bottom-3 left-0 right-0 text-center font-sans text-xs text-on-surface-variant">
              San Francisco, CA
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="w-full max-w-3xl flex flex-col gap-4">
        <h2
          className="font-sans font-semibold text-on-surface text-center mb-2"
          style={{ fontSize: "32px", letterSpacing: "-0.01em" }}
        >
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md cursor-pointer overflow-hidden"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="flex justify-between items-center px-6 py-4">
                <h4 className="font-sans font-medium text-on-surface text-base">{faq.q}</h4>
                <span
                  className="material-symbols-outlined text-on-surface-variant flex-shrink-0 transition-transform duration-300"
                  style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  expand_more
                </span>
              </div>
              {openFaq === i && (
                <div className="px-6 pb-4">
                  <p className="font-sans text-on-surface-variant leading-relaxed text-sm">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
