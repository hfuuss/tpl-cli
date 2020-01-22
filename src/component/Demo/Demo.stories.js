import React from 'react'
import Demo from './Demo'
import readmeMD from './Readme.md'

export default {
  title: 'Demo',
  parameters: {
    notes: {readmeMD}
  },
}

export const FunctionComponent = () => {
  return (
    <div style={{padding: 10}}>
     <Demo></Demo>
    </div>
  )
}
