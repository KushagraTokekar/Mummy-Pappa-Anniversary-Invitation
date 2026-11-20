# Background Audio Directory

Place your favorite anniversary instrumental audio track here:

- `anniversary-instrumental.mp3`

### Audio Playback Features:
- If this `.mp3` file is absent, the web application automatically falls back to an ambient harmonic chime pad via the Web Audio API, ensuring the music controller is functional even before adding an audio file.
- Audio volume and play/pause state are preserved across pages and navigation in `sessionStorage`.
- In compliance with modern browser autoplay policies, music begins when the guest clicks **"Open Your Invitation"** or toggles the floating music disc.
