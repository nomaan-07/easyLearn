const player = new Plyr('#player', {
  controls: ['play-large', 'play', 'rewind', 'fast-forward', 'progress', 'current-time', 'duration', 'mute', 'volume', 'settings', 'pip', 'airplay', 'fullscreen'],
  keyboard: { focused: true, global: true },
});
