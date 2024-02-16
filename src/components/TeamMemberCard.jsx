import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function TeamMemberCard({ data }) {

    return (
        <div className="w-[316px] flex flex-col items-center">
            <div className="w-full">
                <img src={data.img} />
            </div>
            <div className="flex flex-col gap-2.5 py-[30px] text-center">
                <p className="text-main font-bold leading-6 ">{data.username}</p>
                <p className="text-sm text-main leading-6]">{data.profession}</p>
                <div className="flex gap-5 text-primary-blue text-[24px]">
                    <FontAwesomeIcon icon="fa-brands fa-facebook" />
                    <FontAwesomeIcon icon="fa-brands fa-instagram" />
                    <FontAwesomeIcon icon="fa-brands fa-twitter" />
                </div>
            </div>
        </div>
    )
}