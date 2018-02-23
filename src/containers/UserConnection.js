import {connect} from 'react-redux';
import UserConnectionComponent from '../components/UserConnection';

const mapStateToProps = state => {
	return  {
    user : state.user.get('user')
	};
}

const UserConnection = connect(
  mapStateToProps,
  null
)(UserConnectionComponent)


export default UserConnection;
