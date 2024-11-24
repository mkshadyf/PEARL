import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Service } from '../../types';
import { X } from 'lucide-react';

interface ServiceModalProps {
  service?: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Service>) => Promise<void>;
}

export default function ServiceModal({ service, isOpen, onClose, onSave }: ServiceModalProps) {
  const [formData, setFormData] = useState<Partial<Service>>({
    title: '',
    description: '',
    icon: '',
    order: 0
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (service) {
      setFormData(service);
    } else {
      setFormData({
        title: '',
        description: '',
        icon: '',
        order: 0
      });
    }
  }, [service]);

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
            {service ? t('admin.services.edit') : t('admin.services.add')}
          </h2>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields */}
        </form>
      </div>
    </div>
  );
} 