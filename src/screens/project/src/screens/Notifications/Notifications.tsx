import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { Separator } from "../../components/ui/separator";
import { Switch } from "../../components/ui/switch";

// Define notification settings data for better organization and mapping
const emailSettings = [
  {
    id: "email-notifications",
    title: "Send me an email when I get a new message or request",
    description: "Send me an email when I get a new message\nor request",
  },
  {
    id: "marketing-emails",
    title: "Receive marketing emails from Velvet Leash Co.",
    description: "Receive marketing emails from Velvet Leash Co.",
  },
];

const smsSettings = [
  {
    id: "sms-general",
    title: "Text/SMS Notifications",
    description:
      "We recommend keeping these messages on so we\ncan provide you the best service.",
  },
  {
    id: "sms-messages",
    title: "Message Notifications",
    description: "Send me a text message when I get a new\nmessage or request.",
  },
  {
    id: "new-inquiries",
    title: "New Inquiries",
    description: "Text me when I receive a new message or request.",
  },
  {
    id: "new-messages",
    title: "New Messages",
    description:
      "Text me all my Velvet Leash Co messages after the\ninitial request.",
  },
  {
    id: "booking-request",
    title: "New Booking Request",
    description: "Text me when I have a new Velvet Leash Co\nbooking request.",
  },
  {
    id: "booking-declined",
    title: "Booking Declined",
    description: "Text me when a new Velvet Leash Co is confirmed.",
  },
  {
    id: "mms-support",
    title: "MMS Message Support",
    description:
      "By enabling MMS support, text message can\ninclude sound, images, and video.",
  },
  {
    id: "quiet-hours",
    title: "Quiet Hours",
    description:
      "Would you like to delay delivery of nighttime\ntext messages until the following morning?",
  },
  {
    id: "marketing-sms",
    title: "Marketing Messages",
    description: "Receive marketing text message from Velvet\nLeash Co.",
  },
];

export const Notifications = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-[375px] relative">
        {/* Header */}
        <header className="sticky top-0 z-10 w-full bg-white shadow-[0px_4px_4px_#00000026] py-6">
          <div className="flex items-center px-6">
            <button className="w-5 h-5">
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <h1 className="text-base text-[#404348] font-normal font-['Poppins',Helvetica] mx-auto">
              Settings
            </h1>
          </div>
        </header>

        <div className="px-6 pt-8 pb-16">
          {/* Title */}
          <h2 className="font-['Poppins',Helvetica] font-medium text-[#404348] text-xl mb-6">
            Notifications
          </h2>

          {/* Email Section */}
          <div className="mb-6">
            <h3 className="font-['Poppins',Helvetica] font-medium text-[#404348] text-xs mb-3">
              Email
            </h3>

            <div className="space-y-4">
              {emailSettings.map((setting, index) => (
                <div key={setting.id}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-['Poppins',Helvetica] font-medium text-[#a9a59f] text-[10px] leading-[12.8px]">
                      {setting.description}
                    </p>
                    <Switch id={setting.id} />
                  </div>
                  {index < emailSettings.length - 1 && (
                    <Separator className="my-2" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Text/SMS Section */}
          <div className="mt-6">
            <h3 className="font-['Poppins',Helvetica] font-medium text-[#404348] text-xs mb-3">
              Text/SMS
            </h3>

            <div className="space-y-4">
              {smsSettings.map((setting, index) => (
                <div key={setting.id}>
                  {setting.title !== "Text/SMS Notifications" &&
                    setting.title !== "Message Notifications" &&
                    setting.title !== "Marketing Messages" && (
                      <h4 className="font-['Poppins',Helvetica] font-medium text-[#404348] text-[10px] leading-[12.8px] mb-1">
                        {setting.title}
                      </h4>
                    )}
                  <div className="flex items-center justify-between mb-1">
                    <p
                      className={`font-['Poppins',Helvetica] font-medium ${setting.id === "marketing-sms" ? "text-[#404348]" : "text-[#a9a59f]"} text-[10px] leading-[12.8px]`}
                    >
                      {setting.description}
                    </p>
                    <Switch id={setting.id} />
                  </div>
                  {index < smsSettings.length - 1 && (
                    <Separator className="my-2" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Legal Text */}
          <div className="mt-4 text-[10px] leading-[12.8px] font-['Poppins',Helvetica] font-medium">
            <p className="text-[#a9a59f]">
              By enabling mobile notifications, you&apos;re saying it&apos;s
              okay for us to send you service-related and promotional text
              messages, include auto-dialed. you can adjust these settings on
              this page anytime. receiving promotional messages is not a
              condition to use th Velvet Leash Co Service. reply HELP for help
              and STOP to Unsubscribe. Message frequency varies. Message and
              date rates may apply. For more, see our{" "}
              <span className="text-[#8f9e73] underline">Terms of service</span>{" "}
              and{" "}
              <span className="text-[#8f9e73] underline">
                Privacy Statement.
              </span>
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="fixed bottom-4 left-0 right-0 flex justify-center">
            <div className="w-[132px] h-1 bg-[#a9a59f] rounded-[15px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
