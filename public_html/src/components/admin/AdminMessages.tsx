import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { ContactMessage } from '../../types';
import { Mail, MailOpen, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  }

  async function markAsRead(id: number) {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ read: true })
        .eq('id', id);

      if (error) throw error;
      setMessages(messages.map((msg: ContactMessage) => 
        msg.id === id ? { ...msg, read: true } : msg
      ));
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  }

  async function handleDelete(id: number) {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setMessages(messages.filter((msg: ContactMessage) => msg.id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('admin.messages.title')}</h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {messages.map((message: ContactMessage) => (
              <li key={message.id} className={`px-6 py-4 ${!message.read ? 'bg-yellow-50' : ''}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      {message.read ? (
                        <MailOpen className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Mail className="h-5 w-5 text-yellow-500" />
                      )}
                      <h3 className="text-lg font-medium">{message.name}</h3>
                    </div>
                    <p className="text-gray-600">{message.email}</p>
                    <p className="mt-2">{message.message}</p>
                  </div>
                  <div className="flex space-x-2">
                    {!message.read && (
                      <button
                        onClick={() => markAsRead(message.id)}
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        Mark as Read
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(message.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 