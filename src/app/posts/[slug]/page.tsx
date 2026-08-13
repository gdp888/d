'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Heart,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Share2,
  Calendar,
  User,
} from 'lucide-react'

/* ─── Posts Data ─── */

const POSTS_DATA = [
  {
    id: 1,
    slug: 'pomoshch-blagotvoritelnost',
    title: 'КАЖДЫЙ ИЗ ВАС МОЖЕТ СТАТЬ ЧАСТЬЮ НАШИХ ПРОЕКТОВ',
    text: `Вы можете выбрать любой удобный способ для добровольных пожертвований. ВМЕСТЕ МЫ СДЕЛАЕМ МИР ДОБРЕЕ!

Благотворительный фонд «Достижение-Дети» предоставляет несколько способов для оказания помощи:

**Банковский перевод**
Отправить пожертвования можно по нашим реквизитам. Каждый рубль идёт на реабилитацию и помощь детям с особенностями развития.

**VK Donut**
Удобный способ поддержать проект прямо через социальную сеть ВКонтакте. Можно настроить регулярное ежемесячное пожертвование.

**QR-код**
Быстрая оплата через приложение банка — просто отсканируйте QR-код и укажите сумму.

Ваша поддержка помогает нам:
- Оплатить курсы реабилитации для детей с ДЦП
- Приобрести специальное оборудование
- Организовать праздники и мероприятия для подопечных
- Оказывать психологическую поддержку семьям

Спасибо каждому, кто неравнодушен к судьбе наших детей!`,
    date: '13 августа 2026',
    reactions: 14,
    comments: 0,
    image: '/images/post_qr_code.jpg',
    category: 'Пожертвования',
    hasDonation: true,
  },
  {
    id: 2,
    slug: 'novyy-videoklip-fonda',
    title: 'Новый видеоклип фонда',
    text: `БФ «Достижение-Дети» продолжает рассказывать о своей работе!

Мы подготовили новый видеоклип, в котором показали:
- Как проходят занятия по реабилитации
- Наши мероприятия и праздники
- Истории детей, которые делают прогресс каждый день
- Отзывы родителей и благодарности

Смотрите наш новый клип и делитесь с друзьями — чем больше людей узнает о нашей работе, тем больше помощи мы сможем оказать нашим подопечным.

Каждый просмотр, каждый репост, каждое упоминание — это вклад в будущее наших детей. Вместе мы можем больше!`,
    date: '8 августа 2026',
    reactions: 4,
    comments: 3,
    image: '/images/post_charity_work.jpg',
    category: 'Медиа',
    videoUrl: '#',
  },
  {
    id: 3,
    slug: 'prazdnik-dlya-nashih-podopechnyh',
    title: 'Праздник для наших подопечных',
    text: `Очередной замечательный праздник для детей! 🎉

Радость, улыбки и тепло — вот то, ради чего мы работаем каждый день. На этот раз мы организовали:

🎈 **Развлекательную программу**
Аниматоры, игры, конкурсы — дети были в восторге!

🎁 **Подарки для каждого ребёнка**
Каждый ушёл не только с хорошим настроением, но и с подарком

🍰 **Праздничный торт**
Традиционно не обошлось без сладкого угощения

📸 **Фотосессия**
Профессиональный фотограф запечатлел все счастливые моменты

Такие мероприятия важны не только для эмоций — они помогают социализации детей, развивают коммуникативные навыки и просто дарят радость, которую они заслуживают.

Спасибо всем волонтёрам, спонсорам и партнёрам, которые помогают делать эти моменты возможными! Вы — лучшие! 💙`,
    date: '29 июля 2026',
    reactions: 10,
    comments: 1,
    image: '/images/post_event_1.jpg',
    category: 'Мероприятия',
  },
  {
    id: 4,
    slug: 'nashi-deti-nasha-gordost',
    title: 'Наши дети — наша гордость',
    text: `Каждый день мы видим, как наши подопечные делают маленькие шаги к большим целям. И каждый такой шаг — это победа, которая стала возможной благодаря вашей поддержке.

**Истории успеха за этот месяц:**

🌟 **Алиса** (5 лет) — самостоятельно сделала первые шаги после курса реабилитации! Её родители не могли сдержать слёз счастья.

🌟 **Денис** (8 лет) — научился держать ложку и есть самостоятельно. Для нас это огромный прогресс!

🌟 **Максим** (10 лет) — начал говорить первые слова после занятий с логопедом. «Мама» — первое слово, которое он произнёс чётко.

🌟 **София** (7 лет) — прошла курс арт-терапии и теперь рисует удивительные картины. Её работы даже выставили на благотворительной ярмарке!

Каждая история — это результат ежедневной работы:
- Реабилитологов
- Психологов
- Логопедов
- Родителей
- И вас — наших благотворителей

Вместе мы создаём чудеса! ✨`,
    date: '27 июля 2026',
    reactions: 35,
    comments: 4,
    image: '/images/post_children_2.jpg',
    category: 'Истории успеха',
  },
]

/* ─── Component ─── */

export default function PostPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  
  const postIndex = POSTS_DATA.findIndex((p) => p.slug === slug)
  
  if (postIndex === -1) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Пост не найден</h1>
          <Button asChild>
            <Link href="/">На главную</Link>
          </Button>
        </div>
      </div>
    )
  }
  
  const post = POSTS_DATA[postIndex]
  const prevPost = postIndex > 0 ? POSTS_DATA[postIndex - 1] : null
  const nextPost = postIndex < POSTS_DATA.length - 1 ? POSTS_DATA[postIndex + 1] : null

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.text.substring(0, 200),
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Ссылка скопирована!')
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* ─── Navigation Bar ─── */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Назад на главную
          </Link>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{post.category}</Badge>
            <Button variant="ghost" size="sm" onClick={sharePost}>
              <Share2 className="h-4 w-4 mr-1" />
              Поделиться
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* ─── Post Header Image ─── */}
        {post.image && (
          <div className="relative w-full bg-muted/30">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* ─── Post Content ─── */}
        <article className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                {post.reactions} реакций
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                {post.comments} комментариев
              </span>
              {post.hasDonation && (
                <Badge variant="default" className="bg-red-500 hover:bg-red-600">
                  <Heart className="h-3 w-3 mr-1 fill-white" />
                  Сбор средств
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 leading-tight">
              {post.title}
            </h1>

            <Separator className="mb-8" />

            {/* Content with formatted text */}
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              {post.text.split('\n\n').map((paragraph, i) => {
                // Check if paragraph is a heading (starts with ** and ends with **)
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  const headingText = paragraph.slice(2, -2)
                  return (
                    <h2 key={i} className="text-xl font-bold mt-6 mb-3 first:mt-0">
                      {headingText}
                    </h2>
                  )
                }
                
                // Check for bold text within paragraph
                const parts = paragraph.split(/(\*\*[^*]+\*\*)/g)
                return (
                  <p key={i} className="text-base md:text-lg leading-relaxed text-muted-foreground mb-4 last:mb-0">
                    {parts.map((part, j) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={j} className="text-foreground">{part.slice(2, -2)}</strong>
                      }
                      return part
                    })}
                  </p>
                )
              })}
            </div>

            {/* Donation CTA for donation posts */}
            {post.hasDonation && (
              <Card className="mt-8 border-primary/30 bg-primary/5">
                <CardContent className="p-6 md:p-8 text-center">
                  <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Хотите помочь?</h3>
                  <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                    Каждое пожертвование приближает наших детей к здоровью и счастливому будущему
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Button size="lg" asChild>
                      <a href="/#help">Помочь сейчас</a>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <a href="https://vk.com/dostigenie_deti" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        VK Donut
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Video embed placeholder */}
            {post.videoUrl && (
              <Card className="mt-8 overflow-hidden">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <ExternalLink className="h-8 w-8 text-primary" />
                    </div>
                    <p className="font-medium mb-2">Видеоклип доступен на нашей странице ВК</p>
                    <Button variant="outline" asChild>
                      <a href="https://vk.com/dostigenie_deti" target="_blank" rel="noopener noreferrer">
                        Смотреть видео
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            <Separator className="my-8" />

            {/* Navigation between posts */}
            <div className="grid grid-cols-2 gap-4">
              {prevPost ? (
                <Link href={`/posts/${prevPost.slug}`}>
                  <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
                    <CardContent className="p-4 flex items-center gap-3">
                      <ArrowLeft className="h-4 w-4 shrink-0 group-hover:-translate-x-1 transition-transform" />
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">Предыдущий пост</p>
                        <p className="font-medium text-sm truncate">{prevPost.title}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ) : (
                <div />
              )}
              
              {nextPost ? (
                <Link href={`/posts/${nextPost.slug}`} className="justify-self-end">
                  <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
                    <CardContent className="p-4 flex items-center gap-3 justify-end">
                      <div className="min-w-0 text-right">
                        <p className="text-xs text-muted-foreground">Следующий пост</p>
                        <p className="font-medium text-sm truncate">{nextPost.title}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                    </CardContent>
                  </Card>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* Back to news */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg" asChild>
                <Link href="/#news">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Все новости
                </Link>
              </Button>
            </div>
          </div>
        </article>
      </main>

      {/* Simple footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 БФ «Достижение-Дети». Все права защищены.</p>
          <p className="mt-1">
            <a 
              href="https://vk.com/dostigenie_deti" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Мы во ВКонтакте
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

/* ─── Export posts data for use in other components ─── */
export { POSTS_DATA }
