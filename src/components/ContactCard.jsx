import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function ContactCard({ data }) {

    return (
        <div className={`w-[327px] bg-[#${data.bgColor}] flex flex-col items-center py-20  text-center text-[#${data.textColor}] gap-4 font-bold`}>
            <FontAwesomeIcon icon={data.iconName} className='text-[72px] text-blue' />
            <p className='text-sm leading-6'>{data.text1}</p>
            <p>{data.text2}</p>
            <div>
                <button className={`py-[15px] px-9 bg-transparent border-[1px] rounded-[37px] border-blue text-blue text-sm leading-6`}>{data.buttonText}</button>
            </div>

        </div>
    )
}