"use client";

interface ContactItem {
  label: string;
  value: string;
}

const phoneNumbers: ContactItem[] = [
  { label: "البحرين", value: "+973 354 33011" },
  { label: "السعودية", value: "+966 555 016119" },
  { label: "مصر", value: "+201 111 366082" },
];

export function ContactInfo() {
  return (
    <div className="space-y-4 text-white/80">
      <div className="space-y-2">
        <h4 className="font-semibold text-white">للتواصل:</h4>
        {phoneNumbers.map((phone) => (
          <p key={phone.label} className="flex items-center gap-2">
            <span className="text-primary">{phone.label}:</span>
            <span dir="ltr">{phone.value}</span>
          </p>
        ))}
      </div>
      <p>
        <span className="text-primary">البريد الإلكتروني:</span>{" "}
        <a 
          href="mailto:info@fateenai.com" 
          className="hover:text-primary transition-colors"
          dir="ltr"
        >
          info@fateenai.com
        </a>
      </p>
    </div>
  );
}