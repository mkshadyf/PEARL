import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { ActivityLog as ActivityLogType } from '../../types';
import { Clock, User } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';
import { useTranslation } from 'react-i18next';

export default function ActivityLog() {
  const [activities, setActivities] = useState<ActivityLogType[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetchActivities();
  }, []);

  async function fetchActivities() {
    try {
      const { data, error } = await supabase
        .from('activity_logs')
        .select('*, users:user_id(email)')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">{t('admin.dashboard.recentActivity')}</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                {activity.details}
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>
                  {new Date(activity.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 