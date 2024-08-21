const heroTypewriter = () => {
  const app = document.getElementById('hero-caption');

  const typewriter = new Typewriter(app, {
    loop: true,
    delay: 120,
    deleteSpeed: 100,
  });

  typewriter
    .typeString('با بهترین و مجرب ترین اساتید کشور، در کنار شما هستیم')
    .pauseFor(1000)
    .deleteAll()
    .pauseFor(1000)
    .typeString('مجموعه ای شامل بهترین و با کیفیت ترین دوره های آموزشی')
    .pauseFor(1000)
    .deleteAll()
    .pauseFor(1000)
    .typeString('آموزش برنامه نویسی به زبان پایتون')
    .pauseFor(500)
    .deleteChars(6)
    .typeString('جاوااسکریپت')
    .pauseFor(500)
    .deleteChars(11)
    .typeString('PHP')
    .pauseFor(1000)
    .start();
};

export { heroTypewriter };
