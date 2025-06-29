import React, { useState } from 'react';

interface HealthMateIntegrationProps {
  agentId: string;
  apiKey: string;
}

const HealthMateIntegration: React.FC<HealthMateIntegrationProps> = ({ agentId, apiKey }) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState('');

  const startCall = async () => {
    try {
      setCallStatus('Initiating call...');
      setIsCallActive(true);
      
      // This would integrate with OmniDimension API to start a call
      const response = await fetch('https://backend.omnidim.io/api/v1/calls/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent_id: agentId,
          // Add any additional call parameters
        }),
      });

      if (response.ok) {
        setCallStatus('Call connected! Speak to HealthMate now.');
      } else {
        setCallStatus('Failed to start call. Please try again.');
        setIsCallActive(false);
      }
    } catch (error) {
      setCallStatus('Error connecting to HealthMate.');
      setIsCallActive(false);
    }
  };

  const endCall = () => {
    setIsCallActive(false);
    setCallStatus('Call ended. Thank you for using HealthMate!');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">HealthMate AI Assistant</h3>
        <p className="text-gray-600 text-sm">
          Get instant healthcare support 24/7. Ask about appointments, medications, or medical information.
        </p>
      </div>

      <div className="space-y-4">
        {!isCallActive ? (
          <button
            onClick={startCall}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Call HealthMate</span>
          </button>
        ) : (
          <button
            onClick={endCall}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>End Call</span>
          </button>
        )}

        {callStatus && (
          <div className={`text-center p-3 rounded-lg text-sm ${
            isCallActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {callStatus}
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2">What HealthMate can help with:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Schedule doctor appointments</li>
            <li>• Set medication reminders</li>
            <li>• Explain medical reports</li>
            <li>• Answer health questions</li>
            <li>• Multilingual support (Hindi, Tamil, Telugu)</li>
          </ul>
        </div>

        <div className="text-xs text-gray-500 text-center">
          Powered by OmniDimension AI • Agent ID: {agentId}
        </div>
      </div>
    </div>
  );
};

export default HealthMateIntegration; 