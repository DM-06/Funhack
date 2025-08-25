import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pet } from '@/lib/pawKundli';

interface WeddingInvitationProps {
  petA: Pet;
  petB: Pet;
  weddingDate: string;
  venue: string;
  onShare: () => void;
  onBack: () => void;
}

export function WeddingInvitation({ petA, petB, weddingDate, venue, onShare, onBack }: WeddingInvitationProps) {
  const [copied, setCopied] = useState(false);

  const getPetImage = (pet: Pet) => {
    if (pet.photo) return pet.photo;
    const size = 150;
    if (pet.species === 'cat') {
      return `https://api.dicebear.com/7.x/cats/svg?seed=${pet.name}&size=${size}`;
    } else if (pet.species === 'dog') {
      return `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${pet.name}&size=${size}`;
    } else {
      return `https://api.dicebear.com/7.x/shapes/svg?seed=${pet.name}&size=${size}`;
    }
  };

  const shareInvitation = async () => {
    const invitationText = `🎉 YOU'RE INVITED! 🎉

💍 ${petA.name} & ${petB.name} are getting married! 💍

When: ${weddingDate}
Where: ${venue}

Come witness the most PAW-SOME love story ever told! 

Expect: 
🎵 Shenai music (and some howling)
🍖 Premium treats buffet
🎾 Post-ceremony zoomies
💕 Unlimited belly rubs
🎭 Drama (it's a wedding, after all!)

RSVP: Just show up with treats! 

#PawfectMatch #LoveWins #TreatsRequired`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${petA.name} & ${petB.name}'s Wedding!`,
          text: invitationText,
          url: window.location.href
        });
      } catch (err) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(invitationText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(invitationText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    
    onShare();
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4 flex items-center justify-center">
      <Card className="max-w-lg mx-auto bg-white shadow-2xl overflow-hidden">
        {/* Decorative Header */}
        <div className="bg-gradient-to-r from-paw-pink via-paw-purple to-paw-pink p-8 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-4 text-4xl animate-bounce">💕</div>
            <div className="absolute top-8 right-8 text-3xl animate-pulse">💍</div>
            <div className="absolute bottom-4 left-8 text-2xl animate-wiggle">🎉</div>
            <div className="absolute bottom-8 right-4 text-3xl animate-bounce-fun">🐾</div>
          </div>
          
          <h1 className="text-3xl font-bold mb-2 relative z-10">YOU'RE INVITED!</h1>
          <div className="text-lg mb-4 relative z-10">to the most PAW-SOME wedding of the century!</div>
          
          {/* Pet Photos */}
          <div className="flex justify-center items-center gap-6 mb-4 relative z-10">
            <div className="relative">
              <img 
                src={getPetImage(petA)}
                alt={petA.name}
                className="w-20 h-20 rounded-full shadow-lg border-4 border-white"
              />
              <div className="absolute -bottom-2 -right-2 bg-paw-yellow text-foreground rounded-full p-1 text-xs font-bold">
                💕
              </div>
            </div>
            
            <div className="text-4xl animate-pulse">💖</div>
            
            <div className="relative">
              <img 
                src={getPetImage(petB)}
                alt={petB.name}
                className="w-20 h-20 rounded-full shadow-lg border-4 border-white"
              />
              <div className="absolute -bottom-2 -left-2 bg-paw-yellow text-foreground rounded-full p-1 text-xs font-bold">
                💕
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold relative z-10">
            {petA.name} & {petB.name}
          </h2>
          <p className="text-lg opacity-90 relative z-10">are getting married!</p>
        </div>

        {/* Wedding Details */}
        <div className="p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="text-2xl">📅</div>
              <div>
                <p className="font-semibold text-lg">When</p>
                <p className="text-muted-foreground">{weddingDate}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <div className="text-2xl">📍</div>
              <div>
                <p className="font-semibold text-lg">Where</p>
                <p className="text-muted-foreground">{venue}</p>
              </div>
            </div>
          </div>

          {/* Fun Details */}
          <div className="bg-gradient-card p-6 rounded-lg text-center">
            <h3 className="font-bold text-lg mb-4 text-foreground">🎉 What to Expect 🎉</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Badge variant="secondary" className="bg-paw-yellow/20 text-foreground">🎵 Live Shenai Music</Badge>
              <Badge variant="secondary" className="bg-paw-pink/20 text-foreground">🍖 Premium Treats Buffet</Badge>
              <Badge variant="secondary" className="bg-paw-purple/20 text-foreground">🎾 Post-Ceremony Zoomies</Badge>
              <Badge variant="secondary" className="bg-paw-green/20 text-foreground">💕 Unlimited Belly Rubs</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-4 italic">
              "It's going to be more dramatic than a soap opera and more entertaining than a squirrel chase!" - The Happy Couple
            </p>
          </div>

          {/* RSVP Instructions */}
          <div className="text-center p-4 bg-muted rounded-lg">
            <h4 className="font-bold mb-2">🎊 RSVP Instructions 🎊</h4>
            <p className="text-sm text-muted-foreground">
              Just show up with treats! (And maybe bring tissues for happy tears... and some for when the groom inevitably gets distracted by a butterfly during the vows!)
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button variant="ghost" onClick={onBack} className="flex-1">
              ← Back
            </Button>
            <Button 
              variant="wedding" 
              onClick={shareInvitation}
              className="flex-1"
            >
              {copied ? '✅ Copied!' : '📤 Share Invitation'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}