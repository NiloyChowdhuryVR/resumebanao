"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import TypewriterEffect from "./TypewriterEffect";
import RepoList from "./RepoList";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden px-6 lg:px-8 py-18 sm:py-10 bg-background">
      {/* Spotlight Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 animate-pulse"></div>

      <div className="container mx-auto relative z-10 w-[88%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6 leading-tight">
              <span className="text-transparent text-5xl lg:text-6xl bg-clip-text bg-gradient-t-r from-blue-500 to-purple-600">
              Sophora
              </span>
              <br /> Your Skills, Your Story – Perfectly Framed
            </h1>

            <p className="text-lg md:text-xl mb-8 text-gray-600 max-w-2xl mx-auto lg:mx-0">
            Effortlessly build standout resumes with AI-powered templates, real-time collaboration, and automatic GitHub project integration — no extra setup needed!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/resume">Build Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    style={{
                      backgroundColor: `hsl(${240 + i * 25}, 70%, 75%)`,
                      zIndex: 4 - i,
                    }}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">Join 5,000+ learners building their skills</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-purple-100/30 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />

            <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="rounded-lg overflow-hidden">
                <div className="h-12 bg-gray-100 dark:bg-gray-700 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">AI Learning Assistant</span>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="text-blue-500">
                        <path d="M4 8l4-4 4 4" />
                      </svg>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-sm">
                    <TypewriterEffect
            text="I want to learn full-stack web development. Where should I start?"
            speed={10}
          />
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="text-green-500">
                        <path d="M4 8l4-4 4 4" />
                      </svg>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-sm">
                    <TypewriterEffect
              text={`Here's your personalized learning path:\n\n• HTML/CSS fundamentals (2 weeks)\n• JavaScript basics (3 weeks)\n• React framework (4 weeks)\n• Node.js & Express (3 weeks)\n• Database fundamentals (2 weeks)\n\nI'll generate practice exercises and project ideas tailored to your goals.`}
              speed={10}
            />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hovering Current Progress Box */}
              <motion.div
                className="mt-4"
                initial={{ y: 0 }}
                animate={{ y: [-3, 3, -3] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <div className="cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-md shadow-gray-400 border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-sm">Current Progress</h3>
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">42% Complete</span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full" style={{ width: "42%" }}></div>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Skills</div>
                      <div className="font-semibold text-sm">8</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Projects</div>
                      <div className="font-semibold text-sm">3</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Hours</div>
                      <div className="font-semibold text-sm">24</div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;