import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import recipeImage from "../../assets/recipe.png";
import siuImage from "../../assets/siu.jpg"
import { fetchAIResponse } from "../../store/ai";
import { Link, useNavigate } from "react-router-dom";

const Ai = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const aiResponse = useSelector((state) => state.ai.response);
  const { profile } = useSelector((state) => state.user);
  const token = useSelector((state) => state.auth.token);
  const [chatHistory, setChatHistory] = useState([
    {
      id: "1",
      title: "Bánh tráng nướng",
      messages: [
        {
          type: "user",
          content: "Làm sao để làm bánh tráng nướng ngon?",
        },
        {
          type: "bot",
          content: "Đây là công thức bánh tráng nướng ngon tuyệt:",
          recipe: {
            title: "Bánh Tráng Nướng Đà Lạt",
            category: "Món Việt Nam",
            image: recipeImage,
          },
        },
      ],
    },
  ]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (currentChatId) {
      const selectedChat = chatHistory.find((chat) => chat.id === currentChatId);
      if (selectedChat) {
        setMessages(selectedChat.messages);
      }
    }
  }, [currentChatId]);

  useEffect(() => {
    if (aiResponse) {
      const botResponse = {
        type: "bot",
        content: aiResponse.message,
        foods: aiResponse.foods,
      };

      const updatedMessages = [...messages, botResponse];
      setMessages(updatedMessages);

      if (!currentChatId) {
        const newChat = {
          id: Date.now().toString(),
          title: inputMessage.slice(0, 30),
          messages: updatedMessages,
        };
        setChatHistory((prev) => [newChat, ...prev]);
        setCurrentChatId(newChat.id);
      } else {
        setChatHistory((prev) =>
          prev.map((chat) =>
            chat.id === currentChatId
              ? { ...chat, messages: updatedMessages }
              : chat
          )
        );
      }
    }
  }, [aiResponse]);

  const createNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);
  };

  const selectChat = (chatId) => {
    setCurrentChatId(chatId);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newUserMessage = {
      type: "user",
      content: inputMessage,
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInputMessage("");

    dispatch(fetchAIResponse(inputMessage));
  };

  const handleTextAreaChange = (e) => {
    const textarea = e.target;
    setInputMessage(e.target.value);
    
    textarea.style.height = 'inherit';
    
    const computed = window.getComputedStyle(textarea);
    
    const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                  + parseInt(computed.getPropertyValue('padding-top'), 10)
                  + textarea.scrollHeight
                  + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                  + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
    
    textarea.style.height = `${height}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return;
      } else {
        e.preventDefault();
        handleSendMessage();
      }
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      <div className="flex-1 flex flex-col h-full shadow-lg rounded-lg overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.type === "bot" && (
                <img
                  src={siuImage}
                  alt="Bot Logo"
                  className="w-10 h-10 rounded-full mr-2 flex-shrink-0 object-cover"
                />
              )}
              <div
                className={`p-3 rounded-lg shadow-md max-w-md transition-all duration-300 ${
                  message.type === "user"
                    ? "bg-blue-200 text-right"
                    : "bg-white text-left border border-gray-300"
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
                {message.foods && message.foods.length > 0 && (
                  <div className="mt-2">
                    {message.foods.map((food) => (
                      <div key={food.id} className="border rounded-lg overflow-hidden mb-2">
                        <Link to={`/recipe/${food.id}`}>
                          <img
                            src={food.image}
                            alt={food.name}
                            className="w-full h-32 object-cover"
                          />
                          <div className="p-2">
                            <h3 className="font-bold text-lg truncate">{food.name}</h3>
                            <p className="text-sm text-gray-500 truncate">{food.description}</p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {message.type === "user" && profile && (
                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center ml-2">
                  <img
                    src={profile.avatar}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="p-4 border-t bg-white sticky bottom-0">
          <div className="flex items-center">
            <textarea
              value={inputMessage}
              onChange={handleTextAreaChange}
              onKeyDown={handleKeyDown}
              placeholder="Hỏi bất kỳ điều gì"
              rows="1"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
              style={{ minHeight: '40px', maxHeight: '200px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ai;
