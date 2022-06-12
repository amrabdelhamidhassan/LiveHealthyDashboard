import '../styles/components/Header.css';
import '../styles/global.css';
import '../constants/colors.css';
import { store } from '../store/store';
import { useDispatch } from 'react-redux';
import { loginAction } from '../server/UserServices';
import logo from '../images/mainicon.png'
function Header() {
    const dispatch=useDispatch();
    const loginUserToStore = async (user) => dispatch(loginAction(user))
    const logOut=()=>
    {
        loginUserToStore(null)
        window.location.reload();
        }
    return(
    <div class='Header '>
        <img src={logo} className="Header-logo" alt="logo" />
        <div>
            <p className='Header-title MainHeaderTheme '>
                 Live Healthy DashBoard
            </p>
        </div>
        {store.getState().userReducer.user!=null &&
          <button className='globalButton MainHeaderBackgroundMainTheme' onClick={logOut}>
            Logout
        </button>}
    </div>
    )
}
export default Header;