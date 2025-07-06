import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import ImageCard from '../components/ImageCard';
import { CircularProgress } from '@mui/material';
import { GetPosts } from '../api';

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.bg};
  padding: 30px 30px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

const Haedline = styled.div`
  font-size: 34px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (max-width: 600px) {
    font-size: 28px;
  }
`;

const Span = styled.span`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.secondary};
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 32px 0px;
  display: flex;
  justify-content: center;
`;

const CardWrapper = styled.div`
  display: grid;
  gap: 20px;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 640px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 689px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const getPosts = async () => {
    setLoading(true);
    try {
      const res = await GetPosts();
      const data = res?.data?.posts || [];
      setPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      setError(error?.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredPosts(posts);
      return;
    }

    const searchFilteredPosts = posts.filter((post) => {
      const promptMatch = post?.prompt?.toLowerCase().includes(search.toLowerCase());
      const authorMatch = post?.name?.toLowerCase().includes(search.toLowerCase());
      return promptMatch || authorMatch;
    });

    setFilteredPosts(searchFilteredPosts);
  }, [posts, search]);

  return (
    <Container>
      <Haedline>
        Explore popular posts in the Community!
        <Span>⦿ Generated with AI ⦿</Span>
      </Haedline>

      <SearchBar search={search} setSearch={setSearch} />

      <Wrapper>
        {error && <div style={{ color: 'red' }}>{error}</div>}

        {loading ? (
          <CircularProgress />
        ) : (
          <CardWrapper>
            {filteredPosts.length === 0 ? (
              <>No Posts</>
            ) : (
              <>
                {filteredPosts
                  .slice()
                  .reverse()
                  .map((item, index) => (
                    <ImageCard key={index} item={item} />
                  ))}
              </>
            )}
          </CardWrapper>
        )}
      </Wrapper>
    </Container>
  );
};

export default Home;
