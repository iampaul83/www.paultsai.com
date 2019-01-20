import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  renderCover(cover) {
    if (!cover) return null

    return <img src={cover} alt="Cover Image" style={{ marginBottom: 0 }} />
  }

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO keywords={[`blog`, `javascript`, `vue`]} />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div
              key={node.fields.slug}
              style={{
                borderRadius: '3px',
                boxShadow:
                  '0 1px 1px 0 rgba(60,64,67,.08), 0 1px 3px 1px rgba(60,64,67,.16)',
                outline: 0,
              }}
            >
              {this.renderCover(node.frontmatter.cover)}
              <div style={{ padding: '10px' }}>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                    marginTop: 0,
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
                <p style={{ marginBottom: 0 }}>
                  {node.frontmatter.description || node.excerpt}
                </p>
              </div>
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            description
            cover
          }
        }
      }
    }
  }
`
