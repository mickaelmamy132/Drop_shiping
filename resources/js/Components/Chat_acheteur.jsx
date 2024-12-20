import React, { useState, useEffect, useRef } from "react";
import { ref, push, onValue } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { database, storage } from "../../../firebaseConfig";
import EmojiPicker from 'emoji-picker-react';

function ChatModal({ productId, buyerId, sellerId, Produit_image, isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const chatRef = ref(database, `chats/${productId}/messages`);
      const unsubscribe = onValue(chatRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const messagesList = Object.entries(data)
            .map(([key, value]) => ({ id: key, ...value }))
            .filter(msg => 
              (msg.sender_id === buyerId && msg.receiver_id === sellerId) ||
              (msg.sender_id === sellerId && msg.receiver_id === buyerId)
            );
          setMessages(messagesList);
        } else {
          setMessages([]);
        }
        setIsLoading(false);
      }, (error) => {
        console.error("Error fetching messages:", error);
        setIsLoading(false);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [isOpen, productId, buyerId, sellerId]);

  const onEmojiClick = (emojiObject) => {
    if (emojiObject && emojiObject.emoji) {
      setNewMessage(prevInput => prevInput + emojiObject.emoji);
    }
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSendImage = async () => {
    if (selectedImage) {
      const imageRef = storageRef(storage, `chat-images/${productId}/${buyerId}_${sellerId}/${uuidv4()}`);
      try {
        const snapshot = await uploadBytes(imageRef, selectedImage);
        const imageUrl = await getDownloadURL(snapshot.ref);
        await handleSendMessage('', 'image', imageUrl);
        setSelectedImage(null);
        setImagePreview(null);
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'image:", error);
      }
    }
  };

  const handleSendMessage = async (content = newMessage, type = 'text', url = null) => {
    if ((type === 'text' && content.trim() !== '') || type === 'image') {
      const chatRef = ref(database, `chats/${productId}/messages`);
      const messageData = {
        sender_id: buyerId,
        receiver_id: sellerId,
        content: content,
        type: type,
        url: url,
        timestamp: Date.now(),
        isDelivered: true,
        isRead: false
      };

      await push(chatRef, messageData);
      setNewMessage('');
    }
  };

  return (
    isOpen && (
      <div className="fixed bottom-0 right-0 mb-4 mr-4 z-50 animate-fadeIn transition-all duration-300 ease-in-out">
        <div className="bg-white w-full sm:w-96 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 animate-slideIn hover:scale-102">
          <div className="bg-indigo-600 px-4 py-3 flex justify-between items-center rounded-t-2xl transition-colors duration-300 hover:bg-indigo-700">
            <div className="flex items-center space-x-3">
              <img src={`/storage/${Produit_image}`} alt="Vendeur" className="w-10 h-10 rounded-full object-cover" />
              <h3 className="text-white font-semibold text-lg animate-pulse">Discussion avec le vendeur</h3>
            </div>
            <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors duration-300 transform hover:rotate-180">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="h-96 p-4 overflow-y-auto bg-gray-50 transition-all duration-300 flex flex-col-reverse">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : (
              messages.slice().reverse().map((msg) => (
                <div key={msg.id} className={`flex flex-col mb-4 transition-all duration-300 hover:scale-105 group ${msg.sender_id === buyerId ? 'items-end' : 'items-start'}`}>
                  <div className={`flex rounded-lg px-4 py-2 max-w-[70%] ${msg.sender_id === buyerId ? 'bg-blue-600 text-white rounded-xl' : 'bg-gray-200 rounded-xl text-gray-800'}`}>
                    {msg.type === 'text' && <p className="text-base">{msg.content}</p>}
                    {msg.type === 'image' && <img src={msg.url} alt="Shared" className="max-w-full rounded" />}
                  </div>
                  {msg.sender_id === buyerId && (
                    <div className="text-sm mt-1 text-gray-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {msg.isDelivered ? (
                        msg.isRead ? (
                          <span className="flex items-center">
                            <span>Vu</span>
                            <span className="ml-2">• {new Date(msg.timestamp).toLocaleTimeString()} ({Math.floor((Date.now() - msg.timestamp) / 60000)} min)</span>
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <span className="animate-fadeOut">Envoyé</span>
                            <span className="ml-2">• {new Date(msg.timestamp).toLocaleTimeString()} ({Math.floor((Date.now() - msg.timestamp) / 60000)} min)</span>
                          </span>
                        )
                      ) : null}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          <div className="border-t p-4 bg-white rounded-b-2xl">
            {showEmojiPicker && (
              <div className="absolute bottom-20 right-0">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
            <div className="flex space-x-2">
              <div className="flex items-center space-x-2">
                <label className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageSelect}
                  />
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </label>
              </div>
              <div className="flex-1 relative">
                <div className="flex items-center w-full">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Tapez un message"
                    className={`w-full px-4 ${imagePreview ? 'py-5' : 'py-2'} border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:shadow-md pr-10`}
                  />
                  {imagePreview && (
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <div className="relative">
                        <img src={imagePreview} alt="Aperçu de l'image" className="w-8 h-8 object-cover rounded-lg" />
                        <button
                          onClick={() => {
                            setImagePreview(null)
                            setSelectedImage(null)
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-all duration-300"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              <button
                onClick={() => imagePreview ? handleSendImage() : handleSendMessage(newMessage)}
                className="bg-indigo-600 text-white px-4 rounded-full hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
              >
                <svg className="w-4 h-4 ml-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                {imagePreview ? 'Envoyer' : ''}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default ChatModal;