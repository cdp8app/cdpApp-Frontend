"use client";

import ClientWrapper from "@/app/Components/ClientWrapper";
import NotificationToast from "../Components/NotificationToast";
import NotificationDemo from "../Components/NotificationDemo";

interface Props {
  children: React.ReactNode;
}

export default function ClientRootLayout({ children }: Props) {
  return (
    <ClientWrapper>
      {children}
      <NotificationToast />
      <NotificationDemo />
    </ClientWrapper>
  );
}
