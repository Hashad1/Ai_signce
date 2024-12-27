export function validateWhatsApp(number: string): boolean {
  // Support international format with optional spaces after country code
  const whatsappRegex = /^\+\d{1,3}[\s-]?\d{9,}$/;
  return whatsappRegex.test(number.trim());
}

export function formatWhatsApp(number: string): string {
  // Remove spaces and hyphens, ensure proper format
  return number.trim().replace(/[\s-]/g, '');
}