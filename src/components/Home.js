import styled from 'styled-components'
import Slidebar from './Slidebar';
import Chat from './Chat';

function Home() {
    return <Container>
        <div className='home'>
        <Slidebar/>
        <Chat/>
        </div>
    </Container>
}

const Container = styled.div`
    background-color: #a7bcff;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .home{
      border: 1px solid white;
      border-radius: 10px;
      width: 65%;
      height: 80%;
      display: flex;
      overflow: hidden;
    }
` 

export default Home;