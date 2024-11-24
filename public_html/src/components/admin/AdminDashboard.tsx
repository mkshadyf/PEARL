import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { DashboardStats } from '../../types';
import { Users, MessageSquare, Settings } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';
import ActivityLog from './ActivityLog';

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalMessages: 0,
    totalServices: 0,
    unreadMessages: 0,
    activeUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const [
        { count: usersCount },
        { count: messagesCount },
        { count: servicesCount },
        { count: unreadCount },
      ] = await Promise.all([
        supabase.from('users').select('*', { count: 'exact' }),
        supabase.from('contact_messages').select('*', { count: 'exact' }),
        supabase.from('services').select('*', { count: 'exact' }),
        supabase.from('contact_messages').select('*', { count: 'exact' }).eq('read', false),
      ]);

      setStats({
        totalUsers: usersCount || 0,
        totalMessages: messagesCount || 0,
        totalServices: servicesCount || 0,
        unreadMessages: unreadCount || 0,
        activeUsers: 0, // You can implement this based on your needs
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Users</p>
              <h2 className="text-3xl font-bold">{stats.totalUsers}</h2>
            </div>
            <Users className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Messages</p>
              <h2 className="text-3xl font-bold">{stats.totalMessages}</h2>
            </div>
            <MessageSquare className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Services</p>
              <h2 className="text-3xl font-bold">{stats.totalServices}</h2>
            </div>
            <Settings className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Unread Messages</p>
              <h2 className="text-3xl font-bold">{stats.unreadMessages}</h2>
            </div>
            <MessageSquare className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </div>

      <ActivityLog />
    </div>
  );
} 