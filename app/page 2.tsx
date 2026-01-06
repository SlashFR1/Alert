import Link from "next/link";
import { ArrowRight, Bell, CheckCircle, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-gray-100 backdrop-blur-md bg-white/70 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Bell size={18} />
            </div>
            AlertPlatform
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="text-gray-600 hover:text-gray-900 font-medium">Log in</Link>
            <Link href="/sign-in" className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-medium text-sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 bg-hero">
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Real-time Monitoring
          </div>
          <h1 className="text-6xl font-bold tracking-tight mb-6">
            Never miss an <span className="text-gradient">opportunity</span> again.
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Monitor tailored keywords across the web. Whether it's a freelance gig, a product deal, or a mention—get notified instantly.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/sign-in" className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25 font-semibold text-lg flex items-center gap-2">
              Start Monitoring <ArrowRight size={20} />
            </Link>
            <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-semibold text-lg">
              View Demo
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
          {[
            { icon: Bell, title: "Instant Alerts", desc: "Get notified via email the second a match is found." },
            { icon: Shield, title: "Smart Filtering", desc: "Advanced logic to filter out noise and spam." },
            { icon: CheckCircle, title: "Easy Setup", desc: "Set your keywords and we handle the rest." },
          ].map((f, i) => (
            <div key={i} className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900 mb-6">
                <f.icon />
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-gray-100 py-10 text-center text-gray-500 text-sm">
        © 2025 AlertPlatform. Built for efficiency.
      </footer>
    </div>
  );
}
