
import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Loader2 } from 'lucide-react';
import { generateMarketAnalysis } from './services/geminiService';
import type { ChatMessage, MunicipioPerfil } from './types';

interface ChatWidgetProps {
    contextPrompt: string;
    initialMessage: string;
    cityContext?: MunicipioPerfil; // Tipagem corrigida de 'any' para 'MunicipioPerfil'
    buttonClassName?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ contextPrompt, initialMessage, cityContext, buttonClassName = 'bottom-6 right-6' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { sender: 'ai', text: initialMessage }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);
    
    // Reset initial message when context changes
    useEffect(() => {
        setMessages([{ sender: 'ai', text: initialMessage }]);
    }, [initialMessage]);


    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage: ChatMessage = { sender: 'user', text: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const fullPrompt = `${contextPrompt}\n\nO histórico da nossa conversa até agora é:\n${messages.map(m => `${m.sender}: ${m.text}`).join('\n')}\n\nMinha nova pergunta é: "${inputValue}"`;
            // cityContext agora é passado com tipo correto para a service
            const aiResponseText = await generateMarketAnalysis(fullPrompt, cityContext);
            const aiMessage: ChatMessage = { sender: 'ai', text: aiResponseText };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error: any) {
            const errorMessage: ChatMessage = { sender: 'ai', text: `Desculpe, ocorreu um erro: ${error.message}` };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Chat Window */}
            {isOpen && (
                <div className={`fixed ${buttonClassName.replace('bottom-6', 'bottom-24').replace('right-6', 'right-6')} w-full max-w-md h-full max-h-[600px] bg-white rounded-xl shadow-2xl flex flex-col z-40 animate-fade-in`}>
                    {/* Header */}
                    <header className="p-4 border-b flex justify-between items-center bg-blue-600 text-white rounded-t-xl cursor-grab">
                        <h3 className="font-bold text-lg">Converse com RogerLens</h3>
                        <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-blue-700">
                            <X size={20} />
                        </button>
                    </header>
                    
                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        <div className="space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                        <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
                                    </div>
                                </div>
                            ))}
                             {isLoading && (
                                <div className="flex justify-start">
                                    <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl bg-gray-200 text-gray-800 rounded-bl-none flex items-center">
                                       <Loader2 size={16} className="animate-spin mr-2"/>
                                       Analisando...
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSendMessage} className="p-4 border-t">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Faça uma pergunta..."
                                className="flex-1 border-gray-300 rounded-full py-2 px-4 text-sm focus:ring-blue-500 focus:border-blue-500"
                                disabled={isLoading}
                            />
                            <button type="submit" disabled={isLoading || !inputValue.trim()} className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:bg-gray-400">
                                <Send size={16} />
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* FAB */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed ${buttonClassName} bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-transform hover:scale-110 z-30`}
                aria-label="Abrir chat"
            >
                {!isOpen && <Bot size={28} />}
                {isOpen && <X size={28} />}
            </button>
        </>
    );
};

export default ChatWidget;
