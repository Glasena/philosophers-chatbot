import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Objeto para mapear personas e seus avatares com links diretos
const avatars = {
  marco_aurelio: 'https://as1.ftcdn.net/v2/jpg/05/85/21/62/1000_F_585216221_zMukrwdcLCfq5hQvQHt4utcH9S0JURCH.jpg',
  diogenes: 'https://m.media-amazon.com/images/I/81zDyqoeWhL._AC_UF894,1000_QL80_.jpg',
  user: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
};

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [persona, setPersona] = useState('marco_aurelio');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Efeito para rolar para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: input,
          persona: persona,
          history: messages,
        }),
      });
      const data = await response.json();

      const assistantMessage = { role: 'assistant', content: data.reply || data.error };
      setMessages([...newMessages, assistantMessage]);

    } catch (error) {
      console.error("Erro ao contatar o backend:", error);
      const errorMessage = { role: 'assistant', content: 'Desculpe, não consegui me conectar ao meu cérebro. Verifique o console do Docker.' };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header text-center bg-light">
          <h1 className="my-2">Philosophers Chatbot</h1>
          <div className="mt-2 mb-3">
            <label htmlFor="persona-select" className="form-label">Chat with:</label>
            <select id="persona-select" className="form-select w-50 mx-auto" value={persona} onChange={(e) => setPersona(e.target.value)}>
              <option value="marco_aurelio">Marcus Aurelius (Stoic)</option>
              <option value="diogenes">Diogenes (Cynic)</option>
            </select>
          </div>
        </div>
        <div className="card-body chat-window">
          {messages.map((msg, index) => (
            <div key={index} className={`d-flex my-2 align-items-end ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
               {/* Lógica para inverter a ordem para o usuário */}
              {msg.role === 'user' ? (
                <>
                  <div className={`message-bubble ${msg.role}`}>
                    {msg.content}
                  </div>
                  <img src={avatars.user} alt="user avatar" className="avatar ms-2" />
                </>
              ) : (
                <>
                  <img src={avatars[persona]} alt="persona avatar" className="avatar me-2" />
                  <div className={`message-bubble ${msg.role}`}>
                    {msg.content}
                  </div>
                </>
              )}
            </div>
          ))}
          {isLoading && <div className="d-flex justify-content-start my-2"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>}
          <div ref={messagesEndRef} />
        </div>
        <div className="card-footer">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message..."
              value={input}
              disabled={isLoading}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="btn btn-primary" onClick={handleSend} disabled={isLoading}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;