import {connect} from 'react-redux';
import UserConnectionComponent from '../components/UserConnection';
import {setUser} from '../actions';
import {auth,provider} from '../firebase';

const mapStateToProps = state => {
	return  {
    user : state.user.get('user')
	};
}

const mapDispatchToProps = dispatch => {
	return {
    onLogin : () => {
			auth.signInWithPopup(provider)
	    .then((result) => {
	      setUser(result.user);
	    });
		},
		onLogout : () => {
			auth.signOut()
	        .then(() => {
	          setUser(null);
	        });
		}
	}
}

const UserConnection = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserConnectionComponent)


export default UserConnection;
