import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { AdminUser } from '../../types';
import { X } from 'lucide-react';

interface UserModalProps {
  user?: AdminUser | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<AdminUser>) => Promise<void>;
}

export default function UserModal({ user, isOpen, onClose, onSave }: UserModalProps) {
  const [formData, setFormData] = useState<Partial<AdminUser>>({
    email: '',
    role: 'editor'
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({
        email: '',
        role: 'editor'
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {user ? t('admin.users.edit') : t('admin.users.add')}
          </h2>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('admin.users.form.email')}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('admin.users.form.role')}
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            >
              <option value="editor">{t('admin.users.roles.editor')}</option>
              <option value="admin">{t('admin.users.roles.admin')}</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              {t('admin.users.form.cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 rounded-md"
            >
              {t('admin.users.form.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 