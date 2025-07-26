$(document).ready(function () {
  const envelope = $('#envelope');
  const openBtn = $("#openBtn");
  const resetBtn = $("#resetBtn");

  let currentPage = 1;
  const totalPages = 23;
  let isOpen = false;

  // Khi click vào thư đang mở => chuyển trang
  envelope.on('click', function () {
    if (isOpen) nextLyric();
  });

  openBtn.on('click', function () {
    envelope.removeClass("close").addClass("open");
    isOpen = true;
    openBtn.hide();
    resetBtn.show();
    playAudioOnce();
  });

  resetBtn.on('click', function () {
    closeEnvelope();
  });

  function nextLyric() {
    if (currentPage < totalPages) {
      currentPage++;
      updateActivePage();
    } else {
      // Khi đến trang cuối, gập thư lại
      isOpen = false;
      setTimeout(() => {
        envelope.removeClass("open").addClass("close");
        resetBtn.hide();
        openBtn.show();
        currentPage = 1;
        updateActivePage();
      }, 1000); // Delay 1s cho đẹp
    }
  }

  function updateActivePage() {
    $(".lyric-page").removeClass("active");
    $("#page" + currentPage).addClass("active");
  }

  function closeEnvelope() {
    envelope.removeClass("open").addClass("close");
    isOpen = false;
    setTimeout(function () {
      currentPage = 1;
      updateActivePage();
      resetBtn.hide();
      openBtn.show();
    }, 600);
  }
});

// Phần âm thanh và nút xử lý riêng (JS thuần)
const openBtn = document.getElementById("openBtn");
const resetBtn = document.getElementById("resetBtn");
const envelope = document.getElementById("envelope");
const audio = document.getElementById("sound");

let hasPlayed = false;

function playAudioOnce() {
  if (!hasPlayed) {
    audio.play().then(() => {
      hasPlayed = true;
    }).catch((e) => {
      console.log("Không thể phát nhạc:", e);
    });
  }
}
