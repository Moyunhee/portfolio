// Projects: render, accordion, filter, job history links
(() => {
  const { $, $$, scrollBehavior } = window.App;

  const initProjects = () => {
    const { filters, projects, jobs, defaultImage } = window.PORTFOLIO;
    const ALL = filters[0];

    const projectList = $('#projectList');
    const filterList = $('#filterList');
    const projectCount = $('#projectCount');
    const jobList = $('#jobList');

    let activeFilter = ALL;
    let items = [];

    // Desktop/tablet use `src`, mobile widths use `mobileSrc` (when provided)
    const renderMedia = (image) => {
      if (!image) {
        return `<figure class="project__media"><img class="project__img" src="${defaultImage}" alt="" loading="lazy"></figure>`;
      }
      const { src, alt, mobileSrc } = image;
      return `
        <figure class="project__media">
          <picture>
            ${mobileSrc ? `<source media="(max-width: 620px)" srcset="${mobileSrc}">` : ''}
            <img class="project__img" src="${src}" alt="${alt}" loading="lazy">
          </picture>
        </figure>`;
    };

    const renderProject = (project, index) => {
      const { id, title, period, client, org, role, tech, tasks, image, link } = project;
      const isOpen = index === 0;

      return `
        <article class="accordion__item${isOpen ? ' is-open' : ''}" data-id="${id}">
          <h3 class="accordion__heading">
            <button class="accordion__trigger" type="button" id="trigger-${id}"
                    aria-expanded="${isOpen}" aria-controls="panel-${id}">
              <span class="accordion__period">${period}</span>
              <span class="accordion__title">${title}
                <small class="accordion__sub">${client}, ${role}</small>
              </span>
              <i class="accordion__icon" aria-hidden="true"></i>
            </button>
          </h3>
          <div class="accordion__panel">
            <div class="accordion__inner" id="panel-${id}" role="region" aria-labelledby="trigger-${id}">
              <div class="accordion__body">
                <div class="project">
                  ${renderMedia(image)}
                  <div class="project__info">
                    <h4 class="project__label">프로젝트 상세내용</h4>
                    <ul class="project__list">${tasks.map((task) => `<li>${task}</li>`).join('')}</ul>
                    <h4 class="project__label">소속</h4>
                    <p>${org}</p>
                    <h4 class="project__label">사용 기술</h4>
                    <ul class="tag-list" aria-label="사용 기술">${tech.map((name) => `<li class="tag">${name}</li>`).join('')}</ul>
                    ${link ? `<a class="btn btn--sm project__link" href="${link}" target="_blank" rel="noopener">사이트 보기<span class="sr-only"> (새 창으로 열림)</span></a>` : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>`;
    };

    const setOpen = (item, isOpen) => {
      item.classList.toggle('is-open', isOpen);
      $('.accordion__trigger', item).setAttribute('aria-expanded', isOpen);
    };

    const openOnly = (target) => items.forEach((item) => setOpen(item, item === target));

    // Only one panel is open at a time
    const toggleItem = (item) => {
      const wasOpen = item.classList.contains('is-open');
      items.forEach((el) => setOpen(el, false));
      setOpen(item, !wasOpen);
    };

    const isMatch = (project, filter) => filter === ALL || project.categories.includes(filter);

    const showItem = (item) => {
      if (!item.hidden) return;
      item.hidden = false;
      item.classList.add('is-fading');
      requestAnimationFrame(() => requestAnimationFrame(() => item.classList.remove('is-fading')));
    };

    const hideItem = (item) => {
      setOpen(item, false);
      if (item.hidden) return;
      item.classList.add('is-fading');
      setTimeout(() => {
        if (item.classList.contains('is-fading')) item.hidden = true;
      }, 170);
    };

    const applyFilter = (filter) => {
      activeFilter = filter;
      $$('.chip', filterList).forEach((chip) => chip.setAttribute('aria-pressed', chip.textContent === filter));

      const visible = [];
      items.forEach((item, index) => {
        if (isMatch(projects[index], filter)) {
          visible.push(item);
          showItem(item);
        } else {
          hideItem(item);
        }
      });

      // Keep one panel open (newest visible first)
      if (visible.length && !visible.some((item) => item.classList.contains('is-open'))) {
        setOpen(visible[0], true);
      }

      projectCount.textContent = filter === ALL ? '' : `프로젝트 ${items.length}개 중 ${visible.length}개를 보고 있어요`;
    };

    projectList.innerHTML = projects.map(renderProject).join('');
    items = $$('.accordion__item', projectList);

    projectList.addEventListener('click', (event) => {
      const trigger = event.target.closest('.accordion__trigger');
      if (trigger) toggleItem(trigger.closest('.accordion__item'));
    });

    filterList.innerHTML = filters
      .map((name) => `<button class="chip" type="button" aria-pressed="${name === activeFilter}">${name}</button>`)
      .join('');

    filterList.addEventListener('click', (event) => {
      const chip = event.target.closest('.chip');
      if (chip) applyFilter(chip.textContent);
    });

    // Job history -> related project
    jobList.innerHTML = jobs
      .map(({ company, rank, period, projectId }) => `
        <li class="list__item">
          <button class="list__btn" type="button" data-project="${projectId}">
            <span>${company}<small class="list__sub">${rank}</small></span>
            <span class="list__date">${period}<span class="sr-only"> 해당 프로젝트 보기</span></span>
          </button>
        </li>`)
      .join('');

    jobList.addEventListener('click', (event) => {
      const button = event.target.closest('[data-project]');
      if (!button) return;

      if (activeFilter !== ALL) applyFilter(ALL);
      const item = $(`[data-id="${button.dataset.project}"]`, projectList);
      item.hidden = false;
      item.classList.remove('is-fading');
      openOnly(item);
      // Wait for the accordion transition so the final layout is measured (scroll-padding handles the sticky bars)
      const panel = $('.accordion__panel', item);
      let done = false;
      const scrollToItem = () => {
        if (done) return;
        done = true;
        item.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
      };
      panel.addEventListener('transitionend', scrollToItem, { once: true });
      setTimeout(scrollToItem, window.App.prefersReducedMotion ? 0 : 450);
      $('.accordion__trigger', item).focus({ preventScroll: true });
    });
  };

  window.App.initProjects = initProjects;
})();
