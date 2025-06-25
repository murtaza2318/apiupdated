import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Profile {
  id: string;
  name: string;
  title: string;
  description: string;
  distance: string;
  rating: number;
  reviewCount: number;
  repeatClients: number;
  price: number;
  profileImage: string; // Change from `any` to `string` if it's coming from API
  availabilityUpdated: string;
  isStarSitter?: boolean;
}

export const useBoardingSearching = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Profile[]>('http://192.168.100.6:5260/api/Sitters');
      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const refreshProfiles = () => {
    fetchProfiles();
  };

  return {
    profiles,
    loading,
    refreshProfiles,
  };
};
