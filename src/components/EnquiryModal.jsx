import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { MdDownload } from "react-icons/md";

export default function EnquiryModal({ isOpen, onClose, projectTitle, brochureUrl }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Small delay for UX feel
    await new Promise((r) => setTimeout(r, 600));

    setLoading(false);
    setSubmitted(true);

    // Trigger brochure download
    if (brochureUrl) {
      const link = document.createElement("a");
      link.href = brochureUrl;
      link.download = `${projectTitle || "Brochure"}.pdf`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    // Auto close after 2s
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "" });
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-green-400 to-green-600" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl transition"
        >
          <IoCloseOutline />
        </button>

        <div className="p-8">
          {!submitted ? (
            <>
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Get the Brochure</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Fill in your details to download the{" "}
                  <span className="font-semibold text-green-600">{projectTitle}</span> brochure.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+880 1XXXXXXXXX"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg mt-2"
                >
                  {loading ? (
                    <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <MdDownload className="text-xl" />
                      Download Brochure
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="flex flex-col items-center justify-center py-8 gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-4xl text-green-500">
                ✓
              </div>
              <h3 className="text-xl font-bold text-gray-800">Download Started!</h3>
              <p className="text-gray-500 text-sm">
                Thank you <span className="font-semibold text-gray-700">{form.name}</span>!<br />
                Your brochure is downloading now.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
