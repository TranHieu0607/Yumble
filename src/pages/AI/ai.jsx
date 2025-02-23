import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import recipeImage from "../../assets/recipe.png";
import siuImage from "../../assets/siu.jpg"
import { fetchAIResponse } from "../../store/ai";
import { Link } from "react-router-dom";

const Ai = () => {
  const dispatch = useDispatch();
  const aiResponse = useSelector((state) => state.ai.response);
  const { profile } = useSelector((state) => state.user);
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
    <div className="h-screen bg-gray-100 flex ">
      <div className="w-64 bg-white shadow-lg overflow-y-auto  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <div className="p-4 sticky top-0 bg-white z-10">
          <button
            onClick={createNewChat}
            className="w-full mb-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            + Cuộc trò chuyện mới
          </button>
        </div>
        <div className="space-y-2 px-4">
          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              onClick={() => selectChat(chat.id)}
              className={`p-2 rounded-lg cursor-pointer ${
                 currentChatId === chat.id ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
            >
              <p className="truncate">{chat.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.type === "bot" && (
                <img
                  src={siuImage}
                  alt="Bot Logo"
                  className="w-8 h-8 rounded-full mr-2 flex-shrink-0 object-cover"
                />
              )}
              <div
                className={`p-3 rounded-lg shadow-md max-w-md ${
                  message.type === "user"
                    ? "bg-blue-100 text-right"
                    : "bg-white text-left"
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
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center ml-2">
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
              placeholder="Bạn muốn ăn gì?"
              rows="1"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
              style={{ minHeight: '30px', maxHeight: '200px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ai;
