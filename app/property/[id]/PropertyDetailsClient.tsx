"use client";

import { useState, type CSSProperties } from "react";

export type PropertyDetails = {
  id: number;
  city: string;
  area: string;
  title: string;
  details: string;
  price: number | null;
  rating: number | null;
  tag: string;
  description: string;
  amenities: string[];
  gallery: string[];
};

export default function PropertyDetailsClient({ property }: { property: PropertyDetails }) {
  const [activeImage, setActiveImage] = useState(property.gallery[0]);
  const whatsappUrl =
    "https://" +
    "wa.me/966500000000?text=" +
    encodeURIComponent(`مرحباً، أريد الاستفسار عن ${property.title}`);
  const pageStyle = { "--detail-bg": `url("${activeImage}")` } as CSSProperties;

  return (
    <div className="detailPage" style={pageStyle}>
      <section className="detailHero">
        <div className="detailBackdrop" />
        <header className="detailHeader">
          <div className="container detailNav">
            <a className="brand" href="/">سُكـ<span>نى</span></a>
            <nav><a href="/">الرئيسية</a><a href="/#listings">العقارات</a><a href="/#why">لماذا نحن؟</a></nav>
            <a className="backHome" href="/">العودة للرئيسية ←</a>
          </div>
        </header>

        <main className="container detailMain">
          <div className="detailBreadcrumb">الرئيسية / العقارات / {property.city} / {property.title}</div>
          <section className="detailLayout">
            <div className="galleryPanel">
              <div className="mainGalleryImage">
                <img src={activeImage} alt={property.title} referrerPolicy="no-referrer" />
                <span className="galleryCount">{property.gallery.indexOf(activeImage) + 1} / {property.gallery.length}</span>
                <span className="qualityBadge">صور موثقة ✓</span>
              </div>
              <div className="galleryThumbs">
                {property.gallery.map((galleryImage, index) => (
                  <button key={`${galleryImage}-${index}`} className={activeImage === galleryImage ? "active" : ""} onClick={() => setActiveImage(galleryImage)} aria-label={`عرض الصورة ${index + 1}`}>
                    <img src={galleryImage} alt={`${property.title} — صورة ${index + 1}`} loading="lazy" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

            <aside className="detailsPanel">
              <div className="detailTopline"><span>{property.tag}</span><b>{property.rating !== null ? `★ ${property.rating.toFixed(1)}` : "إقامة جديدة"}</b></div>
              <h1>{property.title}</h1>
              <p className="detailLocation">⌖ {property.city}{property.area ? ` · ${property.area}` : ""}</p>
              <p className="detailDescription">{property.description}</p>
              <div className="detailFacts"><span>⌂ {property.details}</span><span>✓ تأكيد جودة</span></div>
              <div className="amenities">
                <h2>المرافق والخدمات</h2>
                <div>{property.amenities.slice(0, 6).map((item) => <span key={item}><i>✦</i>{item}</span>)}</div>
              </div>
              <div className="bookingCard">
                <div><small>{property.price !== null ? "السعر لليلة الواحدة" : "تفاصيل السعر"}</small><strong>{property.price !== null ? <>{property.price} ر.س <em>/ ليلة</em></> : <>السعر عند التواصل</>}</strong></div>
                <a href={whatsappUrl} target="_blank" rel="noreferrer">احجز الآن</a>
              </div>
            </aside>
          </section>
        </main>
      </section>

      <section className="detailBelow">
        <div className="container detailHighlights">
          <article><i>✓</i><div><h3>معلومات موثّقة</h3><p>نعرض ما ستجده فعلياً عند الوصول.</p></div></article>
          <article><i>↗</i><div><h3>تأكيد مباشر</h3><p>الحجز يتم مع المسؤول عن العقار.</p></div></article>
          <article><i>•</i><div><h3>مساعدة عند الحاجة</h3><p>دعم واضح قبل الإقامة وخلالها.</p></div></article>
        </div>
      </section>
    </div>
  );
}
