"use client";

import { FormEvent, useMemo, useState } from "react";

type Property = {
  id: number;
  city: string;
  type: "شقة" | "فيلا" | "استوديو" | "شاليه" | "كوخ";
  area: string;
  title: string;
  details: string;
  price: number | null;
  rating: number | null;
  tag: string;
  image: string;
};

const destinations = [
  { city: "الرياض", image: "/riadh.jpg" },
  { city: "جدة", image: "/jeddah.jpg" },
  { city: "الطائف", image: "/taif.jpg" },
  { city: "مكة", image: "/meccah.jpg" },
];

const properties: Property[] = [
  { id: 1, city: "الرياض", type: "استوديو", area: "حي العقيق", title: "استديو العقيق البانورامي", details: "إطلالة بانورامية · حمام فاخر · ركن تحضيري", price: null, rating: null, tag: "إطلالة بانورامية", image: "/images/riyadh-aqiq/aqiq-01.jpg" },
  { id: 2, city: "جدة", type: "شاليه", area: "منتجع مانجروف", title: "شاليه مانجروف الفاخر", details: "غرفتان · صالة أنيقة · حمام", price: null, rating: null, tag: "منتجع شاطئي", image: "/images/jeddah-mangrove/mangrove-01.jpg" },
  { id: 3, city: "مكة", type: "استوديو", area: "حي السبهاني", title: "استديو السبهاني الأنيق", details: "استديو · بجوار Makkah Yard · 14 دقيقة للحرم", price: null, rating: null, tag: "قريب من الحرم", image: "/images/makkah-sabhani/sabhani-01.jpg" },
  { id: 4, city: "جدة", type: "شقة", area: "حي النزهة", title: "شقة النزهة الذكية", details: "قرب المطار · دخول ذكي · مصعد", price: null, rating: null, tag: "15 دقيقة للمطار", image: "/images/jeddah-nuzha/nuzha-01.jpg" },
  { id: 5, city: "جدة", type: "شقة", area: "", title: "الشقة السينمائية الفاخرة", details: "غرفة نوم · صالة سينمائية · دورة مياه", price: null, rating: null, tag: "تجربة سينمائية", image: "/images/jeddah-cinema/cinema-01.jpg" },
  { id: 6, city: "مكة", type: "استوديو", area: "حي النسيم", title: "استديو النسيم الفندقي", details: "دخول ذاتي · شاشات ذكية · موقع مركزي", price: null, rating: null, tag: "تصميم فندقي", image: "/images/makkah-naseem/naseem-01.jpg" },
  { id: 7, city: "الرياض", type: "استوديو", area: "حي السليمانية", title: "استديو السليمانية المركزي", details: "قفل ذكي · إنترنت سريع · قرب المرافق الطبية", price: null, rating: null, tag: "موقع مركزي", image: "/images/riyadh-sulaimaniyah/sulaimaniyah-01.jpg" },
  { id: 8, city: "الطائف", type: "كوخ", area: "بين الجبال", title: "كوخ الطائف الريفي", details: "4 غرف نوم · صالة ومجلس · جلسة خارجية", price: null, rating: null, tag: "هدوء بين الجبال", image: "/images/taif-cabin/cabin-01.jpg" },
];

const filters = ["الكل", "الرياض", "جدة", "مكة", "الطائف", "فلل", "شقق"];

const propertyCountLabel = (count: number) => {
  if (count === 1) return "عقار واحد متاح";
  if (count === 2) return "عقاران متاحان";
  return `${count} عقارات متاحة`;
};

export default function Home() {
  const [filter, setFilter] = useState("الكل");
  const [city, setCity] = useState("");
  const [liked, setLiked] = useState<number[]>([]);

  const visibleProperties = useMemo(() => {
    if (filter === "الكل") return properties;
    if (filter === "فلل") return properties.filter((item) => item.type === "فيلا" || item.type === "شاليه");
    if (filter === "شقق") return properties.filter((item) => item.type === "شقة");
    return properties.filter((item) => item.city === filter);
  }, [filter]);

  function chooseFilter(value: string) {
    setFilter(value);
    document.querySelector("#listings")?.scrollIntoView({ behavior: "smooth" });
  }

  function submitSearch(event: FormEvent) {
    event.preventDefault();
    chooseFilter(city || "الكل");
  }

  function toggleLike(id: number) {
    setLiked((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <>
      <header className="header">
        <div className="container navBar">
          <a className="brand" href="#home">سُكـ<span>نى</span></a>
          <nav className="navLinks" aria-label="التنقل الرئيسي">
            <a href="#home">الرئيسية</a><a href="#destinations">الوجهات</a><a href="#listings">العقارات</a><a href="#why">لماذا نحن؟</a>
          </nav>
          <div className="navActions">
            <a className="browseButton" href="#listings">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="browseButtonIcon" width="24" aria-hidden="true">
                <path d="M5.83087 18.1693L3.00261 20.9979M7.95219 20.2906L7.24508 20.9977M3.70955 16.0479L3.00244 16.755M11.3588 6.14844L6.98115 6.14844C6.65417 6.14844 6.43834 6.20823 6.15796 6.37645L4.34408 7.46478C3.91094 7.72466 3.69438 7.8546 3.63232 8.01389C3.5783 8.15256 3.58885 8.30808 3.66112 8.43818C3.74412 8.58763 3.97626 8.68711 4.44054 8.88609L7.91447 10.3749M11.3588 6.14844C10.7176 6.79012 10.1116 7.56433 9.18973 8.74215L8.32567 9.84608C8.16879 10.0465 8.0327 10.2204 7.91447 10.3749M11.3588 6.14844C11.6532 5.85384 11.955 5.58717 12.2982 5.32221C13.0456 4.7452 14.6119 3.90719 15.5067 3.6056C16.8125 3.16545 17.3933 3.12131 18.5548 3.03303C19.5534 2.95712 20.3717 3.01164 20.6801 3.32001C20.9885 3.62839 21.043 4.44669 20.9671 5.44536C20.8788 6.60685 20.8347 7.18759 20.3945 8.49341C20.0929 9.38818 19.2549 10.9545 18.6779 11.7019C18.413 12.0451 18.1463 12.3469 17.8517 12.6413M7.91447 10.3749C7.58676 10.8033 7.39618 11.0832 7.27999 11.3693C6.93821 12.2106 6.99595 13.1615 7.43702 13.9554C7.64105 14.3226 7.98047 14.662 8.6593 15.3408C9.33813 16.0197 9.67754 16.3591 10.0448 16.5631C10.8386 17.0042 11.7895 17.0619 12.6309 16.7201C12.9169 16.6039 13.1968 16.4134 13.6252 16.0857M13.6252 16.0857L15.114 19.5596C15.313 20.0239 15.4125 20.256 15.5619 20.339C15.692 20.4113 15.8476 20.4218 15.9862 20.3678C16.1455 20.3057 16.2755 20.0892 16.5353 19.656L17.6237 17.8422C17.7919 17.5618 17.8517 17.346 17.8517 17.019L17.8517 12.6413M13.6252 16.0857C13.7798 15.9674 13.9536 15.8313 14.154 15.6745L15.258 14.8104C16.4358 13.8885 17.21 13.2825 17.8517 12.6413" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>تصفح جميع العقارات</span>
            </a>
            <button className="menu" aria-label="فتح القائمة">☰</button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="heroOverlay" />
          <div className="container heroInner">
            <div className="heroCopy">
              <span className="eyebrow">إقامات مختارة بعناية</span>
              <h1>إقامتك المثالية<br />تبدأ من هنا</h1>
              <p>اكتشف وحدات سكنية مميزة في أجمل مدن المملكة، واحجز بسهولة وأمان.</p>
            </div>
            <form className="search" onSubmit={submitSearch}>
              <label><small>المدينة</small><select value={city} onChange={(e) => setCity(e.target.value)}><option value="">اختر المدينة</option>{destinations.map((item) => <option key={item.city}>{item.city}</option>)}</select></label>
              <label><small>تاريخ الدخول</small><input type="date" /></label>
              <label><small>تاريخ المغادرة</small><input type="date" /></label>
              <button type="submit">بحث</button>
            </form>
          </div>
        </section>

        <section className="section" id="destinations">
          <div className="container">
            <div className="sectionHead"><div><span className="kicker">استكشف وجهتك</span><h2>الوجهات الأكثر طلباً</h2></div><p>من قلب المدن النابضة إلى هدوء المرتفعات، اختر وجهتك واترك الباقي علينا.</p></div>
            <div className="destinations">
              {destinations.map((item) => { const count = properties.filter((property) => property.city === item.city).length; return <button className="destination" key={item.city} onClick={() => chooseFilter(item.city)}><img src={item.image} alt={item.city} loading="lazy" decoding="async" referrerPolicy="no-referrer" style={item.city === "الرياض" ? { objectPosition: "75% center" } : undefined} /><span><strong>{item.city}</strong><small>{propertyCountLabel(count)}</small></span></button>; })}
            </div>
          </div>
        </section>

        <section className="section listings" id="listings">
          <div className="container">
            <div className="sectionHead"><div><span className="kicker">إقامات استثنائية</span><h2>عقاراتنا المميزة</h2></div><p>{filter === "الكل" ? "مختارات تجمع الموقع المثالي والراحة والتفاصيل الراقية." : `${visibleProperties.length} عقارات مطابقة لـ «${filter}»`}</p></div>
            <div className="filters">{filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => chooseFilter(item)}>{item}</button>)}</div>
            <div className="propertyGrid">
              {visibleProperties.map((item) => <article className="property" key={item.id}>
                <div className="propertyImage"><a className="propertyImageLink" href={`/property/${item.id}`} target="_blank" rel="noopener noreferrer" aria-label={`عرض تفاصيل ${item.title} في نافذة جديدة`}><img src={item.image} alt={item.title} loading="lazy" decoding="async" referrerPolicy="no-referrer" /></a><span className="tag">{item.tag}</span><button className={`heart ${liked.includes(item.id) ? "liked" : ""}`} onClick={() => toggleLike(item.id)} aria-label="إضافة إلى المفضلة">{liked.includes(item.id) ? "♥" : "♡"}</button></div>
                <div className="propertyBody"><div className="meta"><span>{item.city}{item.area ? ` · ${item.area}` : ""}</span><b>{item.rating !== null ? `★ ${item.rating.toFixed(1)}` : "إقامة جديدة"}</b></div><h3>{item.title}</h3><p>{item.details}</p><div className="propertyFooter"><strong>{item.price !== null ? <>{item.price} ر.س <small>/ ليلة</small></> : <>السعر عند التواصل</>}</strong><button aria-label="عرض العقار">←</button></div></div>
              </article>)}
            </div>
          </div>
        </section>

        <section className="section why" id="why"><div className="container"><div className="sectionHead"><div><span className="kicker">راحة تبدأ قبل وصولك</span><h2>لماذا سُكنى؟</h2></div><p>تجربة حجز واضحة وموثوقة، من البحث الأول وحتى لحظة تسجيل الدخول.</p></div><div className="benefits"><article><i>◷</i><h3>حجز سريع</h3><p>اختر وحدتك وأرسل طلبك خلال دقائق عبر واتساب.</p></article><article><i>⌂</i><h3>عقارات مختارة بعناية</h3><p>نراجع الصور والمرافق والمعلومات قبل عرض أي عقار.</p></article><article><i>♧</i><h3>دعم متواصل</h3><p>فريقنا معك للإجابة عن استفساراتك ومساعدتك.</p></article></div></div></section>

        <section className="container cta"><div><h2>وجدت الإقامة المناسبة؟</h2><p>تواصل معنا الآن وسنساعدك على إتمام الحجز بكل سهولة.</p></div><a className="contactButton" href="https://wa.me/966566836016" target="_blank" rel="noreferrer">
          <span>تواصل عبر واتساب</span>
          <span className="iconButton" aria-hidden="true">
            <svg className="socialSvg whatsappSvg" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
            </svg>
          </span>
        </a></section>
      </main>

      <footer><div className="container footerGrid"><div><a className="brand footerBrand" href="#home">سُكـ<span>نى</span></a><p>وجهتك الموثوقة لاكتشاف إقامات مختارة في أجمل مدن المملكة.</p><div className="footerCertificate" aria-label="وثيقة العمل الحر"><div className="footerCertificateTitle"><img src="/freelance.png" alt="" className="footerSealImage" aria-hidden="true" /><div><strong>وثيقة العمل الحر</strong><span>رقم الوثيقة: <b dir="ltr">FL-705403401</b></span></div></div><div className="footerCertificateActions"><a href="https://freelance.sa/certificate-validation/certificate-validation-details/FL-705403401" target="_blank" rel="noopener noreferrer">التحقق الرسمي</a><a href="/images/certificates/freelance-certificate-public.jpg" target="_blank" rel="noopener noreferrer">عرض الشهادة</a></div></div></div><div><b>استكشف</b><a href="#destinations">الوجهات</a><a href="#listings">العقارات</a><a href="#why">لماذا نحن؟</a></div><div><b>المدن</b><a href="#">الرياض</a><a href="#">جدة</a><a href="#">مكة</a></div><div><b>الدعم</b><a href="#">تواصل معنا</a><a href="#">الأسئلة الشائعة</a><a href="#">سياسة الخصوصية</a></div></div><div className="container copyright"><span>© 2026 سُكنى. جميع الحقوق محفوظة.</span><span>صُمم لإقامات أجمل</span></div></footer>
      <button
        className="Btn"
        type="button"
        aria-label="تواصل عبر واتساب"
        onClick={() => window.open("https://wa.me/966566836016", "_blank", "noopener,noreferrer")}
      >
        <span className="sign" aria-hidden="true">
          <svg className="socialSvg whatsappSvg" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
          </svg>
        </span>
        <span className="whatsappText">Whatsapp</span>
      </button>
    </>
  );
}
