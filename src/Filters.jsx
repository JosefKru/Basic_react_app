import React from 'react'

const Filters = ({ minComments, updateMinComments }) => {
  return (
    <div>
      <input
        onChange={updateMinComments}
        value={minComments}
        className="range"
        type="range"
        min={0}
        max={300}
      />
    </div>
  )
}

export default Filters
