"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useSeason } from "./SeasonContext"
import { Mail, Phone, MapPin, Send, Linkedin, Github, Facebook, CheckCircle } from "lucide-react"

const Contact: React.FC = () => {
  const { colors } = useSeason()
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")

    try {
      const response = await fetch("https://formsubmit.co/ajax/jhediaelcalvin18@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New message from ${formData.name} via Portfolio`,
        }),
      })

      if (response.ok) {
        setFormStatus("success")
        setFormData({ name: "", email: "", message: "" })
        // Reset form status after 5 seconds
        setTimeout(() => setFormStatus("idle"), 5000)
      } else {
        setFormStatus("error")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormStatus("error")
    }
  }

  return (
    <section id="contact" className="min-h-screen w-full flex items-center py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <h2 className="text-4xl font-bold text-center mb-10" style={{ color: colors.primary }}>
            Get In Touch
          </h2>

          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-10 h-full flex flex-col"
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center mb-8">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: colors.primary + "20" }}
                >
                  <Mail size={48} style={{ color: colors.primary }} />
                </div>
                <h3 className="text-2xl font-bold text-center" style={{ color: colors.primary }}>
                  Send Me a Message
                </h3>
              </div>

              {formStatus === "success" ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <CheckCircle size={64} className="mb-4" style={{ color: colors.primary }} />
                  <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                    Message Sent!
                  </h3>
                  <p className="text-center text-gray-600">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="w-full space-y-6 flex-grow">
                  <div>
                    <label htmlFor="name" className="block text-base font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full p-3 text-base rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                      style={{
                        borderColor: colors.primary,
                        boxShadow: `0 0 0 0 ${colors.primary}40`,
                        transition: "box-shadow 0.3s ease-in-out",
                      }}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-base font-medium mb-2">
                      Your Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full p-3 text-base rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                      style={{
                        borderColor: colors.primary,
                        boxShadow: `0 0 0 0 ${colors.primary}40`,
                        transition: "box-shadow 0.3s ease-in-out",
                      }}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-base font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className={`w-full p-3 text-base rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                      style={{
                        borderColor: colors.primary,
                        boxShadow: `0 0 0 0 ${colors.primary}40`,
                        transition: "box-shadow 0.3s ease-in-out",
                      }}
                      placeholder="Your message here..."
                      rows={5}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="flex items-center justify-center gap-2 py-2 px-5 rounded-lg text-white font-medium text-base transition-transform hover:scale-105 w-full"
                    style={{
                      backgroundColor: formStatus === "submitting" ? colors.primary + "80" : colors.primary,
                      cursor: formStatus === "submitting" ? "wait" : "pointer",
                    }}
                  >
                    {formStatus === "submitting" ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>

                  {formStatus === "error" && (
                    <p className="text-red-500 text-center mt-4">
                      Something went wrong. Please try again or contact me directly via email.
                    </p>
                  )}
                </form>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-10 h-full flex flex-col"
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center mb-8">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: colors.primary + "20" }}
                >
                  <Phone size={48} style={{ color: colors.primary }} />
                </div>
                <h3 className="text-2xl font-bold text-center" style={{ color: colors.primary }}>
                  Contact Information
                </h3>
              </div>
              <div className="space-y-8 flex-grow flex flex-col items-center">
                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                    style={{ backgroundColor: colors.primary + "20" }}
                  >
                    <Mail size={24} style={{ color: colors.primary }} />
                  </div>
                  <h4 className="text-xl font-medium mb-1">Email</h4>
                  <a
                    href="mailto:jhediaelcalvin18@gmail.com"
                    className="text-lg hover:underline"
                    style={{ color: colors.primary }}
                  >
                    jhediaelcalvin18@gmail.com
                  </a>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                    style={{ backgroundColor: colors.primary + "20" }}
                  >
                    <Phone size={24} style={{ color: colors.primary }} />
                  </div>
                  <h4 className="text-xl font-medium mb-1">Phone</h4>
                  <a href="tel:+639916550697" className="text-lg hover:underline" style={{ color: colors.primary }}>
                    09916550697
                  </a>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                    style={{ backgroundColor: colors.primary + "20" }}
                  >
                    <MapPin size={24} style={{ color: colors.primary }} />
                  </div>
                  <h4 className="text-xl font-medium mb-1">Location</h4>
                  <p className="text-lg text-gray-600 text-center">
                    18 Jontue St. Congressional Model Subd. Camarin Caloocan City
                  </p>
                </div>

                <div className="pt-6 flex flex-col items-center text-center">
                  <h4 className="text-xl font-medium mb-4">Connect With Me</h4>
                  <div className="flex justify-center gap-4">
                    <a
                      href="https://www.linkedin.com/in/jhediael-calvin-ramboyong-b4573932b/"
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                      style={{ backgroundColor: colors.primary }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin size={24} className="text-white" />
                    </a>
                    <a
                      href="https://github.com/Calvinchi"
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                      style={{ backgroundColor: colors.primary }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={24} className="text-white" />
                    </a>
                    <a
                      href="https://www.facebook.com/jhediaelcalvin.ramboyong"
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                      style={{ backgroundColor: colors.primary }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook size={24} className="text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
