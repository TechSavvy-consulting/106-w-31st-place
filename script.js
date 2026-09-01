const photos = [
  ["01_Front_Hero.jpg", "Front exterior", "A welcoming single-story exterior with an attached garage and front lawn."],
  ["02_Front_Entry.jpg", "Front entry", "Covered front entry with a distinctive red door."],
  ["03_Living_Room.jpg", "Living room", "Living room with wood flooring and a neutral color palette."],
  ["04_Living_Room_Reverse.jpg", "Living room, reverse view", "A second view showing the living room's open flow."],
  ["05_Living_Dining_Flow.jpg", "Living and dining flow", "Connected living and dining spaces with wood and tile flooring."],
  ["06_Dining_Kitchen_Overview.jpg", "Dining and kitchen", "Dining area opening into the bright white kitchen."],
  ["07_Kitchen.jpg", "Kitchen", "White cabinetry, stone counters, and stainless-look appliances."],
  ["08_Kitchen_Second_View.jpg", "Kitchen, second view", "A second kitchen view showing the cabinet storage and appliance layout."],
  ["09_Dining_Back_Doors.jpg", "Dining area", "Dining space with the rear entry overlooking the backyard."],
  ["10_Primary_Bedroom.jpg", "Primary bedroom", "Primary bedroom with wood flooring, ceiling fan, horizontal window, and private bath."],
  ["11_Primary_Bedroom_Reverse.jpg", "Primary bedroom, reverse view", "A second primary-bedroom view showing the closet and hall entry."],
  ["12_Primary_Bath_Shower.jpg", "Primary bath shower", "Primary bath with a tiled walk-in shower."],
  ["13_Primary_Bath_Second_View.jpg", "Primary bath", "A second view of the primary bathroom."],
  ["14_Bedroom_2.jpg", "Bedroom two", "Second bedroom with wood flooring, window, and closet storage."],
  ["15_Bedroom_2_Reverse.jpg", "Bedroom two, reverse view", "A second view of bedroom two showing the closet and hall entry."],
  ["16_Bedroom_3.jpg", "Bedroom three", "Third bedroom with wood flooring and a tall front-facing window."],
  ["17_Bedroom_3_Reverse.jpg", "Bedroom three, reverse view", "A second view of bedroom three showing its two closets and hall entry."],
  ["18_Hall_Bath.jpg", "Hall bath", "Full hall bathroom with a double-sink vanity and tub-shower."],
  ["19_Hall_Bath_Reverse.jpg", "Hall bath, reverse view", "A second hall-bath view highlighting the double-sink vanity."],
  ["20_Laundry.jpg", "Indoor laundry", "Dedicated indoor laundry room with upper cabinets."],
  ["21_Laundry_Reverse.jpg", "Indoor laundry, reverse view", "A second view showing the laundry room from the hall."],
  ["22_Garage_Storage.jpg", "Attached garage storage", "Attached one-car garage with built-in wall and overhead storage."],
  ["23_Garage_Open_Door.jpg", "Attached garage, open-door view", "A second garage view showing the open door, driveway access, and side entry."],
  ["24_Backyard_Rear_Hero.jpg", "Backyard and rear exterior", "Rear exterior overlooking the fenced backyard and mature shade tree."],
  ["25_Backyard_Patio_Tree.jpg", "Backyard patio and tree", "Patio area beside a mature backyard shade tree."],
  ["26_Backyard_Open_Lawn.jpg", "Open backyard", "Broad, fenced lawn with room for outdoor activities."],
  ["27_Rear_Exterior_Angle.jpg", "Rear exterior", "Rear exterior with the back entry opening to the patio."],
  ["28_Storage_Shed.jpg", "Storage shed", "Backyard shed providing useful outdoor storage."],
];

const gallery = document.querySelector("[data-gallery]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxCount = document.querySelector("[data-lightbox-count]");
const showcaseIndexes = [2, 6, 9, 23];
let activeIndex = 0;

showcaseIndexes.forEach((index) => {
  const [file, label, description] = photos[index];
  const button = document.createElement("button");
  button.className = "gallery-item";
  button.type = "button";
  button.setAttribute("aria-label", `Open photo ${index + 1}: ${label}`);
  button.innerHTML = `
    <img src="${file}" alt="${description}" width="1600" height="1200" loading="lazy">
    <span class="gallery-label"><strong>${label}</strong><span>${String(index + 1).padStart(2, "0")}</span></span>
  `;
  button.addEventListener("click", () => openPhoto(index));
  gallery.append(button);
});

function setPhoto(index) {
  activeIndex = (index + photos.length) % photos.length;
  const [file, label, description] = photos[activeIndex];
  lightboxImage.src = file;
  lightboxImage.alt = description;
  lightboxCaption.textContent = label;
  lightboxCount.textContent = `${activeIndex + 1} / ${photos.length}`;
}

function openPhoto(index) {
  setPhoto(index);
  lightbox.showModal();
  document.body.classList.add("lightbox-open");
}

function closePhoto() {
  lightbox.close();
  document.body.classList.remove("lightbox-open");
}

document.querySelectorAll("[data-open-slideshow]").forEach((launcher) => {
  launcher.addEventListener("click", (event) => {
    if (launcher.tagName === "A") event.preventDefault();
    openPhoto(0);
  });
});

document.querySelector("[data-lightbox-close]").addEventListener("click", closePhoto);
document.querySelector("[data-lightbox-prev]").addEventListener("click", () => setPhoto(activeIndex - 1));
document.querySelector("[data-lightbox-next]").addEventListener("click", () => setPhoto(activeIndex + 1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closePhoto();
});

lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") setPhoto(activeIndex - 1);
  if (event.key === "ArrowRight") setPhoto(activeIndex + 1);
});

lightbox.addEventListener("close", () => document.body.classList.remove("lightbox-open"));

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav.classList.contains("open")) {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.focus();
  }
});

const inquiryForm = document.querySelector("[data-inquiry-form]");
const formStatus = document.querySelector("[data-form-status]");

if (inquiryForm && formStatus) {
  inquiryForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = inquiryForm.querySelector('button[type="submit"]');
    const originalLabel = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Sending…";
    formStatus.textContent = "";
    formStatus.className = "form-status";

    try {
      const response = await fetch(inquiryForm.action, {
        method: "POST",
        body: new FormData(inquiryForm),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Submission failed");
      inquiryForm.reset();
      formStatus.textContent = "Thank you. Your inquiry has been sent.";
      formStatus.classList.add("success");
    } catch {
      formStatus.textContent = "Your message could not be sent. Please try again in a moment.";
      formStatus.classList.add("error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalLabel;
    }
  });
}
