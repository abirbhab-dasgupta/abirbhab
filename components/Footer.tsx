"use client"

import { Coffee } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-gray-800/50">
      <div className="relative container mx-auto px-4 py-12">
        <div className="text-center space-y-4">
          {/* Main text */}
          <div className="space-y-1 flex items-center gap-2 text-sm text-muted-foreground justify-center py-2">
          <Coffee className="w-4 h-4" />
            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
              Fueled by caffeine and creativity
            </h3>
          </div>

          {/* Decorative line */}
          <div className="flex justify-center py-4">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
          </div>

          {/* Copyright */}
          <div className="text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Abirbhab Dasgupta. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
