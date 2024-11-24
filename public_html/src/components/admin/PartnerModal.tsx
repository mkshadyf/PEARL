import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Partner } from '../../types';
import { X, Upload } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface PartnerModalProps {
  partner?: Partner | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Partner>) => Promise<void>;
}

export default function PartnerModal({ partner, isOpen, onClose, onSave }: PartnerModalProps) {
  const [formData, setFormData] = useState<Partial<Partner>>({
    name: '',
    description: '',
    logo_url: '',
    website_url: '',
    category: 'client',
    order: 0
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (partner) {
      setFormData(partner);
    } else {
      setFormData({
        name: '',
        description: '',
        logo_url: '',
        website_url: '',
        category: 'client',
        order: 0
      });
    }
  }, [partner]);

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `partner-logos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('partners')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('partners')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, logo_url: publicUrl }));
    } catch (error) {
      console.error('Error uploading logo:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (imageFile) {
      await handleImageUpload(imageFile);
    }
    await onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {partner ? t('admin.partners.edit') : t('admin.partners.add')}
          </h2>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('admin.partners.form.name')}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('admin.partners.form.description')}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('admin.partners.form.websiteUrl')}
            </label>
            <input
              type="url"
              value={formData.website_url}
              onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="https://"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('admin.partners.form.category')}
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as Partner['category'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            >
              <option value="client">{t('partners.categories.clients')}</option>
              <option value="supplier">{t('partners.categories.suppliers')}</option>
              <option value="collaborator">{t('partners.categories.collaborators')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('admin.partners.form.logo')}
            </label>
            <div className="mt-1 flex items-center space-x-4">
              {formData.logo_url && (
                <img
                  src={formData.logo_url}
                  alt={formData.name}
                  className="h-20 w-20 object-contain rounded-md"
                />
              )}
              <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                <Upload className="h-4 w-4 inline-block mr-2" />
                {t('admin.partners.form.uploadLogo')}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile(file);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData(prev => ({ ...prev, logo_url: reader.result as string }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              {t('admin.partners.form.cancel')}
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 rounded-md disabled:opacity-50"
            >
              {uploading ? t('admin.partners.form.uploading') : t('admin.partners.form.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 