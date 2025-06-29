import { useEffect, useState } from 'react'
import { Heading } from '../components/Heading'
import { InputBox } from '../components/InputBox'
import axios from 'axios'

export const SendMoney = ({ firstname, lastname, id }) => {
  const [amount, setAmount] = useState('');
  const [showVideo, setShowVideo] = useState(false);

  async function handle_TransferMoney() {
    if (isNaN(parseInt(amount))) {
      alert("Please enter a valid number for the amount");
      return; 
    }
    try {
      const response = await axios.post("http://localhost:3000/api/v1/account/transfer", {
        to: id,
        amount: amount
      }, {
        headers: {
          authorization: localStorage.getItem('token'),
        }
      });
      if (response.status == 200) {
        setShowVideo(true);
      } else if (response.status == 422) {
        alert("error")
      }
    } catch (error) {
      if (error.response) {
        alert(`Transaction failed: ${error.response.status} ${error.response.statusText}`);
      } else {
        alert(`Transaction failed: ${error.message}`);
      }
    }
  }

  return (

    <div className="">
      {showVideo ? (
        <video
          autoPlay
          muted
          playsInline
          className="mt-4 rounded-md w-96"
        >
          <source src="/successfull.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (<div className="bg-white w-100 rounded-md shadow-xl/30 ">
        <Heading Label={'Send Money'} />
        <span className="flex gap-2 items-center pt-14 pl-10">
          <div className="bg-green-500 w-12 h-12 font-semibold rounded-full leading-[46px] text-2xl text-white text-center">
            {firstname[0].toUpperCase()}
          </div>
          <p className="font-semibold  text-2xl">{firstname} {lastname}</p>
        </span>
        <p className="font-semibold pl-10 pt-4 -mb-3">Amount</p>
        <InputBox onChange={e => {
          setAmount(e.target.value);
        }} placeholder={'Enter Amount'} />
        <button onClick={() => {
          handle_TransferMoney()
        }} className='bg-green-500 text-white mb-8 cursor-pointer hover:bg-green-800 font-normal ml-10 mt-5 w-79 h-9 rounded-sm'>Initiate Transfer</button>
      </div>
      )}

    </div>

  )
}