import numpy as np
from scipy.io import wavfile
import os

os.makedirs('src/assets/audio', exist_ok=True)

sample_rate = 44100

def generate_startup():
    duration = 3.0
    t = np.linspace(0, duration, int(sample_rate * duration), False)
    # A cinematic chord (A minor 9th: A, C, E, B) with a slow attack and long release
    freqs = [110.0, 130.81, 164.81, 246.94]
    wave = np.zeros_like(t)
    for f in freqs:
        wave += np.sin(2 * np.pi * f * t)
    # Add some filter sweep effect
    sweep = np.linspace(0.5, 2.0, len(t))
    wave = wave * np.sin(2 * np.pi * 5 * t * sweep)
    # Envelope
    env = np.exp(-t) * (1 - np.exp(-t * 10))
    wave = wave * env
    # Normalize
    wave = np.int16((wave / np.max(np.abs(wave))) * 32767)
    wavfile.write('src/assets/audio/startup.wav', sample_rate, wave)

def generate_hum():
    duration = 5.0
    t = np.linspace(0, duration, int(sample_rate * duration), False)
    # Low freq hum
    wave = np.sin(2 * np.pi * 55 * t) + 0.5 * np.sin(2 * np.pi * 60 * t)
    # Envelope to loop smoothly
    env = np.ones_like(t)
    env[:int(0.1*sample_rate)] = np.linspace(0, 1, int(0.1*sample_rate))
    env[-int(0.1*sample_rate):] = np.linspace(1, 0, int(0.1*sample_rate))
    wave = wave * env
    wave = np.int16((wave / np.max(np.abs(wave))) * 15000)
    wavfile.write('src/assets/audio/hum.wav', sample_rate, wave)

def generate_tick():
    duration = 0.05
    t = np.linspace(0, duration, int(sample_rate * duration), False)
    # High frequency click
    wave = np.sin(2 * np.pi * 2500 * t) * np.exp(-t * 100)
    wave = np.int16((wave / np.max(np.abs(wave))) * 20000)
    wavfile.write('src/assets/audio/tick.wav', sample_rate, wave)

def generate_whoosh():
    duration = 0.8
    t = np.linspace(0, duration, int(sample_rate * duration), False)
    # White noise with an envelope
    noise = np.random.normal(0, 1, len(t))
    env = (1 - np.cos(2 * np.pi * t / (2 * duration))) ** 2
    wave = noise * env
    # Lowpass filter effect (approximate with cumsum)
    for _ in range(3):
        wave = np.cumsum(wave)
        wave = wave - np.mean(wave)
    wave = np.int16((wave / np.max(np.abs(wave))) * 25000)
    wavfile.write('src/assets/audio/whoosh.wav', sample_rate, wave)

def generate_complete():
    duration = 2.5
    t = np.linspace(0, duration, int(sample_rate * duration), False)
    
    # 1. Deep sub-bass boom (decaying sub-sine wave)
    # Starts at 80Hz and sweeps down to 30Hz
    bass_freq = np.linspace(80, 30, len(t))
    bass_wave = np.sin(2 * np.pi * bass_freq * t) * np.exp(-t * 2.0)
    
    # 2. Hydraulic door whoosh (white noise filtered with quick sweep)
    noise = np.random.normal(0, 1, len(t))
    # lowpass filtered noise envelope (quick whoosh at the start)
    whoosh_env = np.exp(-t * 4.0) * (1 - np.exp(-t * 15.0))
    whoosh_wave = noise * whoosh_env * 0.4
    # Lowpass filter effect via cumsum
    for _ in range(2):
        whoosh_wave = np.cumsum(whoosh_wave)
        whoosh_wave = whoosh_wave - np.mean(whoosh_wave)
    whoosh_wave = whoosh_wave / np.max(np.abs(whoosh_wave)) * 0.5
    whoosh_wave = whoosh_wave * whoosh_env
    
    # 3. High-tech sci-fi chime chord (C major 7th / F major 7th tones)
    # Frequencies: C4 (261.63), E4 (329.63), G4 (392.00), B4 (493.88)
    chime_freqs = [261.63, 329.63, 392.00, 493.88, 523.25, 659.25]
    chime_wave = np.zeros_like(t)
    # Give a short delay to each tone to make a beautiful arpeggiated sweep!
    for idx, f in enumerate(chime_freqs):
        delay = idx * 0.04 # 40ms stagger between notes
        delay_samples = int(delay * sample_rate)
        # Create a note envelope
        note_t = np.zeros_like(t)
        if delay_samples > 0:
            if len(note_t) > delay_samples:
                note_t[delay_samples:] = t[:-delay_samples]
        else:
            note_t = t.copy()
        # Sine wave for note with quick attack and decay
        note_env = np.exp(-note_t * 6.0) * (1 - np.exp(-note_t * 25.0))
        chime_wave += np.sin(2 * np.pi * f * note_t) * note_env * 0.15
        
    # 4. Mix all components
    combined = bass_wave * 0.5 + whoosh_wave * 0.3 + chime_wave * 0.35
    
    # Smooth fade out at the very end
    end_env = np.ones_like(t)
    fade_samples = int(0.2 * sample_rate)
    end_env[-fade_samples:] = np.linspace(1, 0, fade_samples)
    combined = combined * end_env
    
    # Normalize to avoid clipping
    combined = combined / np.max(np.abs(combined))
    wave = np.int16(combined * 32767)
    wavfile.write('src/assets/audio/complete.wav', sample_rate, wave)

print("Generating audio files...")
generate_startup()
generate_hum()
generate_tick()
generate_whoosh()
generate_complete()
print("Audio files generated in src/assets/audio/")
