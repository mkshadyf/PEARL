import { supabase } from '../lib/supabase';

export async function logActivity(
  userId: string,
  action: string,
  entityType: 'service' | 'message' | 'user',
  entityId: string,
  details: string
) {
  try {
    const { error } = await supabase.from('activity_logs').insert({
      user_id: userId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      details,
    });

    if (error) throw error;
  } catch (error) {
    console.error('Error logging activity:', error);
  }
} 