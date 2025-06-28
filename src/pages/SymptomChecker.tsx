import React, { useEffect } from 'react';

const VOICE_ASSISTANT_SECRET_KEY = '2c1758c931e9027f69498620c9888934';

const Voice: React.FC = () => {
  useEffect(() => {
    // Remove any existing widget script
    const existingScript = document.getElementById('omnidimension-web-widget');
    if (existingScript && existingScript.parentNode) {
      existingScript.parentNode.removeChild(existingScript);
    }

    // Remove any existing widget containers
    document.querySelectorAll('#omnidim-widget-container').forEach(el => el.remove());

    // Create a container for the widget
    const container = document.createElement('div');
    container.id = 'omnidim-widget-container';
    document.body.appendChild(container);

    // Add the script
    const script = document.createElement('script');
    script.id = 'omnidimension-web-widget';
    script.async = true;
    script.src = `https://backend.omnidim.io/web_widget.js?secret_key=${VOICE_ASSISTANT_SECRET_KEY}`;
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      const script = document.getElementById('omnidimension-web-widget');
      if (script && script.parentNode) script.parentNode.removeChild(script);
      document.querySelectorAll('#omnidim-widget-container').forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-6">Talk to HealthMate Voice Assistant</h1>
      <p className="text-lg text-gray-600 mb-4">
        Use the voice assistant below to start a conversation with your AI health assistant.
        Click the microphone icon to begin speaking.
      </p>
      {/* The widget will appear as a floating chat on the page */}
    </div>
  );
};

export default Voice;