document.addEventListener("DOMContentLoaded", function () {
  const observedElements = document.querySelectorAll(".title.observed");

  const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  });

  observedElements.forEach((element) => {
    observer.observe(element);
  });

  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Отримуємо текст з вмісту елементу
        const text = entry.target.textContent;

        // Очистимо вміст елементу
        entry.target.textContent = '';

        // Створимо ефект друку тексту
        printTextEffect(entry.target, text);

        // Видаляємо спостереження для цього елементу
        observer.unobserve(entry.target);
      }
    });
  }

  function printTextEffect(element, text) {
    let currentIndex = 0;
    const printInterval = 110; // Інтервал між виведенням символів (в мілісекундах)

    function printNextChar() {
      if (currentIndex < text.length) {
        element.textContent += text[currentIndex];
        currentIndex++;
        setTimeout(printNextChar, printInterval);
      }
    }

    printNextChar();
  }
});

const toggleItem = (element) => {
  const headers = document.querySelectorAll("article header");
  for (let header of headers) {
    if (header !== element) {
      header.classList.remove("active");
      header.nextElementSibling.style.height = "0px";

      const img = header.querySelector("img");
      if (img) {
        img.style.transform = "rotate(0deg)"; // Повертаємо зображення у початковий стан
      }
    }
  }

  if (element.classList.contains("active")) {
    element.classList.remove("active");
    element.nextElementSibling.style.height = "0px";

    const img = element.querySelector("img");
    if (img) {
      img.style.transform = "rotate(0deg)"; // Повертаємо зображення у початковий стан
    }
  } else {
    element.classList.add("active");
    const content = element.nextElementSibling;
    const text = content.querySelector("p");
    content.style.height = `${text.clientHeight}px`;

    const img = element.querySelector("img");
    if (img) {
      img.style.transform = "rotate(180deg)"; // Додаємо обертання для зображення
    }
  }
};