import '../styles/screens/Login.css'
import '../constants/colors.css'
import '../styles/global.css'
import { useState ,useEffect} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { store } from '../store/store';
import { useNavigate  } from "react-router-dom";
import { auth,firebase } from '../server/firebase';
import { checkIfHasRoleApi ,loginApi,loginAction} from '../server/UserServices';
import { useSelector, useDispatch } from 'react-redux';

function Login() {
    const dispatch=useDispatch();
    const [isAuth,setisAuth]=useState(false)
    const navigate = useNavigate();
    const [final, setfinal] = useState('');
    const loginUserToStore = async (user) => dispatch(loginAction(user))
    useEffect(()=>
    {
        
        if(store.getState().userReducer)
              if(store.getState().userReducer.user!=null)
              {
                  navigate('/home')
              }
    },[])
    const checkAuthority=async(Phone)=>
    {   //****TODO */
        const response=await checkIfHasRoleApi(Phone);
        if(response)
        {
          if(response.data)
          {
            setisAuth(true)
            // let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
            // await auth.signInWithPhoneNumber('+2'+Phone, verify).then((result) => {
            //     setfinal(result);
            //     alert("code sent")
            // })
          }
          else
          {
              alert('user not authorized check with admin')
          }
        }
        else
        {
          alert('user with this number  has no authentication')

        }

        
        //****TODO */

    }
    const login=async(Phone,Code)=>
    {   console.log(final)
    // let verifiycody=ValidateOtp(Code);
    // if(verifiycody)
    // {
    //   console.log('code',verifiycody)
       const User = await loginApi(Phone)
       console.log('outuser',User)
       await loginUserToStore(User)
       window.location.reload();
       // }
    // else
    // {
      console.log('here3')
    // }


    }
    const ValidateOtp = (Code) => {
      if (Code === null || final === null)
          return false;
        console.log('code',Code)
      if(final.confirm(Code))
      {console.log('here2')
        return true
      }
  }
    const LoginSchema = yup.object({
        phone: yup.string().required("Phone is required").min(2, "Enter your Valid Phone Number")
    })
    const formik = useFormik({
        initialValues: {
          phone: '',
          verifiycode:''
        },
        validationSchema:LoginSchema
        ,
        onSubmit: values => {
          if(!isAuth)
            checkAuthority(values.phone)
          else
            {
              console.log('else')
                login(values.phone,values.verifiycode)
            }
           
        },
      });
      return (
        <form className='LoginWrapper'onSubmit={formik.handleSubmit}>
          <label className='loginLabel MainHeaderTheme' htmlFor="phone">Welcome To Live Healthy Application DashBoard Enter your Phone Number Please to Login</label>
        {!isAuth &&  <input className='LoginTextBox'
            id="phone"
            name="phone"
            type="text"
            placeholder='Enter Phone Number'
            onChange={formik.handleChange}
            value={formik.values.phone}
          />}
         {isAuth && <input className='LoginTextBox'
            id="verifiycode"
            name="verifiycode"
            type="text"
            placeholder='Enter Verification Code'
            onChange={formik.handleChange}
            value={formik.values.verifiycode}
          />}

          <button className="globalButton BackgroundMainThemeDark" type="submit">{isAuth?'Confirm Code':'Login'}</button>
          <div  className="globalButton"  id="recaptcha-container"></div>
          <p className='errorText'>{formik.touched && formik.errors.phone? formik.errors.phone:""}</p>
        </form>
      );
    };

export default Login