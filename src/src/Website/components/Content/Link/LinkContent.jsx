import React from 'react'

export const LinkContent = (contentType, contentData) => {
  return (
    <div>
        <h2>Download</h2>
        <a href={contentData} target="_blank">Link</a>
    </div>
  )
}
