import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

const faqs = [
  {
    question: "هل يمكنني استخدام الأداة لجميع التخصصات؟",
    answer: "نعم، الأداة تناسب جميع التخصصات الأكاديمية والعلمية."
  },
  {
    question: "كيف تساعدني الأداة في كتابة المراجع؟",
    answer: "نوفر نظام توثيق تلقائي يدعم جميع الأساليب القياسية مثل APA وMLA."
  },
  {
    question: "هل الأداة مجانية؟",
    answer: "نقدم نسخة تجريبية مجانية مع خيارات للاشتراك بخطط مميزة."
  }
];

export function FAQSection() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-12">الأسئلة الشائعة</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-right">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-right">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}