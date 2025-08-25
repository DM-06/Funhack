import { useCallback, useRef } from 'react';

// Sound effects using Web Audio API and synthesized tones
export const useSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    const audioContext = getAudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  }, [getAudioContext]);

  const playMatchSound = useCallback(() => {
    // Happy ascending chime
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((note, index) => {
      setTimeout(() => playTone(note, 0.3), index * 100);
    });
  }, [playTone]);

  const playSwipeSound = useCallback(() => {
    // Quick whoosh sound
    playTone(200, 0.1, 'square');
  }, [playTone]);

  const playEngagementSound = useCallback(() => {
    // Wedding bells simulation
    const bellFreqs = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    bellFreqs.forEach((freq, index) => {
      setTimeout(() => {
        playTone(freq, 0.8);
        setTimeout(() => playTone(freq * 1.5, 0.4), 100);
      }, index * 200);
    });
  }, [playTone]);

  const playShenaiSound = useCallback(() => {
    // Indian shenai-style melody simulation
    const shenaiMelody = [
      440, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99, 880
    ]; // A4 to A5 scale
    
    shenaiMelody.forEach((note, index) => {
      setTimeout(() => {
        playTone(note, 0.6, 'sawtooth'); // Sawtooth for more brass-like sound
        // Add vibrato effect
        setTimeout(() => {
          playTone(note * 1.02, 0.3, 'sawtooth');
        }, 300);
      }, index * 400);
    });
  }, [playTone]);

  const playPartySound = useCallback(() => {
    // Party celebration with multiple instruments
    const celebration = () => {
      // Drums (low frequency)
      playTone(60, 0.1, 'square');
      setTimeout(() => playTone(80, 0.1, 'square'), 200);
      setTimeout(() => playTone(60, 0.1, 'square'), 400);
      
      // Trumpet fanfare
      setTimeout(() => {
        [523.25, 659.25, 783.99, 1046.50].forEach((note, i) => {
          setTimeout(() => playTone(note, 0.5, 'sawtooth'), i * 150);
        });
      }, 500);
    };
    
    celebration();
    setTimeout(celebration, 1200); // Repeat for party effect
  }, [playTone]);

  const playButtonSound = useCallback(() => {
    // Subtle click sound
    playTone(800, 0.05, 'square');
  }, [playTone]);

  return {
    playMatchSound,
    playSwipeSound,
    playEngagementSound,
    playShenaiSound,
    playPartySound,
    playButtonSound
  };
};