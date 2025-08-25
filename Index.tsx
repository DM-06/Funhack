import { useState } from 'react';
import { PawfectLanding } from '@/components/PawfectLanding';
import { SwipeInterface } from '@/components/SwipeInterface';
import { MatchInterface } from '@/components/MatchInterface';
import { Pet } from '@/lib/pawKundli';

type AppView = 'landing' | 'swipe' | 'match';

const Index = () => {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [matchedPet, setMatchedPet] = useState<Pet | null>(null);

  const handleStartMatching = () => {
    setCurrentView('swipe');
  };

  const handleMatch = (pet: Pet) => {
    setMatchedPet(pet);
    setCurrentView('match');
  };

  const handleBackToHome = () => {
    setCurrentView('landing');
    setMatchedPet(null);
  };

  const handleBackToSwipe = () => {
    setCurrentView('swipe');
  };

  // Render different views based on current state
  switch (currentView) {
    case 'swipe':
      return (
        <SwipeInterface 
          onMatch={handleMatch}
          onBack={handleBackToHome}
        />
      );
    
    case 'match':
      return matchedPet ? (
        <MatchInterface 
          matchedPet={matchedPet}
          onBack={handleBackToSwipe}
        />
      ) : null;
    
    case 'landing':
    default:
      return (
        <PawfectLanding 
          onStartMatching={handleStartMatching}
        />
      );
  }
};

export default Index;
