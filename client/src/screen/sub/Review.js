import React from 'react'
import moment from 'moment'
import Rating from './Rating'
const Review = ({data}) => {
  const {  rating,review,createdAt,userid } = data
  
  //const rating = 3.7
  return (
    <div className='blk flex'>
      <div className="pic">
        <div className='img' style={{backgroundImage: `url(${process.env.REACT_APP_END_URL}${userid.media})`}} />
      </div>  
      <div className="flex flex-col">
        <div className='font s15 b c000'>{userid.fullname}</div>
        <div><Rating rating={rating}/></div>
        {review && <div className="txt font s14 c000">{review}</div>}
        <div className="date c777">
          <span>Published</span>&nbsp; 
          <span>{moment(createdAt).calendar()}</span>
        </div>
      </div>
    </div>
  )  
}



export default Review
