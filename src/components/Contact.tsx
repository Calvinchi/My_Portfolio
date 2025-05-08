"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useSeason } from "./SeasonContext"
import { Mail, Phone, MapPin, Send, Linkedin, Github, Facebook } from "lucide-react"

const Contact: React.FC = () => {
  const { colors } = useSeason()

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
              <form className="w-full space-y-6 flex-grow">
                <div>
                  <label className="block text-base font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    className={`w-full p-3 text-base rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-[${colors.primary}]`}
                    style={{ borderColor: colors.primary }}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium mb-2">Your Email</label>
                  <input
                    type="email"
                    className={`w-full p-3 text-base rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-[${colors.primary}]`}
                    style={{ borderColor: colors.primary }}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium mb-2">Message</label>
                  <textarea
                    className={`w-full p-3 text-base rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-[${colors.primary}]`}
                    style={{ borderColor: colors.primary }}
                    placeholder="Your message here..."
                    rows={5}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 py-2 px-5 rounded-lg text-white font-medium text-base transition-transform hover:scale-105"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
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
              <div className="space-y-8 flex-grow">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: colors.primary + "20" }}
                  >
                    <Mail size={24} style={{ color: colors.primary }} />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-1">Email</h4>
                    <a
                      href="mailto:contact@example.com"
                      className="text-lg hover:underline"
                      style={{ color: colors.primary }}
                    >
                      contact@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: colors.primary + "20" }}
                  >
                    <Phone size={24} style={{ color: colors.primary }} />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-1">Phone</h4>
                    <a href="tel:+1234567890" className="text-lg hover:underline" style={{ color: colors.primary }}>
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: colors.primary + "20" }}
                  >
                    <MapPin size={24} style={{ color: colors.primary }} />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-1">Location</h4>
                    <p className="text-lg text-gray-600">San Francisco, California</p>
                  </div>
                </div>

                <div className="pt-6">
                  <h4 className="text-xl font-medium mb-4">Connect With Me</h4>
                  <div className="flex gap-4">
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
