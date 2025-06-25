import { useState } from 'react';

export const emailSettingsList = [
  {
    id: "email-notifications",
    title: "Send me an email when I get a new message or request",
    description: "Send me an email when I get a new message or request",
  },
  {
    id: "marketing-emails",
    title: "Receive marketing emails from Velvet Leash Co.",
    description: "Receive marketing emails from Velvet Leash Co.",
  },
];

export const smsSettingsList = [
  {
    id: "sms-general",
    title: "Text/SMS Notifications",
    description: "We recommend keeping these messages on so we can provide you the best service.",
  },
  {
    id: "sms-messages",
    title: "Message Notifications",
    description: "Send me a text message when I get a new message or request.",
  },
  {
    id: "new-inquiries",
    title: "New Inquiries",
    description: "Text me when I receive a new message or request.",
  },
  {
    id: "new-messages",
    title: "New Messages",
    description: "Text me all my Velvet Leash Co messages after the initial request.",
  },
  {
    id: "booking-request",
    title: "New Booking Request",
    description: "Text me when I have a new Velvet Leash Co booking request.",
  },
  {
    id: "booking-declined",
    title: "Booking Declined",
    description: "Text me when a new Velvet Leash Co is confirmed.",
  },
  {
    id: "mms-support",
    title: "MMS Message Support",
    description: "By enabling MMS support, text message can include sound, images, and video.",
  },
  {
    id: "quiet-hours",
    title: "Quiet Hours",
    description: "Would you like to delay delivery of nighttime text messages until the following morning?",
  },
  {
    id: "marketing-sms",
    title: "Marketing Messages",
    description: "Receive marketing text message from Velvet Leash Co.",
  },
];

export function useNotificationSettings() {
  const [emailToggles, setEmailToggles] = useState({
    'email-notifications': false,
    'marketing-emails': false,
  });
  const [smsToggles, setSmsToggles] = useState({
    'sms-general': false,
    'sms-messages': false,
    'new-inquiries': false,
    'new-messages': false,
    'booking-request': false,
    'booking-declined': false,
    'mms-support': false,
    'quiet-hours': false,
    'marketing-sms': false,
  });

  const handleEmailToggle = (id: string) => {
    setEmailToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const handleSmsToggle = (id: string) => {
    setSmsToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return {
    emailToggles,
    smsToggles,
    handleEmailToggle,
    handleSmsToggle,
    emailSettingsList,
    smsSettingsList,
  };
} 