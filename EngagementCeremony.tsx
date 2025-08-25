import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pet } from '@/lib/pawKundli';
import { useSound } from '@/hooks/useSound';
import animalCouples from '@/assets/animal-couples-1.jpg';
import animalWedding from '@/assets/animal-wedding-ceremony.jpg';

interface EngagementCeremonyProps {
  petA: Pet;
  petB: Pet;
  onComplete: () => void;
  onBack: () => void;
}

export function EngagementCeremony({ petA, petB, onComplete, onBack }: EngagementCeremonyProps) {
  const [ceremonyStep, setCeremonyStep] = useState<'proposal' | 'countdown' | 'celebration'>('proposal');
  const [countdown, setCountdown] = useState(3);
  const [showPigeons, setShowPigeons] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [playingMusic, setPlayingMusic] = useState(false);
  
  const { playShenaiSound, playEngagementSound } = useSound();

  useEffect(() => {
    if (ceremonyStep === 'countdown' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (ceremonyStep === 'countdown' && countdown === 0) {
      startCelebration();
    }
  }, [ceremonyStep, countdown]);

  const startCelebration = () => {
    setCeremonyStep('celebration');
    setShowPigeons(true);
    setShowConfetti(true);
    setPlayingMusic(true);
    
    // Play traditional Indian wedding shehnai sound!
    playShenaiSound();
    
    // Also play engagement sound
    setTimeout(() => {
      playEngagementSound();
    }, 1000);
    
    // Auto-complete after celebration
    setTimeout(() => {
      onComplete();
    }, 8000); // Extended time to enjoy the music
  };

  const getPetImage = (pet: Pet) => {
    const size = 200;
    if (pet.species === 'cat') {
      return `https://api.dicebear.com/7.x/cats/svg?seed=${pet.name}&size=${size}`;
    } else if (pet.species === 'dog') {
      return `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${pet.name}&size=${size}`;
    } else {
      return `https://api.dicebear.com/7.x/shapes/svg?seed=${pet.name}&size=${size}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4 relative overflow-hidden">
      {/* Flying Pigeons Animation */}
      {showPigeons && (
        <div className="fixed inset-0 pointer-events-none z-20">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl animate-bounce"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `-50px`,
                animation: `pigeonFly 4s linear infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              🕊️
            </div>
          ))}
        </div>
      )}

      {/* Kibble Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-30">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="confetti text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              {['🦴', '🍖', '🐾', '💖', '🎉', '💍'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-md mx-auto pt-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="text-white">
            ← Back
          </Button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center whitespace-nowrap">🎪 The Pawsome Love Circus! 🎪</h1>
          <div></div>
        </div>

        {ceremonyStep === 'proposal' && (
          <Card className="p-6 text-center bg-gradient-to-br from-white via-pink-50 to-purple-50 shadow-2xl border border-pink-200/50 backdrop-blur-sm overflow-hidden">
            <div className="mb-6 w-full">
              <img
                src={animalCouples}
                alt="Animal couples in love"
                className="w-full h-32 object-cover rounded-xl mb-6 shadow-elegant border-2 border-pink-200/30"
              />
              
              <h2 className="text-xl sm:text-2xl font-black text-transparent bg-gradient-to-r from-paw-pink via-purple-500 to-paw-pink bg-clip-text mb-4 animate-pulse break-words">
                <span className="inline-block">🎭</span> The Great Paw-posal Extravaganza! <span className="inline-block">🎭</span>
              </h2>
              <p className="text-sm sm:text-base font-semibold text-muted-foreground mb-6 italic break-words">
                "When Fluff Meets Love in a Tail-Wagging Tale!" <span className="inline-block">🐾💖</span>
              </p>
              
              <div className="bg-gradient-to-r from-pink-100/80 via-white to-purple-100/80 p-4 sm:p-6 rounded-xl mb-8 border border-pink-200/50 shadow-soft overflow-hidden">
                <p className="text-sm sm:text-lg text-foreground leading-relaxed break-words">
                  "{petA.name} gets down on one paw and presents a beautiful{" "}
                  <span className="font-bold text-paw-pink animate-pulse break-words">Tuna Ring of Eternal Devotion</span>{" "}
                  to {petB.name}!"
                </p>
                <p className="text-sm sm:text-lg text-foreground mt-4 italic break-words">
                  "Will you be my furever companion? Through belly rubs and bath times, in sickness and in zoomies?"
                </p>
              </div>
              
              <div className="flex justify-center w-full px-2">
                <Button 
                  variant="engage" 
                  size="lg"
                  onClick={() => setCeremonyStep('countdown')}
                  className="text-lg sm:text-xl font-black px-6 sm:px-12 py-4 sm:py-6 w-full max-w-sm bg-gradient-to-r from-paw-pink via-pink-500 to-paw-purple text-white shadow-glow hover:shadow-2xl hover:scale-105 transition-all duration-500 rounded-full border-2 border-white/30 animate-bounce break-words"
                >
                  🎉 YAAYYY! IT'S A MATCH! 🎉
                </Button>
              </div>
            </div>
          </Card>
        )}

        {ceremonyStep === 'countdown' && (
          <Card className="p-8 text-center bg-white shadow-2xl">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              🎊 Preparing the Celebration! 🎊
            </h2>
            
            <div className="text-8xl font-black text-paw-pink mb-8 animate-pulse">
              {countdown || "🎉"}
            </div>
            
            <div className="space-y-4 text-foreground">
              <p className="text-lg">🎺 Tuning the shahnai...</p>
              <p className="text-lg">🕊️ Releasing the ceremonial pigeons...</p>
              <p className="text-lg">🦴 Preparing premium kibble confetti...</p>
            </div>
          </Card>
        )}

        {ceremonyStep === 'celebration' && (
          <Card className="p-8 text-center bg-white shadow-2xl">
            <div className="mb-6">
              <img 
                src={animalWedding}
                alt="Animal wedding ceremony"
                className="w-full h-32 object-cover rounded-lg mb-4 shadow-soft"
              />
              
              <h2 className="text-3xl font-bold text-foreground mb-4 animate-bounce">🎉 THEY'RE ENGAGED! 🎉</h2>

              <div className="text-6xl mb-4">💍👑💍</div>
              
              <div className="bg-gradient-hero text-white p-6 rounded-lg mb-6">
                <p className="text-lg">
                  Officially Engaged to be Furever Together!
                </p>
                <p className="text-sm mt-2 opacity-90">
                  🎺 *Shahnai music plays* 🎺
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="text-2xl">🕊️</div>
                  <p>6 Pigeons Released</p>
                </div>
                <div>
                  <div className="text-2xl">🦴</div>
                  <p>Premium Kibble</p>
                </div>
                <div>
                  <div className="text-2xl">🎺</div>
                  <p>Shahnai Serenade</p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}