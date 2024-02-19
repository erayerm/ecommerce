import Description from "../layouts/Description";
import AdditionalInformation from "../layouts/AdditionalInformation";
import Reviews from "../layouts/Reviews";
import { useState } from "react";


export default function ProductDetails() {
    const [activeTab, setActiveTab] = useState('description');

    const handleTab = (event) => {
        setActiveTab(event.target.id);
    }

    return (
        <section className='w-screen'>
            <div className="max-w-page-content mx-auto flex flex-col">
                <div className='flex justify-center text-center'>
                    <a id="description" className={"product-tabs " + (activeTab === 'description' ? 'text-primary-blue font-bold' : '')} onClick={handleTab}>
                        Description
                    </a>
                    <a id="additional" className={"product-tabs " + (activeTab === 'additional' ? 'text-primary-blue font-bold' : '')} onClick={handleTab}>
                        Additional Information
                    </a>
                    <a id="reviews" className={"product-tabs " + (activeTab === 'reviews' ? 'text-primary-blue font-bold' : '')} onClick={handleTab}>
                        Reviews <span className="font-primary-blue font-bold">(0)</span>
                    </a>
                </div>
                <hr className="h-[2px] border-0 mb-5 bg-[#ECECEC]" />
                <div className="pb-10">
                    <div>
                        {
                            {
                                'description': <Description />,
                                'additional': <AdditionalInformation />,
                                'reviews': <Reviews />
                            }[activeTab]
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}