import React, { useState, useEffect, useRef } from "react";
import { ref, push, onValue } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { database, storage } from "../../../firebaseConfig";
import EmojiPicker from 'emoji-picker-react';
import { v4 as uuidv4 } from 'uuid';

function ChatModal({ productId, buyerId, sellerId, isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const chatRef = ref(database, `chats/${productId}/messages`);
      const unsubscribe = onValue(chatRef, (snapshot) => {
        const data = snapshot.val();
        const messagesList = data ? Object.entries(data).map(([key, value]) => ({ id: key, ...value })) : [];
        setMessages(messagesList);
        setIsLoading(false);
      }, (error) => {
        console.error("Error fetching messages:", error);
        setIsLoading(false);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [isOpen, productId]);

  const onEmojiClick = (event, emojiObject) => {
    setNewMessage(prevInput => prevInput + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        await handleSendAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };


  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageRef = ref(storage, `chat-images/${productId}/${uuidv4()}`);
      try {
        const snapshot = await uploadBytes(imageRef, file);
        const imageUrl = await getDownloadURL(snapshot.ref);
        await handleSendMessage('', 'image', imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSendAudio = async (audioBlob) => {
    const audioRef = ref(storage, `chat-audio/${productId}/${uuidv4()}`);
    try {
      const snapshot = await uploadBytes(audioRef, audioBlob);
      const audioUrl = await getDownloadURL(snapshot.ref);
      await handleSendMessage('', 'audio', audioUrl);
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  const handleSendMessage = async (content = newMessage, type = 'text', url = null) => {
    if ((type === 'text' && content.trim() !== '') || type === 'image' || type === 'audio') {
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
            <h3 className="text-white font-semibold text-lg animate-pulse">Discussion avec le vendeur</h3>
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
                <div key={msg.id} className={`flex flex-col mb-4 transition-all duration-300 hover:scale-105 ${msg.sender_id === buyerId ? 'items-end' : 'items-start'}`}>
                  <div className={`flex rounded-lg px-4 py-2 max-w-[70%] ${msg.sender_id === buyerId ? 'bg-blue-600 text-white rounded-xl' : 'bg-gray-200 rounded-xl text-gray-800'}`}>
                    {msg.type === 'text' && <p className="text-sm">{msg.content}</p>}
                    {msg.type === 'image' && <img src={msg.url} alt="Shared" className="max-w-full rounded" />}
                    {msg.type === 'audio' && <audio controls src={msg.url} className="max-w-full" />}
                  </div>
                  {msg.sender_id === buyerId && (
                    <div className="text-xs mt-1 text-gray-500">
                      {msg.isDelivered ? (
                        msg.isRead ? (
                          <span>Vu</span>
                        ) : (
                          <span>Envoyé</span>
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
                    onChange={handleImageUpload}
                  />
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </label>
                <button
                  className={`p-2 hover:bg-gray-100 rounded-full transition-all duration-300 ${isRecording ? 'text-red-500' : 'text-gray-600'}`}
                  onClick={isRecording ? stopRecording : startRecording}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Tapez un message"
                  className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:shadow-md pr-10"
                />
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              <button
                onClick={() => handleSendMessage()}
                className="bg-indigo-600 text-white px-4 rounded-full hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
              >
                <svg className="w-4 h-4 ml-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default ChatModal;