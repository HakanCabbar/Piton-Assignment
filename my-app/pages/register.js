import Image from "next/image"
import image from '../images/Picture.png'
import logo from '../images/Logo.png'
import { useRouter } from 'next/router'
import { useState } from "react"

export default function Register() {

  const BASE_URL = "https://assign-api.piton.com.tr/api/rest"

  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('');

  async function handleRegister() {

    if (!name || !email || !password) {
      setMessage("Tüm alanlar zorunludur.");
      return;
    }

    if (!/^[a-zA-Z0-9]{6,20}$/.test(password)) {
      setMessage("Şifre 6-20 karakter arası ve alfanumerik olmalıdır.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Lütfen geçerli bir e-posta adresi girin.");
      return;
    }
  
    const registerInfo = {
      name: name,
      email: email,
      password: password
    };
  
    const req = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(registerInfo)
    });
  
    const res = await req.json();

    if (res.action_register) {

      setMessage("Kaydınız başarılı şekilde oluşturuldu.");
    } else {

      setMessage(res.action_register.error);
    }  
   
  }

  return (
    <div className="lg:flex sm:flex-wrap ">
      <div className="lg:w-2/4 sm:w-full hidden lg:block  h-fit ">
        <Image
          alt=""
          className="lg:w-full h-screen"
          src={image}
        />
      </div>

      <div className="lg:w-2/4 sm:w-full flex-wrap  text-center">
        <Image
          alt=""
          className="m-auto mt-4 w-20"
          src={logo}
          onClick={() => router.push('./home')}
        />
        <br/>
        {message && (
          <div className={message.startsWith("Kaydınız başarılı") ? "text-green-500 my-2" : "text-red-500 my-2"}>{message}</div>
        )}
        <h4 className="lg:text-gray-400 text-xl text-center">Welcome back!</h4>
        <h4 className=" mr-4 text-3xl text-center text-[#090937 font-bold font-[Manrope]]">Register to your account</h4>
        <br/>
        <form >
          <label className=" text-lg mr-80 font-semibold font-[Manrope] text-[#090937] non-italic">Name</label>
          <br/>
          <input
           type={"name"}
           autoFocus = {true}
           required = {true}
           className=" h-16 w-96 bg-[#F4F4FF] pl-4 "
           value={name}
           onChange={(e) => setName (e.target.value)}
           placeholder="Name"
           />
           <br/>
            <br/>
            <label className=" text-lg mr-80 font-semibold font-[Manrope] text-[#090937] non-italic">E-mail</label>
            <br/>
            <input type={"email"}
              onChange={(e) => setEmail (e.target.value)}
              value = {email}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              className=" h-16 w-96 bg-[#F4F4FF] pl-4 "
              placeholder="john@gmail.com"
            />
             <br/>
             <br/>
              <label className="text-lg mr-[304px] font-semibold font-[Manrope] text-[#090937] non-italic" >Password</label>
              <br/>
              <input type={"password"}
               onChange={(e) => setPassword (e.target.value)}
               value = {password}
               className=" h-16 w-96 bg-[#F4F4FF] pl-4 "
               placeholder="password"
              />
              <br/>
              <br/>
               <button type="button"
                className=" bg-orange-600 mt-4 h-16 w-96 text-white rounded text-2xl font-semibold font-[Manrope]"
                onClick={()=>handleRegister()}
                >Register
              </button>
                <br/>
                 <button className=" bg-white mt-4 mb-4 h-16 w-96 text-2xl font-semibold font-[Manrope] text-indigo-600 border-indigo-600 border-2 rounded" onClick={()=> router.push('./login')}
                  >Login
                 </button>    
        </form>
      </div>
    </div>
    )
    }