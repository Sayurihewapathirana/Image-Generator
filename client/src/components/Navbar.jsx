import React from 'react';
import styled from 'styled-components';
import Button from './button';
import { AddRounded, Explore } from '@mui/icons-material';
import { useNavigate,useLocation } from 'react-router-dom';
import { ExploreRounded } from '@mui/icons-material';
const Container = styled.div`
 flex: 1;
 background-color: ${({ theme }) => theme.navbar};
 color: ${({ theme }) => theme.text_primary};
 font-size: 22px;
 font-weight: bold;
 padding: 14px 50px;
 display: flex;
 align-items: center;   
 justify-content: space-between;
 box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
 @media only screen and (max-width: 600px) {
    padding: 10px 12px;

`;

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path=location.pathname.split("/");
  return (
    <Container> 
        GenAI
        {path[1] === "post" ? (
         <Button 
          onClick={() => navigate("/")}
          text="Explore Posts" 
          leftIcon= {
           <ExploreRounded 
            style={{
             fontSize: "18px",
             }}
          />    
         }
         type="secondary"
        />
       ):(
        
        <Button 
        onClick={() => navigate("/post")}
        text="Craete new Post" 
        leftIcon= {
         <AddRounded 
           style={{
             fontSize: "18px",
             }}
          />
            
         }
        />
       )}
    </Container>
  );
};

export default Navbar

