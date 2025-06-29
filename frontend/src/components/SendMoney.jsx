import {Heading} from '../components/Heading'
import {InputBox} from '../components/InputBox'

export const SendMoney = ({firstname, lastname}) =>{
      return(
         <div className="bg-white w-100 rounded-md shadow-xl/30 ">
              <Heading Label={'Send Money'}/>
              <span className="flex gap-2 items-center pt-14 pl-10">
                  <div className="bg-green-500 w-12 h-12 font-semibold rounded-full leading-[46px] text-2xl text-white text-center">
                    {firstname[0].toUpperCase()}
                </div>
                <p className="font-semibold  text-2xl">{firstname} {lastname}</p>
              </span>
              <p className="font-semibold pl-10 pt-4 -mb-3">Amount</p>
              <InputBox placeholder={'Enter Amount'}/>
              <button className='bg-green-500 text-white mb-8 cursor-pointer hover:bg-green-800 font-normal ml-10 mt-5 w-79 h-9 rounded-sm'>Initiate Transfer</button>
         </div>
      )
}