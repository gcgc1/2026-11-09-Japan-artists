/* Click-to-play YouTube embed.
   Markup:
     <div class="video" data-video="VIDEO_ID" data-title="Title">
       <button class="video-play" type="button" aria-label="Play Title">…</button>
     </div>
   The poster stays local; the iframe is created only on click. */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    Array.prototype.slice.call(document.querySelectorAll(".video[data-video]")).forEach(function (box) {
      var button = box.querySelector(".video-play");
      if (!button) return;

      button.addEventListener("click", function () {
        var id = box.getAttribute("data-video");
        var title = box.getAttribute("data-title") || "Video";

        var iframe = document.createElement("iframe");
        iframe.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?autoplay=1&rel=0";
        iframe.title = title;
        iframe.loading = "lazy";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.setAttribute("allowfullscreen", "");

        box.innerHTML = "";
        box.appendChild(iframe);
      });
    });
  });
})();
