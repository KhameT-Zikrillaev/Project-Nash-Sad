import React from 'react'
import Intro from './components/intro'
import SwiperCase from './components/swipercase'
import Products from './components/products'
import FastMarquis from './components/fastmarquis'
import FruitsOne from './components/fruitsone'
import ImageContent from './components/imagecontent'
import Comments from './components/comments'
import Test from './components/test'
export default function page() {
  return (
    <div>
      <Intro />
      <Products />
      <FastMarquis />
      <ImageContent />
      <FruitsOne />
      <Comments />
      <SwiperCase />
      <Test/>
    </div>
  )
}
