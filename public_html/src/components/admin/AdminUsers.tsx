import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { AdminUser } from '../../types';
import { UserPlus, Trash2, Shield, Edit } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNotificationStore } from '../../stores/notificationStore';
import ConfirmDialog from '../common/ConfirmDialog';
import LoadingSpinner from '../common/LoadingSpinner';
import UserModal from './UserModal';

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const { t } = useTranslation();
  const addNotification = useNotificationStore((state) => state.addNotification);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      addNotification('error', t('admin.users.fetchError'));
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (user: AdminUser) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const confirmDelete = (id: string) => {
    setUserToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  async function handleDelete() {
    if (!userToDelete) return;

    try {
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', userToDelete);

      if (error) throw error;
      
      setUsers(users.filter(user => user.id !== userToDelete));
      addNotification('success', t('admin.users.deleteSuccess'));
    } catch (error) {
      console.error('Error deleting user:', error);
      addNotification('error', t('admin.users.deleteError'));
    } finally {
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  }

  const handleSave = async (userData: Partial<AdminUser>) => {
    try {
      if (editingUser) {
        const { error } = await supabase
          .from('admin_users')
          .update(userData)
          .eq('id', editingUser.id);

        if (error) throw error;
        addNotification('success', t('admin.users.updateSuccess'));
      } else {
        const { error } = await supabase
          .from('admin_users')
          .insert(userData);

        if (error) throw error;
        addNotification('success', t('admin.users.createSuccess'));
      }

      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
      addNotification('error', t('admin.users.saveError'));
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('admin.users.title')}</h1>
        <button 
          onClick={handleAdd}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md flex items-center space-x-2"
        >
          <UserPlus className="h-4 w-4" />
          <span>{t('admin.users.addNew')}</span>
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-yellow-500" />
                    <h3 className="text-lg font-medium">{user.email}</h3>
                  </div>
                  <p className="text-gray-600">{t(`admin.users.roles.${user.role}`)}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => confirmDelete(user.id)}
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

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        user={editingUser}
      />

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title={t('admin.users.confirmDelete.title')}
        message={t('admin.users.confirmDelete.message')}
      />
    </div>
  );
} 