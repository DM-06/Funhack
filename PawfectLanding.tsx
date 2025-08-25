import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import heroImage from '@/assets/hero-pets.jpg';

interface PawfectLandingProps {
  onStartMatching: () => void;
}

export function PawfectLanding({ onStartMatching }: PawfectLandingProps) {
  const [showHearts, setShowHearts] = useState(false);

  const handleGetStarted = () => {
    setShowHearts(true);
    setTimeout(() => {
      onStartMatching();
    }, 1000);
  };

  return (
    <main className="min-h-screen dark-flow-bg paw-cursor relative overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Floating Hearts Animation */}
      {showHearts && (
        <div className="floating-hearts">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="heart"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {['💕', '🐾', '💖', '🎉'][Math.floor(Math.random() * 4)]}
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-16 text-center relative z-10">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-block mb-4">
              <h1 className="text-6xl md:text-8xl font-black text-white mb-4 drop-shadow-lg">
                🐾 Pawfect Match 💍
              </h1>
            </div>
            <p className="text-2xl md:text-3xl text-white/90 font-semibold drop-shadow-md bounce-fun shimmer">
              Where True Love Has Four Paws & Zero Standards! 
            </p>
            <p className="text-lg text-white/70 mt-2 italic bounce-hover">
              *Results may include excessive belly rubs and spontaneous zoomies*
            </p>
          </div>

          <div className="mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-4">
                🚨 <strong>BREAKING:</strong> Scientists discover that 99.7% of pets are single and desperately ready to mingle! 
              </p>
              <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                Our advanced AI matchmaking uses cutting-edge "sniff-compatibility" technology, 
                cosmic paw-reading, and the ancient art of treat-preference analysis. 
                <span className="font-bold text-paw-yellow"> Guaranteed to find your pet their soulmate!</span> 
                <span className="text-sm">*Guarantee void if your pet is commitment-phobic.*</span>
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 interactive-btn pulse-glow">
              <div className="text-4xl mb-4 wiggle">🔮</div>
              <h3 className="text-xl font-bold mb-2">Mystical Paw-Kundli Reading</h3>
              <p className="text-white/80">Our certified fortune-telling ferrets analyze cosmic compatibility using ancient paw-palmistry techniques passed down through generations of very wise hamsters!</p>
            </Card>
            
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 interactive-btn pulse-glow">
              <div className="text-4xl mb-4 bounce-fun">💒</div>
              <h3 className="text-xl font-bold mb-2">Epic Wedding Ceremonies</h3>
              <p className="text-white/80">Full Bollywood-style ceremonies featuring live shahnai music, professional pigeon releases, and premium kibble confetti cannons! Red carpet not included but dramatically implied.</p>
            </Card>
            
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 interactive-btn pulse-glow">
              <div className="text-4xl mb-4 wiggle">🧬</div>
              <h3 className="text-xl font-bold mb-2">Scientific Personality Matching</h3>
              <p className="text-white/80">Advanced algorithms analyze fluff levels, snooze patterns, treat preferences, and most importantly - how they feel about bath time. NASA wishes they were this accurate!</p>
            </Card>
          </div>

          {/* Testimonials */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">💬 What Pets Are Saying:</h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto">
              <p className="text-white/90 italic text-lg mb-2">
                "Woof woof bark bark! Translation: This app found me my soulmate! We now share everything - toys, treats, and the mailman's ankles!"
              </p>
              <p className="text-white/70 text-sm">- Princess Zoomies, Professional Good Girl</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="space-y-4">
            <Button 
              variant="engage" 
              size="xl" 
              onClick={handleGetStarted}
              className="text-2xl font-black px-16 py-8 shadow-2xl hover:shadow-glow wiggle interactive-btn pulse-glow"
            >
              🚀 Let's Find Some Paw-some Love! 💕
            </Button>
            <p className="text-white/60 text-sm bounce-hover">
              🎭 <em>* No actual pets were married in the making of this app. Side effects may include excessive tail wagging and spontaneous treat demands. Consult your veterinarian if zoomies persist for more than 4 hours.</em>
            </p>
          </div>
        </div>

        {/* Fun Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
          <div className="text-white bounce-fun interactive-btn">
            <div className="text-3xl font-bold pulse-glow">127</div>
            <div className="text-white/70">Successful Matches</div>
            <div className="text-xs text-white/50">*(mostly successful)</div>
          </div>
          <div className="text-white bounce-fun interactive-btn">
            <div className="text-3xl font-bold pulse-glow">42</div>
            <div className="text-white/70">Kibble Ceremonies</div>
            <div className="text-xs text-white/50">*and counting!</div>
          </div>
          <div className="text-white bounce-fun interactive-btn">
            <div className="text-3xl font-bold pulse-glow">99.9%</div>
            <div className="text-white/70">Tail Wag Approval</div>
            <div className="text-xs text-white/50">*0.1% were cats</div>
          </div>
          <div className="text-white bounce-fun interactive-btn">
            <div className="text-3xl font-bold pulse-glow">∞</div>
            <div className="text-white/70">Belly Rubs Given</div>
            <div className="text-xs text-white/50">*approximately</div>
          </div>
        </div>
      </div>

        {/* Decorative Animated Paw Prints */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 text-white wiggle bounce-hover">🐾</div>
        <div className="absolute top-40 right-20 text-4xl opacity-20 text-white bounce-fun wiggle">🐾</div>
        <div className="absolute bottom-20 left-20 text-5xl opacity-20 text-white wiggle bounce-hover">🐾</div>
        <div className="absolute bottom-10 right-10 text-3xl opacity-20 text-white bounce-fun wiggle">🐾</div>
        
        {/* Extra animated elements */}
        <div className="absolute top-1/2 left-5 text-2xl opacity-30 text-white wiggle pulse-glow">💕</div>
        <div className="absolute top-1/3 right-5 text-2xl opacity-30 text-white bounce-fun pulse-glow">💖</div>
    </main>
  );
}