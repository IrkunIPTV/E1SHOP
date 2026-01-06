// ====== CONFIG ======
const WHATSAPP_NUMBER = "60123456789"; // <-- change to your WhatsApp number (no +, no spaces)
// Example Malaysia: +60 12-3456789 -> "60123456789"

function waUrl(message) {
  const base = "https://wa.me/";
  return `${base}${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");

if (navToggle && mobileNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mobileNav.getAttribute("aria-hidden") === "false";
    mobileNav.setAttribute("aria-hidden", String(isOpen));
    mobileNav.style.display = isOpen ? "none" : "block";
  });

  // close menu when clicking a link
  mobileNav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      mobileNav.setAttribute("aria-hidden", "true");
      mobileNav.style.display = "none";
    });
  });
}

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Direct WhatsApp button
const waDirect = document.getElementById("waDirect");
const waNumberLabel = document.getElementById("waNumberLabel");
if (waDirect) {
  waDirect.href = waUrl("Hi E1Shop, I want to ask about IPTV plans (licensed/authorized content).");
}
if (waNumberLabel) {
  waNumberLabel.textContent = `+${WHATSAPP_NUMBER}`;
}

// Quick checkout
const quickCheckout = document.getElementById("quickCheckout");
if (quickCheckout) {
  quickCheckout.addEventListener("click", () => {
    const plan = document.getElementById("quickPlan").value;
    const devices = document.getElementById("quickDevices").value;
    const name = document.getElementById("quickName").value || "Customer";
    const wa = document.getElementById("quickWhatsapp").value || "-";

    const msg =
`Hi E1Shop 👋
I want to order IPTV.

Name: ${name}
Plan: ${plan}
Devices: ${devices}
My WhatsApp: ${wa}

Please share price + payment method + activation steps.`;

    window.open(waUrl(msg), "_blank");
  });
}

// Plans "Select" buttons autofill Order form
document.querySelectorAll("[data-plan]").forEach(btn => {
  btn.addEventListener("click", () => {
    const planText = btn.getAttribute("data-plan") || "";
    const devicesText = btn.getAttribute("data-devices") || "";

    const planSelect = document.getElementById("plan");
    const deviceSelect = document.getElementById("devices");

    // Try to map quick plan text -> form options
    if (planSelect) {
      if (planText.includes("1 Month")) planSelect.value = "1 Month";
      else if (planText.includes("3 Months")) planSelect.value = "3 Months";
      else if (planText.includes("6 Months")) planSelect.value = "6 Months";
      else if (planText.includes("12 Months")) planSelect.value = "12 Months";
    }

    if (deviceSelect) {
      if (devicesText.includes("1")) deviceSelect.value = "1 Device";
      else if (devicesText.includes("2")) deviceSelect.value = "2 Devices";
      else if (devicesText.includes("3")) deviceSelect.value = "3 Devices";
    }

    // scroll to order
    document.getElementById("order").scrollIntoView({ behavior: "smooth" });
  });
});

// Order form -> generates WhatsApp message + copy
const orderForm = document.getElementById("orderForm");
const copyBox = document.getElementById("copyBox");
const msgPreview = document.getElementById("msgPreview");
const waLink = document.getElementById("waLink");
const copyBtn = document.getElementById("copyBtn");

if (orderForm) {
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim() || "-";
    const plan = document.getElementById("plan").value;
    const devices = document.getElementById("devices").value;
    const deviceType = document.getElementById("deviceType").value.trim() || "-";
    const notes = document.getElementById("notes").value.trim() || "-";

    const message =
`Hi E1Shop 👋
I want to order IPTV (authorized/licensed content).

Name: ${name}
Email: ${email}
Plan: ${plan}
Devices: ${devices}
Device type: ${deviceType}
Notes: ${notes}

Please confirm total price and payment method.`;

    msgPreview.textContent = message;
    waLink.href = waUrl(message);
    copyBox.hidden = false;

    // auto scroll to the message box
    copyBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(msgPreview.textContent);
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
    } catch {
      alert("Copy failed. Please copy manually.");
    }
  });
}
