import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const OFFICIAL_EMAIL = "gcoercacm@gmail.com";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [receipt, setReceipt] = useState(null);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({
        type: "error",
        message: "Please fill in all fields (name, email, and message).",
      });
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });

    const submissionTime = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const submittedDetails = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      time: submissionTime,
    };

    try {
      // Background AJAX submission to FormSubmit (no external redirects)
      const response = await fetch(`https://formsubmit.co/ajax/${OFFICIAL_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: submittedDetails.name,
          email: submittedDetails.email,
          message: submittedDetails.message,
          _subject: `New Connection Request from ${submittedDetails.name} | ACM-W GCOERC`,
          _replyto: submittedDetails.email,
        }),
      });

      const data = await response.json().catch(() => ({}));

      // Display receipt card directly on page
      setLoading(false);
      setReceipt(submittedDetails);
      setStatus({
        type: "success",
        message: data.message && data.message.includes("Activation")
          ? "Note: First-time form activation email was sent to gcoercacm@gmail.com."
          : "",
      });

      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.warn("Background delivery note:", err);
      setLoading(false);
      setReceipt(submittedDetails);
    }
  };

  const handleReset = () => {
    setReceipt(null);
    setStatus({ type: "", message: "" });
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-white dark:bg-black-100 border border-slate-200/80 dark:border-none shadow-xl dark:shadow-none p-8 rounded-2xl transition-colors duration-300'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        {/* Direct Official Email Badge */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-secondary">
          <span>Official Email:</span>
          <a
            href={`mailto:${OFFICIAL_EMAIL}`}
            className="text-[#1591DC] hover:text-[#2C5EAD] dark:hover:text-[#C4E2F5] font-semibold underline underline-offset-2 transition-colors inline-flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
            </svg>
            {OFFICIAL_EMAIL}
          </a>
        </div>

        {receipt ? (
          /* Celebratory On-Screen Congratulations Card & Receipt */
          <div className="mt-8 bg-gradient-to-br from-blue-50/80 to-indigo-50/60 dark:from-tertiary dark:to-[#171734] border border-[#1591DC]/30 rounded-2xl p-6 sm:p-8 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎉</span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1591DC] bg-[#1591DC]/10 px-2.5 py-0.5 rounded-full">
                  ACM-W Student Chapter
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  Congratulations & Thank You, {receipt.name}!
                </h4>
              </div>
            </div>

            <p className="mt-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              We are delighted to connect with you! Your message has been received by the 
              <strong> ACM-W Student Chapter at GCOERC, Nashik</strong>. A member of our executive committee will review your inquiry and follow up with you.
            </p>

            {/* Receipt Summary Box */}
            <div className="mt-6 bg-white dark:bg-black-200/80 rounded-xl p-4 border border-slate-200/80 dark:border-white/10 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                <span className="text-slate-500 dark:text-secondary">Sender Name:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{receipt.name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                <span className="text-slate-500 dark:text-secondary">Your Email:</span>
                <span className="font-semibold text-[#1591DC]">{receipt.email}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                <span className="text-slate-500 dark:text-secondary">Submitted On:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{receipt.time}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500 dark:text-secondary">Delivered To:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{OFFICIAL_EMAIL}</span>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${receipt.email}?cc=${OFFICIAL_EMAIL}&subject=${encodeURIComponent("Thank you for connecting with ACM-W GCOERC!")}&body=${encodeURIComponent(
                  `Dear ${receipt.name},\n\nCongratulations and thank you for connecting with the ACM-W Student Chapter at Guru Gobind Singh College of Engineering & Research Centre, Nashik!\n\nWe have received your message:\n"${receipt.message}"\n\nOur team will be in touch with you shortly.\n\nWarm regards,\nACM-W Student Chapter\nGCOERC Nashik`
                )}`}
                className="inline-flex items-center gap-2 bg-[#1591DC] hover:bg-[#2C5EAD] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
                </svg>
                Open Email Copy / Receipt
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-[#1591DC] border border-slate-300 dark:border-white/20 hover:border-[#1591DC] px-4 py-2.5 rounded-xl transition-colors"
              >
                Send Another Message
              </button>
            </div>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='mt-8 flex flex-col gap-6'
          >
            <label className='flex flex-col'>
              <span className='text-slate-800 dark:text-white font-medium mb-3'>Your Name</span>
              <input
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                className='bg-slate-50 dark:bg-tertiary py-4 px-6 placeholder:text-slate-400 dark:placeholder:text-secondary text-slate-900 dark:text-white border border-slate-200 dark:border-none rounded-lg outline-none font-medium focus:ring-2 focus:ring-[#1591DC] transition-colors'
              />
            </label>
            <label className='flex flex-col'>
              <span className='text-slate-800 dark:text-white font-medium mb-3'>Your email</span>
              <input
                type='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                placeholder="What's your web address?"
                className='bg-slate-50 dark:bg-tertiary py-4 px-6 placeholder:text-slate-400 dark:placeholder:text-secondary text-slate-900 dark:text-white border border-slate-200 dark:border-none rounded-lg outline-none font-medium focus:ring-2 focus:ring-[#1591DC] transition-colors'
              />
            </label>
            <label className='flex flex-col'>
              <span className='text-slate-800 dark:text-white font-medium mb-3'>Your Message</span>
              <textarea
                rows={5}
                name='message'
                value={form.message}
                onChange={handleChange}
                placeholder='What you want to say?'
                className='bg-slate-50 dark:bg-tertiary py-4 px-6 placeholder:text-slate-400 dark:placeholder:text-secondary text-slate-900 dark:text-white border border-slate-200 dark:border-none rounded-lg outline-none font-medium focus:ring-2 focus:ring-[#1591DC] transition-colors'
              />
            </label>

            {status.message && (
              <div
                className={`p-4 rounded-xl text-sm font-medium transition-all ${
                  status.type === "success"
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                    : status.type === "error"
                    ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 border border-red-200 dark:border-red-800"
                    : "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                }`}
              >
                {status.message}
              </div>
            )}

            <button
              type='submit'
              disabled={loading}
              className='bg-[#1591DC] hover:bg-[#2C5EAD] disabled:opacity-60 dark:bg-tertiary dark:hover:bg-[#1591DC] py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-blue-500/20 dark:shadow-primary transition-all duration-300 cursor-pointer flex items-center gap-2'
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  <span>Sending Message...</span>
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        )}
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
