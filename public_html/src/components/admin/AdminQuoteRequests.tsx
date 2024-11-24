import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { QuoteRequest } from '../../types';
import { FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNotificationStore } from '../../stores/notificationStore';
import LoadingSpinner from '../common/LoadingSpinner';

export default function AdminQuoteRequests() {
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const addNotification = useNotificationStore((state) => state.addNotification);

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('quote_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching quote requests:', error);
      addNotification('error', t('admin.quotes.fetchError'));
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: number, status: QuoteRequest['status']) {
    try {
      const { error } = await supabase
        .from('quote_requests')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      setRequests(requests.map(req => 
        req.id === id ? { ...req, status } : req
      ));
      addNotification('success', t('admin.quotes.statusUpdateSuccess'));
    } catch (error) {
      console.error('Error updating quote request:', error);
      addNotification('error', t('admin.quotes.statusUpdateError'));
    }
  }

  const getStatusIcon = (status: QuoteRequest['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'reviewed':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('admin.quotes.title')}</h1>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {requests.map((request) => (
            <li key={request.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <h3 className="text-lg font-medium">{request.name}</h3>
                      <p className="text-sm text-gray-500">{request.email} • {request.phone}</p>
                    </div>
                  </div>

                  {request.company && (
                    <p className="text-sm text-gray-600">
                      <strong>{t('quote.form.company')}:</strong> {request.company}
                    </p>
                  )}

                  <div>
                    <strong className="text-sm text-gray-600">
                      {t('quote.form.serviceType')}:
                    </strong>
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {t(`quote.services.${request.service_type}`)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600">
                    <strong>{t('quote.form.projectDetails')}:</strong>
                    <br />
                    {request.project_details}
                  </p>

                  {request.budget_range && (
                    <p className="text-sm text-gray-600">
                      <strong>{t('quote.form.budgetRange')}:</strong> {request.budget_range}
                    </p>
                  )}

                  {request.timeline && (
                    <p className="text-sm text-gray-600">
                      <strong>{t('quote.form.timeline')}:</strong> {request.timeline}
                    </p>
                  )}

                  <p className="text-sm text-gray-500">
                    {new Date(request.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="ml-6">
                  <div className="flex items-center space-x-2 mb-4">
                    {getStatusIcon(request.status)}
                    <span className="text-sm font-medium capitalize">
                      {t(`admin.quotes.status.${request.status}`)}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => updateStatus(request.id, 'approved')}
                      className="w-full px-3 py-1 text-sm text-white bg-green-600 hover:bg-green-700 rounded-md"
                      disabled={request.status === 'approved'}
                    >
                      {t('admin.quotes.approve')}
                    </button>
                    <button
                      onClick={() => updateStatus(request.id, 'rejected')}
                      className="w-full px-3 py-1 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md"
                      disabled={request.status === 'rejected'}
                    >
                      {t('admin.quotes.reject')}
                    </button>
                    <button
                      onClick={() => updateStatus(request.id, 'reviewed')}
                      className="w-full px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                      disabled={request.status === 'reviewed'}
                    >
                      {t('admin.quotes.markReviewed')}
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 