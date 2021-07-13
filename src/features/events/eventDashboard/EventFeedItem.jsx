import {formatDistance} from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import { Feed } from 'semantic-ui-react';

export default function EventFeedItem({ post }) {
  let summary;
  switch (post.code) {
    case 'Joined_Event':
      summary = (
        <>
          <Link to={`/profile/${post.userUid}`}>{post.displayName}</Link> has signed up to{' '}
          <Link to={`/events/${post.eventId}`}>{post.title}</Link>
        </>
      );
      break;
    case 'Left_Event':
      summary = (
        <>
          <Link to={`/profile/${post.userUid}`}>{post.displayName}</Link> has cancelled{' '}
          <Link to={`/events/${post.eventId}`}>{post.title}</Link>
        </>
      );
      break;
    default:
        summary = 'Something went wrong';
      break;
  }

  return (
      <Feed.Event>
          <Feed.Label image={post.photoURL} />
          <Feed.Content >
              <Feed.Date>{formatDistance(new Date(post.date), new Date())} ago </Feed.Date>
              <Feed.Summary> {summary} </Feed.Summary>
          </Feed.Content>
      </Feed.Event>
  )
}
