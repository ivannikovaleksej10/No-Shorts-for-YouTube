(function() {
    // Функция для удаления элементов, связанных с Shorts
    function removeShorts() {
      // Удаляем видео-элементы, содержащие ссылки с "/shorts/"
      document.querySelectorAll("a[href*='/shorts/']").forEach(anchor => {
        const container = anchor.closest("ytd-rich-item-renderer, ytd-grid-video-renderer, ytd-video-renderer, ytd-rich-shelf-renderer, ytd-item-section-renderer");
        if (container) {
          container.remove();
        }
      });
      
      // Удаляем кнопку Shorts в боковом меню
      document.querySelectorAll("ytd-guide-entry-renderer").forEach(guideEntry => {
        const link = guideEntry.querySelector("a");
        if (link && (link.href.includes("/shorts") || link.textContent.trim().toLowerCase() === "shorts")) {
          guideEntry.remove();
        }
      });
  
      // Удаляем <div id="rich-shelf-header">, если внутри него есть <span> с текстом "Shorts"
      document.querySelectorAll("#rich-shelf-header").forEach(header => {
        const span = header.querySelector("span");
        if (span && span.textContent.trim().toLowerCase() === "shorts") {
          header.remove();
        }
      });
    }
  
    // Первичный запуск удаления
    removeShorts();
  
    // Наблюдатель за изменениями в DOM, чтобы удалять вновь подгружаемые элементы
    const observer = new MutationObserver(() => {
      removeShorts();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  })();
  