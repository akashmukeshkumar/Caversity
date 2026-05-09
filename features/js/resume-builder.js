let currentThemeShowsPicture = true;
let currentProgram = "ca";
let currentCaFoundation = "prc";

const programConfigs = {
  ca: {
    builderTitle: "CA Resume Builder",
    identityTitle: "4. CA Identity (Optional)",
    primaryLabel: "FTS Number",
    secondaryLabel: "CRN Number",
    primaryShort: "FTS",
    secondaryShort: "CRN",
    primaryDefault: "45",
    secondaryDefault: "123456",
    summary: "A highly motivated CA student looking for an opportunity to apply analytical skills and technical knowledge in a professional audit firm to serve the profession and achieve its goals.",
    mainQualLabel: "CAF (ICAP) Status",
    basicQualLabel: "PRC / AFC Status",
    mainQualTitle: "Certificate in Accounting & Finance (CAF)",
    basicQualTitle: "Pre-Requisite Competencies (PRC)",
    basicQualTitles: {
      prc: "Pre-Requisite Competencies (PRC)",
      afc: "Assessment of Fundamental Competencies (AFC)"
    },
    institute: "ICAP",
    mainQualDefault: "1 paper result awaiting, 3 in progress",
    basicQualDefault: "Passed",
    techDefault: "Microsoft Office, Financial Modeling, Data Analysis, Audit Procedures",
    softDefault: "Effective Communication, Problem Solving, Teamwork, Presentation",
    certDefault: "1st Position in Debates (2018), PCSC Certified",
    expTitleDefault: "Accountant at Ammar Shawls",
    expDateDefault: "July 2023 - Present",
    expDescDefault: "Maintained overall accounts, Handled customer dealing, Managed payroll and labour commissions",
    pdfName: "CA_Professional_Resume.pdf"
  },
  acca: {
    builderTitle: "ACCA Resume Builder",
    identityTitle: "4. ACCA Identity (Optional)",
    primaryLabel: "ACCA Registration No.",
    secondaryLabel: "ACCA Status / Level",
    primaryShort: "ACCA Reg",
    secondaryShort: "Status",
    primaryDefault: "1234567",
    secondaryDefault: "Applied Skills",
    summary: "A motivated ACCA student with a strong interest in accounting, audit, taxation and financial reporting, seeking an opportunity to apply technical knowledge and develop professionally in a progressive organization.",
    mainQualLabel: "ACCA Qualification Status",
    basicQualLabel: "Applied Knowledge / Foundation Status",
    mainQualTitle: "Association of Chartered Certified Accountants (ACCA)",
    basicQualTitle: "Applied Knowledge / Foundation Level",
    institute: "ACCA",
    mainQualDefault: "Applied Skills papers in progress",
    basicQualDefault: "Applied Knowledge passed",
    techDefault: "Microsoft Office, Financial Reporting, Audit Procedures, Taxation, Data Analysis",
    softDefault: "Effective Communication, Problem Solving, Teamwork, Time Management",
    certDefault: "ACCA Student, Microsoft Office Certified",
    expTitleDefault: "Accounts Trainee at ABC Firm",
    expDateDefault: "June 2024 - Present",
    expDescDefault: "Prepared bookkeeping records, Assisted in bank reconciliations, Supported audit and tax documentation",
    pdfName: "ACCA_Professional_Resume.pdf"
  }
};

function byId(id) {
  return document.getElementById(id);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function setHidden(id, shouldHide) {
  const el = byId(id);
  if (el) {
    el.classList.toggle("hide", shouldHide);
  }
}

function setText(id, value) {
  const el = byId(id);
  if (el) {
    el.innerText = value;
  }
}

function setFieldIfProgramDefault(inputId, previousValue, nextValue, force) {
  const field = byId(inputId);
  if (!field) {
    return;
  }

  const currentValue = field.value.trim();
  if (force || currentValue === "" || currentValue === previousValue) {
    field.value = nextValue;
  }
}

function updateBasicQualificationTitle() {
  const config = programConfigs[currentProgram];
  const caTitle = programConfigs.ca.basicQualTitles[currentCaFoundation];
  const title = currentProgram === "ca" ? caTitle : config.basicQualTitle;
  setText("out-qual-basic-title", title);
}

function setCaFoundation(type, btn) {
  if (!programConfigs.ca.basicQualTitles[type]) {
    return;
  }

  currentCaFoundation = type;
  document.querySelectorAll(".qualification-btn").forEach((button) => button.classList.remove("active"));
  if (btn) {
    btn.classList.add("active");
  }

  updateBasicQualificationTitle();
  updatePreview();
}

function hasUploadedPhoto() {
  const img = byId("img-side");
  return Boolean(img && img.src && img.src.length > 100);
}

function updatePhotoVisibility() {
  const showPhoto = currentThemeShowsPicture && hasUploadedPhoto();
  document.querySelectorAll(".cv-photo-wrap").forEach((wrap) => {
    wrap.style.display = showPhoto ? "block" : "none";
  });
}

function setProgram(program, btn, forceDefaults = false) {
  if (!programConfigs[program]) {
    return;
  }

  const previousConfig = programConfigs[currentProgram];
  const nextConfig = programConfigs[program];
  currentProgram = program;

  document.querySelectorAll(".program-btn").forEach((button) => button.classList.remove("active"));
  if (btn) {
    btn.classList.add("active");
  }

  setText("builder-title", nextConfig.builderTitle);
  setText("identity-section-title", nextConfig.identityTitle);
  setText("label-primary-id", nextConfig.primaryLabel);
  setText("label-secondary-id", nextConfig.secondaryLabel);
  setText("label-qual-main", nextConfig.mainQualLabel);
  setText("label-qual-basic", nextConfig.basicQualLabel);
  setText("out-primary-id-label", nextConfig.primaryShort);
  setText("out-secondary-id-label", nextConfig.secondaryShort);
  setText("out-qual-main-title", nextConfig.mainQualTitle);
  setText("out-qual-main-inst", nextConfig.institute);
  setText("out-qual-basic-inst", nextConfig.institute);
  setHidden("ca-foundation-toggle", program !== "ca");
  updateBasicQualificationTitle();

  setFieldIfProgramDefault("inp-fts", previousConfig.primaryDefault, nextConfig.primaryDefault, forceDefaults);
  setFieldIfProgramDefault("inp-crn", previousConfig.secondaryDefault, nextConfig.secondaryDefault, forceDefaults);
  setFieldIfProgramDefault("inp-sum", previousConfig.summary, nextConfig.summary, forceDefaults);
  setFieldIfProgramDefault("inp-caf", previousConfig.mainQualDefault, nextConfig.mainQualDefault, forceDefaults);
  setFieldIfProgramDefault("inp-prc", previousConfig.basicQualDefault, nextConfig.basicQualDefault, forceDefaults);
  setFieldIfProgramDefault("inp-tech", previousConfig.techDefault, nextConfig.techDefault, forceDefaults);
  setFieldIfProgramDefault("inp-soft", previousConfig.softDefault, nextConfig.softDefault, forceDefaults);
  setFieldIfProgramDefault("inp-cert", previousConfig.certDefault, nextConfig.certDefault, forceDefaults);
  setFieldIfProgramDefault("inp-exp-title", previousConfig.expTitleDefault, nextConfig.expTitleDefault, forceDefaults);
  setFieldIfProgramDefault("inp-exp-date", previousConfig.expDateDefault, nextConfig.expDateDefault, forceDefaults);
  setFieldIfProgramDefault("inp-exp-desc", previousConfig.expDescDefault, nextConfig.expDescDefault, forceDefaults);

  updatePreview();
}

function setTheme(themeClass, btn, showPic) {
  byId("cv-canvas").className = themeClass;
  currentThemeShowsPicture = showPic;

  document.querySelectorAll(".theme-btn").forEach((button) => button.classList.remove("active"));
  if (btn) {
    btn.classList.add("active");
  }

  byId("pic-upload-container").style.display = showPic ? "block" : "none";
  updatePhotoVisibility();
  updatePreview();
}

function syncNode(inputId, outIds, wrapperIds) {
  const value = byId(inputId).value.trim();

  if (outIds) {
    outIds.forEach((id) => {
      const output = byId(id);
      if (output) {
        output.innerText = value;
      }
    });
  }

  if (wrapperIds) {
    wrapperIds.forEach((id) => setHidden(id, value === ""));
  }

  return value !== "";
}

function syncList(inputId, outId, wrapperId) {
  const value = byId(inputId).value.trim();
  const list = byId(outId);

  if (value) {
    const items = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");

    list.innerHTML = items;
    if (wrapperId) {
      setHidden(wrapperId, items === "");
    }
    return items !== "";
  }

  list.innerHTML = "";
  if (wrapperId) {
    setHidden(wrapperId, true);
  }
  return false;
}

function updateCaIdentity() {
  const config = programConfigs[currentProgram];
  const primaryId = byId("inp-fts").value.trim();
  const secondaryId = byId("inp-crn").value.trim();
  const parts = [];

  if (primaryId) {
    parts.push(`${config.primaryShort}: ${primaryId}`);
  }

  if (secondaryId) {
    parts.push(`${config.secondaryShort}: ${secondaryId}`);
  }

  byId("out-ca-side").innerText = parts.join(" | ");
  byId("out-fts-top").innerText = primaryId;
  byId("out-crn-top").innerText = secondaryId;
  setText("out-primary-id-label", config.primaryShort);
  setText("out-secondary-id-label", config.secondaryShort);
  setHidden("wrap-ca-side", parts.length === 0);
  setHidden("wrap-ca-top", parts.length === 0);
  setHidden("wrap-fts-top", !primaryId);
  setHidden("wrap-crn-top", !secondaryId);
}

function updatePreview() {
  syncNode("inp-name", ["out-name-top", "out-name-side"], null);
  syncNode("inp-phone", ["out-phone-top", "out-phone-side"], ["wrap-phone-top", "wrap-phone-side"]);
  syncNode("inp-email", ["out-email-top", "out-email-side"], ["wrap-email-top", "wrap-email-side"]);
  syncNode("inp-loc", ["out-loc-top", "out-loc-side"], ["wrap-loc-top", "wrap-loc-side"]);
  syncNode("inp-link", ["out-link-top", "out-link-side"], ["wrap-link-top", "wrap-link-side"]);
  updateCaIdentity();

  syncNode("inp-sum", ["out-sum"], ["wrap-sum"]);

  const hasCaf = syncNode("inp-caf", ["out-caf"], ["wrap-caf"]);
  const hasPrc = syncNode("inp-prc", ["out-prc"], ["wrap-prc"]);
  setHidden("wrap-edu", !hasCaf && !hasPrc);

  const hasCol = syncNode("inp-col", ["out-col"], ["wrap-col"]);
  syncNode("inp-col-marks", ["out-col-marks"], null);
  const hasSch = syncNode("inp-sch", ["out-sch"], ["wrap-sch"]);
  syncNode("inp-sch-marks", ["out-sch-marks"], null);
  setHidden("wrap-acad", !hasCol && !hasSch);

  syncList("inp-tech", "out-tech", "wrap-tech");
  syncList("inp-soft", "out-soft", "wrap-soft");
  syncList("inp-cert", "out-cert", "wrap-cert");
  syncNode("inp-ref", ["out-ref"], ["wrap-ref"]);

  const hasExpTitle = syncNode("inp-exp-title", ["out-exp-title"], null);
  const hasExpDate = syncNode("inp-exp-date", ["out-exp-date"], null);
  const hasExpDesc = syncList("inp-exp-desc", "out-exp-desc", null);
  setHidden("wrap-exp", !hasExpTitle && !hasExpDate && !hasExpDesc);
}

function exportPDF() {
  const canvas = byId("cv-canvas");
  const oldShadow = canvas.style.boxShadow;
  canvas.style.boxShadow = "none";

  const options = {
    margin: 0,
    filename: programConfigs[currentProgram].pdfName,
    image: { type: "jpeg", quality: 1.0 },
    html2canvas: { scale: 4, useCORS: true, letterRendering: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  };

  html2pdf().set(options).from(canvas).save().finally(() => {
    canvas.style.boxShadow = oldShadow;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  byId("inp-pic").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      byId("img-side").src = loadEvent.target.result;
      updatePhotoVisibility();
    };
    reader.readAsDataURL(file);
  });

  document.querySelectorAll(".t-input").forEach((input) => {
    input.addEventListener("input", updatePreview);
  });

  // 🔥 FOCUS MODE MUSIC LOGIC 🔥
  const focusBtn = byId("focus-mode-btn");
  const focusAudio = byId("focus-audio");
  if (focusBtn && focusAudio) {
    focusAudio.volume = 0.25; // 25% volume for smooth lo-fi vibe
    focusBtn.addEventListener("click", () => {
      if (focusAudio.paused) {
        focusAudio.play();
        focusBtn.style.background = "#eff6ff";
        focusBtn.style.color = "#1d4ed8";
        focusBtn.style.borderColor = "#3b82f6";
        focusBtn.innerHTML = '<i class="fas fa-volume-up"></i> Playing...';
      } else {
        focusAudio.pause();
        focusBtn.style.background = "rgba(255, 255, 255, 0.92)";
        focusBtn.style.color = "#2563eb";
        focusBtn.style.borderColor = "rgba(37, 99, 235, 0.22)";
        focusBtn.innerHTML = '<i class="fas fa-headphones"></i> Focus Mode';
      }
    });
  }

  setProgram("ca", byId("btn-program-ca"), true);
  setTheme("theme-modern", document.querySelector(".theme-btn.active"), true);
});
