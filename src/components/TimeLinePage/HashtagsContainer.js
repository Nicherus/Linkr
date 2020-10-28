import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

export default function HashtagsContainer({ token }) {
  const [trendingHashtags, setTrendingHashtags] = useState([]);
  const [search, setSearch] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetchTrendingHashtags();
  }, []);

  const fetchTrendingHashtags = async () => {
    try {
      const {
        data,
      } = await axios.get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/trending",
        { headers: { "user-token": token } }
      );
      setTrendingHashtags([...data.hashtags]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if(search !== ''){
        searchTag();
        setSearch('');
      } else{
        alert('Preencha o campo para procurar por uma hashtag')
      }
    }
  };

  const searchTag = () => {
    history.push(`/hashtag/${search}`);
  }

  return (
    <HashtagsContent>
      <textarea 
        type="text" 
        placeholder="Search for a hashtag" 
        value={search} 
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        onKeyPress={handleKeyPress}
        >
      </textarea>
      <h2>trending</h2>
      <div />
      <ul>
        {trendingHashtags.map((hash) => (
          <Link key={hash.name} to={`/hashtag/${hash.name}`}>
            <li># {hash.name}</li>
          </Link>
        ))}
      </ul>
    </HashtagsContent>
  );
}

const HashtagsContent = styled.section`
  width: 32%;
  height: 100%; 
  background: var(--backgroundBlack);
  border-radius: 10px;
  color: white;
  padding: 5px;
  @media (max-width: 768px) {
    display: none;
  }
  h2 {
    font-family: var(--fontOswald);
    font-weight: bold;
    font-size: 27px;
    margin: 20px 10px;
  }
  div {
    border-top: 1px solid #484848;
    width: 100%;
  }
  ul {
    margin: 20px 10px;
    li {
      margin-bottom: 8px;
      font-family: var(--fontLato);
      font-weight: bold;
      font-size: 19px;
    }
  }

  textarea{
    resize: none;
    height: 65px;
    width: 100%;
    padding: 14px 0 0 14px;
    font-size: 20px;
    border-radius: 5px;
  }

  textarea:focus{
    outline: none;
  }
`;
