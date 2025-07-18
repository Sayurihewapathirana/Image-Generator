import React from 'react'
import styled from 'styled-components'
import GenerateImageForm from '../components/GenerateImageForm';
import GeneratedImageCard from '../components/GeneratedImageCard';
import { useState } from 'react';

const Container = styled.div`
    height: 100%;
    overflow-y: scroll;
    background-color: ${({ theme }) => theme.bg};
    padding: 30px 30px;
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    gap: 20px;
    @media (max-width: 768px) {
      padding: 6px 10px;
}

`;

const Wrapper = styled.div`
 Width: 100%;
 height: fit-content;
 max-width: 1200px;
 gap: 8%;
 display: flex;
 justify-content: center;
 
 @media (max-width: 768px) {
    flex-direction: column;
   }
 
`;

const CreatePost = () => {
    const [generateImageLoading, setGenerateImageLoading] = useState(false);
    const [createPostLoading, setCreatePostLoading] = useState(false);
    const [post,setPost] = useState({
        name: "",
        prompt: "",
        photo: "",
    });
  return (
    <Container>
        <Wrapper>
        <GenerateImageForm 
        post={post}
        setPost={setPost}
        createPostLoading ={createPostLoading} 
        setGenerateImageLoading={setGenerateImageLoading}
        generateImageLoading={generateImageLoading}
        setCreatePostLoading={setCreatePostLoading}
        />
        <GeneratedImageCard src={post?.photo} loading= {generateImageLoading}/>
        </Wrapper>
    </Container>
  )
}

export default CreatePost
