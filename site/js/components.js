// Page components: toast, FAQ accordion, inquiry form (step tabs), terms modal, viewport label
(() => {
  const { $, $$, createTabs } = window.App;

  // Toast (live region)
  let toastTimer;
  const showToast = (message) => {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  };

  // Links without a destination show a short notice
  const initPlaceholders = () => {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('[data-toast]');
      if (!link) return;
      event.preventDefault();
      showToast(link.dataset.toast);
    });
  };

  // FAQ: one answer open at a time
  const initFaq = () => {
    const list = $('#faqList');
    const items = $$('.faq__item', list);

    list.addEventListener('click', (event) => {
      const trigger = event.target.closest('.faq__trigger');
      if (!trigger) return;
      const target = trigger.closest('.faq__item');
      const wasOpen = target.classList.contains('is-open');

      items.forEach((item) => {
        const isOpen = item === target && !wasOpen;
        item.classList.toggle('is-open', isOpen);
        $('.faq__trigger', item).setAttribute('aria-expanded', isOpen);
      });
    });
  };

  // Inquiry form: 3 steps, later steps stay locked until the previous one is valid
  const initInquiry = () => {
    const form = $('#inquiryForm');
    const tabs = $$('.stepper__tab', form);
    const prev = $('[data-step-prev]', form);
    const next = $('[data-step-next]', form);
    const consent = $('#consentCheck');
    const consentHelp = $('#consentHelp');
    const last = tabs.length - 1;
    const inputs = $$('[data-validate]', form);
    let completed = 0;

    const validators = {
      name: (value) => (value.length >= 2 ? '' : '이름을 2자 이상 입력해 주세요.'),
      message: (value) => (value.length >= 5 ? '' : '문의 내용을 5자 이상 입력해 주세요.'),
      phone: (value) => (/^01[016789]-?\d{3,4}-?\d{4}$/.test(value) ? '' : '휴대전화 번호 형식이 올바르지 않아요. (예: 010-1234-5678)'),
      type: (value) => (value ? '' : '문의 유형을 선택해 주세요.')
    };

    const validate = (input) => {
      const field = input.closest('.field');
      const help = $('.field__help', field);
      const message = validators[input.name](input.value.trim());

      help.textContent = message || help.dataset.default;
      field.classList.toggle('is-error', Boolean(message));
      input.setAttribute('aria-invalid', Boolean(message));
      return !message;
    };

    inputs.forEach((input) => {
      input.addEventListener('blur', () => validate(input));
      input.addEventListener('input', () => {
        if (input.getAttribute('aria-invalid') === 'true') validate(input);
      });
    });

    const fillSummary = () => {
      const data = new FormData(form);
      $$('[data-summary]', form).forEach((el) => {
        el.textContent = data.get(el.dataset.summary);
      });
    };

    const render = (index) => {
      tabs.forEach((tab, i) => {
        tab.classList.toggle('is-done', i < completed);
        tab.setAttribute('aria-disabled', i > completed);
      });
      prev.hidden = index === last;
      prev.disabled = index === 0;
      next.textContent = ['다음', '문의 접수하기', '처음으로'][index];
      if (index === 1) fillSummary();
    };

    const stepper = createTabs({ tabs, canSelect: (index) => index <= completed, onChange: render });

    const advance = () => {
      completed = Math.max(completed, stepper.current + 1);
      stepper.select(stepper.current + 1);
    };

    const reset = () => {
      completed = 0;
      form.reset();
      inputs.forEach((input) => {
        const field = input.closest('.field');
        $('.field__help', field).textContent = $('.field__help', field).dataset.default;
        field.classList.remove('is-error');
        input.setAttribute('aria-invalid', 'false');
      });
      consentHelp.textContent = '문의하려면 동의가 필요해요.';
      $('#consentField').classList.remove('is-error');
      stepper.select(0);
    };

    prev.addEventListener('click', () => stepper.select(stepper.current - 1));

    next.addEventListener('click', () => {
      const step = stepper.current;

      if (step === 0) {
        const invalid = inputs.filter((input) => !validate(input));
        if (invalid.length) return invalid[0].focus();
        advance();
      } else if (step === 1) {
        if (!consent.checked) {
          $('#consentField').classList.add('is-error');
          consentHelp.textContent = '개인정보 수집·이용에 동의해 주세요.';
          return consent.focus();
        }
        $('[data-receipt]', form).textContent = `Q-${Date.now().toString().slice(-8)}`;
        advance();
        showToast('문의가 접수되었어요');
      } else {
        reset();
      }
    });

    consent.addEventListener('change', () => {
      $('#consentField').classList.remove('is-error');
      consentHelp.textContent = consent.checked ? '동의해 주셔서 감사해요.' : '문의하려면 동의가 필요해요.';
    });

    form.addEventListener('submit', (event) => event.preventDefault());
    render(0);

    return { consent };
  };

  // Terms dialog: "동의합니다" checks the consent box
  const initModal = (consent) => {
    const modal = $('#termsModal');
    let opener;

    $('[data-modal-open]').addEventListener('click', (event) => {
      opener = event.currentTarget;
      modal.showModal();
    });

    modal.addEventListener('click', (event) => {
      if (event.target === modal) modal.close();
    });

    modal.addEventListener('close', () => {
      if (modal.returnValue === 'confirm') {
        consent.checked = true;
        consent.dispatchEvent(new Event('change'));
      }
      modal.returnValue = '';
      if (opener) opener.focus();
    });
  };

  // Current breakpoint label (same values as the SCSS breakpoints)
  const initViewportLabel = () => {
    const label = $('[data-viewport]');

    const update = () => {
      const width = window.innerWidth;
      let name = 'Desktop';
      if (width <= 620) name = 'Mobile';
      else if (width <= 1023) name = 'Tablet';
      else if (width >= 1280) name = 'Wide';
      label.textContent = `${name} · ${width}px`;
    };

    window.addEventListener('resize', update);
    update();
  };

  const initComponents = () => {
    initViewportLabel();
    initPlaceholders();
    initFaq();
    const { consent } = initInquiry();
    initModal(consent);
  };

  Object.assign(window.App, { initComponents, showToast });
})();
