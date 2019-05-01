import React from 'react'
import { StaticQuery } from 'gatsby'
import classNames from 'classnames'

import Img from 'gatsby-image'
import styles from './css/image.module.styl'

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `StaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.app/gatsby-image
 * - `StaticQuery`: https://gatsby.app/staticquery
 */

 //TODO: custom alt-text, send custom classes directly?

//use shorthand {...props}?
const Image = ({ children, imagesQuery, name, mask, className }) => (
  <StaticQuery
    query={imagesQuery}
    render={({ images }) => (
      <MyImg userClass={className} overlays={children} mask={mask} file={images.edges.find(image => image.node.name === name)} />
  )}/>
)

export default Image

//TODO: make this its own component?
const ConditionalWrap = ({condition, wrap, children}) => (condition ? wrap(children) : <>{children}</>)

//handle error if file not found
const MyImg = ({ file, overlays, mask, userClass }) => (
  <ConditionalWrap
    condition={overlays}
    wrap={children => <Overlays overlays={overlays} mask={mask}>{children}</Overlays>}
  >
    {/* TODO: figure out margins for image component, margins keep image from overextending over 100% */}
    <Img
      className={ classNames(styles.wrapper, {[userClass]: userClass}) }
      style={{ background: (mask ? 'rgba(0, 0, 0, 0.85)' : '') }}
      fluid={file.node.childImageSharp.fluid}
      alt={'image of ' + file.node.name}
    />
  </ConditionalWrap>
)

const Overlays = ({ children, overlays, mask }) => (
    <div className={ classNames(styles.overlayWrapper, {[styles.mask]: mask}) }>
      {children}
      { Array.isArray(overlays) ?
        overlays.map((element) => <Overlay element={element} key={element} />) :
        <Overlay element={overlays} key={overlays} /> }
    </div>
)

const Overlay = ({ element }) => {
  const key = (element.props.pos ? element.props.pos : '')
  const positionClass = classNames(
    element.props.className,
    styles.overlaid,
    { [styles.hidden]: !element.props.visible },
    {
      [styles.topLeft]:       key === "topLeft",
      [styles.topCenter]:     key === "topCenter",
      [styles.topRight]:      key === "topRight",
      [styles.centerLeft]:    key === "centerLeft",
      [styles.centerCenter]:  key === "centerCenter",
      [styles.centerRight]:   key === "centerRight",
      [styles.bottomLeft]:    key === "bottomLeft",
      [styles.bottomCenter]:  key === "bottomCenter",
      [styles.bottomRight]:   key === "bottomRight"
    })
  return React.cloneElement(element, {className: positionClass})
}