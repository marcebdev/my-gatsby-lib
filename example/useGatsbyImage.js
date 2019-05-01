import React from 'react'
import { Image } from 'my-gatsby-lib'

//Example of what you may want your Query to look like
const imagesQuery = graphql`
  query GetImage {
    images: allFile(filter: {sourceInstanceName: {eq: "images"}}) {
      edges {
        node {
          name
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

const Test = ({ imgName }) => (
    <Image imagesQuery={imagesQuery} name={imgName} mask>
        <p pos="centerCenter"> Text to display </p>
    </Image>
)

export default Test
