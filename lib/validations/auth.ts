import * as z from 'zod';

const emailSchema = z
  .string({
    required_error: 'يرجى إدخال البريد الإلكتروني',
    invalid_type_error: 'يجب أن يكون البريد الإلكتروني نصاً',
  })
  .min(1, 'البريد الإلكتروني مطلوب')
  .email('صيغة البريد الإلكتروني غير صحيحة')
  .max(255, 'البريد الإلكتروني طويل جداً')
  .trim()
  .toLowerCase();

const passwordSchema = z
  .string({
    required_error: 'يرجى إدخال كلمة المرور',
    invalid_type_error: 'يجب أن تكون كلمة المرور نصاً',
  })
  .min(1, 'كلمة المرور مطلوبة')
  .min(8, 'كلمة المرور قصيرة جداً - يجب أن تكون 8 أحرف على الأقل')
  .max(72, 'كلمة المرور طويلة جداً - يجب أن تكون أقل من 72 حرفاً')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    'كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير، رقم، ورمز خاص على الأقل'
  );

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  remember: z
    .boolean({
      required_error: 'يجب تحديد خيار تذكر تسجيل الدخول',
      invalid_type_error: 'يجب أن يكون خيار تذكر تسجيل الدخول صح أو خطأ',
    })
    .default(false)
    .optional(),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'كلمات المرور غير متطابقة',
  path: ['confirmPassword'],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

// رسائل الخطأ العامة
export const authErrors = {
  default: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى',
  invalidCredentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
  emailNotVerified: 'يرجى تأكيد بريدك الإلكتروني قبل تسجيل الدخول',
  tooManyRequests: 'لقد تجاوزت الحد المسموح به من المحاولات. يرجى المحاولة لاحقاً',
  serverError: 'حدث خطأ في الخادم. يرجى المحاولة لاحقاً',
  networkError: 'حدث خطأ في الاتصال. يرجى التحقق من اتصالك بالإنترنت',
  emailNotFound: 'لم يتم العثور على حساب بهذا البريد الإلكتروني',
  resetLinkExpired: 'انتهت صلاحية رابط إعادة تعيين كلمة المرور',
  resetLinkInvalid: 'رابط إعادة تعيين كلمة المرور غير صالح',
} as const; 