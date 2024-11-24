import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { Partner } from '../../types';
import { Plus, Edit, Trash2, Link } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNotificationStore } from '../../stores/notificationStore';
import PartnerModal from './PartnerModal';
import ConfirmDialog from '../common/ConfirmDialog';
import LoadingSpinner from '../common/LoadingSpinner';

export default function AdminPartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState<number | null>(null);
  const { t } = useTranslation();
  const addNotification = useNotificationStore((state) => state.addNotification);

  useEffect(() => {
    fetchPartners();
  }, []);

  async function fetchPartners() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('order', { ascending: true });

      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      console.error('Error fetching partners:', error);
      addNotification('error', t('admin.partners.fetchError'));
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingPartner(null);
    setIsModalOpen(true);
  };

  const confirmDelete = (id: number) => {
    setPartnerToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  async function handleDelete() {
    if (!partnerToDelete) return;

    try {
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', partnerToDelete);

      if (error) throw error;
      
      setPartners(partners.filter(partner => partner.id !== partnerToDelete));
      addNotification('success', t('admin.partners.deleteSuccess'));
    } catch (error) {
      console.error('Error deleting partner:', error);
      addNotification('error', t('admin.partners.deleteError'));
    } finally {
      setIsDeleteDialogOpen(false);
      setPartnerToDelete(null);
    }
  }

  const handleSave = async (partnerData: Partial<Partner>) => {
    try {
      if (editingPartner) {
        const { error } = await supabase
          .from('partners')
          .update(partnerData)
          .eq('id', editingPartner.id);

        if (error) throw error;
        addNotification('success', t('admin.partners.updateSuccess'));
      } else {
        const { error } = await supabase
          .from('partners')
          .insert(partnerData);

        if (error) throw error;
        addNotification('success', t('admin.partners.createSuccess'));
      }

      setIsModalOpen(false);
      fetchPartners();
    } catch (error) {
      console.error('Error saving partner:', error);
      addNotification('error', t('admin.partners.saveError'));
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('admin.partners.title')}</h1>
        <button 
          onClick={handleAdd}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>{t('admin.partners.addNew')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <div key={partner.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
              <img 
                src={partner.logo_url} 
                alt={partner.name}
                className="h-32 w-full object-contain mb-4"
              />
              <h3 className="text-lg font-semibold">{partner.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{partner.description}</p>
              {partner.website_url && (
                <a
                  href={partner.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-2 text-yellow-600 hover:text-yellow-700"
                >
                  <Link className="h-4 w-4 mr-1" />
                  <span className="text-sm">{t('partners.visitWebsite')}</span>
                </a>
              )}
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => handleEdit(partner)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => confirmDelete(partner.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <PartnerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        partner={editingPartner}
      />

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title={t('admin.partners.confirmDelete.title')}
        message={t('admin.partners.confirmDelete.message')}
      />
    </div>
  );
} 