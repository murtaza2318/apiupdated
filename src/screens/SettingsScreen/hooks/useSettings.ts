import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { AuthStackNavigationType } from '../../../utils/types/NavigationTypes';

export type SettingsSectionType = 
  | 'account'
  | 'notifications'
  | 'privacy'
  | 'logout'
  | 'privacyPolicy'
  | 'acknowledgments'
  | 'terms'
  | 'digitalServices';

interface UseSettingsReturn {
  selectedSection: SettingsSectionType | null;
  versionDetails: string;
  updateDetails: string;
  handleSectionPress: (section: SettingsSectionType) => void;
  handleBackPress: () => void;
}

const useSettings = (): UseSettingsReturn => {
  const [selectedSection, setSelectedSection] = useState<SettingsSectionType | null>(null);
  
  // Mock data for demonstration
  const [versionDetails] = useState<string>('v1.2.3 (Build 456)');
  const [updateDetails] = useState<string>('Latest version available');
  const navigation = useNavigation<NavigationProp<AuthStackNavigationType>>();
  
  const handleSectionPress = (section: SettingsSectionType): void => {
    setSelectedSection(section);
    
    // Handle navigation or actions based on section
    switch (section) {
      case 'account':
        navigation.navigate("GeneralSettings");
        break;
      case 'notifications':
        navigation.navigate("Notification");
        break;
      case 'privacy':
        console.log('Navigate to Privacy Choices');
        break;
      case 'logout':
        console.log('Handle Logout');
        break;
      case 'privacyPolicy':
        console.log('Navigate to Privacy Policy');
        break;
      case 'acknowledgments':
        console.log('Navigate to Acknowledgments');
        break;
      case 'terms':
        console.log('Navigate to Terms of Service');
        break;
      case 'digitalServices':
        console.log('Navigate to Digital Services Act');
        break;
      default:
        break;
    }
  };

  const handleBackPress = (): void => {
    console.log('Navigate back');
  };

  return {
    selectedSection,
    versionDetails,
    updateDetails,
    handleSectionPress,
    handleBackPress,
  };
};

export default useSettings;