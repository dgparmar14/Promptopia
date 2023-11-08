"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";


const PromptCardList = ({ data, handLeTagClick }) => {
  return (
    <div className="mt-16  prompt_layout">
      {
        data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handLeTagClick={handLeTagClick}
          />
        ))
      }
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filterdPosts, setFilterdPosts] = useState([]);
  useEffect(() => {
    fetchposts();
  }, [])


  const filterByTagHandler = (value) => {
    setSearchText(value)
    const filterd = posts.filter((element, index, array) => array[index].tag.includes(value) === true);
    setFilterdPosts(filterd);

  }


  const handleSearchChange = async (e) => {
    e.preventDefault();

    setSearchText(e.target.value, ...searchText);


    // based on user name
    if (searchText.length > 0) {
      // const filterd = posts.filter((element, index, array) => array[index].creator.username.includes(searchText) === true);
      const filterd = posts.filter((element, index, array) => 
        array[index].prompt.includes(searchText) === true ||
        array[index].creator.username.includes(searchText) === true ||
        array[index].tag.includes(searchText) === true 
      )
      setFilterdPosts(filterd)
      console.log(filterd)

    }
    // // based on prompts
    // else if (searchText.length > 0) {
    //   const filterd = posts.filter((element, index, array) => array[index].prompt.includes(searchText) === true);
    //   setFilterdPosts(filterd)
    // }

  }

  const fetchposts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setPosts(data);
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>


      <PromptCardList
        data={searchText === "" ? posts : filterdPosts}
        handLeTagClick={(value) => { filterByTagHandler(value) }}
      />

    </section>
  )
}

export default Feed