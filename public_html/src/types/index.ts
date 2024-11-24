export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
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