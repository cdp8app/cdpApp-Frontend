"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Header1 from "@/app/Components/Header1";
import Button7 from "@/app/user/Components/Button7";
import Footer1 from "@/app/Components/Footer1";
import Logout from "@/app/user/auth/logout/page";
import { Offer, useOfferContext } from "@/contexts/offerContext";
import FormAlert from "@/app/Components/FormAlert";

export default function CompanyOfferDetails() {
  const params = useParams();
  const router = useRouter();

  const offerId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [offer, setOffer] = useState<Offer | null>(null);
  const { getOffersById, updateOffer, loading, error } = useOfferContext();

  const [formError, setFormError] = useState("");

  useEffect(() => {
    const fetchOfferDetails = async () => {
      if (offerId) {
        const offer = await getOffersById(offerId);
        if (offer) {
          setOffer(offer);
        }
      }
    };
      
    fetchOfferDetails();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="p-[2%]">
        <Header1 />
        {loading ? (
          <div className="flex items-center justify-center my-[120px]">
            <p className="text-Gold1 font-sans text-[20px]/[120%]">Loading...</p>
          </div>
        ) : (
          <>
            <div className="mb-[80px] flex w-[100%] flex-row justify-between rounded-[30px]">
              <div className="flex w-[20%] flex-col items-center space-y-[200px] py-[1%]">
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-[16px] h-[134px] w-[134px] rounded-[67px] bg-Red1"></div>
                  <h1 className="mb-[6px] text-center font-sans text-[27px]/[120%] font-bold">
                    {offer?.employer?.company_name}
                  </h1>
                  <h1 className="mb-[21px] font-sans text-[12px]/[120%] font-normal text-Gray2">
                    {offer?.employer?.company_industry}
                  </h1>
                  <Button7
                    text="View Profile"
                    className="text-[12px]/[120%] font-normal"
                  />
                </div>
                <Logout/>
              </div>
              <div className="w-[75%]">
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
                <h1 className="mb-[21px] font-sans text-[36px]/[120%] text-Gold1">
              Offer information
                </h1>
                {offer?.status === "pending" && (
                  <div className="flex w-[111px] flex-row items-center rounded-[8px] bg-Yellow2 px-[16px] py-[8px]">
                    <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Yellow1"></div>
                    <p className="font-sans text-[16px]/[120%] font-normal text-Yellow1">
                Pending
                    </p>
                  </div>
                )}
                {offer?.status === "rejected" && (
                  <div className="flex w-[115px] flex-row items-center rounded-[8px] bg-Red2 px-[16px] py-[8px]">
                    <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Red1"></div>
                    <p className="font-sans text-[16px]/[120%] font-normal text-Red1">
                Rejected
                    </p>
                  </div>
                )}
                {offer?.status === "accepted" && (
                  <div className="flex w-[123px] flex-row items-center rounded-[8px] bg-Green2 px-[16px] py-[8px]">
                    <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Green1"></div>
                    <p className="font-sans text-[16px]/[120%] font-normal text-Green1">
                Accepted
                    </p>
                  </div>
                )}
                {offer?.status === "interview" && (
                  <div className="flex w-[123px] flex-row items-center rounded-[8px] bg-BlueB1 bg-opacity-15 px-[16px] py-[8px]">
                    <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-BlueB1"></div>
                    <p className="font-sans text-[16px]/[120%] font-normal text-BlueB1">
                Interview
                    </p>
                  </div>
                )}

                {offer?.status === "pending" && (
                  <button onClick={() => router.back()} className="mt-[21px] rounded-[999px] border-[2px] border-PriGold px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-PriGold">
              Return to applications
                  </button>
                )}
                {offer?.status === "interview" && (
                  <button className="mt-[21px] rounded-[999px] border-[2px] border-PriGold px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-PriGold">
              Interview Schedule
                  </button>
                )}
                {offer?.status === "rejected" && (
                  <button className="mt-[21px] rounded-[999px] border-[2px] border-PriGold px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-PriGold">
              Interview Schedule
                  </button>
                )}
                {offer?.status === "accepted" && (
                  <button className="mt-[21px] rounded-[999px] border-[2px] border-PriGold px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-PriGold">
              Start Internship
                  </button>
                )}

                <div className="mt-[21px] flex w-[80%] flex-col">
                  <div>
                    <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  ROLE:
                    </h1>
                    <p className="font-sans text-[16px]/[120%] text-Black2">
                      {offer?.job?.title}
                    </p>
                  </div>
                  <div className="mt-[21px]">
                    <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  LOCATION:
                    </h1>
                    <p className="font-sans text-[16px]/[120%] text-Black2">
                      {offer?.job?.location}
                    </p>
                  </div>
                  <div className="mt-[21px]">
                    <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  DESCRIPTION:
                    </h1>
                    <p className="font-sans text-[16px]/[120%] text-Black2">
                      {offer?.job?.description}
                    </p>
                  </div>
                  <div className="mt-[21px]">
                    <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  REQUIREMENTS:
                    </h1>
                    <p className="font-sans text-[16px]/[120%] text-Black2">
                      {offer?.job?.requirements}
                    </p>
                  </div>
                  <div className="mt-[21px]">
                    <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  DURATION:
                    </h1>
                    <p className="font-sans text-[16px]/[120%] text-Black2">
                      {offer?.job?.deadline}
                    </p>
                  </div>
                </div>
                {offer?.status === "rejected" && (
                  <div className="mt-[21px] flex flex-row">
                    <button className="rounded-[999px] bg-gradient-to-r px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite">
                Return to offers
                    </button>
                  </div>
                )}
                {offer?.status === "accepted" && (
                  <div className="mt-[21px] flex flex-row">
                    <button className="mr-[18px] rounded-[999px] border-[2px] border-Red1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-Red1">
                End Internship
                    </button>
                    <button className="rounded-[999px] bg-gradient-to-r px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite">
                Start Internship
                    </button>
                  </div>
                )}
                {offer?.status === "pending" && (
                  <div className="mt-[21px] flex flex-row">
                    <button className="mr-[18px] rounded-[999px] border-[2px] border-Red1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-Red1">
                Decline interview
                    </button>
                    <button className="rounded-[999px] bg-gradient-to-r px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite">
                Interview schedule
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer1 />
    </div>
  );
}
