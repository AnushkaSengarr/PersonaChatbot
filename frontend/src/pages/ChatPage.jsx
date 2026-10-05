import { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { Send, User, ArrowLeft } from 'lucide-react';
import { personas as personaData } from "../constants/constants";
import axios from 'axios';

const ChatPage = () => {
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showPersonaPanel, setShowPersonaPanel] = useState(false);
    const messagesEndRef = useRef(null);

    const persona = personaData.find(p => p.id === Number(id));

    // Load messages from localStorage
    useEffect(() => {
        if (!id || !persona) return;
        const saved = localStorage.getItem(`chat_${id}`);
        if (saved) {
            setMessages(JSON.parse(saved));
        } else {
            setMessages([]);
            localStorage.setItem(`chat_${id}`, JSON.stringify([]));
        }
    }, [id, persona?.name]);

    // Save messages to localStorage
    useEffect(() => {
        if (messages.length > 0 && id) {
            localStorage.setItem(`chat_${id}`, JSON.stringify(messages));
        }
    }, [messages, id]);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const sendMessage = async () => {
        if (!inputMessage.trim() || !id) return;

        const userMessage = {
            id: Date.now(),
            sender: 'user',
            content: inputMessage.trim(),
            timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);
        try {
            const response = await axios.post('https://personachatbot-n7jq.onrender.com/chat', {
                id: Number(id),
                content: userMessage.content
            });
            const data = response.data;

            const personaMessage = {
                id: Date.now() + 1,
                sender: 'persona',
                content: data.message,
                timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            };

            setMessages(prev => [...prev, personaMessage]);
        } catch {
            const errorMessage = {
                id: Date.now() + 2,
                sender: 'persona',
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    if (!persona) {
        return (
            <div className="text-[#24150f] min-h-screen flex items-center justify-center text-xl sm:text-2xl px-4 text-center">
                Persona not found
            </div>
        );
    }

    return (
        <div className="bg-transparent h-screen flex flex-col sm:flex-row">
            {/* Mobile Header - Only visible on mobile */}
            <div className="sm:hidden bg-white/85 backdrop-blur-sm border-b border-[#e9c7ac] p-4 flex items-center gap-4">
                <button
                    onClick={() => window.history.back()}
                    className="text-[#d9571b] hover:text-[#a83b0f] transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <img 
                    src={persona.image} 
                    alt={persona.name} 
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#edb898]" 
                />
                <div className="flex-1 min-w-0">
                    <h2 className="display-font text-[#24150f] font-semibold truncate">{persona.name}</h2>
                </div>
                <button
                    onClick={() => setShowPersonaPanel(!showPersonaPanel)}
                    className="text-[#d9571b] hover:text-[#a83b0f] transition-colors"
                >
                    <User size={24} />
                </button>
            </div>

            {/* Persona Panel - Desktop sidebar / Mobile overlay */}
            <div className={`
                ${showPersonaPanel ? 'flex' : 'hidden'} sm:flex
                ${showPersonaPanel ? 'absolute inset-0 z-50 bg-[#fffaf4]/95 backdrop-blur-sm' : ''}
                sm:relative sm:bg-white/45 sm:backdrop-blur-none
                sm:w-1/4 lg:w-1/3 xl:w-1/4
                text-[#24150f] flex-col border-r border-r-[#e9c7ac] gap-4 sm:gap-6 lg:gap-8 
                items-center justify-center p-4 sm:p-6 lg:p-8
            `}>
                {/* Mobile close button */}
                {showPersonaPanel && (
                    <button
                        onClick={() => setShowPersonaPanel(false)}
                        className="sm:hidden absolute top-4 right-4 text-[#d9571b] hover:text-[#a83b0f] transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                )}
                
                <img 
                    src={persona.image} 
                    alt={persona.name} 
                    className="rounded-full w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-cover border-4 border-white shadow-[0_10px_30px_rgba(217,87,27,0.22)]" 
                />
                <span className="display-font text-xl sm:text-2xl lg:text-3xl font-bold text-center px-4">
                    {persona.name}
                </span>
                <span className="text-sm sm:text-base lg:text-lg text-center font-normal text-[#765d50] leading-relaxed px-4">
                    {persona.description}
                </span>
            </div>
            
            {/* Chat Area */}
            <div className="flex-1 flex flex-col min-h-0">
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`
                                ${message.sender === 'user' 
                                    ? 'bg-[#d9571b] border-[#d9571b] shadow-[0_8px_20px_rgba(217,87,27,0.18)]' 
                                    : 'bg-white/85 border-[#ead6c8] shadow-[0_8px_20px_rgba(126,62,25,0.06)]'
                                } 
                                backdrop-blur-sm border rounded-[1.15rem] p-3 sm:p-4 
                                max-w-[85%] sm:max-w-xs lg:max-w-md xl:max-w-lg
                            `}>
                                <p className={`${message.sender === 'user' ? 'text-white' : 'text-[#352118]'} whitespace-pre-wrap text-sm sm:text-base break-words`}>
                                    {message.content}
                                </p>
                                <span className={`
                                    text-xs ${message.sender === 'user' ? 'text-orange-100' : 'text-[#a38472]'} 
                                    mt-2 block
                                `}>
                                    {message.timestamp}
                                </span>
                            </div>
                        </div>
                    ))}
                    
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white/85 backdrop-blur-sm border border-[#ead6c8] rounded-[1.15rem] p-3 sm:p-4 shadow-[0_8px_20px_rgba(126,62,25,0.06)]">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-[#d9571b] rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-[#d9571b] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-[#d9571b] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                </div>
                
                {/* Input Area */}
                <div className="p-3 sm:p-4 lg:p-4 safe-area-bottom">
                    <div className="bg-white/90 backdrop-blur-sm border border-[#dfb99f] rounded-[1.15rem] p-3 sm:p-4 flex gap-3 sm:gap-4 items-end shadow-[0_10px_30px_rgba(126,62,25,0.08)]">
                        <textarea 
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message..."
                            className="flex-1 bg-transparent text-[#24150f] placeholder-[#a38472] resize-none outline-none min-h-[20px] max-h-32 text-sm sm:text-base"
                            rows={1}
                        />
                        <button 
                            onClick={sendMessage} 
                            disabled={!inputMessage.trim()} 
                            className="text-[#d9571b] hover:text-[#a83b0f] disabled:text-[#d9c4b7] disabled:cursor-not-allowed transition-colors p-2 hover:bg-[#fff0e5] rounded-lg flex-shrink-0"
                        >
                            <Send size={18} className="sm:w-5 sm:h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay backdrop for mobile persona panel */}
            {showPersonaPanel && (
                <div 
                    className="sm:hidden fixed inset-0 bg-[#5c240f]/25 z-40"
                    onClick={() => setShowPersonaPanel(false)}
                />
            )}
        </div>
    );
};

export default ChatPage;
