"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth, UserType } from "@/./contexts/AuthContext";
import { useStorageContext } from "@/contexts/storageContext";
import { industryOptions } from "@/app/constants/industryOptions";
import Image from "next/image";

import "../../../../app/globals.css";
import SkillsButton from "@/app/student/profile/onboarding/SelectDropdown";
import Button3 from "@/app/user/Components/Button3";
import FormAlert from "@/app/Components/FormAlert";

interface SetUpCompanyProfileFormProps {
  step: number;
  setStep: (step: number) => void;
}

export default function SetUpCompanyProfileForm({ step, setStep }: SetUpCompanyProfileFormProps) {
  const router = useRouter();
  
  const { user, updateProfile, loading, error, clearError } = useAuth();
  const [profile_picture, setProfilePicture] = useState<File | null>(null);
  const [phone_number, setPhoneNumber] = useState<string>("");
  const [company_name , setCompanyName] = useState<string>("");
  const [company_reg_num, setCompanyRegNum] = useState<string>("");
  const [company_industry, setIndustry] = useState<string[]>([]);
  const [company_description, setDescription] = useState<string>("");
  const [company_address1, setAddress1] = useState<string>("");
  const [company_address2, setAddress2] = useState<string>("");
  const [company_city, setCity] = useState<string>("");
  const [company_state, setCompanyState] = useState<string>("");
  const [company_website, setCompanyWebsite] = useState<string>("");
  const [company_size, setCompanySize] = useState<string[]>([]);
  const [company_linkedin, setCompanyLinkedin] = useState<string>("");
  const [company_facebook, setCompanyFacebook] = useState<string>("");
  const [company_twitter, setCompanyTwitter] = useState<string>("");
  const [company_instagram, setInstagram ] = useState<string>("");
  const [formError, setFormError] = useState("");
  const { uploadFile } = useStorageContext();
  const [setLoading] = useState("");

  const handleIndustrySelect = (value: string) => {
    setIndustry((prev) => [...prev, value]);
  };

  const handleSizeSelect = (value: string) => {
    setCompanySize((prevSize) => {
      const newSize = [...prevSize, value];
      return newSize;
    });
  };
      
  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
    }
  };
      
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    clearError();
    // setLoading(true);

    let profilePictureUrl = "";

    if (profile_picture) {
      const uploadResult = await uploadFile(profile_picture);
      if (uploadResult && typeof uploadResult === "object" && uploadResult !== null && "file_url" in uploadResult) {
        profilePictureUrl = uploadResult.file_url;
      } else {
        setFormError("Failed to upload profile picture.");
      }
    }
      
    try {
      if (!user?.id || !user?.email) {
        setFormError("User ID or email is missing.");
        return;
      }   
      
      const userData = {
        id: user.id,
        email: user.email,
        userType: "company" as UserType,
        company_name,
        company_reg_num,
        phone_number,
        company_address1,
        company_address2,
        company_city,
        company_state,
        company_website,
        company_size: company_size.join(", "),
        company_linkedin,
        company_facebook,
        company_twitter,
        company_instagram,
        company_description,
        company_industry: company_industry.join(", "),
        profile_picture: profilePictureUrl || undefined,
      };
      
      await updateProfile(userData);
    } catch (err: any) {
      // Form-specific errors are set here
      setFormError(err.message || "Update profile failed.");
    }
  };

  const options = [
    { value: "1-10",   label:"1-10 employees" },
    { value: "11-50",  label: "11-50 employees" },
    { value: "51-200", label: "51-200 employees" },
    { value: "200+",   label: "200+ employees" },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-start">
      
      {(formError || error) && (
        <FormAlert
          message={(formError || error) ?? ""}
          type="error"
          duration={5000}
          onClose={() => {
            if (formError) {
              setFormError("");
            } else {
              clearError();
            }
          }}
        />
      )}
      
      {step === 1 && (
        <div>
          <div
            className="mx-auto h-[150px] w-[150px] mb-[12px] rounded-[100%] border-[1px] border-Gold3 bg-GoldenWhite"
          >
            <label htmlFor="profile-picture-upload" className="cursor-pointer">
              {profile_picture ? (
                <Image
                  src={URL.createObjectURL(profile_picture)}
                  alt="Profile Picture"
                  className="h-full w-full rounded-[100%] object-cover"
                  width={150}
                  height={150}
                />
              ) : (
                <Image
                  src="/Images/profile-default.png"
                  alt=""
                  className="h-full w-full rounded-[100%] object-cover"
                  width={150}
                  height={150}
                />
              )}
            </label>
            <input
              id="profile-picture-upload"
              type="file"
              accept=".jpg,.jpeg,.png"
              className="hidden"
              onChange={handleProfilePictureChange}
            />
          </div>
          <input
            placeholder="Enter your company name"
            value={company_name}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
          />
          <input
            placeholder="Company registration number"
            value={company_reg_num}
            onChange={(e) => setCompanyRegNum(e.target.value)}
            className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
          />
          <div className="mb-[12px] flex justify-start border-b-2 border-Gray1">
            <h1 className="p-[10px] font-sans text-[21px]/[120%] text-Gray1">
          Sector/Industry
            </h1>
          </div>
          <SkillsButton options={industryOptions} selectedSkills={company_industry} onSelect={handleIndustrySelect} text="Type or select your business sector*" />
          <input
            placeholder="Tell us a little bit about the company (Note: Applicants will be able to 
see this information when the apply for internships)*"
            value={company_description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-[12px] h-[100px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
          />

          <div className="mb-[12px] flex justify-start border-b-2 border-Gray1">
            <h1 className="p-[10px] font-sans text-[21px]/[120%] text-Gray1">
          Location
            </h1>
          </div>
          <input
            placeholder="Address 1"
            value={company_address1}
            onChange={(e) => setAddress1(e.target.value)}
            className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
          />
          <input
            placeholder="Address 2"
            value={company_address2}
            onChange={(e) => setAddress2(e.target.value)}
            className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
          />
          <input
            placeholder="State"
            value={company_city}
            onChange={(e) => setCity(e.target.value)}
            className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
          />
          <input
            placeholder="Country"
            value={company_state}
            onChange={(e) => setCompanyState(e.target.value)}
            className="mb-[80px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
          />

          <Button3 text="Proceed" className="text-[16px] font-normal" type="button" onClick={() => {
            setStep(2);
          }} />
        </div>
      )}
      {step === 2 && (
        <div>
          <div className="mb-[12px] flex justify-start border-b-2 border-Gray1">
            <h1 className="p-[10px] font-sans text-[21px]/[120%] text-Gray1">
          Contact Information
            </h1>
          </div>
          <input
            placeholder="Phone number"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
          />
          <input
            placeholder="Website url"
            value={company_website}
            onChange={(e) => setCompanyWebsite(e.target.value)}
            className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
          />

          <div className="mb-[12px] flex justify-start border-b-2 border-Gray1">
            <h1 className="p-[10px] font-sans text-[21px]/[120%] text-Gray1">
          Company Size
            </h1>
          </div>
          <SkillsButton options={options} selectedSkills={company_size} onSelect={handleSizeSelect} text="Type or Select your skills (You can select up to 5)" />

          <div className="mb-[12px] flex justify-start border-b-2 border-Gray1">
            <h1 className="p-[10px] font-sans text-[21px]/[120%] text-Gray1">
          Social link
            </h1>
          </div>
          <input
            placeholder="LinkedIn"
            value={company_linkedin}
            onChange={(e) => setCompanyLinkedin(e.target.value)}
            className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
          />
          <input
            placeholder="Facebook"
            value={company_facebook}
            onChange={(e) => setCompanyFacebook(e.target.value)}
            className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
          />
          <input
            placeholder="X(Twitter)"
            value={company_twitter}
            onChange={(e) => setCompanyTwitter(e.target.value)}
            className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
          />
          <input
            placeholder="Instagram"
            value={company_instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className="mb-[80px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
          />
          <Button3 text="Create Profile" className="text-[16px] font-normal" type="submit" loading={loading} disabled={loading} />
        </div>
      )}

      <div className="mb-[100px]"></div>
    </form>
  );
}
