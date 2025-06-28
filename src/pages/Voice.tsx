import React from 'react';

const VOICE_ASSISTANT_SECRET_KEY = '2c1758c931e9027f69498620c9888934';

const removeOmniDimWidgets = () => {
  // Remove widget DOM elements
  document.querySelectorAll('[id^="omnidim"], [class*="omnidim"], [data-omnidim]').forEach(el => el.remove());
};

const Voice: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-6">Talk to HealthMate Voice Assistant</h1>
      <p className="text-lg text-gray-600 mb-4">
        Use the voice assistant below to start a conversation with your AI health assistant.
        Click the microphone icon to begin speaking.
      </p>
      {/* Directly inject the script tag for the OmniDim widget */}
      <div dangerouslySetInnerHTML={{
        __html: `<script id="omnidimension-web-widget" async src="https://backend.omnidim.io/web_widget.js?secret_key=${VOICE_ASSISTANT_SECRET_KEY}"></script>`
      }} />
    </div>
  );
};

export default Voice; 