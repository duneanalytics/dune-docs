// amplitude-setup.js

(function initAmplitude() {
    const API_KEY = "e76ce253e6eaa36e3be8e6872101e33a";
    const SRC = "https://cdn.eu.amplitude.com/script/e76ce253e6eaa36e3be8e6872101e33a.js";
  
    function loadScript(src) {
      return new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.onload = resolve;
        s.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(s);
      });
    }
  
    loadScript(SRC)
      .then(() => {
        // Register Session Replay plugin (100% sampling)
        window.amplitude.add(
          window.sessionReplay.plugin({ sampleRate: 1 })
        );
  
        // Init Amplitude
        window.amplitude.init(API_KEY, {
          fetchRemoteConfig: true,
          serverZone: "EU",
          autocapture: true,
        });
      })
      .catch((err) => {
        console.error("[Amplitude] init failed:", err);
      });
  })();
  