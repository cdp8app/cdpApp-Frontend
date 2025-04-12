// components/BackgroundImageComponent.tsx
import React from "react";

const ProfileImageComponent: React.FC = () => {
  return (
    <div className="bg-cover bg-center h-screen" style={{ backgroundImage: "url('../../../public/Images/profileImage.png')" }}>
      <div className="flex items-center justify-center h-full">
        <h1 className="text-white text-4xl">Welcome to My Page</h1>
      </div>
    </div>
  );
};

export default ProfileImageComponent;
