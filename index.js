const ALL_LINKS = [
    { title: 'jem.tv', url: 'https://videos.jem.tv', icon: 'fa-video', category: 'public video' },
    { title: 'VMS', url: 'https://vms.jemedia.com', icon: 'fa-server', category: 'server video' },
    { title: 'Old LT Chabadorg', url: 'https://chabad.org/lt', icon: 'fa-star', category: 'public video' },
    { title: 'Ashreinu', url: 'https://ashreinu.app/events', icon: 'fa-headphones', category: 'public media audio' },
    { title: 'AMS', url: 'https://ams.office.jemedia.org', icon: 'fa-music', category: 'server media audio' },
    { title: 'JEM Photos', url: 'https://photos.jemedia.org', icon: 'fa-image', category: 'public media photo' },
    { title: 'Rebbephoto', url: 'https://remote.rebbephoto.com', icon: 'fa-portrait', category: 'server media photo' },
    { title: 'HMS En Jem.tv', url: 'https://videos.jem.tv/hms', icon: 'fa-file-alt', category: 'public text' },
    { title: 'HMS Heb Jem.tv', url: 'https://videos.jem.tv/hms/he', icon: 'fa-language', category: 'public text' },
    { title: 'JEMai', url: 'https://videos.jem.tv/jemai', icon: 'fa-robot', category: 'public ai' },
    { title: 'JEMai V2', url: 'https://videos.jem.tv/jemai?version=2', icon: 'fa-brain', category: 'public ai' },
    { title: 'JEMai V3', url: 'https://claude.ai', icon: 'fa-comments', category: 'public ai' },
    { title: 'Serial Number POC', url: 'https://rebbephoto.com/serial-number-poc', icon: 'fa-id-card', category: 'public tools' },
    { title: 'Generate CSV', url: 'https://jemcentral.org/test/jsonCsv.html', icon: 'fa-file-csv', category: 'public tools' },
    { title: 'Tagging Tool', url: 'https://jem-tagging.web.app', icon: 'fa-tags', category: 'public tools' },
    { title: 'Sign URL', url: 'https://ccdb-admin-prod.firebaseapp.com/sign-url', icon: 'fa-signature', category: 'server tools' },
    { title: 'Search Faces', url: 'https://ccdb.jemedia.com/migration/face-recognition/search', icon: 'fa-user-friends', category: 'server media tools' },
    { title: 'Clockin', url: 'https://app.clockify.me', icon: 'fa-clock', category: 'public outside' },
    { title: 'Content Hub (Notion)', url: 'https://www.notion.so/jemedia/c027df7ff28443da92c14155172553e2?v=44b085f32e784854b6f02ac8bb0f7720&pvs=13', icon: 'fa-folder-open', category: 'server management' },
    { title: 'Knowledgebase (Notion)', url: 'https://www.notion.so/jemedia/Knowledge-Base-d6ae2f07c1214a5e873f57357505e45c', icon: 'fa-book', category: 'server management' },
    { title: 'GNMC Calendar', url: 'https://gnmc.office.jemedia.org/calendar', icon: 'fa-calendar-alt', category: 'server management' },
    { title: 'Dedications', url: 'https://dedication.jemedia.org/category/gnmc', icon: 'fa-gift', category: 'public management' }
];

const ALL_SECTIONS = [
    { title: 'Video', id: 'video', icon: 'fa-video' },
    { title: 'Audio', id: 'audio', icon: 'fa-headphones' },
    { title: 'Photos', id: 'photo', icon: 'fa-image' },
    { title: 'Text', id: 'text', icon: 'fa-file-alt' },
    { title: 'AI Tools', id: 'ai', icon: 'fa-robot' },
    { title: 'Tools', id: 'tools', icon: 'fa-tools' },
    { title: 'Outside Tools', id: 'outside', icon: 'fa-external-link-alt' },
    { title: 'Management', id: 'management', icon: 'fa-folder-open' },
    { title: 'Projects', id: 'projects', icon: 'fa-project-diagram' }
];

function checkCode() {
    const code = document.getElementById('code').value;
    if (code === 'mySecretCode') {
        document.getElementById('login').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    } else {
        alert('Wrong code!');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initSideMenu();
    initWorkspaceDashboard();
    const urlParams = new URLSearchParams(window.location.search);
    const filter = urlParams.get('filter');
    filterLinks(filter === 'public' ? 'public' : 'all');
    updateProjectsSection();
    initDragAndDrop();
    updateArrowStates();
});

function initSideMenu() {
    const sideMenu = document.getElementById('sideMenu');
    sideMenu.innerHTML = '';
    ALL_SECTIONS.forEach(section => {
        const sectionLinks = ALL_LINKS.filter(link => link.category.includes(section.id));
        if (sectionLinks.length > 0) {
            let sectionHtml = `
                <div class="side-menu-category">
                    <h3><i class="fas ${section.icon}"></i> ${section.title}</h3>
            `;
            sectionLinks.forEach(link => {
                sectionHtml += `
                    <a href="${link.url}" class="side-menu-link" target="_blank" rel="noopener">
                        <i class="fas ${link.icon}"></i> ${link.title}
                    </a>
                `;
            });
            sectionHtml += `</div>`;
            sideMenu.innerHTML += sectionHtml;
        }
    });
}

function toggleSideMenu() {
    const sideMenu = document.getElementById('sideMenu');
    sideMenu.classList.toggle('active');
}

function switchMainTab(tab) {
    const tabs = document.querySelectorAll('.main-tab');
    const contents = document.querySelectorAll('.content-area');
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    const activeTab = document.querySelector(`[onclick="switchMainTab('${tab}')"]`);
    if (activeTab) activeTab.classList.add('active');
    document.getElementById(tab === 'all' ? 'allContent' : tab === 'workspace' ? 'workspaceContent' : 'browseContent').classList.add('active');
    updateArrowStates();
}

function switchBrowseTab(tab) {
    const tabs = document.querySelectorAll('.browse-tab');
    tabs.forEach(t => t.classList.remove('active'));
    const activeTab = document.querySelector(`[onclick="switchBrowseTab('${tab}')"]`);
    if (activeTab) activeTab.classList.add('active');

    const iframe = document.getElementById('browseIframe');
    const urls = {
        jemtv: 'https://videos.jem.tv',
        photos: 'https://photos.jemedia.org/search',
        ashreinu: 'https://ashreinu.app'
    };
    iframe.src = urls[tab];
}

function goBackIframe() {
    const iframe = document.getElementById('browseIframe');
    if (iframe.contentWindow) {
        iframe.contentWindow.history.back();
    }
}

function toggleFullscreen() {
    const iframeContainer = document.getElementById('iframeContainer');
    const iframe = document.getElementById('browseIframe');
    const fullscreenBtn = iframeContainer.querySelector('.iframe-control-btn i.fa-expand, .iframe-control-btn i.fa-compress');
    if (iframeContainer.classList.contains('fullscreen')) {
        iframeContainer.classList.remove('fullscreen');
        iframe.style.height = 'calc(100vh - 200px)';
        fullscreenBtn.classList.remove('fa-compress');
        fullscreenBtn.classList.add('fa-expand');
    } else {
        iframeContainer.classList.add('fullscreen');
        iframe.style.height = '100vh';
        fullscreenBtn.classList.remove('fa-expand');
        fullscreenBtn.classList.add('fa-compress');
    }
}

function filterLinks(category) {
    const cards = document.querySelectorAll('#allContent .link-card');
    const sections = document.querySelectorAll('#allContent .section-title, #allContent .links-grid');
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    const activeButton = document.querySelector(`.filter-btn[onclick="filterLinks('${category}')"]`);
    if (activeButton) activeButton.classList.add('active');

    sections.forEach(section => {
        const sectionId = section.dataset.sectionId;
        const sectionCards = section.querySelectorAll('.link-card');
        let hasVisibleCard = false;

        if (section.classList.contains('links-grid')) {
            sectionCards.forEach(card => {
                const cardCategory = card.dataset.category;
                if (category === 'all' || 
                    (category === 'server' && cardCategory.includes('server')) ||
                    (cardCategory && cardCategory.includes(category))) {
                    card.classList.remove('hidden');
                    hasVisibleCard = true;
                } else {
                    card.classList.add('hidden');
                }
            });

            const sectionTitle = document.querySelector(`.section-title[data-section-id="${sectionId}"]`);
            if (sectionTitle) {
                sectionTitle.classList.toggle('hidden', !hasVisibleCard);
            }
            section.classList.toggle('hidden', !hasVisibleCard);
        }
    });
    updateArrowStates();
}

function initWorkspaceDashboard() {
    if (localStorage.getItem('workspaceDashboardSections') === null) {
        const allSectionIds = ALL_SECTIONS.map(s => s.id);
        localStorage.setItem('workspaceDashboardSections', JSON.stringify(allSectionIds));
    }
    if (!localStorage.getItem('userProjects')) {
        localStorage.setItem('userProjects', JSON.stringify([]));
    }

    const manageModal = document.getElementById('manageModal');
    const projectModal = document.getElementById('projectModal');
    const manageBtn = document.getElementById('manageDashboardBtn');
    const addProjectBtn = document.getElementById('addProjectBtn');
    const manageCloseBtn = manageModal.querySelector('.close-btn');
    const projectCloseBtn = projectModal.querySelector('.close-btn');
    const saveBtn = document.getElementById('saveDashboardBtn');
    const saveProjectBtn = document.getElementById('saveProjectBtn');
    const checkboxContainer = document.getElementById('sectionCheckboxes');
    const projectLinksSelect = document.getElementById('projectLinks');

    if (checkboxContainer.children.length === 0) {
        ALL_SECTIONS.forEach(section => {
            checkboxContainer.innerHTML += `
                <label>
                    <input type="checkbox" value="${section.id}" name="dashboardSection">
                    ${section.title}
                </label>
            `;
        });
    }

    if (projectLinksSelect.children.length === 0) {
        ALL_LINKS.forEach(link => {
            projectLinksSelect.innerHTML += `
                <option value="${link.url}" data-icon="${link.icon}">
                    ${link.title} (${link.category})
                </option>
            `;
        });
    }

    manageBtn.onclick = () => openManageModal();
    addProjectBtn.onclick = () => projectModal.style.display = 'block';
    manageCloseBtn.onclick = () => manageModal.style.display = 'none';
    projectCloseBtn.onclick = () => projectModal.style.display = 'none';
    saveBtn.onclick = () => saveDashboardSettings();
    saveProjectBtn.onclick = () => saveNewProject();
    window.onclick = (event) => {
        if (event.target == manageModal) manageModal.style.display = 'none';
        if (event.target == projectModal) projectModal.style.display = 'none';
        if (!event.target.closest('.side-menu') && !event.target.closest('.hamburger')) {
            document.getElementById('sideMenu').classList.remove('active');
        }
    };

    renderWorkspaceDashboard();
    updateProjectsSection();
}

function openManageModal() {
    const savedSections = JSON.parse(localStorage.getItem('workspaceDashboardSections'));
    const checkboxes = document.querySelectorAll('#sectionCheckboxes input[type="checkbox"]');
    checkboxes.forEach(box => {
        box.checked = savedSections.includes(box.value);
    });
    document.getElementById('manageModal').style.display = 'block';
}

function saveDashboardSettings() {
    const checkboxes = document.querySelectorAll('#sectionCheckboxes input[type="checkbox"]:checked');
    const selectedSections = Array.from(checkboxes).map(box => box.value);
    localStorage.setItem('workspaceDashboardSections', JSON.stringify(selectedSections));
    document.getElementById('manageModal').style.display = 'none';
    renderWorkspaceDashboard();
    updateArrowStates();
}

function saveNewProject() {
    const title = document.getElementById('projectTitle').value;
    const urls = Array.from(document.getElementById('projectLinks').selectedOptions).map(option => ({
        url: option.value,
        title: option.text.split(' (')[0],
        icon: option.dataset.icon
    }));
    const icon = document.getElementById('projectIcon').value;

    if (!title || urls.length === 0) {
        alert('Please fill in the project name and select at least one link');
        return;
    }

    const projects = JSON.parse(localStorage.getItem('userProjects') || '[]');
    projects.push({ title, urls, icon, category: 'public projects' });
    localStorage.setItem('userProjects', JSON.stringify(projects));

    document.getElementById('projectModal').style.display = 'none';
    document.getElementById('projectTitle').value = '';
    document.getElementById('projectLinks').selectedIndex = -1;
    document.getElementById('projectIcon').value = 'fa-project-diagram';
    renderWorkspaceDashboard();
    updateProjectsSection();
}

function updateProjectsSection() {
    const projectsGrid = document.querySelector('.links-grid[data-section-id="projects"]');
    if (projectsGrid) {
        projectsGrid.innerHTML = '';
        const projects = JSON.parse(localStorage.getItem('userProjects') || '[]');
        projects.forEach((project, projectIndex) => {
            project.urls.forEach((link, linkIndex) => {
                projectsGrid.innerHTML += `
                    <div class="link-card draggable" data-category="public projects" data-project-index="${projectIndex}" data-link-index="${linkIndex}">
                        <div class="drag-controls">
                            <button class="drag-arrow" onclick="moveItem(this, 'left')"><i class="fas fa-arrow-left"></i></button>
                            <button class="drag-arrow" onclick="moveItem(this, 'right')"><i class="fas fa-arrow-right"></i></button>
                        </div>
                        <div class="link-icon"><i class="fas ${link.icon || project.icon}"></i></div>
                        <div class="link-title">${project.title}${project.urls.length > 1 ? ` (${linkIndex + 1})` : ''}</div>
                        <div class="link-desc">Custom project link</div>
                        <a class="link-btn" href="${link.url}" target="_blank" rel="noopener">
                            <i class="fas fa-external-link-alt"></i> Visit ${link.title}
                        </a>
                    </div>
                `;
            });
        });
    }
    initDragAndDrop();
    updateArrowStates();
}

function renderWorkspaceDashboard() {
    const container = document.getElementById('workspaceDashboardContainer');
    container.innerHTML = '';
    const savedSections = JSON.parse(localStorage.getItem('workspaceDashboardSections') || '[]');

    if (savedSections.length === 0) {
        container.innerHTML = `<p style="text-align: center;">Your workspace is empty. Click "Manage Sections" to add content.</p>`;
        return;
    }

    savedSections.forEach((sectionId, index) => {
        const originalTitle = document.querySelector(`#allContent h2[data-section-id="${sectionId}"]`);
        if (originalTitle) {
            const originalGrid = originalTitle.nextElementSibling;
            const sectionWrapper = document.createElement('div');
            sectionWrapper.className = 'draggable-section';
            sectionWrapper.dataset.sectionId = sectionId;
            sectionWrapper.draggable = true;
            sectionWrapper.innerHTML = `
                <div class="section-drag-controls">
                    <button class="drag-arrow" onclick="moveItem(this, 'up')"><i class="fas fa-arrow-up"></i></button>
                    <button class="drag-arrow" onclick="moveItem(this, 'down')"><i class="fas fa-arrow-down"></i></button>
                </div>
            `;
            const clonedTitle = originalTitle.cloneNode(true);
            const clonedGrid = originalGrid.cloneNode(true);
            clonedGrid.querySelectorAll('.link-card').forEach(card => {
                const controls = document.createElement('div');
                controls.className = 'drag-controls';
                controls.innerHTML = `
                    <button class="drag-arrow" onclick="moveItem(this, 'left')"><i class="fas fa-arrow-left"></i></button>
                    <button class="drag-arrow" onclick="moveItem(this, 'right')"><i class="fas fa-arrow-right"></i></button>
                `;
                card.insertBefore(controls, card.firstChild);
            });
            sectionWrapper.appendChild(clonedTitle);
            sectionWrapper.appendChild(clonedGrid);
            container.appendChild(sectionWrapper);
        }
    });
    initDragAndDrop();
    updateArrowStates();
}

function updateArrowStates() {
    const workspaceContainer = document.getElementById('workspaceDashboardContainer');
    const sections = Array.from(workspaceContainer.querySelectorAll('.draggable-section'));
    sections.forEach((section, index) => {
        const upArrow = section.querySelector('.section-drag-controls .drag-arrow[onclick*="up"]');
        const downArrow = section.querySelector('.section-drag-controls .drag-arrow[onclick*="down"]');
        if (upArrow) upArrow.disabled = index === 0;
        if (downArrow) downArrow.disabled = index === sections.length - 1;

        const cards = Array.from(section.querySelectorAll('.link-card'));
        cards.forEach((card, cardIndex) => {
            const leftArrow = card.querySelector('.drag-controls .drag-arrow[onclick*="left"]');
            const rightArrow = card.querySelector('.drag-controls .drag-arrow[onclick*="right"]');
            if (leftArrow) leftArrow.disabled = cardIndex === 0;
            if (rightArrow) rightArrow.disabled = cardIndex === cards.length - 1;
        });
    });

    const projectsGrid = document.querySelector('.links-grid[data-section-id="projects"]');
    if (projectsGrid) {
        const projectCards = Array.from(projectsGrid.querySelectorAll('.link-card'));
        projectCards.forEach((card, cardIndex) => {
            const leftArrow = card.querySelector('.drag-controls .drag-arrow[onclick*="left"]');
            const rightArrow = card.querySelector('.drag-controls .drag-arrow[onclick*="right"]');
            if (leftArrow) leftArrow.disabled = cardIndex === 0;
            if (rightArrow) rightArrow.disabled = cardIndex === projectCards.length - 1;
        });
    }
}

function moveItem(button, direction) {
    const item = button.closest('.draggable-section, .link-card');
    if (!item) return;

    const container = item.closest('.links-grid, #workspaceDashboardContainer');
    if (!container) return;

    const items = Array.from(container.querySelectorAll('.draggable-section, .link-card'));
    const index = items.indexOf(item);

    if (item.classList.contains('draggable-section')) {
        if (direction === 'up' && index > 0) {
            const prevItem = items[index - 1];
            if (prevItem && prevItem.parentNode === container) {
                container.insertBefore(item, prevItem);
                updateSectionOrder(index, index - 1);
            }
        } else if (direction === 'down' && index < items.length - 1) {
            const nextItem = items[index + 1];
            if (nextItem && nextItem.parentNode === container) {
                container.insertBefore(item, nextItem.nextSibling || null);
                updateSectionOrder(index, index + 1);
            }
        }
    } else if (item.classList.contains('link-card')) {
        const sectionGrid = item.closest('.links-grid');
        if (!sectionGrid) return;
        const cards = Array.from(sectionGrid.querySelectorAll('.link-card'));
        const cardIndex = cards.indexOf(item);
        if (direction === 'left' && cardIndex > 0) {
            const prevCard = cards[cardIndex - 1];
            if (prevCard && prevCard.parentNode === sectionGrid) {
                sectionGrid.insertBefore(item, prevCard);
                updateCardOrder(sectionGrid, cardIndex, cardIndex - 1);
            }
        } else if (direction === 'right' && cardIndex < cards.length - 1) {
            const nextCard = cards[cardIndex + 1];
            if (nextCard && nextCard.parentNode === sectionGrid) {
                sectionGrid.insertBefore(item, nextCard.nextSibling || null);
                updateCardOrder(sectionGrid, cardIndex, cardIndex + 1);
            }
        }
    }

    updateArrowStates();
}

function updateSectionOrder(oldIndex, newIndex) {
    const savedSections = JSON.parse(localStorage.getItem('workspaceDashboardSections') || '[]');
    const sectionId = savedSections[oldIndex];
    if (sectionId) {
        savedSections.splice(oldIndex, 1);
        savedSections.splice(newIndex, 0, sectionId);
        localStorage.setItem('workspaceDashboardSections', JSON.stringify(savedSections));
    }
    renderWorkspaceDashboard();
}

function updateCardOrder(sectionGrid, oldIndex, newIndex) {
    if (sectionGrid.dataset.sectionId === 'projects') {
        const projects = JSON.parse(localStorage.getItem('userProjects') || '[]');
        const projectIndex = parseInt(sectionGrid.querySelector('.link-card').dataset.projectIndex);
        const link = projects[projectIndex].urls[oldIndex];
        projects[projectIndex].urls.splice(oldIndex, 1);
        projects[projectIndex].urls.splice(newIndex, 0, link);
        localStorage.setItem('userProjects', JSON.stringify(projects));
        updateProjectsSection();
    }
}

function initDragAndDrop() {
    const containers = document.querySelectorAll('.links-grid, #workspaceDashboardContainer');
    let draggedItem = null;
    let placeholder = null;

    containers.forEach(container => {
        container.addEventListener('dragstart', (e) => {
            const target = e.target.closest('.draggable-section, .link-card');
            if (target) {
                draggedItem = target;
                target.classList.add('dragging');
                e.dataTransfer.setData('text/plain', '');
                setTimeout(() => {
                    target.style.display = 'none';
                    placeholder = document.createElement('div');
                    placeholder.className = 'drag-placeholder';
                    placeholder.style.height = target.offsetHeight + 'px';
                    if (target.classList.contains('draggable-section')) {
                        target.parentNode.insertBefore(placeholder, target.nextSibling || null);
                    } else {
                        target.parentNode.insertBefore(placeholder, target);
                    }
                }, 0);
            }
        });

        container.addEventListener('dragend', (e) => {
            const target = e.target.closest('.draggable-section, .link-card');
            if (target) {
                target.classList.remove('dragging');
                target.style.display = '';
                if (placeholder) {
                    placeholder.remove();
                    placeholder = null;
                }
                draggedItem = null;
            }
            updateArrowStates();
        });

        container.addEventListener('dragover', (e) => {
            e.preventDefault();
            const target = e.target.closest('.draggable-section, .link-card');
            const dropContainer = e.target.closest('.links-grid, #workspaceDashboardContainer');
            if (dropContainer && placeholder && draggedItem) {
                const allItems = Array.from(dropContainer.querySelectorAll('.draggable-section, .link-card'));
                const closestItem = allItems.find(item => {
                    if (item === draggedItem) return false;
                    const rect = item.getBoundingClientRect();
                    return e.clientY >= rect.top && e.clientY <= rect.bottom;
                });
                if (closestItem && closestItem.parentNode === dropContainer) {
                    const rect = closestItem.getBoundingClientRect();
                    const isBefore = e.clientY < rect.top + rect.height / 2;
                    dropContainer.insertBefore(placeholder, isBefore ? closestItem : closestItem.nextSibling || null);
                } else {
                    dropContainer.appendChild(placeholder);
                }
            }
        });

        container.addEventListener('drop', (e) => {
            e.preventDefault();
            const dropTarget = e.target.closest('.draggable-section, .link-card');
            const dropContainer = e.target.closest('.links-grid, #workspaceDashboardContainer');

            if (!draggedItem || !dropContainer) return;

            if (draggedItem.classList.contains('draggable-section')) {
                const allSections = Array.from(document.querySelectorAll('#workspaceDashboardContainer .draggable-section'));
                const draggedIndex = allSections.indexOf(draggedItem);
                let dropIndex = dropTarget && dropTarget.classList.contains('draggable-section') ? allSections.indexOf(dropTarget) : allSections.length;

                const rect = dropTarget?.getBoundingClientRect();
                const isBefore = dropTarget && e.clientY < rect.top + rect.height / 2;
                if (dropTarget && !isBefore) dropIndex++;

                if (draggedIndex !== -1 && draggedIndex !== dropIndex && draggedIndex !== dropIndex - 1) {
                    if (dropIndex >= allSections.length) {
                        dropContainer.appendChild(draggedItem);
                    } else if (allSections[dropIndex] && allSections[dropIndex].parentNode === dropContainer) {
                        dropContainer.insertBefore(draggedItem, allSections[dropIndex]);
                    } else {
                        dropContainer.appendChild(draggedItem);
                    }

                    const savedSections = JSON.parse(localStorage.getItem('workspaceDashboardSections') || '[]');
                    const draggedSectionId = draggedItem.dataset.sectionId;
                    savedSections.splice(draggedIndex, 1);
                    savedSections.splice(dropIndex > draggedIndex ? dropIndex - 1 : dropIndex, 0, draggedSectionId);
                    localStorage.setItem('workspaceDashboardSections', JSON.stringify(savedSections));
                }
            } else if (draggedItem.classList.contains('link-card') && dropContainer.classList.contains('links-grid')) {
                const allCards = Array.from(dropContainer.querySelectorAll('.link-card'));
                const dropIndex = dropTarget && dropTarget.classList.contains('link-card') ? allCards.indexOf(dropTarget) : allCards.length;
                const rect = dropTarget?.getBoundingClientRect();
                const isBefore = dropTarget && e.clientY < rect.top + rect.height / 2;

                if (dropTarget && dropTarget.classList.contains('link-card') && dropTarget.parentNode === dropContainer) {
                    dropContainer.insertBefore(draggedItem, isBefore ? dropTarget : dropTarget.nextSibling || null);
                } else {
                    dropContainer.appendChild(draggedItem);
                }

                if (dropContainer.dataset.sectionId === 'projects') {
                    const projects = JSON.parse(localStorage.getItem('userProjects') || '[]');
                    const draggedProjectIndex = parseInt(draggedItem.dataset.projectIndex);
                    const draggedLinkIndex = parseInt(draggedItem.dataset.linkIndex);
                    const dropProjectIndex = dropTarget && dropTarget.dataset.projectIndex ? parseInt(dropTarget.dataset.projectIndex) : null;
                    const dropLinkIndex = dropTarget && dropTarget.dataset.linkIndex ? parseInt(dropTarget.dataset.linkIndex) : null;

                    if (dropProjectIndex !== null && dropLinkIndex !== null) {
                        const draggedLink = projects[draggedProjectIndex].urls[draggedLinkIndex];
                        projects[draggedProjectIndex].urls.splice(draggedLinkIndex, 1);
                        if (draggedProjectIndex === dropProjectIndex) {
                            projects[dropProjectIndex].urls.splice(isBefore ? dropLinkIndex : dropLinkIndex + 1, 0, draggedLink);
                        } else {
                            projects[dropProjectIndex].urls.splice(isBefore ? dropLinkIndex : dropLinkIndex + 1, 0, draggedLink);
                            if (projects[draggedProjectIndex].urls.length === 0) {
                                projects.splice(draggedProjectIndex, 1);
                            }
                        }
                        localStorage.setItem('userProjects', JSON.stringify(projects));
                        updateProjectsSection();
                    }
                }
            }

            draggedItem.style.display = '';
            if (placeholder) {
                placeholder.remove();
                placeholder = null;
            }
            draggedItem = null;
            updateArrowStates();
        });
    });
}