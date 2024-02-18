import { memberDataBig } from "../mock/memberData";
import TeamMemberCard from "../components/TeamMemberCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Team() {

    return (
        <>
            <section className="w-screen flex flex-col items-center py-[50px] gap-4">
                <p className="font-bold leading-6 text-gray">WHAT WE DO</p>
                <h2 className="font-bold leading-20 text-6xl text-main">Innovation tailored for you</h2>
                <div className="flex items-center gap-4">
                    <p className="text-sm text-main">Home</p>
                    <p className="text-gray font-thin text-4xl">{">"}</p>
                    <p className="text-sm text-gray">Team</p>
                </div>
            </section>

            <section className="w-screen">
                <div className="mx-auto max-w-[1440px] flex flex-wrap gap-3">
                    <div className="flex-[2]">
                        <img src="./img/team-3.svg" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 flex justify-between flex-wrap gap-3">
                        <img src="./img/team-1.svg" className="object-cover flex-1" />
                        <img src="./img/team-4.svg" className="object-cover flex-1" />
                    </div>
                    <div className="flex-1 flex justify-between flex-wrap gap-3">
                        <img src="./img/team-2.svg" className="object-cover flex-1" />
                        <img src="./img/team-5.svg" className="object-cover flex-1" />
                    </div>
                </div>
            </section>

            <section className="w-screen">
                <div className="max-w-page-content mx-auto flex flex-col pb-[112px]">
                    <div className="py-[112px] text-center">
                        <h2 className="font-bold text-[40px] leading-[50px]">Meet Our Team</h2>
                    </div>
                    <div className="flex flex-wrap gap-x-[30px] gap-y-[112px]">
                        {memberDataBig.map((item, index) => {
                            return <TeamMemberCard key={index} data={item} />
                        })}
                    </div>
                </div>
            </section>

            <section className="w-screen py-[80px]">
                <div className="max-w-page-content mx-auto flex flex-col gap-[30px] items-center">
                    <h4 className="text-main text-[40px] leading-[50px]">Start your 14 days free trial</h4>
                    <p className="text-gray text-sm leading-5 text-center w-[406px]">Met minim Mollie non desert Alamo est sit cliquey dolor
                        do met sent. RELIT official consequent.</p>
                    <div>
                        <button className="px-10 py-4 bg-primary-blue rounded text-white">Try it free now</button>

                    </div>
                    <div className="p-2.5 flex gap-[34px]">
                        <FontAwesomeIcon className="text-[30px] text-[#55ACEE]" icon="fa-brands fa-twitter" />
                        <FontAwesomeIcon className="text-[30px] text-[#395185]" icon="fa-brands fa-facebook" />
                        <FontAwesomeIcon className="text-[30px] text-black" icon="fa-brands fa-instagram" />
                        <FontAwesomeIcon className="text-[30px] text-[#0A66C2]" icon="fa-brands fa-linkedin" />
                    </div>
                </div>
            </section>
        </>
    )
}