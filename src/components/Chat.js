import styled from 'styled-components';
import Add from "../images/add.png";
import Img from "../images/img.png";
import Cam from "../images/cam.png";
import Messages from './Messages';
import Input from './Input';
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

function Chat() {
  const {data} = useContext(ChatContext);
    console.log(data);
    return <Container>
        <div className='icons'>
          <span>{data.user?.displayName}</span>
          <div className='chatIcon'>
            <img src={Add} alt=''/>
            <img src={Cam} alt=''/>
            <img src={Img} alt=''/>
          </div>
        </div>    
        <Messages/>
        <Input/>
    </Container>
  }

const Container = styled.div`
  flex: 2;
  .icons{
    height: 50px;
    background-color: #5d5b8d;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    color: lightgray;
  }
  .chatIcon{
    display: flex;
    gap: 10px;

    img{
      height: 24px;
      cursor: pointer;
    }
  }
` 

export default Chat;