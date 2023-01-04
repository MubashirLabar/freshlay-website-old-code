import React from 'react'
const Rating = ({rating}) => {
  
  //const rating = 3.7
  return (
    <div className='rating'>
      <div className={"stars flex aic"}>
      <li
          className={
            rating >= 1
              ? 'ico icon-star1'
              : rating >= 0.5
              ? 'ico icon-star-half'
              : 'ico icon-star-o'
          }
        ></li>
    
        <li
          className={
            rating >= 2
              ? 'ico icon-star1'
              : rating >= 1.5
              ? 'ico icon-star-half'
              : 'ico icon-star-o'
          }
        ></li>
     
        <li
          className={
            rating >= 3
              ? 'ico icon-star1'
              : rating >= 2.5
              ? 'ico icon-star-half'
              : 'ico icon-star-o'
          }
        ></li>
    
        <li
          className={
            rating >= 4
              ? 'ico icon-star1'
              : rating >= 3.5
              ? 'ico icon-star-half'
              : 'ico icon-star-o'
          }
        ></li>
     
        <li
          className={
            rating >= 5
              ? 'ico icon-star1'
              : rating >= 4.5
              ? 'ico icon-star-half'
              : 'ico icon-star-o'
          }
        ></li>
      </div>
    </div>
  )
}

// we can set our default props like these easy
Rating.defaultProps = {
  color: '#f8e825',
}

export default Rating
