import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { signOutFirebase } from '../../app/firestore/firebaseService';
//import { signOutUser } from '../auth/authActions';

export default function SignedInMenu() {
  //const dispatch = useDispatch();
  const {currentUserProfile} = useSelector(state => state.profile);
  const history = useHistory();

  async function handleSignOut(){
    try{
      history.push('/')
      await signOutFirebase();
    }catch(error){
      toast.error(error.message);
    }
  }

  return (
    <Menu.Item position='right'>
      <Image avatar spaced='right' src={currentUserProfile.photoURL || '/assets/user.png'} />
      <Dropdown pointing='top left' text={currentUserProfile.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to='/createEvent' text='Create Event' icon='plus' />
          <Dropdown.Item as={Link} to='/AccountPage' text='Account' icon='setting' />
          <Dropdown.Item as={Link} to={`/Profile/${currentUserProfile.id}`} text='My Profile' icon='user' />
          <Dropdown.Item
            onClick={handleSignOut}
            text='Sign Out'
            icon='power'
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}
