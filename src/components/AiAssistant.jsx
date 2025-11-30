import React, { useState, useEffect, useRef } from 'react';
import { CreateMLCEngine } from "@mlc-ai/web-llm";

const AiAssistant = ({ code, problemDescription, language }) => {
  const [isSupported, setIsSupported] = useState(null);
  const [engine, setEngine] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState('');
  const [response, setResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasError, setHasError] = useState(null);
  
  // Configuration
  const SELECTED_MODEL = "Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC";

  useEffect(() => {
    // Check for WebGPU support
    if (navigator.gpu) {
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
  }, []);

  const initEngine = async () => {
    if (engine) return engine;

    setIsLoading(true);
    setHasError(null);
    try {
      const initProgressCallback = (report) => {
        setLoadProgress(report.text);
      };

      const newEngine = await CreateMLCEngine(
        SELECTED_MODEL,
        { initProgressCallback: initProgressCallback }
      );

      setEngine(newEngine);
      setIsLoading(false);
      return newEngine;
    } catch (err) {
      console.error("Failed to load AI engine:", err);
      setHasError("Failed to load the AI model. Your device might not have enough memory or GPU resources.");
      setIsLoading(false);
      return null;
    }
  };

  const handleReviewCode = async () => {
    if (!isSupported) return;

    setResponse('');
    setIsGenerating(true);
    setHasError(null);

    const currentEngine = await initEngine();
    if (!currentEngine) {
        setIsGenerating(false);
        return;
    }

    const prompt = `
You are an expert coding interviewer and mentor. 
Review the following ${language} code for the problem described below.
Provide constructive feedback, identify any bugs or edge cases missed, and suggest improvements for time/space complexity.
Do not just give the solution, but guide the user.

Problem Description:
${problemDescription}

User Code:
\`\`\`${language}
${code}
\`\`\`

Please keep your response concise and actionable.
`;

    try {
      const chunks = await currentEngine.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        stream: true,
      });

      let reply = "";
      for await (const chunk of chunks) {
        const content = chunk.choices[0]?.delta?.content || "";
        reply += content;
        setResponse(reply);
      }
    } catch (err) {
      console.error("AI generation error:", err);
      setHasError("An error occurred while generating feedback. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isSupported === false) {
    return (
      <div className="ai-assistant-container unsupported">
        <div className="ai-icon">⚠️</div>
        <h3>AI Assistant Unavailable</h3>
        <p>
          Your browser or device does not support WebGPU, which is required to run the AI model locally.
          Please try using a modern browser (Chrome, Edge) on a device with a dedicated GPU or Apple Silicon.
        </p>
      </div>
    );
  }

  return (
    <div className="ai-assistant-container">
      <div className="ai-header">
        <h3>AI Code Review Assistant (Beta)</h3>
        <p className="ai-subtitle">Powered by Qwen-2.5-Coder • Runs 100% locally in your browser</p>
      </div>

      <div className="ai-content">
        {!response && !isLoading && !isGenerating && (
            <div className="ai-placeholder">
                <div className="ai-bot-icon">🤖</div>
                <p>I can review your code, find bugs, and suggest improvements!</p>
                <p className="ai-warning-text">Note: First-time load may take a minute (~1GB download).</p>
                
                {hasError && <div className="ai-error">{hasError}</div>}
                
                <button className="btn-primary ai-review-btn" onClick={handleReviewCode}>
                    Review My Code
                </button>
            </div>
        )}

        {isLoading && (
            <div className="ai-loading">
                <div className="spinner"></div>
                <p>Loading AI Model...</p>
                <p className="progress-text">{loadProgress}</p>
                <div className="progress-bar-container">
                    {/* Simple visual estimation or just indefinite loader */}
                    <div className="progress-bar-fill"></div>
                </div>
            </div>
        )}

        {(response || isGenerating) && (
            <div className="ai-response-area">
                {isGenerating && !response && <div className="thinking-indicator">AI is thinking...</div>}
                <div className="ai-response-text" dangerouslySetInnerHTML={{ 
                    // Simple markdown rendering could be added here, but for now plain text/pre-wrap
                    __html: response.replace(/\n/g, '<br/>').replace(/```/g, '') 
                    // A better markdown renderer would be ideal, but keeping it simple for now to avoid deps
                 }} style={{ whiteSpace: 'pre-wrap' }}>
                 {/* Fallback to text content if not using dangerous HTML */}
                 {/* {response} */}
                </div>
            </div>
        )}
        
        {response && !isGenerating && (
             <button className="btn-secondary ai-retry-btn" onClick={handleReviewCode} style={{ marginTop: '20px' }}>
                Review Again
            </button>
        )}
      </div>
    </div>
  );
};

export default AiAssistant;

