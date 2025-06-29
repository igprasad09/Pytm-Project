import { useState } from "react"
import { Button } from "../components/Button"
import { ButtonWarning } from "../components/ButtonWarning"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Subheading } from "../components/Subheading"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  function handle_sign() {
    try {
      axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password
      })
        .then(res => {
          navigate('/dashboard');
          localStorage.setItem('token', 'Bearer ' + res.data.token);
        })
        .catch(err => {
          if (err.response && err.response.status === 411) {
            alert("User Not Exists");
          } else {
            console.error(err);
            alert("Something went wrong");
          }
        });
    } catch (error) {
      if (error.response) {
        alert(`Signin failed: ${error.response.status} ${error.response.statusText}`);
      } else {
        alert(`Signin failed: ${error.message}`);
      }
    }
  }
  return (
    <div className="bg-zinc-500 h-screen w-full grid justify-center items-center">
      <div className="bg-white w-100  rounded-md">
        <Heading Label={'Sign in'} />
        <Subheading Label={'Enter Your Credentials to access your account'} />

        <InputBox onChange={(e) => {
          setUsername(e.target.value)
        }} Label={'Email'} placeholder={'Johndoe@gamil.com'} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value);
        }} Label={'Password'} placeholder={''} />

        <Button onClick={() => {
          handle_sign()
        }} Label={'Sign in'} />
        <ButtonWarning Label={"Don't have account?"} ButtonLabel={'Create Account'} to={'/signup'} />
      </div>
    </div>
  )
}
