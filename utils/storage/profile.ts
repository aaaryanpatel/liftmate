import AsyncStorage from "@react-native-async-storage/async-storage";

export type Profile = {
  name: string;
  age?: number;
  weightKg?: number;
  goal?: string;
};

const k = (uid: string) => `lm_profile_${uid}`;

export async function getProfile(uid: string): Promise<Profile | null> {
  const v = await AsyncStorage.getItem(k(uid));
  return v ? (JSON.parse(v) as Profile) : null;
}

export async function saveProfile(uid: string, p: Profile) {
  await AsyncStorage.setItem(k(uid), JSON.stringify(p));
}

export async function clearProfile(uid: string) {
  await AsyncStorage.removeItem(k(uid));
}
