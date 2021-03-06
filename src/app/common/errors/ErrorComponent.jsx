import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';

export default function ErrorComponent(){
    const { error } = useSelector(state => state.async);
    return (
        <Segment placeholder >
            <Header content={error?.message || 'Not found, no error'} textAlign='center' />
            <Button as={Link} to="/events" content="Return to Events Page" primary style={{marginTop:20}} />

        </Segment>
    )
}