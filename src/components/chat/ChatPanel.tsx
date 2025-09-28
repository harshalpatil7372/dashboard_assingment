
import React, { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  type: 'user' | 'bot';
  text: string;
  details?: string[];
  hasChart?: boolean;
  isLoading?: boolean;
}

export const ChatPanel: React.FC = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "user",
      text: "Why did our conversions drop last week?"
    },
    {
      id: 2,
      type: "bot",
      text: "We identified a 15% drop in conversions from March 1-7 compared to the previous week. Here's what I found:",
      details: [
        "Traffic Source Rate: decreased from 35% to 29%",
        "Region Specific Impact: Europe saw a 25% drop in conversion, while North America was mostly stable.",
        "Likely Cause: Ad creative change on mobile campaigns"
      ],
      hasChart: true
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "What were the total sales?", 
    "Where are the biggest opportunities?",
    "Analyze marketing performance",
    "Show conversion trends"
  ];

  // Function to call Gemini API
  const callGeminiAPI = async (userQuery: string): Promise<string> => {
    try {
      // Replace with your actual Gemini API key
      const API_KEY = 'api-key-here';
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a marketing analytics assistant. Analyze this query and provide insights: "${userQuery}". Keep responses concise and actionable for marketing teams.`
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text || "I couldn't process your request at the moment.";
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return "I'm having trouble connecting to my knowledge base right now. Please try again later.";
    }
  };

  const handleSend = async () => {
    if (!query.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      text: query
    };

    const loadingMessage: Message = {
      id: messages.length + 2,
      type: "bot",
      text: "Analyzing your query...",
      isLoading: true
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setQuery("");
    setIsLoading(true);

    try {
      // Call Gemini API
      const response = await callGeminiAPI(query);
      
      // Remove loading message and add actual response
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        return [...filtered, {
          id: prev.length + 1,
          type: "bot",
          text: response,
          details: response.includes('•') ? response.split('•').filter(item => item.trim()) : undefined
        }];
      });
    } catch (error) {
      // Handle error
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        return [...filtered, {
          id: prev.length + 1,
          type: "bot",
          text: "I apologize, but I'm having trouble processing your request right now. Please try again."
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 rounded-3xl shadow-2xl overflow-hidden">
      <div className="bg-blue-600 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <div>
            <div className="font-semibold text-sm sm:text-base">Chat with Pythia</div>
            <div className="text-xs opacity-80 hidden sm:block">Ask questions in natural language</div>
          </div>
        </div>
        <button className="p-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      <div className="h-64 sm:h-80 md:h-96 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] sm:max-w-[80%] ${
              message.type === 'user' 
                ? 'bg-blue-500 text-white rounded-2xl rounded-br-md' 
                : 'bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-sm'
            } p-3`}>
              
              {message.isLoading && (
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">Thinking...</span>
                </div>
              )}
              
              {!message.isLoading && (
                <>
                  <div className="text-sm leading-relaxed">{message.text}</div>
                  
                  {message.type === 'bot' && message.details && (
                    <div className="mt-2 space-y-1">
                      <div className="font-medium text-xs text-gray-600 mb-2">Key Insights</div>
                      {message.details.map((detail, idx) => (
                        <div key={idx} className="text-xs text-gray-600 leading-relaxed">
                          • {detail.trim()}
                        </div>
                      ))}
                    </div>
                  )}

                  {message.hasChart && (
                    <div className="mt-3 bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-600 mb-2">Conversion Rate Trend</div>
                      <div className="h-16 sm:h-24 flex items-end justify-center space-x-1">
                        <svg width="100%" height="100%" viewBox="0 0 120 60" className="w-full h-full">
                          <path 
                            d="M10,50 Q20,45 30,40 T50,35 T70,30 Q80,35 90,40 T110,45" 
                            fill="none" 
                            stroke="#8B5CF6" 
                            strokeWidth="2"
                            className="drop-shadow-sm"
                          />
                          <path 
                            d="M10,45 Q20,40 30,38 T50,32 T70,28 Q80,32 90,38 T110,42" 
                            fill="none" 
                            stroke="#EF4444" 
                            strokeWidth="2"
                            className="drop-shadow-sm"
                          />
                        </svg>
                      </div>
                      <div className="flex items-center justify-center gap-4 mt-2 text-xs">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-gray-600">May</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-gray-600">April</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 text-center mt-1">
                        Data sourced from: GA4 → Flow → Ad Opt
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-3 sm:px-4 pb-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(suggestion)}
              disabled={isLoading}
              className="flex-shrink-0 bg-white bg-opacity-20 text-white text-xs px-3 py-2 rounded-full border border-white border-opacity-30 hover:bg-opacity-30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 sm:p-4 pt-2">
        <div className="flex items-center gap-2 bg-white rounded-full p-1">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isLoading}
            rows={1}
            className="flex-1 px-4 py-2 rounded-full border-none outline-none text-sm placeholder-gray-500 resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
            style={{ minHeight: '40px', maxHeight: '120px' }}
          />
          <button
            onClick={handleSend}
            disabled={!query.trim() || isLoading}
            className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 12 2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};