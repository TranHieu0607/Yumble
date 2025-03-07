import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import recipeImage from "../../assets/recipe.png";
import siuImage from "../../assets/siu.jpg"
import { fetchAIResponse } from "../../store/ai";
import { Link, useNavigate } from "react-router-dom";
import { FaPaperPlane, FaRobot } from 'react-icons/fa';
import { fetchUserPremium } from '../../store/userSlice';

const Ai = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const aiResponse = useSelector((state) => state.ai.response);
  const { profile } = useSelector((state) => state.user);
  const token = useSelector((state) => state.auth.token);
  const messagesEndRef = useRef(null);
  
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      const checkPremiumStatus = async () => {
        const userId = localStorage.getItem('userId');
        console.log('User ID:', userId);
        if (!userId) {
          alert('Không tìm thấy userId trong localStorage.');
          return;
        }
        try {
          const premiumData = await dispatch(fetchUserPremium(userId)).unwrap();
          console.log('Premium Data:', premiumData);
          
          // Kiểm tra trạng thái premium
          if (!premiumData || premiumData.premiumStatus === 'INACTIVE' || new Date(premiumData.premiumExpiry) <= new Date()) {
            alert('Bạn cần có gói premium để truy cập vào trang này.');
            navigate('/premium');
          }
        } catch (error) {
          console.error('Error fetching premium status:', error);
          alert('Đã xảy ra lỗi khi kiểm tra trạng thái premium. Vui lòng thử lại sau.');
        }
      };

      checkPremiumStatus();
    }
  }, [token, navigate, dispatch]);

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

    if (!profile || !profile.isPremium) {
      alert('Bạn cần có gói premium để gửi tin nhắn.');
      navigate('/premium');
      return;
    }

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
    
    textarea.style.height = `${Math.min(height, 120)}px`; // Limit max height
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">AI Assistant</h1>
            <button
              onClick={createNewChat}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm sm:text-base"
            >
              Cuộc trò chuyện mới
            </button>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-gray-50">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} items-start`}
                >
                  {message.type === "bot" && (
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FaRobot className="text-blue-500 text-lg sm:text-xl" />
                      </div>
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.type === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-white shadow-sm"
                    }`}
                  >
                    <p className="text-sm sm:text-base whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                    {message.foods && message.foods.length > 0 && (
                      <div className="mt-4 space-y-4">
                        {message.foods.map((food) => (
                          <Link
                            key={food.id}
                            to={`/recipe/${food.id}`}
                            className="block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200"
                          >
                            <div className="flex items-center">
                              <img
                                src={food.image}
                                alt={food.name}
                                className="w-24 h-24 sm:w-32 sm:h-32 object-cover"
                              />
                              <div className="p-3 flex-1">
                                <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">
                                  {food.name}
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-2">
                                  {food.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  {message.type === "user" && profile && (
                    <div className="flex-shrink-0 ml-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
                        <img
                          src={profile.avatar}
                          alt="User Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t bg-white py-4 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-end gap-4">
                <textarea
                  value={inputMessage}
                  onChange={handleTextAreaChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Nhập tin nhắn của bạn..."
                  className="flex-1 resize-none rounded-xl border-2 border-gray-200 p-3 focus:outline-none focus:border-blue-500 text-sm sm:text-base"
                  style={{ minHeight: '44px', maxHeight: '120px' }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className={`p-3 rounded-xl ${
                    inputMessage.trim()
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-gray-300 cursor-not-allowed"
                  } transition-colors duration-200`}
                >
                  <FaPaperPlane className="text-white text-lg sm:text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ai;
