import React from 'react';
import { useLanguage } from './LanguageProvider';
import { Card, CardContent } from './ui/card';
import { Star, Quote } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function TestimonialsSection() {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: 'Ahmed Al-Mansouri',
      nameAr: 'أحمد المنصوري',
      role: 'Business Owner',
      roleAr: 'صاحب شركة',
      content: 'Exceptional legal service with outstanding results. Highly recommend their expertise.',
      contentAr: 'خدمة قانونية استثنائية مع نتائج ممتازة. أنصح بشدة بخبرتهم.',
      image: '/images/testimonials/ahmed-mansouri.jpg'
    },
    {
      name: 'Sarah Johnson',
      nameAr: 'سارة جونسون',
      role: 'International Investor',
      roleAr: 'مستثمرة دولية',
      content: 'Professional, knowledgeable, and reliable. They handled my case with great care.',
      contentAr: 'مهنيون وذوو معرفة وموثوقون. تعاملوا مع قضيتي بعناية فائقة.',
      image: '/images/testimonials/pexels-olly-3769021.jpg'
    },
    {
      name: 'Mohamed Hassan',
      nameAr: 'محمد حسن',
      role: 'Real Estate Developer',
      roleAr: 'مطور عقاري',
      content: 'Their expertise in commercial law helped us navigate complex regulations successfully.',
      contentAr: 'خبرتهم في القانون التجاري ساعدتنا في التعامل مع اللوائح المعقدة بنجاح.',
      image: '/images/testimonials/pexels-italo-melo-881954-2379004.jpg'
    },
    {
      name: 'Fatima Al-Zahra',
      nameAr: 'فاطمة الزهراء',
      role: 'Corporate Executive',
      roleAr: 'مدير تنفيذي للشركات',
      content: 'Outstanding legal counsel that exceeded our expectations. Their attention to detail is remarkable.',
      contentAr: 'استشارة قانونية متميزة فاقت توقعاتنا. اهتمامهم بالتفاصيل أمر رائع.',
      image: '/images/testimonials/pexels-edmond-dantes-4347368.jpg'
    },
    {
      name: 'James Mitchell',
      nameAr: 'جيمس ميتشل',
      role: 'Technology Entrepreneur',
      roleAr: 'رائد أعمال تقني',
      content: 'They provided comprehensive legal support for our startup. Highly professional team.',
      contentAr: 'قدموا دعماً قانونياً شاملاً لشركتنا الناشئة. فريق محترف للغاية.',
      image: '/images/testimonials/pexels-pixabay-262391.jpg'
    },
    {
      name: 'Aisha Al-Kaabi',
      nameAr: 'عائشة الكعبي',
      role: 'Import/Export Manager',
      roleAr: 'مدير استيراد وتصدير',
      content: 'Expert guidance through complex international trade regulations. Excellent communication.',
      contentAr: 'إرشاد خبير عبر لوائح التجارة الدولية المعقدة. تواصل ممتاز.',
      image: '/images/testimonials/pexels-cristian-rojas-10041267.jpg'
    },
    {
      name: 'David Thompson',
      nameAr: 'ديفيد طومسون',
      role: 'Financial Advisor',
      roleAr: 'مستشار مالي',
      content: 'Impressive knowledge of banking and finance law. They delivered results beyond expectations.',
      contentAr: 'معرفة مذهلة بقانون البنوك والمالية. حققوا نتائج فاقت التوقعات.',
      image: '/images/testimonials/pexels-olly-834863.jpg'
    },
    {
      name: 'Mariam Al-Rashid',
      nameAr: 'مريم الراشد',
      role: 'Healthcare Administrator',
      roleAr: 'مديرة إدارية صحية',
      content: 'Professional handling of medical law matters. Their expertise saved us time and money.',
      contentAr: 'تعامل مهني مع قضايا القانون الطبي. خبرتهم وفرت لنا الوقت والمال.',
      image: '/images/testimonials/pexels-divinetechygirl-1181690.jpg'
    },
    {
      name: 'Robert Chen',
      nameAr: 'روبرت تشين',
      role: 'Manufacturing Director',
      roleAr: 'مدير التصنيع',
      content: 'Excellent legal representation for our manufacturing contracts. Highly recommended service.',
      contentAr: 'تمثيل قانوني ممتاز لعقود التصنيع لدينا. خدمة موصى بها بشدة.',
      image: '/images/testimonials/pexels-divinetechygirl-1181391.jpg'
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            {t('testimonials.title')}
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* عرض جميع الشهادات في شبكة ثابتة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="p-6 hover:shadow-xl transition-all duration-500 border-l-4 transform hover:scale-105 animate-slide-in-company"
              style={{
                borderLeftColor: 'var(--color-accent)',
                animationDelay: `${index * 200}ms`
              }}
            >
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-transparent hover:border-accent transition-all duration-300"
                  />
                  <div>
                    <h4 className="font-bold transition-colors duration-300 hover:text-accent" style={{ color: 'var(--color-text)' }}>
                      {t('nav.home') === 'الرئيسية' ? testimonial.nameAr : testimonial.name}
                    </h4>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      {t('nav.home') === 'الرئيسية' ? testimonial.roleAr : testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="flex text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                  ))}
                </div>

                <div className="relative">
                  <Quote className="h-8 w-8 text-gray-300 absolute -top-2 -left-2 opacity-30" />
                  <p className="text-sm italic leading-relaxed pl-6" style={{ color: 'var(--color-text-secondary)' }}>
                    {t('nav.home') === 'الرئيسية' ? testimonial.contentAr : testimonial.content}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
