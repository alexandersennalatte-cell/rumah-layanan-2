export type Language = 'id' | 'en';
export type Theme = 'light' | 'dark';

export type LandmarkCategory = 'heritage' | 'nature' | 'infrastructure' | 'culture' | 'energy' | 'civic';

export interface Landmark {
  id: string;
  name: string;
  nameEn: string;
  category: LandmarkCategory;
  description: string;
  descriptionEn: string;
  location: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  iconType: 'flame' | 'bridge' | 'building' | 'oil' | 'dam' | 'fruit' | 'culture' | 'park' | 'trophy' | 'farm' | 'water';
  highlight: string;
  highlightEn: string;
  historicalFact: string;
  historicalFactEn: string;
  image?: string;
  link?: string;
}

export interface LeaderInfo {
  id: 'bupati' | 'wakil_bupati';
  role: string;
  roleEn: string;
  name: string;
  fullTitle: string;
  image: string;
  quote: string;
  quoteEn: string;
  bio: string;
  bioEn: string;
  focusAreas: string[];
  focusAreasEn: string[];
  education: string[];
}

export type NavModuleId = 
  | 'pemerintahan' 
  | 'webgis' 
  | 'satudata' 
  | 'smartcity' 
  | 'pelayanan' 
  | 'cctv' 
  | 'transparansi';

export interface NavModule {
  id: NavModuleId;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  iconName: string;
}

export interface CCTVCamera {
  id: string;
  name: string;
  location: string;
  kecamatan: string;
  status: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE';
  streamUrl: string;
  trafficStatus: 'Lancar' | 'Ramai Lancar' | 'Padat';
  viewers: number;
}

export interface PublicServiceItem {
  id: string;
  name: string;
  nameEn: string;
  category: 'Adminduk' | 'Pajak' | 'Perizinan' | 'Kesehatan' | 'Sosial' | 'Ketenagakerjaan';
  opd: string;
  description: string;
  descriptionEn: string;
  processingTime: string;
  cost: string;
  onlineAvailable: boolean;
}

export interface ComplaintTicket {
  id: string;
  trackingCode: string;
  authorName: string;
  kecamatan: string;
  category: string;
  title: string;
  description: string;
  status: 'Diterima' | 'Diproses OPD' | 'Selesai Ditindaklanjuti';
  createdAt: string;
  updatedAt: string;
  adminResponse?: string;
}

export interface CitizenProfile {
  id: string;
  nik: string;
  fullName: string;
  email: string;
  phone: string;
  kecamatan: string;
  desa: string;
  savedServices: string[];
  favoriteCameras: string[];
  floodAlerts: boolean;
  scholarshipAlerts: boolean;
  taxReminders: boolean;
}

export interface AnalyticsStats {
  activeVisitors: number;
  todayVisits: number;
  totalComplaints: number;
  cctvViewsToday: number;
  serviceClicksToday: number;
  deviceShare: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  topServices: { name: string; count: number }[];
  liveActivities: {
    id: string;
    text: string;
    textEn: string;
    timeAgo: string;
    icon: string;
  }[];
}
