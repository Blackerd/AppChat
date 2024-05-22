import React, {useState} from 'react'
import './chat.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faFaceSmile, faPaperclip, faPaperPlane, faPhone, faVideo} from "@fortawesome/free-solid-svg-icons";
import Message from "../message/message";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const handleSendMessages = () => {
        if (newMessage.trim()) {
            const newChat = [...messages, { text: newMessage, isSentByUser: true }];
            setMessages(newChat);
            setNewMessage('');
        }
    };



    return (
        <div className="chatContainer">
            <div className="header">
                <div className="item">
                    <div className="img">
                        <img src="img/p1.jpg" alt="avatar"/>
                    </div>
                    <div className="name">
                        <div className="info">
                            <span>Xuan Hau</span>
                        </div>
                        <div className="icons">
                            <FontAwesomeIcon className="icon" icon={faPhone}/>
                            <FontAwesomeIcon className="icon" icon={faVideo}/>
                            <FontAwesomeIcon className="icon" icon={faBars}/>
                        </div>
                    </div>

                </div>
            </div>
            <div className="main">
                {messages.map((message, index) => (
                    <Message key={index} text={message.text} isSentByUser={message.isSentByUser}/>
                ))}
            </div>
            <div className="footer">
                <input
                    className="input"
                    type="text"
                    placeholder="Type message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <div className="sendItem">
                    <FontAwesomeIcon className="icon" icon={faFaceSmile}/>
                    <FontAwesomeIcon className="icon" icon={faPaperclip}/>
                    <div className="send" onClick={handleSendMessages}>
                        <span>Send</span>
                        <FontAwesomeIcon className="icon" icon={faPaperPlane}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat