import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Pet, generatePawKundli } from '@/lib/pawKundli';
import { getCurrentUserPet } from '@/data/mockPets';
import { EngagementCeremony } from './EngagementCeremony';
import { PawKundliDisplay } from './PawKundliDisplay';
import { WeddingInvitation } from './WeddingInvitation';
import { useSound } from '@/hooks/useSound';

interface MatchInterfaceProps {
  matchedPet: Pet;
  onBack: () => void;
}

export function MatchInterface({ matchedPet, onBack }: MatchInterfaceProps) {
  const [currentView, setCurrentView] = useState<'chat' | 'ceremony' | 'kundli' | 'invitation'>('chat');
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'match', timestamp: Date}>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isEngaged, setIsEngaged] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const userPet = getCurrentUserPet();
  const pawKundli = generatePawKundli(userPet, matchedPet);
  const { playButtonSound } = useSound();

  const funnyStarters = [
    `Woof! ${matchedPet.name} seems absolutely PAW-SOME! Got time for some zoomies? 🐾`,
    `Is it hot in here, or is it just your fluff level? *fans self dramatically* 😏🔥`,
    `My human says I should say hi first. Hi! Also, got any treats? Asking for me... 🍖✨`,
    `Your bio made me howl with laughter! Wanna share secrets about why humans wear shoes? 🦴📮`,
    `Do you believe in love at first sniff? Because... *AGGRESSIVE SNIFFING* ...I think I'm smitten! 💕👃`,
    `I'm not usually this forward, but... wanna judge humans and their life choices together? 🐿️👨‍⚖️`,
    `*adjusts imaginary glasses* Are you a magician? Because every time I look at you, my bowl appears empty! 🎩✨`,
    `On a scale of 1 to "knocked over an entire table," how chaotic are you? I'm asking for... research. 🏃‍♂️💨`,
    `Do you come here often? Because I've been here for 3 years and I've never seen you... oh wait, that's because I sleep 20 hours a day. 😴`,
    `*whispers conspiratorially* Want to team up and convince our humans that 4am is the perfect time for conversation? 🌙`,
    `I may not be a photographer, but I can definitely picture us destroying furniture together! 📸💥`,
    `Are you my appendix? Because I have this gut feeling I should take you out! *ba dum tss* 🥁`
  ];

  const matchResponses = [
    `*wags tail so hard entire body wiggles* OH MY TREATS! A message from ${userPet.name}! This is better than finding a dropped cheese stick! 🎾💫`,
    `*ears perk up to maximum alertness* Did someone mention treats?! You've got my undivided attention now! Also, want to overthrow the government? 👂🍖`,
    `*does happy dance that involves spinning in circles* YAAAS! We're talking! Want to know a secret? I once ate an entire birthday cake. No regrets. 🧦🎾`,
    `*purrs so loudly neighbors call noise control* Finally, someone who gets me! Let's plot world domination... right after this nap. 😸👑`,
    `*chirps melodically while doing interpretive dance* Tweet tweet! You're delightful! Let's harmonize at 5am and confuse ALL the humans! 🎵🌅`,
    `*rolls over dramatically for belly rubs* This is it! True love! Also, can you open treat jars? This is very important information. 💖🍪`,
    `*tilts head so adorably it should be illegal* Wait, you're ACTUALLY talking to ME? I thought I was hallucinating again! 🤔💕`,
    `*makes biscuits in the air while purring* OH OH OH! We're best friends now! Can we share snacks AND judge people together? 🍪👥`,
    `*dramatically flops on back* You've swept me off my four paws! Also, do you think humans know we're smarter than them? 💕🤭`,
    `*does synchronized wiggle dance* THIS IS THE MOMENT! I've been waiting for someone who understands that 3am zoomies are ESSENTIAL! ⚡💫`,
    `*whispers conspiratorially* Between you and me... I think our humans are the pets. Wanna mess with their heads? 😈🎭`,
    `*spins in circles of pure joy* You complete me! Like treats complete... well, everything! When do we move in together? 🌪️💕`
  ];

  useEffect(() => {
    // Add initial match message
    const initialMessage = {
      text: `🎉 IT'S A MATCH! 🎉\n${userPet.name} and ${matchedPet.name} have found each other!`,
      sender: 'match' as const,
      timestamp: new Date()
    };
    setMessages([initialMessage]);
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    playButtonSound(); // Add button sound effect

    const userMessage = {
      text: newMessage,
      sender: 'user' as const,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Auto-reply from match with more varied responses
    setTimeout(() => {
      const response = {
        text: matchResponses[Math.floor(Math.random() * matchResponses.length)],
        sender: 'match' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
    }, 800 + Math.random() * 1200); // Variable response time for realism
  };

  const handlePropose = () => {
    setCurrentView('ceremony');
  };

  const handleEngagementComplete = () => {
    setIsEngaged(true);
    setShowConfetti(true);
    setCurrentView('kundli');
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const getPetImage = (pet: Pet) => {
    // Use real images if available, otherwise fallback to generated images
    if (pet.photo) {
      return pet.photo;
    }
    
    // Fallback to dicebear for user's pet or any missing images
    const size = 200;
    if (pet.species === 'cat') {
      return `https://api.dicebear.com/7.x/cats/svg?seed=${pet.name}&size=${size}`;
    } else if (pet.species === 'dog') {
      return `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${pet.name}&size=${size}`;
    } else {
      return `https://api.dicebear.com/7.x/shapes/svg?seed=${pet.name}&size=${size}`;
    }
  };

  if (currentView === 'ceremony') {
    return (
      <EngagementCeremony
        petA={userPet}
        petB={matchedPet}
        onComplete={handleEngagementComplete}
        onBack={() => setCurrentView('chat')}
      />
    );
  }

  if (currentView === 'invitation') {
    return (
      <WeddingInvitation
        petA={userPet}
        petB={matchedPet}
        weddingDate={pawKundli.bestWeddingDate}
        venue="Central Bark Gardens"
        onShare={() => {
          // Add share tracking if needed
          console.log('Wedding invitation shared!');
        }}
        onBack={() => setCurrentView('kundli')}
      />
    );
  }

  if (currentView === 'kundli') {
    return (
      <PawKundliDisplay
        petA={userPet}
        petB={matchedPet}
        pawKundli={pawKundli}
        isEngaged={isEngaged}
        onBack={() => setCurrentView('chat')}
        onNewSearch={onBack}
        onViewInvitation={() => setCurrentView('invitation')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero p-4">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {['🎉', '💖', '🐾', '💍', '🎊'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-8">
          <Button variant="ghost" onClick={onBack} className="text-white">
            ← Back
          </Button>
          <div className="text-white text-center">
            <h1 className="text-xl font-bold">💕 Perfect Match!</h1>
            <Badge variant="secondary" className="bg-paw-green text-white mt-1">
              {pawKundli.compatibilityScore}% Compatible!
            </Badge>
          </div>
          <Button 
            variant="treat" 
            size="sm"
            onClick={() => setCurrentView('kundli')}
          >
            Kundli
          </Button>
        </div>

        {/* Match Header */}
        <Card className="mb-6 bg-white shadow-card overflow-hidden">
          <div className="bg-gradient-secondary p-6 text-center text-white">
            <div className="flex justify-center items-center gap-4 mb-4">
              <img 
                src={getPetImage(userPet)}
                alt={userPet.name}
                className="w-16 h-16 rounded-full shadow-soft"
              />
              <div className="text-3xl animate-pulse">💕</div>
              <img 
                src={getPetImage(matchedPet)}
                alt={matchedPet.name}
                className="w-16 h-16 rounded-full shadow-soft"
              />
            </div>
            <h2 className="text-xl font-bold">
              {userPet.name} & {matchedPet.name}
            </h2>
            {isEngaged && (
              <Badge className="bg-paw-yellow text-foreground mt-2">
                💍 ENGAGED! 💍
              </Badge>
            )}
          </div>
        </Card>

        {/* Chat Messages */}
        <Card className="mb-4 bg-white shadow-card">
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Message Input */}
        <div className="flex gap-2 mb-4">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="bg-white"
          />
          <Button variant="paw" onClick={sendMessage}>
            Send 🐾
          </Button>
        </div>

        {/* Quick Starters - FIXED CONTAINER */}
        <div className="mb-6">
          <p className="text-white/70 text-sm text-center mb-3">✨ Quick starters:</p>
          <div className="grid grid-cols-1 gap-2">
            {funnyStarters.slice(0, 3).map((starter, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setNewMessage(starter)}
                className="text-xs bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-200 text-left px-3 py-2 h-auto min-h-[2.5rem] whitespace-normal break-words"
              >
                <span className="block w-full text-center leading-tight">
                  {starter.length > 80 ? starter.substring(0, 80) + '...' : starter}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Action Buttons - CENTERED PROPOSAL */}
        <div className="flex justify-center">
          {!isEngaged ? (
            <Button 
              variant="engage" 
              size="xl"
              onClick={handlePropose}
              className="px-12 py-4 text-lg font-bold hover:scale-105 transition-all duration-300 shadow-glow"
            >
              💍 Propose Marriage! 💍
            </Button>
          ) : (
            <div className="flex gap-4 w-full max-w-sm">
              <Button 
                variant="paw" 
                className="flex-1 bg-paw-green hover:bg-paw-green/90 hover:scale-105 transition-all duration-200"
                onClick={() => setCurrentView('kundli')}
              >
                📜 Wedding Plans
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}