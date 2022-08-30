import React, { memo } from 'react'

const Item = memo(({ data }) => {
  const photo =
    'https://image.shutterstock.com/image-vector/silhouette-people-unknown-male-person-260nw-1372192277.jpg'
  return (
    <div className="item">
      <img
        className="image"
        src={
          data.thumbnail === 'self' || data.thumbnail === 'default'
            ? photo
            : data.thumbnail
        }
        alt=""
      />
      <p>{data.title}</p>
      <p>
        Number of comments: <b>{data.num_comments}</b>
      </p>
      <a
        href={`https://www.reddit.com/${data.permalink}`}
        target="_blank"
        rel="noreferrer"
      >
        Link
      </a>
    </div>
  )
})

export default Item
