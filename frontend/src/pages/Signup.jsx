import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { ButtonWarning } from "../components/ButtonWarning";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export default function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  async function handle_signupBackend() {
    try {
      const response = await axios.post("https://paytm-project-d2r3.onrender.com/api/v1/user/signup", {
        firstName,
        lastName,
        username,
        password
      })
      console.log(response.status)
      if (response.status == 200) {
        localStorage.setItem('token', `Bearer ${response.data.token}`);
        navigate('/dashboard');
      } else {
        alert('wrong behaviour');
      }
    }catch(error){
         if(error.response){
            alert(`Signup failed: ${error.response.status} ${error.response.statusText}`);
         }else{
            alert(`Signup failed: ${error.message}`);
         }
    }
  }

  return (
    <div className="bg-zinc-500 h-screen w-full grid justify-center items-center">
      <div className="bg-white w-100 h-135 rounded-md">
        <Heading Label={'Signup'} />
        <Subheading Label={'Enter Your Imformation to create account'} />

        <InputBox onChange={e => {
          setFirstName(e.target.value);
        }} Label={'First Name'} placeholder={'John'} />

        <InputBox onChange={e => {
          setLastName(e.target.value);
        }} Label={'Last Name'} placeholder={'Doe'} />

        <InputBox onChange={e => {
          setUserName(e.target.value);
        }} Label={'Email'} placeholder={'Johndoe@gmail.com'} />

        <InputBox onChange={e => {
          setPassword(e.target.value);
        }} Label={'Password'} placeholder={''} />

        <Button Label={'Signup'} onClick={() => {
          handle_signupBackend()
        }} />
        <ButtonWarning Label={'Already have an account?'} ButtonLabel={'Login'} to={'/signin'} />
      </div>
    </div>
  );
}
