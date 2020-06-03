import React from 'react'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import useFetch from '../hooks/useFetch'
import { pageQuery } from './blog'
import ReactMarkdown from 'react-markdown'
import '../assets/css/blog.css'
const Posts = ({ location }) => {
  const query = location.pathname
  const id = query.replace(/\/posts\//, '')
  const { data, loading } = useFetch(`https://dev.to/api/articles/${id}`, {})
  console.log(data.body_markdown)
  const md = data.body_markdown
  return (
    <Layout>
      <PageHeader title={data.title} />
      <div className="container">
        <img className="postimage" src={data.cover_image} width="50%" />
        {/*       <p>Author: {data.user.name}</p>
         */}{' '}
        <p>Date: {data.readable_publish_date}</p>
        <section>
          <ReactMarkdown source={data.body_markdown} />
        </section>
      </div>
    </Layout>
  )
}
export default Posts
