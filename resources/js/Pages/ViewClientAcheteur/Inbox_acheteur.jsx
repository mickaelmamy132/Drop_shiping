import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {ref, push, onValue, update} from "firebase/database";
import { database } from '../../../../firebaseConfig';
import EmojiPicker from 'emoji-picker-react';

export default function Inbox_acheteur({ auth, produit }) {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [newMessage, setNewMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchConversations = async () => {
            setIsLoading(true);
            const conversationsMap = new Map();
            const unsubscribers = [];

            for (const product of produit) {
                const chatRef = ref(database, `chats/${product.id}/messages`);

                const unsubscribe = onValue(chatRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const messagesList = Object.entries(data).map(([key, value]) => ({
                            id: key,
                            productId: product.id,
                            productName: product.name,
                            productImageUrl: product.imageUrl,
                            content: value.content || '',
                            isDelivered: value.isDelivered || false,
                            isRead: value.isRead || false,
                            receiver_id: value.receiver_id,
                            sender_id: value.sender_id,
                            timestamp: value.timestamp,
                            type: value.type || 'text',
                            url: value.url || ''
                        })).filter(message =>
                            message.sender_id === auth.user.id ||
                            message.receiver_id === auth.user.id
                        );

                        if (messagesList.length > 0) {
                            const conversation = {
                                productId: product.id,
                                productName: product.name,
                                productImageUrl: product.imageUrl,
                                messages: messagesList,
                                unreadCount: messagesList.filter(msg => 
                                    !msg.isRead && msg.receiver_id === auth.user.id
                                ).length
                            };
                            conversationsMap.set(product.id, conversation);

                            const newConversations = Array.from(conversationsMap.values());
                            setConversations(newConversations);
                            
                            if (selectedConversation && product.id === selectedConversation.productId) {
                                setSelectedConversation(prev => ({
                                    ...prev,
                                    messages: messagesList
                                }));
                            }
                        }
                    }
                    setIsLoading(false);
                });

                unsubscribers.push(unsubscribe);
            }

            return () => {
                unsubscribers.forEach(unsubscribe => unsubscribe());
            };
        };

        fetchConversations();
    }, [produit, auth.user.id, selectedConversation]);

    const handleSelectConversation = async (conversation) => {
        if (selectedConversation?.productId === conversation.productId) {
            return;
        }
        
        setSelectedConversation(conversation);
    
        const updatedConversations = conversations.map((conv) => {
            if (conv.productId === conversation.productId) {
                const updatedMessages = conv.messages.map((message) => {
                    if (!message.isRead && message.receiver_id === auth.user.id) {
                        const messageRef = ref(database, `chats/${conv.productId}/messages/${message.id}`);
                        update(messageRef, { isRead: true });
                        return { ...message, isRead: true };
                    }
                    return message;
                });
                return { ...conv, messages: updatedMessages, unreadCount: 0 };
            }
            return conv;
        });
    
        setConversations(updatedConversations);
    };
    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const onEmojiClick = (emojiObject) => {
        setNewMessage(prevMessage => prevMessage + emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    const handleSendMessage = async (content = newMessage, type = 'text', url = null) => {
        if (!selectedConversation) return;
        
        if ((type === 'text' && content.trim() !== '') || type === 'image' || type === 'audio') {
            const chatRef = ref(database, `chats/${selectedConversation.productId}/messages`);
            const otherParty = selectedConversation.messages.find(msg => 
                msg.sender_id !== auth.user.id
            );
            
            const messageData = {
                sender_id: auth.user.id,
                receiver_id: otherParty ? otherParty.sender_id : null,
                content: content,
                type: type,
                url: url,
                timestamp: Date.now(),
                isDelivered: true,
                isRead: false
            };

            await push(chatRef, messageData);
            setNewMessage('');
            setShowEmojiPicker(false);
            
            // Update selectedConversation with the new message
            setSelectedConversation(prev => ({
                ...prev,
                messages: [...prev.messages, { ...messageData, id: Date.now().toString() }]
            }));
        }
    };

    const handleSendImage = async () => {
        if (selectedImage) {
            const storageRef = ref(storage, `chat-images/${Date.now()}_${selectedImage.name}`);
            await uploadBytes(storageRef, selectedImage);
            const imageUrl = await getDownloadURL(storageRef);
            await handleSendMessage(selectedImage.name, 'image', imageUrl);
            setImagePreview(null);
            setSelectedImage(null);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} role={auth.role}>
            <div className="w-full flex flex-col md:flex-row h-[calc(100vh-4rem)] fixed overflow-x-hidden">
                <div className="w-full md:w-1/4 border-r border-gray-200 p-4">
                    <h2 className="text-xl font-semibold mb-4">Discussions</h2>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    ) : (
                    <div className="space-y-4">
                        {conversations
                            .sort((a, b) => {
                                const latestMessageA = a.messages[a.messages.length - 1];
                                const latestMessageB = b.messages[b.messages.length - 1];
                                return latestMessageB.timestamp - latestMessageA.timestamp;
                            })
                            .map((conversation) => {
                                const latestMessage = conversation.messages[conversation.messages.length - 1];
                                const isSelected = selectedConversation && selectedConversation.productId === conversation.productId;
                                const showUnreadCount = !isSelected && conversation.unreadCount > 0;

                                return (
                                    <div
                                        key={conversation.productId}
                                        onClick={() => handleSelectConversation(conversation)}
                                        className={`p-4 border rounded-lg hover:bg-gray-50 cursor-pointer flex items-center space-x-4 ${showUnreadCount ? 'bg-blue-50' : ''}`}
                                    >
                                        <img
                                            src={conversation.productImageUrl}
                                            alt={conversation.productName}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">Produit: {conversation.productName}</p>
                                            <p className="text-sm text-gray-500 truncate">
                                                {latestMessage.content}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {latestMessage.timestamp
                                                    ? new Date(latestMessage.timestamp).toLocaleTimeString()
                                                    : 'Inconnu'}
                                            </p>
                                        </div>
                                        {showUnreadCount && (
                                            <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                                {conversation.unreadCount}
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                    )}
                </div>
                <div className="w-full md:w-2/4 lg:w-3/6 sm:w-1/5 overflow-y-auto">
                    <div className="p-4 flex flex-col h-[calc(85vh-4rem)]">
                        {selectedConversation ? (
                            <div className="flex flex-col h-full relative">
                                <h3 className="text-lg font-semibold mb-2 truncate">
                                    Conversation pour {selectedConversation.productName}
                                </h3>
                                <div className="flex-1 p-4 bg-gray-50 transition-all duration-300 flex flex-col-reverse overflow-y-auto">
                                    {isLoading ? (
                                        <div className="flex justify-center items-center h-full">
                                            <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        </div>
                                    ) : (
                                        selectedConversation.messages.slice().reverse().map((message) => (
                                            <div key={message.id} className={`flex flex-col mb-4 transition-all duration-300 hover:scale-105 group ${message.sender_id === auth.user.id ? 'items-end' : 'items-start'}`}>
                                                <div className={`flex rounded-lg px-4 py-2 max-w-[70%] break-words ${message.sender_id === auth.user.id ? 'bg-blue-600 text-white rounded-xl' : 'bg-gray-200 rounded-xl text-gray-800'}`}>
                                                    {message.type === 'text' && <p className="text-base break-words">{message.content}</p>}
                                                    {message.type === 'image' && <img src={message.url} alt="Shared" className="max-w-full rounded" />}
                                                    {message.type === 'audio' && <audio controls src={message.url} className="max-w-full" />}
                                                </div>
                                                {message.sender_id === auth.user.id && (
                                                    <div className="text-sm mt-1 text-gray-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                        {message.isDelivered ? (
                                                            message.isRead ? (
                                                                <span className="flex items-center">
                                                                    <span>Vu</span>
                                                                    <span className="ml-2">• {new Date(message.timestamp).toLocaleTimeString()} ({Math.floor((Date.now() - message.timestamp) / 60000)} min)</span>
                                                                </span>
                                                            ) : (
                                                                <span className="flex items-center">
                                                                    <span className="animate-fadeOut">Envoyé</span>
                                                                    <span className="ml-2">• {new Date(message.timestamp).toLocaleTimeString()} ({Math.floor((Date.now() - message.timestamp) / 60000)} min)</span>
                                                                </span>
                                                            )
                                                        ) : null}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div className="border-t p-4 bg-white mt-auto">
                                    {showEmojiPicker && (
                                        <div className="absolute bottom-20 right-4">
                                            <EmojiPicker onEmojiClick={onEmojiClick} />
                                        </div>
                                    )}
                                    <div className="flex flex-wrap gap-2">
                                        <div className="flex items-center">
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
                                            onClick={() => imagePreview ? handleSendImage() : handleSendMessage()}
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
                        ) : (
                            <p className="text-gray-500">Sélectionnez une conversation pour afficher les messages</p>
                        )}
                    </div>
                </div>
                </div>
        </AuthenticatedLayout>
    );
}