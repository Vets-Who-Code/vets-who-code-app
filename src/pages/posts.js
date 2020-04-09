import React from 'react'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import useFetch from '../hooks/useFetch'
import { pageQuery } from './blog'
import Img from 'gatsby-image'

const Posts = ({ location }) => {
  const query = location.pathname
  const id = query.replace(/\/posts\//, '')
  const { data, loading } = useFetch(`https://dev.to/api/articles/${id}`, {})
  console.log(data.user)
  return (
    <Layout>
      <PageHeader title={data.title} />
      <img src={data.cover_image} width="50%" />
      <p>Author: {data.user.name}</p>
      <p>Date: {data.readable_publish_date}</p>
      <section>
{/*       <div dangerouslySetInnerHTML={data.body_html}/>
 */}      </section>
    </Layout>
  )
}
export default Posts
