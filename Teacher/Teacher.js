// Teacher.js - layout behaviors, stickers, photo icons, particles & scroll reveal
document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openLetter");
  const letterPage = document.getElementById("letterPage");
  const closeBtn = document.getElementById("closeLetter");
  const messageContent = document.getElementById("messageContent");
  const particleLayer = document.getElementById("particleLayer");
  const stickersGroup = document.querySelector(".stickers");
  const photoIcons = document.querySelectorAll(".photo-icon");
  const revealItems = document.querySelectorAll("[data-reveal]");

  // icon SVG data URIs for photo badges (keeps CSS small). We'll set as background images.
  const ICON_SVGS = {
    cat: encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><ellipse cx='32' cy='44' rx='12' ry='7' fill='#ffd6e6'/><path d='M10 24c5-12 22-18 22-18s17 6 22 18c0 0-4-4-22-4S14 24 10 24z' fill='#fff'/><circle cx='24' cy='30' r='2.6' fill='#4b2133'/><circle cx='40' cy='30' r='2.6' fill='#4b2133'/></svg>`),
    bear: encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><circle cx='32' cy='34' r='12' fill='#ffdfc8'/><circle cx='22' cy='22' r='5' fill='#ffdfc8'/><circle cx='42' cy='22' r='5' fill='#ffdfc8'/></svg>`),
    flower: encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><circle cx='32' cy='32' r='4' fill='#ffd6e6'/><path d='M32 12c6 0 6 8 0 10z' fill='#ff9fc8'/></svg>`),
    tulip: encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><path d='M32 10c6 0 12 12 6 20-3 4-6 5-6 5s-3-1-6-5c-6-8 0-20 6-20z' fill='#ff9fc8'/></svg>`),
    rose: encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><path d='M32 14c6 6 10 6 12 12 0 0-6-2-12 2-6-4-12-2-12-2 2-6 6-6 12-12z' fill='#ff6fae'/></svg>`),
    penguin: encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><ellipse cx='32' cy='36' rx='10' ry='12' fill='#e9f0ff'/></svg>`),
    heart: encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><path d='M32 52s-12-6-16-11c-4-5-2-11 6-12 0 0 4 0 6 4 2-4 6-4 6-4 8 1 10 7 6 12-4 5-16 11-16 11z' fill='#ff6fae'/></svg>`)
  };

  // set photo-icon badge backgrounds
  photoIcons.forEach(el => {
    const type = el.dataset.icon || "heart";
    const svg = ICON_SVGS[type] || ICON_SVGS.heart;
    el.style.setProperty("background-image", `url("data:image/svg+xml;utf8,${svg}")`);
    // also use ::before via inline style if needed
    el.style.backgroundRepeat = "no-repeat";
    el.style.backgroundPosition = "center";
    el.style.backgroundSize = "60%";
  });

  // Create decorative SVGs inside sticker elements (so stickers visible on pink)
  function populateStickers() {
    const s = (sel, svg) => {
      const el = document.querySelector(sel);
      if (el) el.innerHTML = svg;
    };
    // simple SVG shapes (kept small)
    s(".cat-a", `<svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><ellipse cx='32' cy='44' rx='18' ry='10' fill='#ffd6e6'/><path d='M10 24c5-12 22-18 22-18s17 6 22 18c0 0-4-4-22-4S14 24 10 24z' fill='#fff'/><circle cx='24' cy='30' r='3.5' fill='#4b2133'/><circle cx='40' cy='30' r='3.5' fill='#4b2133'/></svg>`);
    s(".cat-b", `<svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><circle cx='32' cy='34' r='18' fill='#ffe2f0'/><path d='M18 18c8-6 28-6 28 0 0 0-8-2-14 2-6-4-14-2-14-2z' fill='#fff'/><circle cx='25' cy='36' r='2.8' fill='#4b2133'/><circle cx='39' cy='36' r='2.8' fill='#4b2133'/></svg>`);
    s(".cat-c", `<svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><rect x='8' y='20' width='48' height='28' rx='14' fill='#ffd0e6'/><circle cx='22' cy='34' r='3.2' fill='#4b2133'/><circle cx='42' cy='34' r='3.2' fill='#4b2133'/></svg>`);
    s(".bear-a", `<svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><circle cx='32' cy='34' r='16' fill='#ffdfc8'/><circle cx='22' cy='22' r='6' fill='#ffdfc8'/><circle cx='42' cy='22' r='6' fill='#ffdfc8'/></svg>`);
    s(".bear-b", `<svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><ellipse cx='32' cy='36' rx='16' ry='12' fill='#ffdcb3'/></svg>`);
    s(".f-a", `<svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><circle cx='32' cy='32' r='4' fill='#ffd6e6'/><path d='M32 12c6 0 6 8 0 10z' fill='#ff9fc8'/></svg>`);
    s(".f-b", `<svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><circle cx='32' cy='32' r='4' fill='#fff0f6'/><path d='M20 20c6 0 6 8 0 10z' fill='#ffc0da'/></svg>`);
    s(".f-c", `<svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><circle cx='32' cy='32' r='4' fill='#ffe8f4'/><path d='M44 20c-6 0-6 8 0 10z' fill='#ffb3d9'/></svg>`);
    s(".rose", `<svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><path d='M32 14c6 6 10 6 12 12 0 0-6-2-12 2-6-4-12-2-12-2 2-6 6-6 12-12z' fill='#ff6fae'/></svg>`);
    s(".tulip-p", `<svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><path d='M32 10c6 0 12 12 6 20-3 4-6 5-6 5s-3-1-6-5c-6-8 0-20 6-20z' fill='#ff9fc8'/></svg>`);
    s(".tulip-b", `<svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><path d='M32 10c6 0 12 12 6 20-3 4-6 5-6 5s-3-1-6-5c-6-8 0-20 6-20z' fill='#b3d9ff'/></svg>`);
    s(".peng-a", `<svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><ellipse cx='32' cy='38' rx='12' ry='14' fill='#e9f0ff'/></svg>`);
    s(".peng-b", `<svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><ellipse cx='32' cy='36' rx='11' ry='13' fill='#f0f7ff'/></svg>`);
  }
  populateStickers();

  // small particle generator (hearts/petals)
  function spawnParticle(xPct, yPct, color, size = 12, duration = 2200, shape = "heart") {
    const el = document.createElement("div");
    el.className = "particle";
    el.style.left = `${xPct}vw`;
    el.style.top = `${yPct}vh`;
    el.style.setProperty("--d", `${duration}ms`);
    if (shape === "heart") {
      el.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24"><path fill="${color}" d="M12 21s-7-4.6-9-8.2C0 8 4 4 7 5c2 0 3 2 5 2s3-2 5-2c3 1 7 3 4 7.8C19 16.4 12 21 12 21z"/></svg>`;
    } else {
      el.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 32 32"><path d="M16 2c4 2 8 8 6 12-2 4-8 6-8 6s-6-2-8-6C6 10 12 4 16 2z" fill="${color}"/></svg>`;
    }
    particleLayer.appendChild(el);
    setTimeout(()=> el.remove(), duration + 400);
  }

  function burstParticles(count=18) {
    const colors = ["#ff9fc8","#ff6fae","#ffd6e6","#ffb3d0","#bfe9ff"];
    for (let i=0;i<count;i++){
      const x = Math.random()*100;
      const y = 6 + Math.random()*18;
      const color = colors[Math.floor(Math.random()*colors.length)];
      const shape = Math.random()>0.45 ? "heart" : "petal";
      spawnParticle(x,y,color,10+Math.floor(Math.random()*8),1600+Math.floor(Math.random()*1200),shape);
    }
  }

  // scroll reveal with IntersectionObserver
  const io = new IntersectionObserver((entries)=> {
    entries.forEach(e=>{
      if (e.isIntersecting) {
        e.target.classList.add("revealed");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach(n => io.observe(n));

  // reveal stickers + particles when open
  function openReveal() {
    // disable background scroll
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // show overlay
    letterPage.classList.add("open");
    letterPage.setAttribute("aria-hidden","false");
    document.getElementById("home").setAttribute("aria-hidden","true");

    // small pop of button
    openBtn.animate([{ transform:"scale(1)" }, { transform:"scale(1.06)" }, { transform:"scale(1)"}], { duration:280 });

    // fade stickers in (CSS handles) then burst particles
    setTimeout(()=> burstParticles(26), 240);

    // ensure message visible
    setTimeout(()=> {
      letterPage.scrollTop = 0;
      messageContent.scrollIntoView({behavior:"smooth", block:"start"});
      messageContent.focus({preventScroll:true});
    }, 420);
  }
  openBtn.addEventListener("click", openReveal);

  // close
  closeBtn.addEventListener("click", ()=> {
    letterPage.classList.remove("open");
    letterPage.setAttribute("aria-hidden","true");
    document.getElementById("home").setAttribute("aria-hidden","false");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    // clear particles
    Array.from(document.querySelectorAll(".particle")).forEach(n => n.remove());
  });

  // esc to close
  document.addEventListener("keydown",(e)=> {
    if (e.key === "Escape" && letterPage.getAttribute("aria-hidden")==="false") closeBtn.click();
  });

  // ensure user gesture required for unmuting video (browsers)
  const heroVideo = document.getElementById("heroVideo");
  if (heroVideo) heroVideo.addEventListener("play", ()=> { try { heroVideo.muted = false } catch(e){} });
});
