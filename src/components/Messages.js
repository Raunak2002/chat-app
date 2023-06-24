import { doc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components'
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';
import Message from './Message';

function Messages() {
    const [messages, setMessages] = useState([])
    const {data} = useContext(ChatContext);

    useEffect(()=>{
        const unSub = onSnapshot(doc(db,"chats",data.chatId), (doc)=>{
            doc.exists()&& setMessages(doc.data().messages)
        })
        return ()=>{
            unSub()
        }
    },[data.chatId])


    return <Container>
        {messages.map(m=>(
            <Message message={m} key={m.id}/>
        ))}
        
    </Container>
  }

const Container = styled.div`
    background-color: #ddddf7;
    padding: 10px;
    height: calc(100% - 160px);
    overflow-y: scroll;
` 

export default Messages;