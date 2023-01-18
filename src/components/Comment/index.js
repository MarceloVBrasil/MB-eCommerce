import React from 'react'
import "./Comment.scss"

export default function Comment({comment}) {
  return (
    <article className='comment'>
          <div className='comment-section'>
              <p className='comment-section__author'>{comment.admin ? 'Admin' : comment.name}</p>
              <p className='comment-section__date'>{formatTimestamp(comment.timestamp)}</p>
          </div>
          <div className='comment-section'>
              <p className='comment-section__message'>{comment.message}</p>
          </div>
    </article>
    )
    
    function formatTimestamp(timestamp) {
        const oneSecondInMilliSeconds = 1000;
        const secondsPassed = Math.floor(
            Math.abs((Date.now() - timestamp) / oneSecondInMilliSeconds)
        );
        const oneMinuteInSeconds = 60;
        const minutesPassed = Math.floor(secondsPassed / oneMinuteInSeconds);
        const oneHourInMinutes = 60;
        const hoursPassed = Math.floor(minutesPassed / oneHourInMinutes);
        const oneDayInHours = 24;
        const daysPassed = Math.floor(hoursPassed / oneDayInHours);
        const oneMonthInDays = 30;
        const monthsPassed = Math.floor(daysPassed / oneMonthInDays);
        const oneYearInMonths = 12;
        const yearsPassed = Math.floor(monthsPassed / oneYearInMonths);

        if (secondsPassed === 0) return "now";
        if (secondsPassed < oneMinuteInSeconds)
            return secondsPassed === 1
            ? `1 second ago`
            : `${secondsPassed} seconds ago`;
        if (minutesPassed < oneHourInMinutes)
            return minutesPassed === 1
            ? `1 minutes ago`
            : `${minutesPassed} minutes ago`;
        if (hoursPassed < oneDayInHours)
            return minutesPassed === 1 ? `1 hour ago` : `${hoursPassed} hours ago`;
        if (daysPassed < oneMonthInDays)
            return daysPassed === 1 ? `1 day ago` : `${daysPassed} days ago`;
        if (monthsPassed < oneYearInMonths)
            return daysPassed === 1 ? `1 month ago` : `${monthsPassed} months ago`;
        return yearsPassed === 1 ? "1 year ago" : `${yearsPassed} years ago`;
    }
}
