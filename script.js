const sidebar = document.getElementById("sidebar-content");
//const contentArea = document.getElementById("content-area");

sidebar.innerHTML = ""; // Clear previous content

// Function to dynamically load H5P content
function loadContent(item_title, s_title, title, link, summary, keywords, htmlPath, markdownPath) {
    const contentArea = document.getElementById("content-area");
    contentArea.innerHTML = `
        <h1> مكتبة رمضان</h1>
        <h3>${item_title}</h3>
        <h4>${s_title}</h4>
        <h5>${title}</h5>
        <iframe src="${htmlPath}" width="50%" height="400px" style="border:none; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); border-radius: 8px;"></iframe>
        <div id="markdown-content" class="markdown-content">جارٍ تحميل المحتوى...</div>
    `;

    // Load and render Markdown content
    if (markdownPath) {
        fetch(markdownPath)
            .then(response => response.text())
            .then(markdown => {
                if (window.marked) {
                    document.getElementById("markdown-content").innerHTML = marked.parse(markdown);
                } else {
                    document.getElementById("markdown-content").innerHTML = `<pre>${markdown}</pre>`;
                }
            })
            .catch(error => {
                console.error("Error loading markdown:", error);
                document.getElementById("markdown-content").innerHTML = "❌ فشل تحميل المحتوى.";
            });
    }
}


data.forEach(item => {
    let sectionsHTML = "";

    item.sections.forEach((section, index) => {
        let subsectionsHTML = "";

        section.subsections.forEach(subsection => {
            let keywordsList = subsection.keywords.map(keyword => `< li > ${keyword}</li > `).join("");

            subsectionsHTML += `
            <div class="sub-expandable-section" >
                <button class="final-btn" onclick="loadContent('${item.title}','${section.title}','${subsection.title}', '${subsection.link}', '${subsection.summary_file}', '${keywordsList}', 'h5p.html?map=${subsection.link}', '${subsection.markdownPath}')"> ${subsection.title}</button>
                </div >
            `;
        });

        sectionsHTML += `
            <div class="expandable-section" >
                <button class="expand-btn"> 📖 ${section.title}</button>
                <div class="expand-content">
                    ${subsectionsHTML}
                </div>
                
            </div >
            `;
    });

    let sidebarItem = `
            <div class="sidebar-item" >
            <button class="expand-btn">📂 ${item.title}</button>
            <div class="expand-content">${sectionsHTML}</div>
        </div >
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


