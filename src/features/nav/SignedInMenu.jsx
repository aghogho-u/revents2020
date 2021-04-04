import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { signOutFirebase } from '../../app/firestore/firebaseService';
//import { signOutUser } from '../auth/authActions';

export default function SignedInMenu() {
  //const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.auth);
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
      <Image avatar spaced='right' src={currentUser.photoURL || '/assets/user.png'} />
      <Dropdown pointing='top left' text={currentUser.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to='/createEvent' text='Create Event' icon='plus' />
          <Dropdown.Item as={Link} to='/AccountPage' text='Account' icon='setting' />
          <Dropdown.Item text='My Profile' icon='user' />
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
