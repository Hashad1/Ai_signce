import { supabase } from './client';

export async function seedDatabase() {
  try {
    console.log('بدء إضافة البيانات التجريبية...');

    // إنشاء مستخدم تجريبي
    const { data: authUser, error: authError } = await supabase.auth.signUp({
      email: 'test@example.com',
      password: 'password123',
    });

    if (authError) throw authError;

    // إنشاء الملف الشخصي للمستخدم
    const { error: profileError } = await supabase.from('profiles').insert({
      id: authUser.user?.id,
      username: 'test_user',
      full_name: 'مستخدم تجريبي',
    });

    if (profileError) throw profileError;

    // إنشاء محادثة تجريبية
    const { data: chat, error: chatError } = await supabase
      .from('chats')
      .insert({
        user_id: authUser.user?.id,
        title: 'محادثة تجريبية',
      })
      .select()
      .single();

    if (chatError) throw chatError;

    // إضافة رسائل تجريبية
    const messages = [
      {
        chat_id: chat.id,
        role: 'user',
        content: 'م��حباً! هذه رسالة تجريبية.',
      },
      {
        chat_id: chat.id,
        role: 'assistant',
        content: 'أهلاً بك! كيف يمكنني مساعدتك اليوم؟',
      },
      {
        chat_id: chat.id,
        role: 'user',
        content: 'هل يمكنك مساعدتي في تعلم البرمجة؟',
      },
      {
        chat_id: chat.id,
        role: 'assistant',
        content: 'بالتأكيد! سأكون سعيداً بمساعدتك في رحلة تعلم البرمجة. هل هناك لغة برمجة معينة تريد البدء بها؟',
      },
    ];

    const { error: messagesError } = await supabase
      .from('messages')
      .insert(messages);

    if (messagesError) throw messagesError;

    console.log('تم إضافة البيانات التجريبية بنجاح!');
    return true;
  } catch (error) {
    console.error('خطأ في إضافة البيانات التجريبية:', error);
    return false;
  }
} 