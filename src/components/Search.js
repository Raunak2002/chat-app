import { useContext, useState } from 'react'
import styled from 'styled-components'
import {db} from '../firebase'
import { collection, query, where,getDocs, setDoc, updateDoc, serverTimestamp,getDoc,doc } from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';

function Search() {
    const [username, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const {currentUser} = useContext(AuthContext);

    const handleSearch = async () =>{
      const q = query(
        collection(db,"users"), 
        where("displayName", "==", username)
      );
      try{  
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          setUser(doc.data())
      });
    }catch(err){
      setErr(true);
    };
  }

    const handleKey = e=>{
      e.code === "Enter" && handleSearch();
    }

    const handleSelect = async ()=>{
      const combinedId = currentUser.uid>user.uid
                         ? currentUser.uid + user.uid
                         : user.uid + currentUser.uid;
        try{
        const res = await getDoc(doc(db,"chats", combinedId));
        if (!res.exists()) {
          await setDoc(doc(db,"chats",combinedId),{messages:[]});
          
          await updateDoc(doc(db,"userChats",currentUser.uid),{
            [combinedId+".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL
            },
            [combinedId+".date"]: serverTimestamp()
          });

          await updateDoc(doc(db,"userChats",user.uid),{
            [combinedId+".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL
            },
            [combinedId+".date"]: serverTimestamp()
          });
        }
        }catch(err){
          setUser(null);
          setUserName("");
        }
    }

    return <Container>
        <SearchBar>
          <input type="text" 
          placeholder="Find a user" 
          onKeyDown={handleKey} 
          onChange={e=>{setUserName(e.target.value)}} 
          value={username} />
        </SearchBar>      

        {err && <span>User not found</span>}   
        {user && <Chat onClick={handleSelect}>
          <img src={user.photoURL} alt=''/>
          <div>
            <span>
               {user.displayName}
            </span>
          </div>
        </Chat>}
    </Container>
  }

const Container = styled.div`
    border-bottom: 1px solid gray;
` 

const SearchBar = styled.div`
    padding: 10px;
    input{
      background-color: transparent;
      border: none;
      color: white;
      outline: none;

      &::placeholder{
        color: lightgray;
      }
    }
` 

const Chat = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    cursor: pointer;

    &:hover{
      background-color: #2f2d52;
    }

    img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    }
` 

export default Search;