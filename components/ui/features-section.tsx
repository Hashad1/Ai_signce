import { BookOpen, Brain, Clock, Database, FileText, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";

const features = [
  {
    icon: BookOpen,
    title: "إرشاد كامل لجميع مراحل البحث",
    description: "من اختيار العنوان إلى صياغة التوصيات"
  },
  {
    icon: Database,
    title: "مصادر علمية موثوقة",
    description: "الوصول إلى قواعد بيانات متخصصة لدعم دراستك"
  },
  {
    icon: FileText,
    title: "تنسيق مرجعي أوتوماتيكي",
    description: "تسهيل إنشاء المراجع وفقًا للأنظمة الأكاديمية المختلفة"
  },
  {
    icon: Brain,
    title: "دقة وجودة عالية",
    description: "ضمان وضوح اللغة وترابط المحتوى"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}