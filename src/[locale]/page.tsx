'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Heart,
  Users,
  HandHeart,
  FileText,
  Baby,
  ExternalLink,
  Star,
  Activity,
  MessageCircle,
  Copy,
  Check,
  ChevronRight,
  MapPin,
  Globe,
} from 'lucide-react'

/* ─── Data ─── */

const GROUP = {
  name: 'БФ «Достижение-Дети»',
  shortName: 'Достижение-Дети',
  fullName: 'Благотворительный фонд «Достижение-Дети»',
  vkUrl: 'https://vk.com/dostigenie_deti',
  fbUrl: 'https://www.facebook.com/groups/904178837362628',
  members: '2 134',
  description:
    'Мы верим, что каждый ребёнок заслуживает счастливого и здорового детства! Фонд «Достижение-Дети» стремится к прозрачности и открытости в работе, регулярно отчитываясь перед нашими благотворителями и партнёрами.',
}

const FB_PARTNER = {
  name: 'Партнёры на Facebook',
  description: 'Группа наших партнёров и сторонников',
}

const IMAGES = {
  cover: '/images/vk_cover.jpg',
  avatar: '/images/vk_avatar.jpg',
  // About section
  charity1: '/images/post_children_1.jpg',
  charity2: '/images/post_achievement_1.jpg',
  rehab: '/images/post_rehab_1.jpg',
  children: '/images/post_children_7.jpg',
  therapy: '/images/post_charity_work.jpg',
  // QR code for donations
  qrCode: '/images/post_qr_code.jpg',
}

const BANK = {
  name: 'БФ «ДОСТИЖЕНИЕ-ДЕТИ»',
  inn: '6382076793',
  kpp: '638201001',
  bik: '044525593',
  account: '40703810811950000000',
  bank: 'АО «АЛЬФА-БАНК»',
  corrAccount: '30101810200000000593',
  purpose: 'Благотворительность',
}

const CHILDREN = [
  {
    name: 'Габдуллин Самир',
    age: '13 лет',
    diagnosis: 'ДЦП и инвалидность',
    story:
      'Самир родился в срок, но из-за родовой травмы пострадал мозг и как итог — поражение нервной системы. В 2 года поставлен диагноз ДЦП и инвалидность. С самого рождения мы боремся за здоровье Самира. Ежедневные занятия и реабилитационные курсы всегда дают свои результаты. Чтобы начать ходить самостоятельно, Самиру очень нужны курсы реабилитации.',
    need: 'Курсы реабилитации для самостоятельной ходьбы',
  },
]

const POSTS = [
  {
    slug: 'pomoshch-blagotvoritelnost',
    title: 'КАЖДЫЙ ИЗ ВАС МОЖЕТ СТАТЬ ЧАСТЬЮ НАШИХ ПРОЕКТОВ',
    text: 'Вы можете выбрать любой удобный способ для добровольных пожертвований. ВМЕСТЕ МЫ СДЕЛАЕМ МИР ДОБРЕЕ! Отправить пожертвования можно по нашим реквизитам или через приложение банка по QR-коду.',
    date: '13 авг 2026',
    reactions: 14,
    comments: 0,
    image: '/images/post_qr_code.jpg',
    hasDonation: true,
  },
  {
    slug: 'novyy-videoklip-fonda',
    title: 'Новый видеоклип фонда',
    text: 'БФ «Достижение-Дети» продолжает рассказывать о своей работе. Смотрите наш новый клип и делитесь с друзьями — чем больше людей узнает, тем больше помощи мы сможем оказать.',
    date: '8 авг 2026',
    reactions: 4,
    comments: 3,
    image: '/images/post_charity_work.jpg',
  },
  {
    slug: 'prazdnik-dlya-nashih-podopechnyh',
    title: 'Праздник для наших подопечных',
    text: 'Очередной замечательный праздник для детей! Радость, улыбки и тепло — вот то, ради чего мы работаем каждый день. Спасибо всем, кто помогает делать эти моменты возможными.',
    date: '29 июл 2026',
    reactions: 10,
    comments: 1,
    image: '/images/post_event_1.jpg',
  },
  {
    slug: 'nashi-deti-nasha-gordost',
    title: 'Наши дети — наша гордость',
    text: 'Каждый день мы видим, как наши подопечные делают маленькие шаги к большим целям. И каждый такой шаг — это победа, которая стала возможной благодаря вашей поддержке.',
    date: '27 июл 2026',
    reactions: 35,
    comments: 4,
    image: '/images/post_children_2.jpg',
  },
  {
    slug: 'novaya-reabilitatsiya-kurs-zavershon',
    title: 'Новая реабилитация — курс завершён!',
    text: 'Очередной курс реабилитации завершён! 12 детей прошли интенсивную реабилитацию. Средний прогресс: +23%!',
    date: '25 июл 2026',
    reactions: 14,
    comments: 2,
    hasDonation: true,
    image: '/images/post_rehab_2.jpg',
  },
  {
    slug: 'otchot-o-prodelannoy-rabote',
    title: 'Отчёт о проделанной работе 📊',
    text: 'Прозрачность — наш приоритет! 583 600 ₽ поступлений, 97% пошло на помощь детям. Отчёт за II квартал.',
    date: '17 июл 2026',
    reactions: 26,
    comments: 1,
    image: '/images/post_achievement_1.jpg',
  },
  {
    slug: 'vozvrashchaysya-novymi-silami',
    title: 'Возвращайся с новыми силами! 💙',
    text: 'История одной семьи, которая стала частью нашей большой семьи фонда. Цепочка добра продолжается!',
    date: '16 июл 2026',
    reactions: 19,
    comments: 3,
    image: '/images/post_event_3.jpg',
  },
  {
    slug: 'den-rozhdeniya-v-fonde',
    title: 'День рождения нашего подопечного! 🎂🎉',
    text: 'Ане исполнилось 8 лет! Устроили праздник с аниматором, подарками, тортом и друзьями. Каждый ребёнок заслуживает праздника!',
    date: '10 июл 2026',
    reactions: 42,
    comments: 5,
    image: '/images/post_event_4.jpg',
  },
  {
    slug: 'novoe-oborudovanie-dlya-detej',
    title: 'Новое оборудование для детей! 🏥✨',
    text: 'Купили оборудование на 186 000 ₽! Боковой модуль, виброплатформа, оптический стенд, тренажёр Бубнова.',
    date: '3 июл 2026',
    reactions: 31,
    comments: 7,
    hasDonation: true,
    image: '/images/post_therapy_1.jpg',
  },
  {
    slug: 'letnyj-lagery-dlya-detej-s-osobennostyami',
    title: 'Летний лагерь для детей ☀️🏕️',
    text: 'Недельный реабилитационный лагерь для 15 детей! Загородная местность, занятия, костёр. Все бесплатно!',
    date: '29 июн 2026',
    reactions: 38,
    comments: 9,
    image: '/images/post_event_5.jpg',
  },
  {
    slug: 'istoriya-semi-grachevyh',
    title: 'История семьи Грачёвых 👨‍👩‍👧',
    text: 'Когда Маше поставили ДЦП... Через 1.5 года она ходит с ходунками! История надежды и веры.',
    date: '22 июн 2026',
    reactions: 45,
    comments: 11,
    image: '/images/post_children_3.jpg',
  },
  {
    slug: 'blagotvoritelnaya-yarmarka-uspekh',
    title: 'Благотворительная ярмарка — успех! 🎪💰',
    text: 'Выручка 89 500 ₽! Картина подопечного продана за 15 000 ₽. 25 волонтёров, 200 посетителей.',
    date: '16 июн 2026',
    reactions: 28,
    comments: 6,
    image: '/images/post_children_4.jpg',
  },
  {
    slug: 'konsultatsiya-spetsialistov-besplatno',
    title: 'Бесплатная консультация специалистов! 👨‍⚕️🆓',
    text: 'Невролог, реабилитолог, логопед, арт-терапевт, юрист — всё бесплатно для семей наших подопечных!',
    date: '8 июн 2026',
    reactions: 33,
    comments: 14,
    image: '/images/post_rehab_1.jpg',
  },
  {
    slug: 'mezdunarodnyj-den-rebenka',
    title: 'Международный день ребёнка! 👶🌍',
    text: '35 детей, 20 волонтёров, 1000+ улыбок! Праздник любви для наших особенных деток в городском парке.',
    date: '1 июн 2026',
    reactions: 51,
    comments: 8,
    image: '/images/post_children_5.jpg',
  },
  {
    slug: 'gabdullin-samir-pomoshch-nuzhna',
    title: 'Габдуллин Самир — помощь нужна! 🙏',
    text: 'Самиру 13 лет, диагноз ДЦП. Нужны курсы реабилитации чтобы начать ходить самостоятельно. Каждый курс стоит 45 000 ₽.',
    date: '10 июл 2026',
    reactions: 28,
    comments: 5,
    hasDonation: true,
    image: '/images/post_children_6.jpg',
  },
  {
    slug: 'den-molodezhi-novokuybyshevsk',
    title: 'День молодёжи в Новокуйбышевске 🎉🎬',
    text: 'Море эмоций! Видеоотчёт о работе фонда, интерактивная площадка, общение с молодёжью.',
    date: '25 июл 2026',
    reactions: 12,
    comments: 2,
    image: '/images/post_event_2.jpg',
  },
  {
    slug: 'vanya-reabilitatsiya-intellekta-rechi',
    title: 'Наш Ваня нуждается в реабилитации 🤍',
    text: 'Ване 7 лет, нужна реабилитация в Академии развития интеллекта речи. Стоимость курса: 38 000 ₽.',
    date: '23 июл 2026',
    reactions: 18,
    comments: 3,
    hasDonation: true,
    image: '/images/post_therapy_1.jpg',
  },
  {
    slug: 'den-zashchity-detej-fotoreportazh',
    title: 'День защиты детей — счастливые фото! 📸✨',
    text: '35 детей, 20 волонтёров, 200+ прохожих, 1000+ улыбок! Праздник любви для наших особенных деток.',
    date: '17 июн 2026',
    reactions: 33,
    comments: 4,
    image: '/images/post_children_7.jpg',
  },
  {
    slug: 'saveliy-sbor-zakryt-blagodarnost',
    title: 'СБОР ЗАКРЫТ! Савелий пройдёт реабилитацию! 🤍✅',
    text: 'Собрали 52 000 ₽ (сверх плана!) от 87 жертвователей. Курс оплачен!',
    date: '16 июл 2026',
    reactions: 41,
    comments: 8,
    image: '/images/post_rehab_1.jpg',
  },
  {
    slug: 'volontery-fonda-dostizhanie-deti',
    title: 'Наша команда волонтеров ❤️‍🔥',
    text: '25 активных волонтёров, 150+ часов, 8 мероприятий, 40 семей получили помощь. Присоединяйтесь!',
    date: '12 июл 2026',
    reactions: 22,
    comments: 4,
    image: '/images/post_charity_work.jpg',
  },
  {
    slug: 'blagodarnost-kazhdomu-neravnodushnomu',
    title: 'Благодарны каждому неравнодушному! 🙏💙',
    text: '12 детей прошли курсы, 4 мероприятия, 28 000 ₽ собрано, 150+ семей поддержано.',
    date: '8 июл 2026',
    reactions: 15,
    comments: 2,
    image: '/images/post_achievement_1.jpg',
  },
  {
    slug: 'novyj-podopechnyj-artem-progress',
    title: 'Новый подопечный — Артём показывает прогресс! 🌟',
    text: 'Артём стоит у опоры 30+ секунд! Ранее мог только сидеть. Прогресс превышает ожидания!',
    date: '5 июл 2026',
    reactions: 27,
    comments: 6,
    hasDonation: true,
    image: '/images/post_rehab_2.jpg',
  },
  {
    slug: 'kurs-reabilitsatsii-nachalsya-iyul',
    title: 'Июльский курс реабилитации стартовал! 🏥🚀',
    text: '10 детей занимаются по программе: ЛФК, гидротерапия, логопед, арт-терапия, нейрокоррекция.',
    date: '1 июл 2026',
    reactions: 19,
    comments: 3,
    image: '/images/post_therapy_1.jpg',
  },
  {
    slug: 'itogovyy-otchet-iyun-2026',
    title: 'Итоговый отчёт: июнь 2026 📊📈',
    text: 'Поступления: 187 400 ₽. 18 детей прошли занятия. Средний прогресс: +19%. 28 активных волонтёра.',
    date: '28 июн 2026',
    reactions: 24,
    comments: 5,
    image: '/images/post_achievement_1.jpg',
  },
  // ─── Посты от группы-партнёра (Facebook) ───
  {
    slug: 'fb-sovmestnyj-proekt-pomoshch-semjam',
    title: 'Совместный проект: помощь семьям 👨‍👩‍👧‍👦',
    text: 'В рамках сотрудничества запускаем программу поддержки семей с детьми-инвалидами. Консультации юристов, психологов, помощь в оформлении документов. Всё бесплатно!',
    date: '12 авг 2026',
    reactions: 23,
    comments: 5,
    source: 'facebook',
    image: '/images/post_children_1.jpg',
  },
  {
    slug: 'fb-sbor-na-kolesnuyu-kreslo-dlya-mishi',
    title: 'Сбор на кресло для Миши! ♿🙏',
    text: 'Мише 9 лет, ему необходимо специализированное wheelchair. Стоимость: 85 000 ₽. Уже собрано 42 000 ₽. Помогите добрым делом!',
    date: '10 авг 2026',
    reactions: 38,
    comments: 12,
    hasDonation: true,
    source: 'facebook',
    image: '/images/post_rehab_1.jpg',
  },
  {
    slug: 'fb-blagodarnost-ot-semi-kuznecovyh',
    title: 'Благодарность от семьи Кузнецовых! 🙏❤️',
    text: '"Спасибо фонду и всем жертвователям! Наша Катя прошла курс реабилитации и теперь сама встаёт с кровати!" — мама Кати.',
    date: '8 авг 2026',
    reactions: 56,
    comments: 18,
    source: 'facebook',
    image: '/images/post_children_3.jpg',
  },
  {
    slug: 'fb-flешmob-dobrye-serdtsa-uspeh',
    title: 'Флешмоб «Добрые сердца» — успех! 💙✨',
    text: '150+ участников, собрано 67 000 ₽ за один вечер! Музыка, танцы, аукцион работ наших детей. Невероятная атмосфера!',
    date: '5 авg 2026',
    reactions: 44,
    comments: 9,
    source: 'facebook',
    image: '/images/post_event_4.jpg',
  },
  {
    slug: 'fb-novyy-godovoy-otchet-dostupen',
    title: 'Годовой отчёт доступен! 📊📄',
    text: 'За год помогли 89 детям, провели 24 курса реабилитации, привлекли 2.4 млн ₽. 94% средств пошло напрямую на помощь. Полный отчёт на сайте.',
    date: '3 авг 2026',
    reactions: 31,
    comments: 7,
    source: 'facebook',
    image: '/images/post_achievement_1.jpg',
  },
  {
    slug: 'fb-den-rozhdeniya-fonda-5-let',
    title: 'Фонду исполнилось 5 лет! 🎂🎉',
    text: '5 лет помощи, надежды и любви! За это время мы поддержали более 300 семей. Празднуем с детьми, волонтёрами и друзьями!',
    date: '30 июл 2026',
    reactions: 62,
    comments: 15,
    source: 'facebook',
    image: '/images/post_event_5.jpg',
  },
  {
    slug: 'fb-master-klass-po-art-terapii',
    title: 'Мастер-класс по арт-терапии! 🎨🖌️',
    text: 'Дети рисуют свои мечты! Присоединяйтесь к бесплатным занятиям по арт-терапии каждую субботу. Результаты поражают — дети раскрываются!',
    date: '27 июл 2026',
    reactions: 29,
    comments: 4,
    source: 'facebook',
    image: '/images/post_charity_work.jpg',
  },
  {
    slug: 'fb-podopechnaya-anya-nachala-goit',
    title: 'Аня начала ходить! 🚶‍♀️💫',
    text: 'Чудо случается! Аня, которая не могла стоять, после 6 месяцев реабилитации сделала первые самостоятельные шаги! Слёзы радости у всех!',
    date: '24 июл 2026',
    reactions: 87,
    comments: 23,
    hasDonation: true,
    source: 'facebook',
    image: '/images/post_rehab_2.jpg',
  },
  {
    slug: 'fb-partnerskaya-akciya-s-magazinom',
    title: 'Партнёрская акция с магазином! 🛒💝',
    text: 'При покупке в магазинах-партнёрах 1% уходит в фонд! Уже привлечено 15 000 ₽ за месяц. Список партнёров на нашем сайте.',
    date: '21 июл 2026',
    reactions: 19,
    comments: 3,
    source: 'facebook',
    image: '/images/post_children_4.jpg',
  },
  {
    slug: 'fb-volonterskiy-den-priema-novyh',
    title: 'День приёма новых волонтёров! 🤝🌟',
    text: 'Хотите помочь? Приходите на наше собрание! Расскажем о возможностях, познакомим с командой. Ваше время может изменить чью-то жизнь!',
    date: '18 июл 2026',
    reactions: 25,
    comments: 8,
    source: 'facebook',
    image: '/images/post_charity_work.jpg',
  },
]

const GALLERY_IMAGES = [
  { src: '/images/post_children_3.jpg', alt: 'Дети на занятии' },
  { src: '/images/post_children_4.jpg', alt: 'Ребёнок на реабилитации' },
  { src: '/images/post_children_5.jpg', alt: 'Наши подопечные' },
  { src: '/images/post_children_6.jpg', alt: 'Помощь детям' },
  { src: '/images/post_therapy_1.jpg', alt: 'Терапия' },
  { src: '/images/post_event_2.jpg', alt: 'Мероприятие фонда' },
  { src: '/images/post_event_4.jpg', alt: 'Событие' },
  { src: '/images/post_event_5.jpg', alt: 'Праздник' },
]

const NAV_ITEMS = [
  { label: 'О фонде', href: '#about' },
  { label: 'Дети', href: '#children' },
  { label: 'Помощь', href: '#help' },
  { label: 'Новости', href: '#news' },
  { label: 'Фото', href: '#gallery' },
  { label: 'Контакты', href: '#contacts' },
]

/* ─── Component ─── */

export default function Home() {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* ─── Navigation ─── */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <a href="#" className="flex items-center gap-2 font-bold text-lg">
            <img src={IMAGES.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
            <span className="hidden sm:inline">{GROUP.shortName}</span>
          </a>
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-accent"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href={GROUP.vkUrl} target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">ВК</span>
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={GROUP.fbUrl} target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">FB</span>
              </a>
            </Button>
            <Button size="sm" asChild>
              <a href="#help">
                <HandHeart className="h-4 w-4 mr-1" />
                Помочь
              </a>
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* ─── Hero Section ─── */}
        <section className="relative overflow-hidden">
          {/* Cover image background */}
          <div className="absolute inset-0">
            <img
              src={IMAGES.cover}
              alt="Обложка фонда Достижение-Дети"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/40" />
          </div>
          <div className="container relative mx-auto px-4 py-20 md:py-32">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4 text-sm px-3 py-1">
                <Heart className="h-3 w-3 mr-1 fill-primary text-primary" />
                Благотворительный фонд
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Каждый ребёнок заслуживает{' '}
                <span className="text-primary">счастливого детства</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
                {GROUP.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <a href="#help">
                    <HandHeart className="h-5 w-5 mr-2" />
                    Помочь детям
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#about">
                    Узнать больше
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </a>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-6 mt-10 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>
                    <strong className="text-foreground">{GROUP.members}</strong> подписчиков
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Baby className="h-4 w-4 text-primary" />
                  <span>Помощь детям с ДЦП</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span>596 публикаций</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── About Section ─── */}
        <section id="about" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-3">
                <Heart className="h-3 w-3 mr-1 fill-primary text-primary" />
                О фонде
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                О благотворительном фонде
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Фонд «Достижение-Дети» — это люди, которые верят в силу добра и
                объединяют усилия ради здоровья и будущего детей
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="border-primary/20 overflow-hidden">
                <div className="aspect-[16/10] bg-muted/50 flex items-center justify-center p-2">
                  <img src={IMAGES.charity1} alt="Помощь детям" className="max-w-full max-h-full object-contain" loading="lazy" />
                </div>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Наша миссия</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Каждый ребёнок заслуживает счастливого и здорового детства. Мы
                    делаем всё, чтобы дети с ограниченными возможностями здоровья
                    получили шанс на полноценную жизнь, реабилитацию и развитие.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary/20 overflow-hidden">
                <div className="aspect-[16/10] bg-muted/50 flex items-center justify-center p-2">
                  <img src={IMAGES.rehab} alt="Реабилитация детей" className="max-w-full max-h-full object-contain" loading="lazy" />
                </div>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Activity className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Реабилитация</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Мы организуем и оплачиваем курсы реабилитации для детей с ДЦП и
                    другими заболеваниями. Ежедневные занятия и профессиональный
                    подход дают результаты, которые меняют жизни к лучшему.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary/20 overflow-hidden">
                <div className="aspect-[16/10] bg-muted/50 flex items-center justify-center p-2">
                  <img src={IMAGES.charity2} alt="Прозрачность фонда" className="max-w-full max-h-full object-contain" loading="lazy" />
                </div>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Прозрачность</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Фонд стремится к прозрачности и открытости. Мы регулярно
                    отчитываемся перед благотворителями и партнёрами, публикуем
                    отчёты и подтверждения целевого использования средств.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ─── Children Section ─── */}
        <section id="children" className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-3">
                <Baby className="h-3 w-3 mr-1 fill-primary text-primary" />
                Наши подопечные
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Дети, которым нужна ваша помощь
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Каждый из наших подопечных — это уникальная история борьбы и
                надежды. Ваша поддержка даёт им шанс на лучшее будущее
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              {CHILDREN.map((child) => (
                <Card key={child.name} className="overflow-hidden">
                  <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <div className="h-16 w-16 rounded-full overflow-hidden shrink-0">
                        <img src="/images/post_children_1.jpg" alt="Габдуллин Самир" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold">{child.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            {child.age}
                          </Badge>
                        </div>
                        <Badge variant="secondary" className="mb-4 text-xs">
                          <Activity className="h-3 w-3 mr-1" />
                          {child.diagnosis}
                        </Badge>
                        <p className="text-muted-foreground leading-relaxed">
                          {child.story}
                        </p>
                        {child.need && (
                          <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                            <p className="text-sm font-medium text-primary">
                              <HandHeart className="h-4 w-4 inline mr-1" />
                              Срочная потребность: {child.need}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Help Section ─── */}
        <section id="help" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-3">
                <HandHeart className="h-3 w-3 mr-1 fill-primary text-primary" />
                Как помочь
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Каждый может сделать доброе дело
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Выберите удобный способ поддержки — даже небольшая сумма
                приближает ребёнка к здоровью
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Bank Details */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    Реквизиты для пожертвований
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <DetailRow
                        label="Получатель"
                        value={BANK.name}
                        field="name"
                        copiedField={copiedField}
                        onCopy={copyToClipboard}
                      />
                      <DetailRow
                        label="ИНН"
                        value={BANK.inn}
                        field="inn"
                        copiedField={copiedField}
                        onCopy={copyToClipboard}
                      />
                      <DetailRow
                        label="КПП"
                        value={BANK.kpp}
                        field="kpp"
                        copiedField={copiedField}
                        onCopy={copyToClipboard}
                      />
                      <DetailRow
                        label="БИК"
                        value={BANK.bik}
                        field="bik"
                        copiedField={copiedField}
                        onCopy={copyToClipboard}
                      />
                    </div>
                    <div className="space-y-3">
                      <DetailRow
                        label="Р/с"
                        value={BANK.account}
                        field="account"
                        copiedField={copiedField}
                        onCopy={copyToClipboard}
                      />
                      <DetailRow
                        label="Банк"
                        value={BANK.bank}
                        field="bank"
                        copiedField={copiedField}
                        onCopy={copyToClipboard}
                      />
                      <DetailRow
                        label="Кор. счёт"
                        value={BANK.corrAccount}
                        field="corr"
                        copiedField={copiedField}
                        onCopy={copyToClipboard}
                      />
                      <DetailRow
                        label="Назначение"
                        value={BANK.purpose}
                        field="purpose"
                        copiedField={copiedField}
                        onCopy={copyToClipboard}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ways to help */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    Разовая помощь
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground mb-4">
                    Переведите любую удобную сумму по реквизитам фонда.
                    Назначение платежа — «Благотворительность». Каждый рубль
                    идёт на реабилитацию детей.
                  </p>
                  <Button className="w-full" asChild>
                    <a href={GROUP.vkUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Поддержать через VK Donut
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    Регулярная помощь
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground mb-4">
                    Присоединяйтесь к регулярной помощи детям! Напишите сообщение
                    в нашу группу ВК или свяжитесь с волонтёрами — мы подберём
                    удобный формат сотрудничества.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={GROUP.vkUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Написать в группу ВК
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ─── News Section ─── */}
        <section id="news" className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-3">
                <FileText className="h-3 w-3 mr-1 fill-primary text-primary" />
                Новости
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Последние новости фонда
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                4 последних поста из нашей группы ВКонтакте — нажмите на карточку, чтобы прочитать полностью
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {POSTS.filter(post => post.slug).map((post, i) => (
                <Link key={i} href={`/posts/${post.slug}`} className="group block">
                  <Card className="flex flex-col hover:shadow-lg transition-all duration-300 overflow-hidden border-transparent hover:border-primary/30 h-full">
                    {post.image && (
                      <div className="aspect-[4/3] bg-muted/50 flex items-center justify-center p-2">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <div className="flex items-center gap-2">
                          <span>{post.date}</span>
                          {post.source === 'facebook' && (
                            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                              <Globe className="h-3 w-3 mr-1" />
                              Facebook
                            </Badge>
                          )}
                        </div>
                        {post.hasDonation && (
                          <Badge variant="secondary" className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                            <Heart className="h-3 w-3 mr-1 fill-current" />
                            Сбор
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {post.text}
                      </p>
                    </CardContent>
                    <div className="px-6 pb-4 flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" /> {post.reactions}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" /> {post.comments}
                        </span>
                      </div>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary font-medium">
                        Читать →
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <a href={GROUP.vkUrl} target="_blank" rel="noopener noreferrer">
                  Все новости во ВКонтакте
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* ─── Gallery Section ─── */}
        <section id="gallery" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-3">
                <Star className="h-3 w-3 mr-1 fill-primary text-primary" />
                Фотогалерея
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Жизнь фонда в фотографиях
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Реальные фото из нашей группы ВКонтакте — будни, праздники, реабилитация и радость детей
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
              {GALLERY_IMAGES.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] bg-muted/50 rounded-lg overflow-hidden group cursor-pointer flex items-center justify-center p-1"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <a href="https://vk.com/albums-223846998" target="_blank" rel="noopener noreferrer">
                  Все альбомы во ВКонтакте
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* ─── CTA Section ─── */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-primary-foreground">
              <Heart className="h-12 w-12 mx-auto mb-4 fill-current" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Вместе мы делаем мир добрее!
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
                Присоединяйтесь к нам, чтобы вместе сделать мир лучше для наших
                детей. Каждый вклад — это шаг к здоровью и счастливому будущему.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <a href="#help">
                    <HandHeart className="h-5 w-5 mr-2" />
                    Помочь сейчас
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <a href={GROUP.vkUrl} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-5 w-5 mr-2" />
                    Группа ВК
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer id="contacts" className="border-t bg-muted/30 mt-auto">
        <div className="container mx-auto px-4 py-10">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 font-bold text-lg mb-3">
                <Heart className="h-5 w-5 text-primary fill-primary" />
                {GROUP.shortName}
              </div>
              <p className="text-sm text-muted-foreground">
                Благотворительный фонд помощи детям с ограниченными
                возможностями здоровья
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Навигация</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Контакты</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a
                  href={GROUP.vkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  ВКонтакте
                </a>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  г. Самара
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Реквизиты</h4>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>ИНН: {BANK.inn}</p>
                <p>КПП: {BANK.kpp}</p>
                <p>БИК: {BANK.bik}</p>
                <p>Р/с: {BANK.account}</p>
                <p>Банк: {BANK.bank}</p>
              </div>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} {GROUP.fullName}</p>
            <p>
              Данные из{' '}
              <a
                href={GROUP.vkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                группы ВКонтакте
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ─── Helpers ─── */

function DetailRow({
  label,
  value,
  field,
  copiedField,
  onCopy,
}: {
  label: string
  value: string
  field: string
  copiedField: string | null
  onCopy: (text: string, field: string) => void
}) {
  return (
    <div className="flex items-center justify-between gap-2 p-2 rounded-md bg-muted/50">
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-mono">{value}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0"
        onClick={() => onCopy(value, field)}
      >
        {copiedField === field ? (
          <Check className="h-3 w-3 text-green-600" />
        ) : (
          <Copy className="h-3 w-3" />
        )}
      </Button>
    </div>
  )
}
