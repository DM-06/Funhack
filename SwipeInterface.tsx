import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Pet } from '@/lib/pawKundli';
import { mockPets } from '@/data/mockPets';
import { useSound } from '@/hooks/useSound';

interface SwipeInterfaceProps {
  onMatch: (pet: Pet) => void;
  onBack: () => void;
}

export function SwipeInterface({ onMatch, onBack }: SwipeInterfaceProps) {
  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [matches, setMatches] = useState<Pet[]>([]);
  
  const { playSwipeSound, playMatchSound } = useSound();

  const currentPet = mockPets[currentPetIndex];
  const progress = ((currentPetIndex % mockPets.length + 1) / mockPets.length) * 100;

  const getRandomTags = (pet: Pet) => {
    const allTags = [
      '🎾 Ball Obsessed', '😴 Professional Napper', '🍖 Treat Connoisseur', 
      '🦆 Squirrel Chaser', '🧦 Sock Collector', '🪟 Window Watcher',
      '🎵 Midnight Singer', '🏠 Couch Guardian', '🌙 3AM Zoomie Expert',
      '🎭 Drama Queen/King', '🍃 Catnip Enthusiast', '📦 Box Inspector'
    ];
    
    const tags = [];
    if (pet.species === 'cat') {
      tags.push('😺 Feline Royalty', '🐾 Independent Spirit');
    } else if (pet.species === 'dog') {
      tags.push('🐕 Loyal Companion', '❤️ People Pleaser');
    } else if (pet.species === 'bird') {
      tags.push('🎤 Chatterbox', '🌈 Colorful Personality');
    }
    
    // Add one random tag
    const randomTag = allTags[Math.floor(Math.random() * allTags.length)];
    tags.push(randomTag);
    
    return tags.slice(0, 3);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isAnimating) return;
    
    // Play swipe sound
    playSwipeSound();
    
    setIsAnimating(true);
    setAnimationClass(direction === 'right' ? 'swiping-right' : 'swiping-left');
    
    setTimeout(() => {
      if (direction === 'right') {
        // It's a match! 
        playMatchSound();
        const newMatch = currentPet;
        setMatches(prev => [...prev, newMatch]);
        onMatch(newMatch);
        return;
      }
      
      // ENDLESS SWIPING! Move to next pet or loop back to start
      const nextIndex = currentPetIndex + 1;
      if (nextIndex >= mockPets.length) {
        // Loop back to the beginning for ENDLESS fun!
        setCurrentPetIndex(0);
      } else {
        setCurrentPetIndex(nextIndex);
      }
      
      setAnimationClass('');
      setIsAnimating(false);
    }, 300);
  };

  const getPetImage = (pet: Pet) => {
    // Use real images if available, otherwise fallback to generated images
    if (pet.photo) {
      return pet.photo;
    }
    
    // Fallback to dicebear for user's pet or any missing images
    const size = 400;
    if (pet.species === 'cat') {
      return `https://api.dicebear.com/7.x/cats/svg?seed=${pet.name}&size=${size}`;
    } else if (pet.species === 'dog') {
      return `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${pet.name}&size=${size}`;
    } else {
      return `https://api.dicebear.com/7.x/shapes/svg?seed=${pet.name}&size=${size}`;
    }
  };

  if (!currentPet) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">🎉 All Done!</h2>
          <p className="mb-4">You've seen all available pets!</p>
          <Button variant="paw" onClick={onBack}>Back to Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero p-4 paw-cursor">
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="text-white">
            ← Back
          </Button>
          <div className="text-white text-center">
            <h1 className="text-2xl font-bold">Find Your Match! 💕</h1>
            <p className="text-white/70">Swipe right to connect</p>
          </div>
          <div className="text-white text-sm">
            {matches.length} matches
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
          <p className="text-white/70 text-sm text-center mt-2">
            Pet #{(currentPetIndex % mockPets.length) + 1} • ∞ Endless Love Awaits!
          </p>
        </div>

        {/* Pet Card */}
        <Card className={`swipe-card ${animationClass} bg-white shadow-2xl overflow-hidden mb-6`}>
          <div className="aspect-square bg-gradient-card p-8 flex items-center justify-center">
            <img 
              src={getPetImage(currentPet)}
              alt={currentPet.name}
              className="w-64 h-64 object-cover rounded-full shadow-soft"
            />
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{currentPet.name}</h2>
                <p className="text-muted-foreground capitalize">
                  {currentPet.species} • Age: {new Date().getFullYear() - new Date(currentPet.birthday).getFullYear()}
                </p>
              </div>
              <Badge variant="secondary" className="bg-paw-pink text-white">
                Owner: {currentPet.owner_name}
              </Badge>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {getRandomTags(currentPet).map((tag, index) => (
                <Badge key={index} variant="outline" className="border-paw-purple text-paw-purple hover:bg-paw-purple hover:text-white transition-colors">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Funny Quirks */}
            {currentPet.funnyQuirks && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-muted-foreground mb-2">🎭 Special Talents:</h4>
                <div className="flex flex-wrap gap-1">
                  {currentPet.funnyQuirks.slice(0, 2).map((quirk, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-paw-yellow/20 text-foreground hover:bg-paw-yellow/40 transition-colors">
                      {quirk}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl">🧸</div>
                <div className="text-sm text-muted-foreground">Fluff Level</div>
                <div className="font-bold">{currentPet.fluff_level}/10</div>
              </div>
              <div className="text-center">
                <div className="text-2xl">😴</div>
                <div className="text-sm text-muted-foreground">Snooze Level</div>
                <div className="font-bold">{currentPet.snooze_level}/10</div>
              </div>
              <div className="text-center">
                <div className="text-2xl">🍖</div>
                <div className="text-sm text-muted-foreground">Treat Love</div>
                <div className="font-bold">{currentPet.favorite_snack_score}/10</div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-foreground text-sm leading-relaxed italic">
              "{currentPet.bio}"
            </p>
          </div>
        </Card>

        {/* Swipe Buttons - STABLE VERSION */}
        <div className="flex justify-center gap-8 pt-4">
          <Button
            variant="destructive"
            size="icon-lg"
            onClick={() => handleSwipe('left')}
            disabled={isAnimating}
            className="w-20 h-20 rounded-full shadow-2xl transform-none hover:scale-110 transition-all duration-200 bg-gradient-to-br from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 border-4 border-white text-3xl font-black text-white ring-2 ring-red-300"
          >
            ✕
          </Button>
          <Button
            variant="paw"
            size="icon-lg"
            onClick={() => handleSwipe('right')}
            disabled={isAnimating}
            className="w-20 h-20 rounded-full shadow-glow bg-paw-green hover:bg-paw-green/90 text-white transform-none hover:scale-105 transition-transform duration-200"
          >
            💖
          </Button>
        </div>

        <p className="text-white/60 text-center text-sm mt-4">
          ❌ "Not today, Satan" • 💖 "OMG YES PLEASE!"
        </p>
        
        {/* Funny Tip */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
          <p className="text-white/80 text-xs text-center italic">
            💡 Pro Tip: {['Pets who like the same treats have 87% higher success rates!', 'Sniff compatibility is scientifically proven*', 'Always swipe right on pets with good belly-rub potential!', 'Cats judge your swiping technique - choose wisely!'][Math.floor(Math.random() * 4)]}
          </p>
          <p className="text-white/50 text-xs text-center mt-1">*Science not actually involved</p>
        </div>
      </div>
    </div>
  );
}