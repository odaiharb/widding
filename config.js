/* ============================================================
   CONFIG — the ONLY file you should need to edit to update
   the wedding's content. Nothing here touches layout, CSS,
   or animation code.
   ============================================================ */

const invitationConfig = {

  couple: {
    groom: "ALI",
    bride: "WAED",
    monogram: "A&W",
    // Short romantic line shown on the sealed cover
    romanticPhrase: "معًا تبدأ أجمل حكايات العمر.",
    // Shown in the formal "you are invited" section
    groomFamily: "ابن السيد أبو مرشد أبو حمدة",
    brideFamily: "ابنة السيد أبو محمد علي حرب",
  },

  event: {
    title: "عقد القِران",
    // ISO date-time used by the countdown — edit this and everything
    // (countdown, nikkah details) updates automatically.
    isoDateTime: "2026-09-12T19:00:00",
    day: "السبت",
    displayDate: "١٢ سبتمبر ٢٠٢٦",
    time: "٧:٠٠ مساءً",
    venue: "باحة جامع الشيخ زايد الكبير",
    address: "شارع الشيخ زايد بن سلطان، أبوظبي، الإمارات العربية المتحدة",
    mapsUrl: "https://maps.google.com/?q=Sheikh+Zayed+Grand+Mosque",
    directionsUrl: "https://maps.google.com/?q=Sheikh+Zayed+Grand+Mosque&daddr=Sheikh+Zayed+Grand+Mosque",
  },

  media: {
    envelopeVideo: "assets/videos/envelope-intro.mp4",
    envelopePoster: "assets/images/envelope-poster.webp",
    coupleVideo: "assets/videos/couple-walking.mp4",
    couplePoster: "assets/images/couple-poster.webp",
    music: "assets/audio/wedding.mp3",
    venueImage: "assets/images/venue.webp",
  },

  content: {
    invitationMessage:
      "بقلوب يملؤها الامتنان، ندعوكم لمشاركتنا بداية عمرٍ جديد، فوجودكم بيننا يكمّل فرحتنا ويجعل هذه المناسبة ذكرى لا تُنسى.",
    // Shown under the formal groom/bride family names
    familyMessage:
      "أهلنا وأحبتنا، ندعوكم لمشاركتنا فرحتنا في أمسية من المحبة والدعوات والذكريات الجميلة ونحن نبدأ معًا فصلًا جديدًا من حياتنا.",
    finalMessage:
      "نسأل الله أن يبارك هذا الزواج بالمودة والرحمة والسعادة، وأن يديم المحبة بيننا دائمًا.",
  },

  quran: {
    bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    verse:
      "﴿وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ﴾",
    reference: "الروم — ٢١",
  },

  countdown: {
    enabled: true,
  },

  // The vertical wedding-day timeline. Add, remove, or reorder freely.
  timeline: [
    { time: "٦:٠٠ مساءً", title: "استقبال الضيوف والترحيب" },
    { time: "٦:٣٠ مساءً", title: "دخول العروس" },
    { time: "٧:٠٠ مساءً", title: "مراسم عقد القِران" },
    { time: "٨:٠٠ مساءً", title: "العشاء والاحتفال" },
  ],

  gallery: [
    // Add or remove image paths freely — the gallery renders
    // whatever is listed here, in order.
    "assets/images/photo-01.webp",
    "assets/images/photo-02.webp",
    "assets/images/photo-03.webp",
    "assets/images/photo-04.webp",
    "assets/images/photo-05.webp",
    "assets/images/photo-06.webp",
  ],

  music: {
    enabled: true,
  },

};
