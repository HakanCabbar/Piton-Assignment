import Image from "next/image";
import image from '../images/Picture.png';
import logo from '../images/Logo.png';
import { useRouter } from 'next/router';
import { useState,useEffect } from "react";

const BASE_URL = "https://assign-api.piton.com.tr/api/rest";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const [rememberMe, setRememberMe] = useState(false);
  
  const router = useRouter();

  function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  async function handleLogin() {

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!email || !password) { 
      setErrorMessage("Lütfen e-posta ve şifre alanlarını doldurun.")
      return
    }
    else if (!emailPattern.test(email)) {
      setErrorMessage("Lütfen geçerli bir e-posta adresi girin.")
      return
    }
    const loginInfo = {
      email: email,
      password: password
    };
    
    const req = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(loginInfo)
    });
    
    const res = await req.json();
    
    if (res.action_login && res.action_login.token) {
      var token = res.action_login.token;
      localStorage.setItem("token", token);
      const id = parseJwt(token)
      console.log(id)
      const userId = id['https://hasura.io/jwt/claims']['x-hasura-user-id'];
      localStorage.setItem('userId', userId);

      if (rememberMe) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }

      router.push('./home');
    } else if (res.message) { 
      setErrorMessage(res.message)
    } else {
      setErrorMessage("Bir hata oluştu. Lütfen tekrar deneyin.")
    }
  }

    return (
    <div className="lg:flex sm:flex-wrap ">
     <div className=" lg:w-2/4 sm:w-full hidden lg:block  h-fit ">
        <Image
        className="lg:w-full h-screen"
        src={image}
        alt = 'design'
        />
      </div>

      <div className="lg:w-2/4 sm:w-full flex-wrap  text-center">
        <Image
        className="m-auto mt-12 w-20"
        src={logo}
        alt = 'logo'
        onClick={()=> router.push('./home')}
        />
        <br/>
        {errorMessage && (
        <div className="text-red-500 my-2">{errorMessage}</div>
      )}
        <h4 className="lg:text-gray-400 text-xl text-center">Welcome back!</h4>
        <h4 className=" mr-4 text-4xl text-center text-[#090937 font-bold font-[Manrope]]">Login to your account</h4>
        <br/>
        <label className=" text-lg mr-80 font-semibold font-[Manrope] text-[#090937] non-italic">E-mail</label>
        <br/>
        <br/>
        <input type={"email"}
         className=" h-16 w-96 bg-[#F4F4FF] pl-4 "
         placeholder="john@gmail.com"
         value={email}
         onChange={(e)=> setEmail(e.target.value)}
         />
        <br/>
        <br/>
        <label className="text-lg mr-[304px] font-semibold font-[Manrope] text-[#090937] non-italic" value={password} >Password</label>
        <br/>
        <br/>
        <input type={"password"}
         className=" h-16 w-96 bg-[#F4F4FF] pl-4 "
         placeholder="password"
         value={password}
         onChange={(e)=> setPassword(e.target.value)}
          />
        <br/>
        <br/>
        <div className="flex flex-nowrap items-center justify-start lg:ml-48 md:ml-64 ml-12">
        <input type='checkbox' className="border-[#6251DD] bg-[#6251DD]" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}/> <span  className=" font-bold font-[Manrope] ml-2  text-sm text-[#6251DD]">Remember Me</span>
        </div>
        <br/>
        <button className=" bg-orange-600 mt-4 h-16 w-96 text-white text-2xl rounded font-[Manrope]" onClick={()=> handleLogin()} >Login</button>
        <br/>
        <button className=" bg-white mt-4 mb-2 h-16 w-96 text-indigo-600 text-2xl border-indigo-600 border-2 rounded font-[Manrope]" onClick={()=> router.push('./register')}>Register</button>
      </div>
      <br/>
    </div>
    )
  }
  