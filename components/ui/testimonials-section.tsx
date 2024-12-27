import { Card, CardContent, CardHeader } from "./card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const testimonials = [
  {
    name: "أحمد",
    role: "طالب دكتوراه",
    content: "مع هذه الأداة، تمكنت من إنهاء أطروحتي بسرعة وبدقة. أنصح بها كل الباحثين!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
  },
  {
    name: "ليلى",
    role: "باحثة أكاديمية",
    content: "الأداة جعلت كتابة دراستي تجربة سلسة وممتعة. شكراً لكم!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">تجارب المستخدمين</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}