"use client";
import Footer1 from "@/app/Components/Footer1";
import Header1 from "@/app/Components/Header1";
import { useOfferContext } from "@/contexts/offerContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import FormAlert from "@/app/Components/FormAlert";

export default function CompanyOffersExtended() {
  const router = useRouter();
  
  const { getCompanyExtendOffers, loading, error } = useOfferContext();
  const [section, setSection] = useState(1);

  const handleSectionChange = (sectionNumber: number) => {
    setSection(sectionNumber);
  };

  const [offers, setOffers] = useState<{ title: string; status: string; results?: any[] }[]>([]);
  const [formError, setFormError] = useState("");
  
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const fetchedOffers = (await getCompanyExtendOffers()) ?? {};
      
        if (fetchedOffers && typeof fetchedOffers === "object" && Array.isArray((fetchedOffers as any)?.results)) {
          setOffers((fetchedOffers as any).results);
        }
      } catch (error) {
        setFormError(`Failed to fetch offers ${error}`);
      }
    };
    fetchOffers();
  }, []);
  
  const handleClick = (applicationId: number) => {
    router.push(`/company/applicant/${applicationId}`);
  };

  const filteredOffers = offers.filter((offer) => {
    if (section === 1) return true;
    if (section === 2) return offer.status === "accepted";
    if (section === 3) return offer.status === "pending";
    if (section === 4) return offer.status === "rejected";
    return false;
  });

  return (
    <div>
      <div className="mb-[100px] p-[1.5%]">
        <Header1 />
        <div className="px-[4%]">
          <div className="mb-[18px] border-b-[1px] border-Gold2">
            <button
              className="flex flex-row items-center py-[12px] font-sans text-[27px]/[120%] font-normal text-Gold1"
              onClick={() => router.back()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-8 text-Gold2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
              Offers Extended
            </button>
          </div>
          <div className="space-x-[16px]">
            <button
              onClick={() => handleSectionChange(1)}
              className={`w-[186px] rounded-[30px] px-[20px] py-[12px] font-sans text-[16px]/[120%] shadow-custom2 ${section === 1 ? "bg-Gold2" : "bg-GoldenWhite text-Gray2"}`}
            >
              All
            </button>
            <button
              onClick={() => handleSectionChange(2)}
              className={`w-[186px] rounded-[30px] px-[20px] py-[12px] font-sans text-[16px]/[120%] shadow-custom2 ${section === 2 ? "bg-Gold2" : "bg-GoldenWhite text-Gray2"}`}
            >
              Accepted
            </button>
            <button
              onClick={() => handleSectionChange(3)}
              className={`w-[186px] rounded-[30px] px-[20px] py-[12px] font-sans text-[16px]/[120%] shadow-custom2 ${section === 3 ? "bg-Gold2" : "bg-GoldenWhite text-Gray2"}`}
            >
              Pending
            </button>
            <button
              onClick={() => handleSectionChange(4)}
              className={`w-[186px] rounded-[30px] px-[20px] py-[12px] font-sans text-[16px]/[120%] shadow-custom2 ${section === 4 ? "bg-Gold2" : "bg-GoldenWhite text-Gray2"}`}
            >
              Denied
            </button>
          </div>
          {loading ? (
            <div className="flex items-center justify-center mt-[60px]">
              <p className="text-Gold1 font-sans text-[20px]/[120%]">Loading...</p>
            </div>
          ) : (
            <>
              {(formError || error) && (
                <FormAlert
                  message={(formError || error) ?? ""}
                  type="error"
                  duration={5000}
                  onClose={() => {
                    if (formError) {
                      setFormError("");
                    }
                  }}
                />
              )}
              <div className="mt-[20px]">
                {filteredOffers.map((offer: any, index: number) => (
                  <div key={index} className="flex w-[100%] flex-row items-center justify-between rounded-[18px] bg-GoldenWhite py-[16px] pl-[16px] pr-[55px] shadow-custom2">
                    <div className="flex flex-row items-center">
                      <div className="h-[127px] w-[127px] rounded-[12px] overflow-hidden bg-White">
                        {offer?.student_details?.profile_picture ? (
                          <CldImage
                            width="127"
                            height="127"
                            src={offer?.student_details?.profile_picture}
                            alt="Description of my image"
                          />
                        ) : (
                          <div className="h-[127px] w-[127px] rounded-[12px] bg-Gray3"></div>
                        )}
                      </div>
                      <div className="ml-[12px] flex flex-col">
                        <h1 className="mb-[6px] font-sans text-[16px]/[120%]">
                          {offer?.student_details?.full_name}
                        </h1>
                        <div className="flex flex-row items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6 text-Gray2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                            />
                          </svg>

                          <h1 className="font-sans text-[16px]/[120%] text-Gray2">
                            {offer?.student_details?.course}
                          </h1>
                        </div>
                        <button 
                          onClick={() => handleClick(offer?.application_details?.id)}
                          className="mt-[18px] flex w-[136px] flex-row items-center justify-center rounded-[999px] border-[2px] border-PriGold px-[20px] py-[10px] font-sans text-[12px]/[100%] font-normal text-PriGold">
                      View details
                        </button>
                      </div>
                    </div>
                    <div className={`flex flex-row items-center rounded-[8px] px-[16px] py-[8px] ${
                      offer.status === "accepted"
                        ? "bg-Green2"
                        : offer.status === "rejected"
                          ? "bg-Red2"
                          : "bg-Yellow2"
                    } px-[16px] py-[8px]`}>
                      <div className={`mr-[5px] h-[8px] w-[8px] rounded-[4px] ${
                        offer.status === "accepted"
                          ? "bg-Green1"
                          : offer.status === "rejected"
                            ? "bg-Red1"
                            : "bg-Yellow1"
                      }`}></div>
                      <p className={`font-sans text-[12px]/[120%] font-normal ${
                        offer.status === "accepted"
                          ? "text-Green1"
                          : offer.status === "rejected"
                            ? "text-Red1"
                            : "text-Yellow1"
                      }`}>
                        {offer.status === "accepted"
                          ? "Accepted"
                          : offer.status === "rejected"
                            ? "Rejected"
                            : "Pending"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer1 />
    </div>
  );
}
