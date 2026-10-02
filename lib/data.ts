export type ReviewComment = {
  id: string
  author: string
  time: string
  text: string
  recommends: boolean
  support: number
  course?: string
}

export type Professor = { slug: string; name: string }
export type Course = { slug: string; code: string; name: string }
export type Club = {
  slug: string
  name: string
  description: string
  members: number
  founded: string
}

export type Note = {
  id: string
  title: string
  course: string
  author: string
  time: string
  fileType: 'PDF' | 'DOCX' | 'PPTX' | 'ZIP'
  size: string
  pages?: number
}

export type ForumCategory =
  | 'Genel'
  | 'Dersler'
  | 'Sınavlar'
  | 'Kampüs'
  | 'Kariyer'
  | 'Staj'
  | 'Teknoloji'
  | 'Sosyal'

export type ForumComment = {
  id: string
  author: string
  time: string
  text: string
  score: number
  replies: ForumComment[]
}

export type ForumTopic = {
  id: string
  title: string
  author: string
  time: string
  category: ForumCategory
  content: string
  score: number
  comments: ForumComment[]
}

export const currentUser = {
  nickname: 'pixelmaster',
  stats: {
    reviews: 42,
    recommends: 31,
    notRecommends: 11,
    notes: 8,
    topics: 5,
  },
}

const nicknames = [
  'nightowl',
  'codewizard',
  'campuscat',
  'studybug',
  'pixelmaster',
  'quietlibrary',
  'coffeeloop',
  'midtermghost',
  'lambdacat',
  'sunsetstudent',
  'bluehoodie',
  'deadlinehero',
]

const times = [
  '2 saat önce',
  '5 saat önce',
  '1 gün önce',
  '2 gün önce',
  '3 gün önce',
  '1 hafta önce',
  '2 hafta önce',
  '1 ay önce',
]

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function slugify(value: string) {
  return value
    .toLocaleLowerCase('tr')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/â/g, 'a')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function buildComments(
  prefix: string,
  seed: number,
  pool: { text: string; recommends: boolean }[],
  count: number,
  courses?: string[],
): ReviewComment[] {
  const rand = seeded(seed + 7)
  const used = new Set<number>()
  const result: ReviewComment[] = []
  while (result.length < count && used.size < pool.length) {
    const idx = Math.floor(rand() * pool.length)
    if (used.has(idx)) continue
    used.add(idx)
    const entry = pool[idx]
    result.push({
      id: `${prefix}-${result.length}`,
      author: nicknames[Math.floor(rand() * nicknames.length)],
      time: times[Math.min(result.length + Math.floor(rand() * 2), times.length - 1)],
      text: entry.text,
      recommends: entry.recommends,
      support: Math.floor(rand() * 40) + 1,
      course: courses ? courses[Math.floor(rand() * courses.length)] : undefined,
    })
  }
  return result
}

const professorPool = [
  { text: 'Anlatımı çok net, tahtayı düzenli kullanıyor. Derse düzenli gelirseniz sınavda zorlanmazsınız.', recommends: true },
  { text: 'Vize ve finaller derste çözülen örneklere oldukça yakın. Ofis saatlerinde de gerçekten yardımcı oluyor.', recommends: true },
  { text: 'Konuları çok hızlı geçiyor, not tutmak zor. Slaytlar da biraz eksik kalıyor, kitaptan takip etmek şart.', recommends: false },
  { text: 'Yoklama alıyor ama ders keyifli geçiyor. Sorulara sabırla cevap veriyor, soru sormaktan çekinmeyin.', recommends: true },
  { text: 'Notlandırma biraz sert. Ödevlerde küçük hatalara bile puan kırıyor, teslimden önce iki kez kontrol edin.', recommends: false },
  { text: 'Gerçek hayattan örnekler veriyor, konunun neden önemli olduğunu anlatıyor. Dönemin en iyi dersiydi.', recommends: true },
  { text: 'Mail atınca geç dönüyor, ama derste söylediklerini sınavda soruyor. Dikkatli dinlemek yeterli.', recommends: true },
  { text: 'Ders anlatımı monoton, çoğu zaman slayttan okuyor. Konuyu kendi kendime çalışarak öğrendim.', recommends: false },
  { text: 'Projeler çok öğretici ama zaman alıyor. Grup arkadaşlarınızı dikkatli seçin.', recommends: true },
  { text: 'Sınavlar uzun ve süre yetmiyor. Hız kazanmak için eski sınavları mutlaka çözün.', recommends: false },
  { text: 'Öğrenciyle iletişimi çok iyi, dönem başında ne beklediğini açıkça söylüyor. Sürpriz yok.', recommends: true },
  { text: 'İlk hafta zor görünüyor ama sistemine alışınca çok rahat. Quizler notu kurtarıyor.', recommends: true },
]

const coursePool = [
  { text: 'İlk birkaç hafta kolay ama sonrasında konular biraz zorlaşıyor. Haftalık tekrar yapmak şart.', recommends: true },
  { text: 'Ödev yükü fazla ama sınavlara çok iyi hazırlıyor. Lab saatlerini kaçırmayın.', recommends: true },
  { text: 'Teorik kısmı ağır. Formül ezberlemek yerine mantığını anlamaya çalışın, sorular ona göre geliyor.', recommends: true },
  { text: 'Kaynak kitap olmadan geçmek zor. Derste anlatılanlar sınavı tam karşılamıyor.', recommends: false },
  { text: 'Bölümün en faydalı derslerinden biri. Sonraki dönemlerde sürekli işinize yarıyor.', recommends: true },
  { text: 'Final ağırlığı çok yüksek, tek sınavla her şey belirleniyor. Strese hazırlıklı olun.', recommends: false },
  { text: 'Uygulama ağırlıklı ve keyifli. Kod yazmayı seviyorsanız zevkle alırsınız.', recommends: true },
  { text: 'Müfredat biraz eski kalmış, güncel kaynaklarla desteklemek gerekiyor.', recommends: false },
  { text: 'Geçmiş yılların soruları çok benzer geliyor. Forumda paylaşılan çözümler çok yardımcı oldu.', recommends: true },
  { text: 'Konu çok ama iyi planlarsanız yetişiyor. Dönem ortasında geride kalmayın.', recommends: true },
  { text: 'Quizler habersiz yapılıyor, her derse hazırlıklı gelmek gerekiyor.', recommends: false },
]

const clubPool = [
  { text: 'Workshopları gerçekten güzel. İlk dönemimde katıldım ve çok şey öğrendim.', recommends: true },
  { text: 'Topluluk çok sıcak, yeni gelenlere hemen yardımcı oluyorlar.', recommends: true },
  { text: 'Etkinlikler genelde akşam saatlerinde, ders programıyla çakışabiliyor.', recommends: false },
  { text: 'Sektörden konuşmacılar getiriyorlar, staj bağlantısı bulmak için harika bir ortam.', recommends: true },
  { text: 'Yönetim değişince etkinlik sayısı azaldı ama yine de takip etmeye değer.', recommends: true },
  { text: 'WhatsApp grubu çok kalabalık, duyurular kayboluyor. Daha düzenli olabilirdi.', recommends: false },
  { text: 'Hafta sonu gezileri çok eğlenceli, yeni arkadaşlıklar kurmak için birebir.', recommends: true },
  { text: 'Projelerde gerçekten sorumluluk veriyorlar, CV için çok faydalı oldu.', recommends: true },
  { text: 'Üyelik süreci biraz yavaş ilerliyor ama sonrasında her şey yolunda.', recommends: true },
  { text: 'Beklediğimden daha az aktif, çoğu etkinlik iptal oldu.', recommends: false },
]

const professorNames = [
  'Ahmet Yılmaz',
  'Ayşe Demir',
  'Burak Şahin',
  'Cem Aydın',
  'Çağla Erdem',
  'Deniz Arslan',
  'Elif Korkmaz',
  'Emre Doğan',
  'Fatma Çelik',
  'Hakan Koç',
  'İrem Polat',
  'Kerem Aksoy',
  'Mehmet Kaya',
  'Merve Kılıç',
  'Murat Öztürk',
  'Selin Yıldız',
  'Serkan Güneş',
  'Tolga Uçar',
  'Zeynep Kaya',
]

export const professors: Professor[] = professorNames.map((name) => ({
  slug: slugify(name),
  name,
}))

export const courses: Course[] = [
  { code: 'CENG301', name: 'Data Structures' },
  { code: 'CENG315', name: 'Operating Systems' },
  { code: 'CS101', name: 'Introduction to Computer Science' },
  { code: 'CS201', name: 'Algorithms' },
  { code: 'CS342', name: 'Database Systems' },
  { code: 'ECON101', name: 'Principles of Economics' },
  { code: 'ENG102', name: 'Academic Writing' },
  { code: 'HIST201', name: 'History of Science' },
  { code: 'MATH101', name: 'Mathematics I' },
  { code: 'MATH102', name: 'Mathematics II' },
  { code: 'MATH201', name: 'Linear Algebra' },
  { code: 'MATH251', name: 'Probability' },
  { code: 'PHY101', name: 'Physics I' },
  { code: 'PHY201', name: 'Electromagnetism' },
  { code: 'STAT210', name: 'Statistics for Engineers' },
].map((c) => ({ ...c, slug: c.code.toLowerCase() }))

export const clubs: Club[] = [
  { name: 'AI Society', description: 'Yapay zekâ ve makine öğrenmesiyle ilgilenen öğrencilerin oluşturduğu öğrenci topluluğu.', members: 248, founded: '2019' },
  { name: 'Astronomi Kulübü', description: 'Gözlem geceleri, teleskop atölyeleri ve gökyüzüne meraklı herkes için düzenli buluşmalar.', members: 132, founded: '2012' },
  { name: 'Bisiklet Topluluğu', description: 'Hafta sonu sürüşleri, bakım atölyeleri ve kampüs içi bisiklet kültürünü geliştirme çalışmaları.', members: 87, founded: '2016' },
  { name: 'Dağcılık Kulübü', description: 'Doğa yürüyüşleri, tırmanış eğitimleri ve yıl boyu süren kamp programları.', members: 164, founded: '2008' },
  { name: 'Fotoğrafçılık Kulübü', description: 'Temel teknik eğitimleri, foto yürüyüşleri ve dönem sonu sergisiyle görsel bir topluluk.', members: 119, founded: '2011' },
  { name: 'Girişimcilik Kulübü', description: 'Fikir aşamasından ürüne giden yolda mentorluk, hackathon ve demo günleri düzenleyen topluluk.', members: 203, founded: '2015' },
  { name: 'Münazara Kulübü', description: 'Haftalık münazara pratikleri ve ulusal turnuvalara hazırlık çalışmaları.', members: 74, founded: '2010' },
  { name: 'Müzik Topluluğu', description: 'Jam session’lar, kampüs konserleri ve her seviyeden müzisyene açık provalar.', members: 156, founded: '2009' },
  { name: 'Satranç Kulübü', description: 'Açık turnuvalar, başlangıç eğitimleri ve kulüpler arası ligde takım mücadelesi.', members: 68, founded: '2013' },
  { name: 'Tiyatro Topluluğu', description: 'Her dönem sahnelenen oyunlar, doğaçlama atölyeleri ve sahne arkası ekipleri.', members: 91, founded: '2007' },
  { name: 'Yazılım Kulübü', description: 'Açık kaynak projeler, teknik konuşmalar ve birlikte kod yazma akşamları.', members: 312, founded: '2014' },
].map((c) => ({ ...c, slug: slugify(c.name) }))

const professorComments = new Map<string, ReviewComment[]>()
professors.forEach((p, i) => {
  professorComments.set(
    p.slug,
    buildComments(p.slug, i * 13 + 3, professorPool, 4 + (i % 4), courses.map((c) => c.code)),
  )
})

const courseComments = new Map<string, ReviewComment[]>()
courses.forEach((c, i) => {
  courseComments.set(c.slug, buildComments(c.slug, i * 17 + 5, coursePool, 3 + (i % 5)))
})

const clubComments = new Map<string, ReviewComment[]>()
clubs.forEach((c, i) => {
  clubComments.set(c.slug, buildComments(c.slug, i * 19 + 11, clubPool, 3 + (i % 4)))
})

export function getProfessor(slug: string) {
  return professors.find((p) => p.slug === slug)
}
export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug)
}
export function getClub(slug: string) {
  return clubs.find((c) => c.slug === slug)
}
export function getProfessorComments(slug: string) {
  return professorComments.get(slug) ?? []
}
export function getCourseComments(slug: string) {
  return courseComments.get(slug) ?? []
}
export function getClubComments(slug: string) {
  return clubComments.get(slug) ?? []
}

export const notes: Note[] = [
  { id: 'n1', title: 'Calculus 1 — Vize Notları', course: 'MATH101', author: 'pixelmaster', time: '2 gün önce', fileType: 'PDF', size: '2.4 MB', pages: 38 },
  { id: 'n2', title: 'Limit ve Türev Soru Bankası', course: 'MATH101', author: 'studybug', time: '1 hafta önce', fileType: 'PDF', size: '4.1 MB', pages: 64 },
  { id: 'n3', title: 'Python ile Programlamaya Giriş', course: 'CS101', author: 'codewizard', time: '3 gün önce', fileType: 'PPTX', size: '8.7 MB' },
  { id: 'n4', title: 'CS101 Final Özeti', course: 'CS101', author: 'nightowl', time: '2 hafta önce', fileType: 'PDF', size: '1.2 MB', pages: 12 },
  { id: 'n5', title: 'Maxwell Denklemleri — Ders Notu', course: 'PHY201', author: 'quietlibrary', time: '5 gün önce', fileType: 'PDF', size: '3.3 MB', pages: 27 },
  { id: 'n6', title: 'Elektrik Alan Çözümlü Örnekler', course: 'PHY201', author: 'campuscat', time: '1 ay önce', fileType: 'DOCX', size: '920 KB' },
  { id: 'n7', title: 'Ağaç Yapıları ve Graf Algoritmaları', course: 'CENG301', author: 'lambdacat', time: '4 gün önce', fileType: 'PDF', size: '5.6 MB', pages: 41 },
  { id: 'n8', title: 'Linked List Lab Çözümleri', course: 'CENG301', author: 'deadlinehero', time: '1 hafta önce', fileType: 'ZIP', size: '640 KB' },
  { id: 'n9', title: 'Matris ve Determinant Özeti', course: 'MATH201', author: 'coffeeloop', time: '6 gün önce', fileType: 'PDF', size: '1.8 MB', pages: 16 },
  { id: 'n10', title: 'Big-O Notasyonu Cheat Sheet', course: 'CS201', author: 'codewizard', time: '2 gün önce', fileType: 'PDF', size: '480 KB', pages: 2 },
  { id: 'n11', title: 'Dinamik Programlama Örnekleri', course: 'CS201', author: 'midtermghost', time: '3 hafta önce', fileType: 'PDF', size: '2.9 MB', pages: 22 },
  { id: 'n12', title: 'Kinematik Formül Kartları', course: 'PHY101', author: 'sunsetstudent', time: '1 gün önce', fileType: 'PDF', size: '760 KB', pages: 6 },
]

export const forumCategories: ForumCategory[] = [
  'Genel',
  'Dersler',
  'Sınavlar',
  'Kampüs',
  'Kariyer',
  'Staj',
  'Teknoloji',
  'Sosyal',
]

export const forumTopics: ForumTopic[] = [
  {
    id: 'final-haftasi-calisma',
    title: 'Final haftasında nasıl çalışıyorsunuz?',
    author: 'nightowl',
    time: '2 saat önce',
    category: 'Dersler',
    score: 42,
    content:
      'Üç finalim art arda iki güne denk geldi. Pomodoro denedim ama uzun süre odaklanamıyorum. Siz final haftasını nasıl planlıyorsunuz? Kütüphane mi, ev mi, grup çalışması mı?',
    comments: [
      {
        id: 'c1',
        author: 'studybug',
        time: '1 saat önce',
        text: 'Her ders için bir gün ayırmak yerine günü ikiye bölüyorum: sabah yeni konu, öğleden sonra eski sınav çözümü. Çok daha az sıkılıyorum.',
        score: 18,
        replies: [
          {
            id: 'c1-1',
            author: 'nightowl',
            time: '58 dk önce',
            text: 'Bu mantıklı. Eski sınavları nereden buluyorsun?',
            score: 4,
            replies: [
              {
                id: 'c1-1-1',
                author: 'studybug',
                time: '45 dk önce',
                text: 'Notlar bölümünde birçok dersin geçmiş yıl soruları var. Bir de bölüm kulübünün arşivi çok iyi.',
                score: 9,
                replies: [],
              },
            ],
          },
          {
            id: 'c1-2',
            author: 'coffeeloop',
            time: '40 dk önce',
            text: 'Aynı yöntemi kullanıyorum, öğleden sonra kütüphanenin üçüncü katı en sessiz yer.',
            score: 6,
            replies: [],
          },
        ],
      },
      {
        id: 'c2',
        author: 'codewizard',
        time: '50 dk önce',
        text: 'Telefonu başka odaya koymak her tekniği yeniyor. Ciddi söylüyorum.',
        score: 27,
        replies: [
          {
            id: 'c2-1',
            author: 'campuscat',
            time: '30 dk önce',
            text: 'Bunu deneyip üç saat aralıksız çalıştım. Kendime şaşırdım.',
            score: 5,
            replies: [],
          },
        ],
      },
      {
        id: 'c3',
        author: 'midtermghost',
        time: '20 dk önce',
        text: 'Grup çalışması sadece konuyu zaten bildiğinizde işe yarıyor, yoksa sohbete dönüyor.',
        score: 3,
        replies: [],
      },
    ],
  },
  {
    id: 'math101-kaynak',
    title: 'MATH101 için kaynak önerisi',
    author: 'pixelmaster',
    time: '5 saat önce',
    category: 'Dersler',
    score: 17,
    content:
      'Derste kullanılan kitap bana biraz ağır geliyor. Daha anlaşılır bir kaynak ya da video serisi öneren var mı? Özellikle limit ve süreklilik konularında zorlanıyorum.',
    comments: [
      {
        id: 'c1',
        author: 'lambdacat',
        time: '4 saat önce',
        text: 'Thomas Calculus’un ilk bölümleri çok açık. Her alt başlıktan sonra çözümlü örnekler var.',
        score: 11,
        replies: [
          {
            id: 'c1-1',
            author: 'pixelmaster',
            time: '3 saat önce',
            text: 'Kütüphanede var mı biliyor musun?',
            score: 2,
            replies: [
              {
                id: 'c1-1-1',
                author: 'quietlibrary',
                time: '2 saat önce',
                text: 'İkinci katta referans bölümünde üç kopya var, ödünç verilmiyor ama orada çalışabilirsin.',
                score: 7,
                replies: [],
              },
            ],
          },
        ],
      },
      {
        id: 'c2',
        author: 'sunsetstudent',
        time: '3 saat önce',
        text: 'Notlar kısmında Calculus 1 vize notları var, bence oradan başla.',
        score: 5,
        replies: [],
      },
    ],
  },
  {
    id: 'yapay-zeka-ders-calismak',
    title: 'Yapay zekâ ile ders çalışmak mantıklı mı?',
    author: 'codewizard',
    time: '1 gün önce',
    category: 'Teknoloji',
    score: 64,
    content:
      'Son zamanlarda konu özetleri ve pratik sorular için yapay zekâ araçlarını kullanıyorum. Hız kazandırdığı kesin ama gerçekten öğrenip öğrenmediğimden emin değilim. Deneyimleriniz neler?',
    comments: [
      {
        id: 'c1',
        author: 'quietlibrary',
        time: '22 saat önce',
        text: 'Konuyu önce kendim çalışıp sonra kendimi test ettirmek için kullanınca çok faydalı. Doğrudan cevap istediğimde hiçbir şey kalmıyor.',
        score: 31,
        replies: [
          {
            id: 'c1-1',
            author: 'deadlinehero',
            time: '20 saat önce',
            text: 'Aynen. Bir de verdiği cevapları mutlaka kaynakla kontrol etmek lazım, bazen çok emin şekilde yanlış söylüyor.',
            score: 14,
            replies: [
              {
                id: 'c1-1-1',
                author: 'codewizard',
                time: '18 saat önce',
                text: 'Özellikle matematik ispatlarında bunu çok yaşadım.',
                score: 6,
                replies: [],
              },
            ],
          },
        ],
      },
      {
        id: 'c2',
        author: 'bluehoodie',
        time: '19 saat önce',
        text: 'Kod yazarken açıklama istemek için harika. Ama ödevi yazdırmak tamamen başka bir şey.',
        score: 12,
        replies: [],
      },
    ],
  },
  {
    id: 'vize-tarihleri-cakisma',
    title: 'Vize tarihleri çakışınca ne yapılıyor?',
    author: 'midtermghost',
    time: '1 gün önce',
    category: 'Sınavlar',
    score: 23,
    content:
      'İki dersin vizesi aynı gün aynı saate konmuş. Bölüm sekreterliğine mi gitmek lazım yoksa doğrudan hocaya mı yazmalıyım?',
    comments: [
      {
        id: 'c1',
        author: 'studybug',
        time: '1 gün önce',
        text: 'Önce iki hocaya da aynı maili at, sonra sekreterliğe bilgi ver. Genelde mazeret sınavı ayarlanıyor.',
        score: 15,
        replies: [
          {
            id: 'c1-1',
            author: 'midtermghost',
            time: '20 saat önce',
            text: 'Teşekkürler, yazdım bile.',
            score: 2,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 'yazilim-staji-basvuru',
    title: 'Yaz stajı başvuruları için ne zaman başlamalı?',
    author: 'deadlinehero',
    time: '2 gün önce',
    category: 'Staj',
    score: 38,
    content:
      'İkinci sınıfım ve ilk kez staj başvurusu yapacağım. Büyük şirketlerin başvuruları ne zaman açılıyor, CV’ye neler koymak gerekiyor?',
    comments: [
      {
        id: 'c1',
        author: 'lambdacat',
        time: '2 gün önce',
        text: 'Büyük şirketler genelde ekim–aralık arası açıyor. Ocak sonunda çoğu kapanmış oluyor, erken başla.',
        score: 21,
        replies: [],
      },
      {
        id: 'c2',
        author: 'bluehoodie',
        time: '1 gün önce',
        text: 'Kulüp projeleri CV’de çok işe yarıyor. Ben Yazılım Kulübü’ndeki projeyle mülakata çağrıldım.',
        score: 9,
        replies: [
          {
            id: 'c2-1',
            author: 'deadlinehero',
            time: '1 gün önce',
            text: 'Hangi proje olduğunu sorabilir miyim?',
            score: 1,
            replies: [
              {
                id: 'c2-1-1',
                author: 'bluehoodie',
                time: '1 gün önce',
                text: 'Kampüs etkinlik takvimi uygulaması. Basit ama baştan sona kendimiz yaptık.',
                score: 4,
                replies: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'kampus-kafeterya',
    title: 'Kampüste en iyi kahve nerede?',
    author: 'coffeeloop',
    time: '3 gün önce',
    category: 'Kampüs',
    score: 51,
    content: 'Ana kafeterya dışında iyi kahve yapan bir yer arıyorum. Mühendislik binasının oralarda bir şey var mı?',
    comments: [
      {
        id: 'c1',
        author: 'campuscat',
        time: '3 gün önce',
        text: 'Kütüphanenin girişindeki küçük kiosk. Sabah sekizde gidin, sonra kuyruk oluyor.',
        score: 19,
        replies: [],
      },
      {
        id: 'c2',
        author: 'sunsetstudent',
        time: '2 gün önce',
        text: 'Fen fakültesinin arka bahçesindeki yer hem ucuz hem sessiz.',
        score: 8,
        replies: [],
      },
    ],
  },
  {
    id: 'mezuniyet-sonrasi-kariyer',
    title: 'Mezuniyet sonrası yüksek lisans mı, iş mi?',
    author: 'sunsetstudent',
    time: '4 gün önce',
    category: 'Kariyer',
    score: 29,
    content:
      'Son sınıftayım ve bir türlü karar veremiyorum. İş deneyimi kazanıp sonra mı yüksek lisans yapmalı, yoksa doğrudan devam mı etmeli?',
    comments: [
      {
        id: 'c1',
        author: 'quietlibrary',
        time: '4 gün önce',
        text: 'Akademiye gitmeyi düşünmüyorsan önce iş. Neyle ilgilendiğini daha net görürsün.',
        score: 13,
        replies: [],
      },
    ],
  },
  {
    id: 'bahar-senligi',
    title: 'Bahar şenliği programı açıklandı mı?',
    author: 'campuscat',
    time: '5 gün önce',
    category: 'Sosyal',
    score: 12,
    content: 'Geçen yıl nisan sonundaydı. Bu yıl konser listesi hakkında bilgisi olan var mı?',
    comments: [
      {
        id: 'c1',
        author: 'bluehoodie',
        time: '5 gün önce',
        text: 'Öğrenci konseyi önümüzdeki hafta açıklayacağını söyledi.',
        score: 6,
        replies: [],
      },
    ],
  },
  {
    id: 'yeni-gelenlere-tavsiye',
    title: 'Yeni gelenlere tek bir tavsiyeniz olsa?',
    author: 'studybug',
    time: '1 hafta önce',
    category: 'Genel',
    score: 87,
    content: 'Hazırlıktan yeni geçen arkadaşlar için toparlayalım. Keşke ilk yılımda bilseydim dediğiniz şey ne?',
    comments: [
      {
        id: 'c1',
        author: 'nightowl',
        time: '1 hafta önce',
        text: 'Ofis saatlerine gidin. Hocalar sandığınızdan çok daha yardımsever.',
        score: 34,
        replies: [
          {
            id: 'c1-1',
            author: 'studybug',
            time: '6 gün önce',
            text: 'Kesinlikle. İlk yıl bir kere bile gitmemiştim, büyük hataymış.',
            score: 8,
            replies: [],
          },
        ],
      },
      {
        id: 'c2',
        author: 'lambdacat',
        time: '6 gün önce',
        text: 'En az bir kulübe katılın. Arkadaş çevresi tamamen oradan oluşuyor.',
        score: 22,
        replies: [],
      },
    ],
  },
  {
    id: 'algoritma-sinavi-zorluk',
    title: 'CS201 finali ne kadar zor?',
    author: 'lambdacat',
    time: '1 hafta önce',
    category: 'Sınavlar',
    score: 19,
    content: 'Geçen dönem alanlar anlatabilir mi? Ağırlıklı olarak ispat mı soruluyor yoksa algoritma tasarımı mı?',
    comments: [
      {
        id: 'c1',
        author: 'codewizard',
        time: '1 hafta önce',
        text: 'Yarısı tasarım, yarısı karmaşıklık analizi. Dinamik programlama mutlaka geliyor.',
        score: 16,
        replies: [],
      },
    ],
  },
]

export function getForumTopic(id: string) {
  return forumTopics.find((t) => t.id === id)
}

export function countComments(comments: ForumComment[]): number {
  return comments.reduce((sum, c) => sum + 1 + countComments(c.replies), 0)
}
