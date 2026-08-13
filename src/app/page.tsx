'use client'

import { useState } from 'react'
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
  members: '2 134',
  description:
    'Мы верим, что каждый ребёнок заслуживает счастливого и здорового детства! Фонд «Достижение-Дети» стремится к прозрачности и открытости в работе, регулярно отчитываясь перед нашими благотворителями и партнёрами.',
}

const IMAGES = {
  cover: '/images/cover.jpg',
  charity1: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f82e91812815.jpg',
  charity2: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b8b4c8eeb980.jpg',
  rehab: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4abb320963fe.jpg',
  children: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5c2dbc79a225.jpg',
  therapy: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c0abd6998fb8.jpg',
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
    title: 'КАЖДЫЙ ИЗ ВАС МОЖЕТ СТАТЬ ЧАСТЬЮ НАШИХ ПРОЕКТОВ',
    text: 'Вы можете выбрать любой удобный способ для добровольных пожертвований. ВМЕСТЕ МЫ СДЕЛАЕМ МИР ДОБРЕЕ! Отправить пожертвования можно по нашим реквизитам или через приложение банка по QR-коду.',
    date: '13 авг 2026',
    reactions: 14,
    comments: 0,
    image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2780336d22a2.png',
  },
  {
    title: 'Новый видеоклип фонда',
    text: 'БФ «Достижение-Дети» продолжает рассказывать о своей работе. Смотрите наш новый клип и делитесь с друзьями — чем больше людей узнает, тем больше помощи мы сможем оказать.',
    date: '8 авг 2026',
    reactions: 4,
    comments: 3,
    image: IMAGES.therapy,
  },
  {
    title: 'Праздник для наших подопечных',
    text: 'Очередной замечательный праздник для детей! Радость, улыбки и тепло — вот то, ради чего мы работаем каждый день. Спасибо всем, кто помогает делать эти моменты возможными.',
    date: '29 июл 2026',
    reactions: 10,
    comments: 1,
    image: IMAGES.children,
  },
  {
    title: 'Наши дети — наша гордость',
    text: 'Каждый день мы видим, как наши подопечные делают маленькие шаги к большим целям. И каждый такой шаг — это победа, которая стала возможной благодаря вашей поддержке.',
    date: '27 июл 2026',
    reactions: 35,
    comments: 4,
    image: IMAGES.rehab,
  },
  {
    title: 'Новая реабилитация',
    text: 'Очередной курс реабилитации завершён! Мы видим прогресс и благодарим каждого, кто делает эту работу возможной. Вместе мы — сила!',
    date: '25 июл 2026',
    reactions: 14,
    comments: 2,
    hasDonation: true,
    image: IMAGES.charity1,
  },
  {
    title: 'Отчёт о проделанной работе',
    text: 'Мы стремимся к прозрачности и открытости. Ознакомьтесь с нашим очередным отчётом и убедитесь: каждый рубль идёт на помощь детям.',
    date: '17 июл 2026',
    reactions: 26,
    comments: 1,
    image: IMAGES.charity2,
  },
  {
    title: 'Возвращайся с новыми силами!',
    text: 'Дорогой наш друг, возвращайся обновлённым, с новыми силами и хорошим настроением — мы любим тебя очень! Ваша поддержка даёт надежду.',
    date: '16 июл 2026',
    reactions: 19,
    comments: 3,
  },
]

const NAV_ITEMS = [
  { label: 'О фонде', href: '#about' },
  { label: 'Дети', href: '#children' },
  { label: 'Помощь', href: '#help' },
  { label: 'Новости', href: '#news' },
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
            <Heart className="h-6 w-6 text-primary fill-primary" />
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
                <div className="h-40 overflow-hidden">
                  <img src={IMAGES.charity1} alt="Помощь детям" className="w-full h-full object-cover" />
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
                <div className="h-40 overflow-hidden">
                  <img src={IMAGES.rehab} alt="Реабилитация детей" className="w-full h-full object-cover" />
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
                <div className="h-40 overflow-hidden">
                  <img src={IMAGES.charity2} alt="Прозрачность фонда" className="w-full h-full object-cover" />
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
                        <img src={IMAGES.children} alt="Ребёнок" className="w-full h-full object-cover" />
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
                Последние события фонда
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Будьте в курсе нашей работы и событий из жизни подопечных
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {POSTS.map((post, i) => (
                <Card key={i} className="flex flex-col hover:shadow-md transition-shadow overflow-hidden">
                  {post.image && (
                    <div className="h-40 overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span>{post.date}</span>
                      {post.hasDonation && (
                        <Badge variant="secondary" className="text-xs">
                          <Heart className="h-3 w-3 mr-1 fill-primary text-primary" />
                          Сбор средств
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-base leading-snug">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground line-clamp-4">
                      {post.text}
                    </p>
                  </CardContent>
                  <div className="px-6 pb-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" /> {post.reactions}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" /> {post.comments}
                    </span>
                  </div>
                </Card>
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
