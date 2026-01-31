import  ContentFlywheel  from "../components/content-flywheel"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/60">
            <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
            New: Motion Engine v2.0
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
            Super fast motion <br />
            <span className="text-white/40">for every team</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto text-pretty">
            Create high-end cinematic animations in seconds. The professional toolkit for modern content creators and
            agencies.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <button className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors">
              Try for free
            </button>
            <button className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors">
              View templates
            </button>
          </div>
        </div>
      </section>

      {/* Flywheel Visualization */}
      <section className="relative">
        <ContentFlywheel />

        {/* Overlaid Grid / Floor for depth */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
      </section>

      {/* Trusted By Section */}
      <section className="py-20 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-medium text-white/30 uppercase tracking-widest mb-12">
            Trusted by creative teams at
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex justify-center font-bold text-2xl text-white">Netflix</div>
            <div className="flex justify-center font-bold text-2xl text-white">Disney+</div>
            <div className="flex justify-center font-bold text-2xl text-white">Nike</div>
            <div className="flex justify-center font-bold text-2xl text-white">Apple</div>
            <div className="flex justify-center font-bold text-2xl text-white">Stripe</div>
            <div className="flex justify-center font-bold text-2xl text-white">Airbnb</div>
          </div>
        </div>
      </section>
    </main>
  )
}
