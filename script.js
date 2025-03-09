const sidebar = document.getElementById("sidebar-content");
//const contentArea = document.getElementById("content-area");

sidebar.innerHTML = ""; // Clear previous content

// Function to dynamically load H5P content
function loadContent(item_title, s_title, title, summary, keywords, htmlPath) {
    const contentArea = document.getElementById("content-area");


    contentArea.innerHTML = `

     
        <h4>${item_title} - ${s_title}</h4>
        <h5>${title}</h5>
        <h5>الأسئلة</h5>
    
        <iframe id="content-iframe" src="${htmlPath}" width="100%" height="100vh"  style="border:none; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); border-radius: 8px;"></iframe>

           <h4>الأيات و الأحاديث: </h4>
        <ul>${keywords}</ul>
        <h4>ملخص:</h4>
        <ul>${summary}</ul>
    `;

}


data.forEach(item => {
    let sectionsHTML = "";

    item.sections.forEach((section, index) => {
        let subsectionsHTML = "";

        section.subsections.forEach(subsection => {
            let keywordsFormatted = subsection.keywords.map(k => `<li>${k}</li>`).join("");
            let summaryFormatted = subsection.summary.map(s => `<li>${s}</li>`).join("");

            subsectionsHTML += `
            <div class="sub-expandable-section" >
                <button class="final-btn" onclick="loadContent('${item.title}','${section.title}','${subsection.title}', '${summaryFormatted}', '${keywordsFormatted}', 'h5p.html?map=${subsection.link}')"> ${subsection.title}</button>
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


