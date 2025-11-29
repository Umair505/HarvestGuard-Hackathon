"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  MessageCircle, 
  User, 
  CloudRain, 
  Warehouse,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Wifi,
  WifiOff,
  Keyboard,
  Send,
  Bot,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [conversation, setConversation] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isVoiceSupported, setIsVoiceSupported] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userBatches, setUserBatches] = useState([]);

  const recognitionRef = useRef(null);
  const synthesisRef = useRef(null);

  // Common questions for quick access
  const commonQuestions = [
    {
      question: "আজকের আবহাওয়া?",
      icon: <CloudRain className="w-5 h-5" />
    },
    {
      question: "আমার ধানের অবস্থা?",
      icon: <Warehouse className="w-5 h-5" />
    },
    {
      question: "গুদাম কী করব?",
      icon: <AlertTriangle className="w-5 h-5" />
    },
    {
      question: "কখন কাটব?",
      icon: <Calendar className="w-5 h-5" />
    },
    {
      question: "ঝুঁকি আছে?",
      icon: <AlertTriangle className="w-5 h-5" />
    }
  ];

  // Initialize speech recognition and synthesis
  useEffect(() => {
    initializeSpeechAPI();
    loadUserInfo();
    loadUserBatches();
    
    // Network status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      stopListening();
    };
  }, []);

  const loadUserInfo = () => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUserInfo(userData);
      }
    } catch (error) {
      console.error('Error loading user info:', error);
    }
  };

  const loadUserBatches = async () => {
    try {
      const response = await fetch('/api/batches');
      if (response.ok) {
        const allBatches = await response.json();
        const storedUser = localStorage.getItem('currentUser');
        
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          const userBatches = allBatches.filter(batch => 
            batch.farmerInfo && batch.farmerInfo.email === userData.email
          );
          setUserBatches(userBatches);
        }
      }
    } catch (error) {
      console.error('Error loading batches:', error);
    }
  };

  const initializeSpeechAPI = () => {
    // Check browser support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsVoiceSupported(false);
      toast.error("আপনার ব্রাউজার Voice Support করে না");
      return;
    }

    // Initialize Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'bn-BD'; // Bangla language

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      setTranscript('');
      toast.info("🎤 কথা বলুন...");
    };

    recognitionRef.current.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      handleUserQuery(text);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      
      if (event.error === 'not-allowed') {
        toast.error("মাইক্রোফোন এক্সেস দেওয়া হয়নি। অনুমতি দিন।");
      } else if (event.error === 'language-not-supported') {
        toast.error("বাংলা ভাষা সাপোর্ট করে না। টেক্সট ব্যবহার করুন।");
        setIsVoiceSupported(false);
      } else {
        toast.error("ভয়েস রিকগনিশন সমস্যা। টেক্সট ব্যবহার করুন।");
      }
      
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    // Initialize Speech Synthesis
    if ('speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis;
    }
  };

  const startListening = () => {
    if (!isVoiceSupported) {
      toast.error("ভয়েস সাপোর্ট করে না। টেক্সট ব্যবহার করুন।");
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        toast.error("ভয়েস শুরু করতে সমস্যা। টেক্সট ব্যবহার করুন।");
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text) => {
    if (!synthesisRef.current) {
      toast.error("Text-to-speech সাপোর্ট করে না");
      return;
    }

    // Stop any ongoing speech
    synthesisRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'bn-BD'; // Bangla
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      toast.error("Voice playback error");
    };

    synthesisRef.current.speak(utterance);
  };

  const handleUserQuery = async (query) => {
    if (!query.trim()) return;

    setIsProcessing(true);

    // Add user message to conversation
    const userMessage = {
      type: 'user',
      text: query,
      timestamp: new Date().toISOString()
    };

    setConversation(prev => [...prev, userMessage]);

    try {
      // Generate AI response using Gemini
      const response = await generateAIResponse(query);
      
      // Add AI response to conversation
      const aiMessage = {
        type: 'assistant',
        text: response.answer,
        actions: response.actions,
        timestamp: new Date().toISOString()
      };

      setConversation(prev => [...prev, aiMessage]);

      // Speak the response
      if (isVoiceSupported) {
        speakText(response.answer);
      }

      // Show toast for important actions
      if (response.actions && response.actions.length > 0) {
        toast.success(`সুপারিশ: ${response.actions[0]}`);
      }

    } catch (error) {
      console.error('Error processing query:', error);
      toast.error("প্রশ্ন প্রক্রিয়াকরণে সমস্যা");
      
      const errorMessage = {
        type: 'assistant',
        text: "দুঃখিত, আমি এখন আপনার প্রশ্নের উত্তর দিতে পারছি না। পরে আবার চেষ্টা করুন।",
        timestamp: new Date().toISOString()
      };
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const generateAIResponse = async (query) => {
    // Prepare context data
    const userData = userInfo || {};
    const batchesData = userBatches || [];
    
    // Get weather data for user's location
    let weatherData = {};
    if (batchesData.length > 0) {
      const district = batchesData[0].district || 'ঢাকা';
      weatherData = await getWeatherData(district);
    }

    // Call Gemini AI API
    const response = await fetch('/api/voice-assistant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        userData,
        batches: batchesData,
        weather: weatherData,
        currentTime: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data;
  };

  const getWeatherData = async (district) => {
    try {
      const response = await fetch(`/api/weather?district=${encodeURIComponent(district)}`);
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Weather API failed');
    } catch (error) {
      console.error('Error fetching weather:', error);
      return {
        temp: 30,
        humidity: 75,
        condition: "সূর্যোজ্জ্বল",
        rainChance: 20
      };
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() && !isProcessing) {
      handleUserQuery(inputText);
      setInputText('');
    }
  };

  const handleQuickQuestion = (question) => {
    setInputText(question);
    handleUserQuery(question);
  };

  const clearConversation = () => {
    setConversation([]);
    toast.info("কথোপকথন মোছা হয়েছে");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-6">
      <div className="max-w-4xl mt-12 mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-tiro-bangla text-slate-800">
              বাংলা ভয়েস সহকারী
            </h1>
          </div>
          <p className="text-lg text-slate-600 font-hind mb-4">
            AI-Powered Smart Assistant - Real Data & Real Answers
          </p>

          {/* User Info */}
          {userInfo && (
            <div className="inline-flex items-center gap-3 bg-white/80 px-4 py-2 rounded-full border mb-4">
              <User className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600">কৃষক:</span>
              <span className="font-semibold text-green-700">{userInfo.name}</span>
              <Badge variant="outline" className="text-xs">
                {userBatches.length} ব্যাচ
              </Badge>
            </div>
          )}

          {/* Status Badges */}
          <div className="flex justify-center gap-3 flex-wrap">
            <Badge variant={isVoiceSupported ? "default" : "secondary"} className="gap-2">
              {isVoiceSupported ? <Mic className="w-3 h-3" /> : <MicOff className="w-3 h-3" />}
              ভয়েস {isVoiceSupported ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
            </Badge>
            <Badge variant={isOnline ? "default" : "secondary"} className="gap-2">
              {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
              {isOnline ? 'অনলাইন' : 'অফলাইন'}
            </Badge>
            <Badge variant={isSpeaking ? "default" : "secondary"} className="gap-2">
              <Volume2 className="w-3 h-3" />
              {isSpeaking ? 'কথা বলছে' : 'প্রস্তুত'}
            </Badge>
            {isProcessing && (
              <Badge variant="default" className="gap-2 bg-purple-600">
                <Loader2 className="w-3 h-3 animate-spin" />
                AI প্রসেসিং
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Voice Controls */}
          <div className="space-y-6">
            {/* Voice Control Card */}
            <Card className="border-2 border-blue-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardTitle className="flex items-center gap-2 text-xl font-tiro-bangla">
                  <Mic className="w-5 h-5 text-blue-600" />
                  ভয়েস কন্ট্রোল
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Voice Button */}
                <div className="text-center mb-6">
                  <button
                    onClick={isListening ? stopListening : startListening}
                    disabled={!isVoiceSupported || isProcessing}
                    className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isListening 
                        ? 'bg-red-500 animate-pulse text-white' 
                        : isProcessing
                        ? 'bg-purple-400 cursor-not-allowed text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    } ${!isVoiceSupported && 'opacity-50 cursor-not-allowed'}`}
                  >
                    {isProcessing ? (
                      <Loader2 className="w-12 h-12 animate-spin" />
                    ) : isListening ? (
                      <MicOff className="w-12 h-12" />
                    ) : (
                      <Mic className="w-12 h-12" />
                    )}
                  </button>
                  <p className="mt-4 text-sm text-slate-600 font-hind">
                    {isProcessing ? 'AI চিন্তা করছে...' : 
                     isListening ? 'কথা বলুন...' : 'ক্লিক করে কথা বলুন'}
                  </p>
                </div>

                {/* Transcript */}
                {transcript && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-yellow-800 text-sm mb-2 font-hind">আপনার কথা:</h4>
                    <p className="text-yellow-900 font-hind text-lg">{transcript}</p>
                  </div>
                )}

                {/* Voice Status */}
                {!isVoiceSupported && (
                  <Alert className="bg-amber-50 border-amber-200">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <AlertDescription className="text-amber-800 font-hind text-sm">
                      আপনার ব্রাউজার বাংলা ভয়েস সাপোর্ট করে না। টেক্সট ব্যবহার করুন।
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Quick Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-tiro-bangla">
                  <MessageCircle className="w-5 h-5" />
                  দ্রুত প্রশ্ন
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {commonQuestions.map((item, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start gap-3 font-hind h-auto py-3"
                      onClick={() => handleQuickQuestion(item.question)}
                      disabled={isProcessing}
                    >
                      {item.icon}
                      <span className="text-left">{item.question}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Conversation */}
          <div className="lg:col-span-2 space-y-6">
            {/* Text Input */}
            <Card>
              <CardContent className="p-4">
                <form onSubmit={handleTextSubmit} className="flex gap-2">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="বাংলায় লিখুন বা উপরের বাটন ক্লিক করুন..."
                    className="flex-1 font-hind"
                    disabled={isListening || isProcessing}
                  />
                  <Button 
                    type="submit" 
                    disabled={!inputText.trim() || isListening || isProcessing}
                    className="gap-2"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {isProcessing ? 'প্রসেসিং...' : 'পাঠান'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Conversation */}
            <Card className="flex-1">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl font-tiro-bangla">
                  <Bot className="w-5 h-5" />
                  কথোপকথন
                </CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline" className="font-hind">
                    Gemini AI
                  </Badge>
                  <Button variant="outline" size="sm" onClick={clearConversation}>
                    মুছুন
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {conversation.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 font-hind">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>কথোপকথন শুরু করতে কথা বলুন বা লিখুন</p>
                    <p className="text-sm mt-2">আমি Gemini AI দ্বারা Powered</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    {conversation.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl p-4 ${
                            msg.type === 'user'
                              ? 'bg-blue-600 text-white rounded-br-none'
                              : 'bg-slate-100 text-slate-800 rounded-bl-none border'
                          }`}
                        >
                          <p className="font-hind text-lg leading-relaxed">{msg.text}</p>
                          
                          {msg.actions && msg.actions.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-opacity-20">
                              <p className="text-sm font-semibold mb-2 font-hind">
                                {msg.type === 'user' ? 'আপনার করণীয়:' : 'সুপারিশ:'}
                              </p>
                              <div className="space-y-1">
                                {msg.actions.map((action, i) => (
                                  <div key={i} className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="w-3 h-3" />
                                    <span>{action}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="text-xs opacity-70 mt-2 font-hind">
                            {new Date(msg.timestamp).toLocaleTimeString('bn-BD', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Features Card */}
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-purple-800 mb-3 font-hind flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  AI ক্ষমতা
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-purple-700">
                    <CheckCircle className="w-3 h-3" />
                    <span>রিয়েল আবহাওয়া</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-700">
                    <CheckCircle className="w-3 h-3" />
                    <span>ফসল বিশ্লেষণ</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-700">
                    <CheckCircle className="w-3 h-3" />
                    <span>ঝুঁকি মূল্যায়ন</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-700">
                    <CheckCircle className="w-3 h-3" />
                    <span>স্মার্ট পরামর্শ</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;