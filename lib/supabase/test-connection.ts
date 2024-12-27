import { supabase } from './client';

export async function testConnection() {
  try {
    const { data, error } = await supabase.from('profiles').select('count');
    if (error) {
      console.error('خطأ في الاتصال بقاعدة البيانات:', error.message);
      return false;
    }
    console.log('تم الاتصال بقاعدة البيانات بنجاح');
    return true;
  } catch (error) {
    console.error('خطأ غير متوقع:', error);
    return false;
  }
} 