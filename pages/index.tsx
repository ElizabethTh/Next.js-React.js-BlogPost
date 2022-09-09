import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import styled from 'styled-components'
import axios from 'axios'

// -------------Define type for the fetching data----------
type blogPostData = [
  {
    title: string
    description: string
    createdAt: string
    updatedAt: string
    id: string
    authors: IAuthors[]
    comments: IComments[]
  }
]

interface IAuthors {
  createdAt: string
  name: string
  avatar: string
  updatedAt: string
  id: string
  postId: string
}

interface IComments {
  createdAt: string
  title: string
  description: string
  updatedAt: string
  id: string
  postId: string
}

const StyledCard = styled.div`
  margin: 50px 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #badfe7;
  background-clip: border-box;
  border: none;
  box-shadow: 0 12px 15px rgba(0, 0, 0, 0.1), 0 17px 50px rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
`

const Home: NextPage = () => {
  // const {data, isLoading, isFetching} = useQuery('blogPost', getBlogPostData);
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(5)

  useEffect(() => {
    const getBlogPostData = async () => {
      setLoading(true)
      const res = await axios.get(
        'https://6144e843411c860017d256f0.mockapi.io/api/v1/posts'
      )
      setPosts(res.data)
      setLoading(false)
    }
    getBlogPostData()
  }, [])

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  console.log(currentPosts)

  //change Page on click of next button
  function nextPageFunction () {
    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
      setCurrentPage(i)
    }
  }
  const blogTitle = currentPosts.map((d: any) => (
    <StyledCard key={d.id}>
      <h3 className={styles.blogTitle}>{d.title}</h3>
      <div className={styles.blogDate}>
        <div>
          <b>Created on:</b> {new Date(d.createdAt).toLocaleString()}
        </div>
        <div>
          <b>Updated on:</b> {new Date(d.updatedAt).toLocaleString()}
        </div>
      </div>
      <p className={styles.blogDesc}>{d.description}</p>
      <div className={styles.blogAuthor}>
        <b> Authors:</b>
        {d.authors.map(function (authorL: any) {
          return <div>{authorL.name}</div>
        })}
      </div>
    </StyledCard>
  ))
  return (
    <div className={styles.container}>
      <h1 className={styles.blogName}>tactableBlog.ca</h1>
      {blogTitle}
      <button className={styles.blogNextButton} onClick={nextPageFunction}>
        Next Page
      </button>
    </div>
  )
}

export default Home
