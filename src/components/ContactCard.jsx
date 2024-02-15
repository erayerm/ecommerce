import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function ContactCard({ data, index }) {

    return (
        <div className={`w-[327px] flex flex-col items-center py-20  text-center gap-4 font-bold ` + (index === 1 ? "bg-main text-white" : "bg-white text-main")}>
            <FontAwesomeIcon icon={data.iconName} className='text-[72px] text-primary-blue' />
            <p className='text-sm leading-6'>{data.text1}</p>
            <p>{data.text2}</p>
            <div>
                <button className={`py-[15px] px-9 bg-transparent border-1 rounded-[37px] border-blue text-primary-blue text-sm leading-6`}>{data.buttonText}</button>
            </div>

        </div>
    )
}