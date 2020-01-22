import React from 'react'
import {{componentName}} from './{{componentName}}'
import readmeMD from './Readme.md'

export default {
  title: '{{componentName}}',
  parameters: {
    notes: {readmeMD}
  },
}

export const FunctionComponent = () => {
  return (
    <div style={{padding: 10}}>
     <{{componentName}}></{{componentName}}>
    </div>
  )
}
