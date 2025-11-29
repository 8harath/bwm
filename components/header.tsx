"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { SearchBar } from "./search-bar"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b-4 border-black bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="flex items-center justify-between gap-6 mb-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="neo-border-accent p-2 bg-white">
              <div className="w-6 h-6 bg-black"></div>
            </div>
            <span className="text-xl font-bold tracking-tight hidden sm:inline">FUNDING TRACKER</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="font-bold text-sm hover:text-green-700 transition">
              HOME
            </Link>
            <Link href="/explore" className="font-bold text-sm hover:text-green-700 transition">
              EXPLORE
            </Link>
            <Link href="/analytics" className="font-bold text-sm hover:text-green-700 transition">
              ANALYTICS
            </Link>
            <Link href="/about" className="font-bold text-sm hover:text-green-700 transition">
              ABOUT
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden neo-border p-2 bg-white hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mb-6 neo-border p-4 bg-white">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="font-bold text-sm hover:text-green-700 transition py-2 border-b-2 border-gray-200"
              >
                HOME
              </Link>
              <Link
                href="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className="font-bold text-sm hover:text-green-700 transition py-2 border-b-2 border-gray-200"
              >
                EXPLORE
              </Link>
              <Link
                href="/analytics"
                onClick={() => setMobileMenuOpen(false)}
                className="font-bold text-sm hover:text-green-700 transition py-2 border-b-2 border-gray-200"
              >
                ANALYTICS
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="font-bold text-sm hover:text-green-700 transition py-2"
              >
                ABOUT
              </Link>
            </div>
          </nav>
        )}

        <SearchBar />
      </div>
    </header>
  )
}
