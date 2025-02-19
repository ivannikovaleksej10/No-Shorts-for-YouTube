(function() {
  function removeShorts() {
    // Удаляем кнопку Shorts в боковом меню
    document.querySelectorAll("ytd-guide-entry-renderer").forEach(entry => {
      const link = entry.querySelector("a");
      if (link && (link.href.includes("/shorts") || link.textContent.trim().toLowerCase() === "shorts")) {
        entry.remove();
      }
    });

    // Удаляем заголовок с id="rich-shelf-header", если в нём встречается слово "shorts"
    document.querySelectorAll("#rich-shelf-header").forEach(header => {
      if (header.textContent.trim().toLowerCase().includes("shorts")) {
        header.remove();
      }
    });

    // Удаляем родительский элемент для всех ссылок, содержащих "/shorts/"
    document.querySelectorAll("a[href*='/shorts/']").forEach(anchor => {
      if (anchor.parentElement) {
        anchor.parentElement.remove();
      }
    });
  }

  // Первичный запуск удаления
  removeShorts();

  // Наблюдатель за изменениями в DOM без дебаунса
  const observer = new MutationObserver(() => {
    removeShorts();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
