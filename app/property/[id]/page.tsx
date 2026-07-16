import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PropertyDetailsClient, { type PropertyDetails } from "./PropertyDetailsClient";

const image = (id: number) =>
  "https://" +
  `images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop`;

const properties: PropertyDetails[] = [
  { id: 1, city: "الرياض", area: "حي العقيق", title: "استديو العقيق البانورامي", details: "إطلالة بانورامية · حمام فاخر · ركن تحضيري", price: null, rating: null, tag: "إطلالة بانورامية", description: "يتميز العقار بتصميم عصري ولمسات أنيقة وألوان دافئة تمنح المكان طابعاً يجمع بين الحيوية والهدوء. استمتع بإطلالة بانورامية على المدينة عبر الواجهات الزجاجية الكبيرة التي تغمر المساحة بالإضاءة الطبيعية. يضم المكان حماماً خاصاً بتصميم فاخر وتجهيزات فندقية حديثة، إلى جانب ركن تحضيري صغير مجهز لإقامة مريحة وعملية. صُممت كل زاوية بعناية، من الإضاءة الذكية إلى قطع الأثاث المختارة بذوق رفيع، ليكون العقار وجهة مثالية للاسترخاء أو الإقامة المميزة.", amenities: ["إطلالة بانورامية", "واجهات زجاجية", "إضاءة طبيعية", "حمام خاص فاخر", "ركن تحضيري", "إضاءة ذكية"], gallery: ["/images/riyadh-aqiq/aqiq-01.jpg", "/images/riyadh-aqiq/aqiq-02.jpg", "/images/riyadh-aqiq/aqiq-03.jpg", "/images/riyadh-aqiq/aqiq-04.jpg"] },
  { id: 2, city: "جدة", area: "منتجع مانجروف", title: "شاليه مانجروف الفاخر", details: "غرفتان · صالة أنيقة · حمام", price: null, rating: null, tag: "منتجع شاطئي", description: "اكتشف روعة الإقامة في شاليه داخل منتجع مانجروف الفاخر بجدة، حيث يجتمع جمال الطبيعة مع الرفاهية في أجواء هادئة ومثالية للعائلات. يتألف الشاليه من غرفتين وصالة أنيقة وحمام، مع إمكانية استقبال زوار إضافيين برسوم رمزية. يقع الشاليه داخل المنتجع الراقي، ويُعد مناسباً لعطلة صيفية مميزة أو إجازة نهاية أسبوع لا تُنسى.", amenities: ["شاطئ للسباحة", "مسبح فاخر", "مطعم وكافيه", "صالة ترفيهية", "ملعب بادل", "ألعاب بحرية"], gallery: ["/images/jeddah-mangrove/mangrove-01.jpg", "/images/jeddah-mangrove/mangrove-02.jpg", "/images/jeddah-mangrove/mangrove-03.jpg", "/images/jeddah-mangrove/mangrove-04.jpg", "/images/jeddah-mangrove/mangrove-05.jpg", "/images/jeddah-mangrove/mangrove-06.jpg"] },
  { id: 3, city: "مكة", area: "حي السبهاني", title: "استديو السبهاني الأنيق", details: "استديو · بجوار Makkah Yard · 14 دقيقة للحرم", price: null, rating: null, tag: "قريب من الحرم", description: "استديو أنيق ومريح يقع في حي السبهاني بجوار Makkah Yard، ويتميز بموقعه الهادئ والقريب من أهم الخدمات والمطاعم والمقاهي. صُمم الاستديو بأسلوب عصري يوفر الراحة والخصوصية للضيوف أثناء إقامتهم في مكة المكرمة. كما يبعد حوالي 14 دقيقة فقط عن المسجد الحرام، مما يجعله خياراً مناسباً للزوار القادمين لأداء العمرة أو لقضاء إقامة مريحة بالقرب من الحرم.", amenities: ["14 دقيقة من الحرم", "بجوار Makkah Yard", "قريب من الخدمات", "قريب من المطاعم", "تصميم عصري", "خصوصية عالية"], gallery: ["/images/makkah-sabhani/sabhani-01.jpg", "/images/makkah-sabhani/sabhani-02.jpg", "/images/makkah-sabhani/sabhani-03.jpg", "/images/makkah-sabhani/sabhani-04.jpg", "/images/makkah-sabhani/sabhani-05.jpg", "/images/makkah-sabhani/sabhani-06.jpg"] },
  { id: 4, city: "جدة", area: "حي النزهة", title: "شقة النزهة الذكية", details: "قرب المطار · دخول ذكي · مصعد", price: null, rating: null, tag: "15 دقيقة للمطار", description: "تقع الشقة في حي النزهة شمال جدة، وتبعد حوالي 15 دقيقة عن المطار. تتوفر خدمات قريبة جداً يمكن الوصول إليها مشياً. كما توجد كاميرات مراقبة خارجية للعقار، ودخول ذكي للشقة، ومصعد. تضم الشقة باراً صغيراً يحتوي على سخان ماء وميكروويف وثلاجة لتحضير مشروبك المفضل بكل راحة، بالإضافة إلى مجفف شعر ومكواة وتلفزيون.", amenities: ["15 دقيقة من المطار", "دخول ذكي", "مصعد", "كاميرات خارجية", "ميكروويف وثلاجة", "مجفف شعر ومكواة"], gallery: ["/images/jeddah-nuzha/nuzha-01.jpg", "/images/jeddah-nuzha/nuzha-02.jpg", "/images/jeddah-nuzha/nuzha-03.jpg"] },
  { id: 5, city: "جدة", area: "", title: "الشقة السينمائية الفاخرة", details: "غرفة نوم · صالة سينمائية · دورة مياه", price: null, rating: null, tag: "تجربة سينمائية", description: "استمتع بإقامة فريدة في شقة فاخرة بتصميم سينمائي راقٍ، تضم شاشة 90 بوصة لمشاهدة أفلامك المفضلة، وكرسي مساج للاسترخاء، وانتريه مريح لجلسات مميزة. توفر الشقة دخولاً ذاتياً لمزيد من الخصوصية، وركن شاي وقهوة وفشار، وغرفة نوم أنيقة، ودورة مياه مجهزة، وموقفاً خاصاً للسيارة. احجز الآن لعطلة استثنائية!", amenities: ["شاشة 90 بوصة", "كرسي مساج", "دخول ذاتي", "ركن شاي وقهوة", "آلة فشار", "موقف خاص"], gallery: ["/images/jeddah-cinema/cinema-01.jpg", "/images/jeddah-cinema/cinema-02.jpg", "/images/jeddah-cinema/cinema-03.jpg", "/images/jeddah-cinema/cinema-04.jpg"] },
  { id: 6, city: "مكة", area: "حي النسيم", title: "استديو النسيم الفندقي", details: "دخول ذاتي · شاشات ذكية · موقع مركزي", price: null, rating: null, tag: "تصميم فندقي", description: "موقع مركزي قريب من أهم الخدمات داخل عمارة سكنية خاصة بتصميم فندقي أنيق. يوفر المكان خصوصية عالية ودخولاً ذاتياً كاملاً، مع أجواء هادئة ودافئة تمنحك مساحة خاصة للاستمتاع بوقتك بكل راحة. تتوفر إمكانية الدخول المبكر حسب التوفر، إلى جانب شاشات ذكية للترفيه، ليكون المكان مناسباً للباحثين عن الهدوء أو العمل وقضاء لحظات مميزة لا تُنسى.", amenities: ["دخول ذاتي كامل", "خصوصية عالية", "شاشات ذكية", "دخول مبكر حسب التوفر", "قريب من الخدمات", "أجواء هادئة ودافئة"], gallery: ["/images/makkah-naseem/naseem-01.jpg", "/images/makkah-naseem/naseem-02.jpg", "/images/makkah-naseem/naseem-03.jpg", "/images/makkah-naseem/naseem-04.jpg"] },
  { id: 7, city: "الرياض", area: "حي السليمانية", title: "استديو السليمانية المركزي", details: "قفل ذكي · إنترنت سريع · قرب المرافق الطبية", price: null, rating: null, tag: "موقع مركزي", description: "يقع الاستديو في حي السليمانية بمدينة الرياض، ويتميز بالنظافة والأناقة ويوفر إقامة مريحة وهادئة. جُهز بأثاث عصري يشمل سريراً مريحاً، وأدوات استحمام أساسية، وشاشة ذكية، وإنترنت سريع لتجربة إقامة متكاملة. يتميز بموقع مركزي قريب من أهم المرافق الطبية والإدارية؛ إذ يبعد حوالي 10 دقائق عن مدينة الأمير سلطان الطبية العسكرية، و9 دقائق عن مدينة الملك فهد الطبية، كما يقع بالقرب من مستشفى قوى الأمن ومعهد الإدارة العامة. يتم تسجيل الدخول بسهولة عبر القفل الذكي، مع توفر دعم يومي وإمكانية طلب خدمة تنظيف خاصة للإقامات الطويلة.", amenities: ["10 دقائق لمدينة الأمير سلطان الطبية", "9 دقائق لمدينة الملك فهد الطبية", "قرب مستشفى قوى الأمن", "دخول ذاتي ذكي", "إنترنت سريع", "تنظيف للإقامات الطويلة"], gallery: ["/images/riyadh-sulaimaniyah/sulaimaniyah-01.jpg", "/images/riyadh-sulaimaniyah/sulaimaniyah-02.jpg", "/images/riyadh-sulaimaniyah/sulaimaniyah-03.jpg", "/images/riyadh-sulaimaniyah/sulaimaniyah-04.jpg", "/images/riyadh-sulaimaniyah/sulaimaniyah-05.jpg"] },  { id: 8, city: "الطائف", area: "بين الجبال", title: "كوخ الطائف الريفي", details: "4 غرف نوم · صالة ومجلس · جلسة خارجية", price: null, rating: null, tag: "هدوء بين الجبال", description: "كوخ ريفي بين جبال الطائف، تحيط به أجواء مليئة بالهدوء والاسترخاء بعيداً عن ضجيج المدينة. يضم غرفة نوم ماستر، وغرفة نوم بسريرين مفردين، وغرفتين في الدور الثاني؛ إحداهما لشخصين والأخرى لشخص أو شخصين. كما يضم صالة واسعة بجلسة فاخرة، ومجلساً بجلسة أرضية، ومطبخاً متكاملاً، وجلسة خارجية، وألعاب أطفال، وغسالة، وتدفئة، وواي فاي مجانياً.", amenities: ["4 غرف نوم", "مطبخ متكامل", "جلسة خارجية", "ألعاب أطفال", "تدفئة", "واي فاي مجاني"], gallery: ["/images/taif-cabin/cabin-01.jpg", "/images/taif-cabin/cabin-02.jpg", "/images/taif-cabin/cabin-03.jpg", "/images/taif-cabin/cabin-04.jpg", "/images/taif-cabin/cabin-05.jpg", "/images/taif-cabin/cabin-06.jpg"] },
];

export function generateStaticParams() {
  return properties.map((property) => ({ id: String(property.id) }));
}

const siteUrl = "https://www.sukna.shop";

const absoluteUrl = (path: string) =>
  path.startsWith("http") ? path : `${siteUrl}${path}`;

const seoDescription = (property: PropertyDetails) => {
  const location = property.area
    ? `${property.area} في ${property.city}`
    : property.city;
  return `${property.title} في ${location}. ${property.description}`.slice(0, 160);
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const property = properties.find((item) => item.id === Number(id));

  if (!property) {
    return {
      title: "العقار غير موجود",
      robots: { index: false, follow: false },
    };
  }

  const url = `${siteUrl}/property/${property.id}`;
  const description = seoDescription(property);
  const socialImage = absoluteUrl(property.gallery[0]);

  return {
    title: property.title,
    description,
    keywords: [
      property.title,
      `${property.title} ${property.city}`,
      `إيجار يومي ${property.city}`,
      `إقامات ${property.city}`,
      property.area,
      ...property.amenities.slice(0, 4),
    ].filter(Boolean),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "ar_SA",
      url,
      siteName: "سُكنى",
      title: property.title,
      description,
      images: [
        {
          url: socialImage,
          alt: `${property.title} في ${property.city}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: property.title,
      description,
      images: [socialImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = properties.find((item) => item.id === Number(id));
  if (!property) notFound();

  const propertyUrl = `${siteUrl}/property/${property.id}`;
  const locationName = property.area
    ? `${property.area}، ${property.city}`
    : property.city;
  const propertyJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LodgingBusiness",
        "@id": `${propertyUrl}#lodging`,
        name: property.title,
        description: property.description,
        url: propertyUrl,
        image: property.gallery.map(absoluteUrl),
        address: {
          "@type": "PostalAddress",
          addressLocality: locationName,
          addressRegion: property.city,
          addressCountry: "SA",
        },
        amenityFeature: property.amenities.map((amenity) => ({
          "@type": "LocationFeatureSpecification",
          name: amenity,
          value: true,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${propertyUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "الرئيسية",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: property.city,
            item: `${siteUrl}/#listings`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: property.title,
            item: propertyUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertyJsonLd) }}
      />
      <PropertyDetailsClient property={property} />
    </>
  );
}
