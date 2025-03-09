const sidebar = document.getElementById("sidebar-content");
const contentArea = document.getElementById("content-area");

sidebar.innerHTML = ""; // Clear previous content

// Function to dynamically load H5P content
function loadContent(title, link, summary, keywords, h5pPath) {
    const contentArea = document.getElementById("content-area");
    contentArea.innerHTML = `
        <h2>${title}</h2>
        <p>🔗 <a href="${link}" target="_blank">رابط القراءة</a></p>
        <p>📂 <a href="${summary}" target="_blank">تحميل الملخص</a></p>
        <h3>🔑 الكلمات المفتاحية:</h3>
        <ul>${keywords}</ul>
        <div id="h5p-container" class="h5p-frame"></div>
    `;
    h5pPath="https://fatma-meawad.github.io/ramadan-lib/Asmaa"
    if (h5pPath) {
        const h5pContainer = document.getElementById("h5p-container");
        h5pContainer.innerHTML = "جارٍ تحميل المحتوى...";

        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/h5p-standalone@1.3.0'";
        script.onload = function () {
            new H5PStandalone.H5P(h5pContainer, {
                h5pJsonPath: h5pPath,
                frameJs: "https://cdn.jsdelivr.net/npm/h5p-standalone@1.3.0/dist/frame.bundle.js",
                frameCss: "https://cdn.jsdelivr.net/npm/h5p-standalone@1.3.0/dist/styles/h5p.css",
            });
        };
        document.body.appendChild(script);
    }
}

data.forEach(item => {
    let sectionsHTML = "";

    item.sections.forEach((section, index) => {
        let subsectionsHTML = "";

        section.subsections.forEach(subsection => {
            let keywordsList = subsection.keywords.map(keyword => `<li>${keyword}</li>`).join("");

            subsectionsHTML += `
                <div class="sub-expandable-section">
                    <button class="sub-expand-btn" onclick="loadContent('${subsection.title}', '${subsection.link}', '${subsection.summary_file}', '${keywordsList}', './Asmaa')">📖 ${subsection.title}</button>
                </div>
            `;
        });

        sectionsHTML += `
            <div class="expandable-section">
                <button class="expand-btn">➕ ${section.title}</button>
                <div class="expand-content">
                    ${subsectionsHTML}
                </div>
            </div>
        `;
    });

    let sidebarItem = `
        <div class="sidebar-item">
            <button class="expand-btn">📂 ${item.title}</button>
            <div class="expand-content">${sectionsHTML}</div>
        </div>
    `;

    sidebar.innerHTML += sidebarItem;
});



// Create a sidebar toggle button on mobile
const toggleButton = document.createElement("button");
toggleButton.innerText = "☰";
toggleButton.classList.add("sidebar-toggle");
toggleButton.onclick = function () {
    document.getElementById("sidebar").classList.toggle("open");
};
document.body.appendChild(toggleButton);


// Toggle sidebar sections
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("expand-btn")) {
        const content = event.target.nextElementSibling;
        content.classList.toggle("show");
    }
});


