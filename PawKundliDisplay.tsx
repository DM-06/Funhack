import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pet, PawKundliResult } from '@/lib/pawKundli';

interface PawKundliDisplayProps {
  petA: Pet;
  petB: Pet;
  pawKundli: PawKundliResult;
  isEngaged: boolean;
  onBack: () => void;
  onNewSearch: () => void;
  onViewInvitation?: () => void;
}

export function PawKundliDisplay({ 
  petA, 
  petB, 
  pawKundli, 
  isEngaged, 
  onBack, 
  onNewSearch 
}: PawKundliDisplayProps) {
  
  const getCompatibilityColor = (score: number) => {
    if (score >= 75) return 'text-success';
    if (score >= 45) return 'text-paw-yellow';
    return 'text-destructive';
  };

  const getCompatibilityMessage = (score: number) => {
    if (score >= 75) return { emoji: '🌟', message: 'Stellar Match!' };
    if (score >= 45) return { emoji: '⭐', message: 'Good Potential!' };
    return { emoji: '💫', message: 'Needs Extra Treats!' };
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getPetImage = (pet: Pet) => {
    // Use actual photos if available for realistic images
    if (pet.photo) {
      return pet.photo;
    }
    
    // Fallback to better generated images
    const size = 150;
    if (pet.species === 'cat') {
      return `https://api.dicebear.com/7.x/cats/svg?seed=${pet.name}&size=${size}`;
    } else if (pet.species === 'dog') {
      return `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${pet.name}&size=${size}`;
    } else {
      return `https://api.dicebear.com/7.x/shapes/svg?seed=${pet.name}&size=${size}`;
    }
  };

  const compatibility = getCompatibilityMessage(pawKundli.compatibilityScore);

  return (
    <div className="min-h-screen bg-gradient-hero p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="text-white">
            ← Back to Chat
          </Button>
          <div className="text-white text-center">
            <h1 className="text-3xl font-bold">📜 Paw-Kundli Report 📜</h1>
            <p className="text-white/70">Ancient Wisdom for Modern Love</p>
          </div>
          <div></div>
        </div>

        {/* Main Kundli Card */}
        <Card className="mb-6 bg-white shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-secondary text-white p-8 text-center">
            <div className="flex justify-center items-center gap-6 mb-6">
              <div className="text-center">
                <img 
                  src={getPetImage(petA)}
                  alt={petA.name}
                  className="w-20 h-20 rounded-full shadow-soft mb-2 mx-auto"
                />
                <h3 className="font-bold">{petA.name}</h3>
                <Badge className="bg-white/20 text-white text-xs">
                  {pawKundli.pawSignA}
                </Badge>
              </div>
              
              <div className="text-center">
                <div className="text-6xl mb-2">{compatibility.emoji}</div>
                <div className="text-4xl font-black mb-1">
                  {pawKundli.compatibilityScore}%
                </div>
                <p className="text-white/90 font-semibold">
                  {compatibility.message}
                </p>
              </div>
              
              <div className="text-center">
                <img 
                  src={getPetImage(petB)}
                  alt={petB.name}
                  className="w-20 h-20 rounded-full shadow-soft mb-2 mx-auto"
                />
                <h3 className="font-bold">{petB.name}</h3>
                <Badge className="bg-white/20 text-white text-xs">
                  {pawKundli.pawSignB}
                </Badge>
              </div>
            </div>

            {isEngaged && (
              <div className="bg-white/10 rounded-lg p-4 mb-4">
                <div className="text-3xl mb-2">💍👑💍</div>
                <h2 className="text-2xl font-bold">OFFICIALLY ENGAGED!</h2>
                <p className="text-white/90">Wedding Plans in Progress...</p>
              </div>
            )}
          </div>

          {/* Kundli Details */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Compatibility Breakdown */}
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span>📊</span> Compatibility Analysis
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-gradient-card p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Overall Match</span>
                      <span className={`font-bold text-lg ${getCompatibilityColor(pawKundli.compatibilityScore)}`}>
                        {pawKundli.compatibilityScore}/100
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${
                          pawKundli.compatibilityScore >= 75 ? 'bg-success' :
                          pawKundli.compatibilityScore >= 45 ? 'bg-paw-yellow' : 'bg-destructive'
                        }`}
                        style={{ width: `${pawKundli.compatibilityScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl mb-1">🐾</div>
                      <div className="text-sm text-muted-foreground">Paw Sign</div>
                      <div className="font-semibold text-xs">{pawKundli.pawSignA}</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl mb-1">🐾</div>
                      <div className="text-sm text-muted-foreground">Paw Sign</div>
                      <div className="font-semibold text-xs">{pawKundli.pawSignB}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wedding Details */}
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span>💒</span> Wedding Forecast
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-gradient-card p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">
                      🗓️ Auspicious Wedding Time
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(pawKundli.bestWeddingDate)}
                    </p>
                  </div>

                  <div className="bg-gradient-card p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">
                      🔮 Cosmic Predictions
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {pawKundli.shortHoroscope}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fun Wedding Details */}
            {isEngaged && (
              <div className="mt-8 p-6 bg-gradient-hero text-white rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-center">
                  🎉 Wedding Planning Details 🎉
                </h3>
                
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl mb-2">🎺</div>
                    <h4 className="font-semibold mb-1">Music</h4>
                    <p className="text-sm text-white/80">Traditional Shahnai + Barking Choir</p>
                  </div>
                  <div>
                    <div className="text-3xl mb-2">🍰</div>
                    <h4 className="font-semibold mb-1">Cake</h4>
                    <p className="text-sm text-white/80">3-Tier Kibble & Treat Tower</p>
                  </div>
                  <div>
                    <div className="text-3xl mb-2">📍</div>
                    <h4 className="font-semibold mb-1">Venue</h4>
                    <p className="text-sm text-white/80">Central Bark Gardens</p>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-white/90 italic">
                    🎉 The wedding planning is complete! 🎉
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          {!isEngaged && (
            <Button variant="heart" size="lg" onClick={onBack} className="hover:scale-105 transition-all duration-200">
              💬 Continue Chat
            </Button>
          )}
          {isEngaged && (
            <Button variant="paw" size="lg" onClick={onBack} className="hover:scale-105 transition-all duration-200">
              🏠 Back to Home
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}