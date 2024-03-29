import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Segment, Header, Comment } from 'semantic-ui-react';
import { firebaseObjectToArray, getEventChatRef } from '../../../app/firestore/firebaseService';
import EventDetailedChatForm from './EventDetailedChatForm';
import { listenToEventChat } from './../eventActions';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';
import { CANCEL_CHAT } from '../eventsConstants';
import { createDataTree } from '../../../app/common/util/util';

export default function EventDetailedChat({ eventId }) {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.event);
  const {authenticated } = useSelector(state => state.auth);
  const [showReplyForm, setShowReplyForm] = useState({ open: false, commentId: null });

  function handleCloseReply() {
    setShowReplyForm({ open: false, commentId: null });
  }

  useEffect(() => {
    getEventChatRef(eventId).on('value', (snapshot) => {
      if (!snapshot.exists()) return;
      dispatch(listenToEventChat(firebaseObjectToArray(snapshot.val()).reverse()));
    });
    return () => {
      dispatch({ type: CANCEL_CHAT });
      getEventChatRef().off();
    };
  }, [eventId, dispatch]);

  return (
    <>
      <Segment textAlign='center' attached='top' inverted color='teal' style={{ border: 'none' }}>
        <Header>{authenticated ? 'Chat about this event' : 'Sign in to view and comment'}</Header>
      </Segment>
{authenticated &&
      <Segment attached>
        <EventDetailedChatForm eventId={eventId} parentId={0} closeForm={setShowReplyForm} />
        {createDataTree(comments).map((comment) => (
          <Comment.Group key={comment.id}>
            <Comment>
              <Comment.Avatar src={comment.photoURL || '/assets/user.png'} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistance(comment.date, new Date())}</div>
                </Comment.Metadata>
                <Comment.Text>
                  {comment.text.split('\n').map((text, i) => (
                    <span key={i}>
                      {text}
                      <br />
                    </span>
                  ))}
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action
                    onClick={() => setShowReplyForm({ open: true, commentId: comment.id })}
                  >
                    Reply
                  </Comment.Action>
                  {showReplyForm.open && showReplyForm.commentId === comment.id && (
                    <EventDetailedChatForm
                      eventId={eventId}
                      parentId={comment.id}
                      closeForm={handleCloseReply}
                    />
                  )}
                </Comment.Actions>
              </Comment.Content>

              {comment.childNodes.length > 0 && (
                <Comment.Group>
                  {comment.childNodes.reverse().map((child) => (
                    <Comment key={child.id}>
                      <Comment.Avatar src={child.photoURL || '/assets/user.png'} />
                      <Comment.Content>
                        <Comment.Author as={Link} to={`/profile/${child.uid}`}>
                          {child.displayName}
                        </Comment.Author>
                        <Comment.Metadata>
                          <div>{formatDistance(child.date, new Date())}</div>
                        </Comment.Metadata>
                        <Comment.Text>
                          {child.text.split('\n').map((text, i) => (
                            <span key={i}>
                              {text}
                              <br />
                            </span>
                          ))}
                        </Comment.Text>
                        <Comment.Actions>
                          <Comment.Action
                            onClick={() => setShowReplyForm({ open: true, commentId: child.id })}
                          >
                            Reply
                          </Comment.Action>
                          {showReplyForm.open && showReplyForm.commentId === child.id && (
                            <EventDetailedChatForm
                              eventId={eventId}
                              parentId={child.parentId}
                              closeForm={handleCloseReply}
                            />
                          )}
                        </Comment.Actions>
                      </Comment.Content>
                    </Comment>
                  ))}
                </Comment.Group>
              )}
            </Comment>
          </Comment.Group>
        ))}
      </Segment>}
    </>
  );
}
