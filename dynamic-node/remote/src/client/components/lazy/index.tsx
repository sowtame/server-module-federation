import React, { useState } from 'react'
import c from './styles.modules.css'

type Props = {}

const LazyComponent = ({}: Props) => {
  return <div className={c.container}>lazy green</div>
}

export default LazyComponent
