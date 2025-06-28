import { useState, useEffect, useRef } from "react";
import { FaChevronUp, FaPaperPlane, FaRobot } from "react-icons/fa";
import {
  MdClear,
  MdMic,
  MdMicOff,
  MdVolumeUp,
  MdVolumeOff,
} from "react-icons/md";
import ibmGraniteService from "../../services/ibmGraniteService";

const ChatBot = () => {
  const INTRO_WORDS = ["hi", "hello", "hey", "greetings"];

  // State variables
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello, This is AgriBot powered by IBM Granite AI! Ask me anything about farming and agriculture!",
      isBot: true,
      id: Date.now(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSpeechData, setCurrentSpeechData] = useState({
    text: "",
    currentIndex: 0,
    chunks: [],
  });

  // Refs
  const chatbotRef = useRef(null);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);
  const isSpeakingRef = useRef(false);

  // Initialize speech recognition
  useEffect(() => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      console.error("Speech recognition not supported in this browser");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event) => {
      const transcriptText = event.results[0][0].transcript;
      setInputValue(transcriptText);
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Load available voices for speech synthesis
  useEffect(() => {
    // Function to load voices
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };

    // Load voices if already available
    loadVoices();

    // Or wait for voices to be loaded
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Cancel any ongoing speech when component unmounts
    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Scroll detection for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY >= 100 ? setIsVisible(true) : setIsVisible(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to bottom of messages whenever messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chatbotRef.current &&
        !chatbotRef.current.contains(event.target) &&
        !event.target.closest("[data-chat-toggle]")
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus input when chat opens
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    // This effect will forcefully handle pausing if isPaused changes
    if (isPaused) {
      forcePauseSpeech();
    }
  }, [isPaused]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBackTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setInputValue("");
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Force pause the speech synthesis
  const forcePauseSpeech = () => {
    // Cancel any ongoing speech immediately
    window.speechSynthesis.cancel();

    // Some browsers need multiple cancel calls to actually stop
    setTimeout(() => {
      window.speechSynthesis.cancel();
    }, 50);

    // Set internal flag to prevent further speaking
    isSpeakingRef.current = false;

    // Log for debugging
    console.log("Speech forcefully paused");
  };

  const toggleSpeaker = () => {
    if (isSpeakerOn) {
      // Force cancel any ongoing speech
      forcePauseSpeech();
      setCurrentSpeechData({ text: "", currentIndex: 0, chunks: [] });
    }
    setIsSpeakerOn(!isSpeakerOn);
  };

  const togglePause = () => {
    if (isPaused) {
      // Resume speaking from where it was paused
      setIsPaused(false);
      isSpeakingRef.current = true;
      if (currentSpeechData.text && currentSpeechData.chunks.length > 0) {
        speakFromIndex(
          currentSpeechData.text,
          currentSpeechData.chunks,
          currentSpeechData.currentIndex
        );
      }
    } else {
      // Pause speaking
      setIsPaused(true);
      // Force cancel any ongoing speech
      forcePauseSpeech();
    }
  };

  // Clean text by removing asterisks and markdown formatting
  const cleanTextForSpeech = (text) => {
    // Remove markdown formatting like **bold** or *italic*
    return text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1");
  };

  const speak = (text) => {
    if (!isSpeakerOn) return;

    // Cancel any ongoing speech first
    forcePauseSpeech();

    if (isPaused) {
      // Just store the text for later resumption but don't speak now
      const cleanedText = cleanTextForSpeech(text);
      const chunks = createTextChunks(cleanedText);
      setCurrentSpeechData({
        text: cleanedText,
        currentIndex: 0,
        chunks: chunks,
      });
      return;
    }

    if ("speechSynthesis" in window) {
      try {
        const cleanedText = cleanTextForSpeech(text);
        const textChunks = createTextChunks(cleanedText);

        // Store the speech data for potential pause/resume
        setCurrentSpeechData({
          text: cleanedText,
          currentIndex: 0,
          chunks: textChunks,
        });

        // Set speaking state
        setIsSpeaking(true);

        // Allow speaking
        isSpeakingRef.current = true;

        // Start speaking from the beginning
        speakFromIndex(cleanedText, textChunks, 0);
      } catch (error) {
        console.error("Error initializing speech synthesis:", error);
        setIsSpeaking(false);
        isSpeakingRef.current = false;
      }
    } else {
      console.error("Text-to-speech not supported in this browser");
    }
  };

  const createTextChunks = (text) => {
    // Split text into smaller chunks (around 200 characters each)
    const chunkSize = 200;
    const textChunks = [];

    for (let i = 0; i < text.length; i += chunkSize) {
      // Try to split at sentence boundaries when possible
      let chunk = text.substring(i, i + chunkSize);

      // If we're not at the end and the chunk doesn't end with punctuation,
      // find the last sentence boundary
      if (i + chunkSize < text.length) {
        const lastPunctuation = Math.max(
          chunk.lastIndexOf("."),
          chunk.lastIndexOf("!"),
          chunk.lastIndexOf("?"),
          chunk.lastIndexOf(",")
        );

        if (lastPunctuation !== -1) {
          // Adjust the chunk to end at the punctuation mark
          chunk = text.substring(i, i + lastPunctuation + 1);
          i = i + lastPunctuation + 1 - chunkSize; // Adjust the next starting point
        }
      }

      textChunks.push(chunk);
    }

    return textChunks;
  };

  const speakFromIndex = (fullText, chunks, startIndex) => {
    if (!isSpeakerOn || isPaused || !isSpeakingRef.current) return;

    // Find a female voice
    let femaleVoice = null;

    // Try to find a female voice
    for (const voice of availableVoices) {
      if (
        voice.name.toLowerCase().includes("female") ||
        voice.name.toLowerCase().includes("woman") ||
        voice.name.toLowerCase().includes("girl") ||
        (voice.gender && voice.gender === "female")
      ) {
        femaleVoice = voice;
        break;
      }
    }

    // If no explicit female voice found, try to select common female voices by name
    if (!femaleVoice) {
      const commonFemaleVoices = [
        "Google UK English Female",
        "Microsoft Zira",
        "Samantha",
        "Victoria",
        "Alex",
      ];
      for (const voiceName of commonFemaleVoices) {
        const voice = availableVoices.find((v) => v.name.includes(voiceName));
        if (voice) {
          femaleVoice = voice;
          break;
        }
      }
    }

    // Process each chunk sequentially starting from startIndex
    let currentIndex = startIndex;

    const speakNext = () => {
      // Check again before proceeding to speak the next chunk
      if (currentIndex < chunks.length && !isPaused && isSpeakingRef.current) {
        const utterance = new SpeechSynthesisUtterance(chunks[currentIndex]);

        // Set the female voice if found
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        } else {
          utterance.pitch = 1.2; // Higher pitch if no female voice found
        }

        utterance.rate = 1.0;

        // Update current index in state
        setCurrentSpeechData((prev) => ({
          ...prev,
          currentIndex: currentIndex,
        }));

        // When this chunk finishes, speak the next one
        utterance.onend = () => {
          // Only proceed if still allowed to speak
          if (!isPaused && isSpeakingRef.current) {
            currentIndex++;
            speakNext();
          }
        };

        // If synthesis is interrupted or errors occur
        utterance.onerror = (event) => {
          console.warn("Speech synthesis interrupted:", event.error);
          
          // Only continue if the error is not critical and we're still supposed to be speaking
          if (event.error === 'interrupted' && !isPaused && isSpeakingRef.current) {
            // Wait a moment before continuing to next chunk
            setTimeout(() => {
              if (!isPaused && isSpeakingRef.current) {
                currentIndex++;
                speakNext();
              }
            }, 100);
          } else if (event.error !== 'interrupted') {
            // For other errors, stop speaking
            console.error("Speech synthesis error:", event.error);
            setIsSpeaking(false);
            isSpeakingRef.current = false;
          }
        };

        window.speechSynthesis.speak(utterance);
      }
    };

    // Start the sequential speaking process
    speakNext();
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      text: inputValue,
      isBot: false,
      id: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // For intro words, provide an immediate welcome response
    if (INTRO_WORDS.includes(inputValue.toLowerCase().trim())) {
      setTimeout(() => {
        const botResponse = {
          text: "Hello! Welcome to AgriBot! How can I assist you with farming today?",
          isBot: true,
          id: Date.now(),
        };
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
        speak(botResponse.text);
      }, 600);
      return;
    }

    try {
      await processMessage(inputValue);
    } catch (error) {
      console.error("Error processing message:", error);
      const errorMessage = {
        text: "Sorry, I encountered an error. Please try again later.",
        isBot: true,
        id: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsTyping(false);
      speak(errorMessage.text);
    }
  };

  const processMessage = async (userInput) => {
    try {
      // Get context from recent messages
      const context = {
        recentMessages: messages.slice(-5).map(msg => ({
          text: msg.text,
          isBot: msg.isBot
        })),
        userLocation: "Not specified",
        timestamp: new Date().toISOString()
      };

      // Call IBM Granite AI service
      const response = await ibmGraniteService.chatWithBot(userInput, context);
      
      if (response.success && response.data.response) {
        const botResponse = {
          text: response.data.response,
          isBot: true,
          id: Date.now(),
        };

        setMessages((prev) => [...prev, botResponse]);
        speak(botResponse.text);
      } else {
        throw new Error("Invalid response from AI service");
      }
    } catch (error) {
      console.error("Error getting IBM Granite AI response:", error);
      
      const errorMessage = {
        text: "I'm having trouble connecting to my IBM Granite AI brain right now. Please try again in a moment, or ask me something else about farming!",
        isBot: true,
        id: Date.now(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      speak(errorMessage.text);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Function to convert markdown to HTML for proper display
  const formatMessage = (text) => {
    // Replace **text** with <strong>text</strong>
    const boldText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    // Replace *text* with <em>text</em>
    const formattedText = boldText.replace(/\*(.*?)\*/g, "<em>$1</em>");

    return formattedText;
  };

  // Render mobile-friendly chatbot
  return (
    <>
      {/* Back to top button */}
      {!open && isVisible && (
        <div
          className="fixed bottom-20 right-4 z-30 bg-blue-600 text-white p-3 cursor-pointer rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
          title="Back to top"
          onClick={handleBackTop}
        >
          <FaChevronUp />
        </div>
      )}

      {/* Chat toggle button */}
      <div
        data-chat-toggle
        onClick={() => setOpen(!open)}
        className="fixed bottom-8 right-4 z-30 bg-blue-600 text-white p-4 cursor-pointer rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
        title={open ? "Close chat" : "Open chat"}
      >
        {open ? <MdClear size={24} /> : <FaRobot size={24} />}
      </div>

      {/* Chat container */}
      <div
        ref={chatbotRef}
        className={`fixed right-4 bg-white z-40 border border-gray-200 rounded-2xl shadow-2xl transition-all duration-300 ease-in-out ${
          open
            ? "bottom-24 w-80 max-w-full h-96 opacity-100 visible"
            : "bottom-16 w-0 h-0 opacity-0 invisible"
        }`}
      >
        {/* Chat header */}
        <div className="bg-blue-600 text-white px-4 py-3 rounded-t-2xl flex justify-between items-center">
          <div className="flex items-center">
            <FaRobot className="mr-2" />
            <span className="font-medium">AgriBot</span>
          </div>
          <div className="flex">
            <button
              onClick={toggleSpeaker}
              className="p-1 hover:bg-blue-700 rounded-full mr-2 focus:outline-none"
              title={isSpeakerOn ? "Mute responses" : "Unmute responses"}
            >
              {isSpeakerOn ? (
                <MdVolumeUp size={18} />
              ) : (
                <MdVolumeOff size={18} />
              )}
            </button>
            {isSpeakerOn && (
              <button
                onClick={togglePause}
                className="p-1 hover:bg-blue-700 rounded-full mr-2 focus:outline-none"
                title={isPaused ? "Resume speaking" : "Pause speaking"}
              >
                {isPaused ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                )}
              </button>
            )}
            <button
              onClick={toggleListening}
              className={`p-1 rounded-full focus:outline-none ${
                isListening
                  ? "bg-red-500 hover:bg-red-600"
                  : "hover:bg-blue-700"
              }`}
              title={isListening ? "Stop listening" : "Start listening"}
            >
              {isListening ? <MdMicOff size={18} /> : <MdMic size={18} />}
            </button>
          </div>
        </div>

        {/* Messages container */}
        <div className="h-64 overflow-y-auto p-3 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-3 ${
                msg.isBot ? "flex justify-start" : "flex justify-end"
              }`}
            >
              <div
                className={`max-w-3/4 px-3 py-2 rounded-lg ${
                  msg.isBot
                    ? "bg-blue-100 text-gray-800 rounded-tl-none"
                    : "bg-blue-600 text-white rounded-tr-none"
                }`}
                dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
              ></div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start mb-3">
              <div className="bg-gray-200 text-gray-600 px-3 py-2 rounded-lg rounded-tl-none">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="border-t p-3 flex items-center bg-white rounded-b-2xl">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isListening ? "Listening..." : "Type your message..."}
            className="flex-grow border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={isListening}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() && !isListening}
            className="ml-2 bg-blue-600 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none hover:bg-blue-700"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
