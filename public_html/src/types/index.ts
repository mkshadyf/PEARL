export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  order: number;
  created_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

export interface ActivityLog {
  id: number;
  user_id: string;
  action: string;
  entity_type: 'service' | 'message' | 'user';
  entity_id: string;
  details: string;
  created_at: string;
}

export interface DashboardStats extends Record<string, number> {
  totalUsers: number;
  totalMessages: number;
  totalServices: number;
  unreadMessages: number;
  activeUsers: number;
}

export interface Notification {
  id: string;
  type: 'success' | 'error';
  message: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  category: 'mining' | 'construction' | 'logistics' | 'engineering';
  status: 'completed' | 'ongoing' | 'upcoming';
  client: string;
  location: string;
  start_date: string;
  end_date?: string;
  order: number;
  created_at: string;
}

export interface Partner {
  id: number;
  name: string;
  logo_url: string;
  website_url: string;
  description: string;
  category: 'client' | 'supplier' | 'collaborator';
  order: number;
  created_at: string;
}

export interface QuoteRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service_type: 'logistics' | 'drilling' | 'construction' | 'engineering' | 'other';
  project_details: string;
  budget_range?: string;
  timeline?: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  created_at: string;
} 