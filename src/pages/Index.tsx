import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; text: string }>>([
    { role: 'ai', text: 'Привет! Я AI-ассистент. Чем могу помочь?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = { role: 'user' as const, text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        'Отличный вопрос! Я могу помочь вам с анализом данных, генерацией текста и многим другим.',
        'Интересно! Давайте разберем это вместе. Что именно вас интересует?',
        'Я обрабатываю ваш запрос... На основе моих алгоритмов могу предложить несколько вариантов.',
        'Понимаю вас! Это одна из моих сильных сторон. Давайте найдем решение.'
      ];
      const aiMessage = { 
        role: 'ai' as const, 
        text: responses[Math.floor(Math.random() * responses.length)] 
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const features = [
    {
      icon: 'MessageSquare',
      title: 'Интеллектуальный диалог',
      description: 'Естественное общение с AI на русском языке',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: 'Brain',
      title: 'Глубокое обучение',
      description: 'Современные нейросетевые алгоритмы',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: 'Sparkles',
      title: 'Креативная генерация',
      description: 'Создание уникального контента',
      color: 'from-pink-500 to-purple-500'
    },
    {
      icon: 'Zap',
      title: 'Быстрая обработка',
      description: 'Мгновенные ответы на ваши запросы',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: 'Shield',
      title: 'Безопасность данных',
      description: 'Полная конфиденциальность информации',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: 'TrendingUp',
      title: 'Постоянное улучшение',
      description: 'Регулярные обновления и новые функции',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-blue-600/10 animate-gradient"
        style={{ backgroundSize: '200% 200%' }}
      />
      
      <div className="relative">
        <section className="py-20 px-4 animate-fade-in">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-sm font-medium animate-scale-in">
              🚀 Будущее AI уже здесь
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent leading-tight">
              Ваш персональный
              <br />
              AI-ассистент
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Интеллектуальная платформа для решения задач любой сложности
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                onClick={() => document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Icon name="MessageSquare" className="mr-2" size={20} />
                Попробовать сейчас
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Icon name="Info" className="mr-2" size={20} />
                Узнать больше
              </Button>
            </div>
          </div>
        </section>

        <section id="chat" className="py-20 px-4 animate-slide-up">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Демо AI-чата
              </h2>
              <p className="text-lg text-gray-600">
                Попробуйте пообщаться с нашим интеллектуальным ассистентом
              </p>
            </div>

            <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/80">
              <CardContent className="p-6">
                <div className="h-[400px] overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'bg-white text-gray-800 shadow-md border border-gray-200'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-200">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Напишите ваше сообщение..."
                    className="flex-1 border-2 focus:border-purple-600"
                  />
                  <Button
                    onClick={handleSend}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    disabled={isTyping}
                  >
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="features" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Возможности AI
              </h2>
              <p className="text-lg text-gray-600">
                Мощные функции для решения ваших задач
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-300 border-0 backdrop-blur-sm bg-white/80 hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon name={feature.icon as any} className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="border-0 shadow-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white">
              <CardContent className="p-12">
                <h2 className="text-4xl font-bold mb-4">
                  Готовы начать?
                </h2>
                <p className="text-xl mb-8 text-white/90">
                  Откройте для себя новые возможности искусственного интеллекта
                </p>
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-lg"
                  onClick={() => document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Icon name="Rocket" className="mr-2" size={20} />
                  Начать общение
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <footer className="py-8 px-4 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto text-center text-gray-600">
            <p>© 2024 AI Platform. Создано с помощью современных технологий.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
