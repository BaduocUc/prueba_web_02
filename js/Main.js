document.addEventListener('DOMContentLoaded', function () {
  const contentDiv = document.getElementById('content');
  const defaultPage = 'Pg001I/Inicio.html'; // Página por defecto a cargar

  // Función para cargar una página
  function loadPage(page) {
    fetch(page)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar la página');
        }
        return response.text();
      })
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.body.innerHTML;
        contentDiv.innerHTML = newContent;

        // Reasignar eventos a las imágenes del carrusel y a las imágenes de la galería
        assignCarouselLinkEvents();
        assignGalleryEvents();

        // Ejecutar scripts dentro del contenido cargado
        const scriptTags = contentDiv.getElementsByTagName('script');
        for (let script of scriptTags) {
          eval(script.innerHTML);
        }

        // Asignar evento al formulario de contacto si está presente
        assignContactFormEvent();

        // Cargar datos dinámicos si es la página de donaciones
        if (page === 'Pg004D/Donaciones.html') {
          loadFoundations();
        }
      })
      .catch(error => {
        console.error('Error al cargar la página:', error);
        contentDiv.innerHTML = '<p>Lo siento, ha ocurrido un error al cargar la página. Asegúrese de usar la extensión Live Server de VS Code</p>';
      });
  }

  // Función para cargar los datos de las fundaciones
  function loadFoundations() {
    fetch('data/fundaciones.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar los datos de las fundaciones');
        }
        return response.json();
      })
      .then(data => {
        const container = document.getElementById('fundaciones-container');
        container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevo contenido
        data.foundations.forEach(foundation => {
          const foundationCard = `
            <div class="col-md-4 mb-4">
              <div class="gallery-item">
                <img src="${foundation.image}" alt="${foundation.name}" class="img-fluid gallery-img" data-description="${foundation.description}" data-link="${foundation.link}">
              </div>
            </div>
          `;
          container.innerHTML += foundationCard;
        });

        // Asignar eventos a las imágenes de la galería
        assignGalleryEvents();
      })
      .catch(error => {
        console.error('Error al cargar los datos de las fundaciones:', error);
      });
  }

  // Cargar la página por defecto al iniciar
  loadPage(defaultPage);

  // Asignar eventos a los enlaces de navegación
  const links = document.querySelectorAll('a[data-page]');
  links.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const page = this.getAttribute('data-page');
      loadPage(page);
    });
  });

  // Función para asignar eventos a las imágenes del carrusel
  function assignCarouselLinkEvents() {
    const carouselLinks = document.querySelectorAll('.carousel-item a');
    carouselLinks.forEach(link => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const page = this.getAttribute('href');
        loadPage(page);
      });
    });
  }

  // Función para asignar eventos a las imágenes de la galería
  function assignGalleryEvents() {
    const galleryImages = document.querySelectorAll('.gallery-img');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const imageModalLabel = document.getElementById('imageModalLabel');
    const modalLink = document.getElementById('modalLink');

    galleryImages.forEach(image => {
      image.addEventListener('click', function () {
        const imgSrc = this.src;
        const imgAlt = this.alt;
        const imgDescription = this.getAttribute('data-description');
        const imgLink = this.getAttribute('data-link');

        modalImage.src = imgSrc;
        imageModalLabel.textContent = imgAlt;
        modalDescription.textContent = imgDescription;
        modalLink.href = imgLink;

        const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
        imageModal.show();
      });
    });
  }

  // Función para manejar el envío del formulario de contacto
  function enviarFormulario(event) {
    event.preventDefault(); // Evitar que el formulario se envíe normalmente

    // Validar el formulario
    const form = event.target;
    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    // Mostrar el mensaje de registro y ocultar el formulario
    document.getElementById("formularioAdopcion").style.display = "none";
    document.getElementById("mensajeRegistro").style.display = "block";

    // Redirigir al usuario al menú principal después de 3 segundos
    setTimeout(function() {
      window.location.href = "Index.html";
    }, 3000);
  }

  // Función para asignar evento al formulario de contacto
  function assignContactFormEvent() {
    const form = document.getElementById('formularioAdopcion');
    if (form) {
      form.addEventListener('submit', enviarFormulario);
    }
  }

  // Asignar eventos iniciales a las imágenes del carrusel y de la galería
  assignCarouselLinkEvents();
  assignGalleryEvents();
  assignContactFormEvent();
});

  const contentDiv = document.getElementById('content');
  const defaultPage = 'Pg001I/Inicio.html'; // Página por defecto a cargar

  // Función para cargar una página
  function loadPage(page) {
    fetch(page)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar la página');
        }
        return response.text();
      })
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.body.innerHTML;
        contentDiv.innerHTML = newContent;

        // Reasignar eventos a las imágenes del carrusel y a las imágenes de la galería
        assignCarouselLinkEvents();
        assignGalleryEvents();

        // Ejecutar scripts dentro del contenido cargado
        const scriptTags = contentDiv.getElementsByTagName('script');
        for (let script of scriptTags) {
          eval(script.innerHTML);
        }

        // Asignar evento al formulario de contacto si está presente
        assignContactFormEvent();

        // Cargar datos dinámicos si es la página de donaciones
        if (page === 'Pg004D/Donaciones.html') {
          loadFoundations();
        }
      })
      .catch(error => {
        console.error('Error al cargar la página:', error);
        contentDiv.innerHTML = '<p>Lo siento, ha ocurrido un error al cargar la página. Asegúrese de usar la extensión Live Server de VS Code</p>';
      });
  }

  // Función para cargar los datos de las fundaciones
  function loadFoundations() {
    fetch('data/fundaciones.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar los datos de las fundaciones');
        }
        return response.json();
      })
      .then(data => {
        const container = document.getElementById('fundaciones-container');
        container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevo contenido
        data.foundations.forEach(foundation => {
          const foundationCard = `
            <div class="col-md-6 mb-4">
              <div class="gallery-item">
                <img src="${foundation.image}" alt="${foundation.name}" class="img-fluid gallery-img" data-description="${foundation.description}" data-link="${foundation.link}">
              </div>
            </div>
          `;
          container.innerHTML += foundationCard;
        });

        // Asignar eventos a las imágenes de la galería
        assignGalleryEvents();
      })
      .catch(error => {
        console.error('Error al cargar los datos de las fundaciones:', error);
      });
  }

  // Cargar la página por defecto al iniciar
  loadPage(defaultPage);

  // Asignar eventos a los enlaces de navegación
  const links = document.querySelectorAll('a[data-page]');
  links.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const page = this.getAttribute('data-page');
      loadPage(page);
    });
  });

  // Función para asignar eventos a las imágenes del carrusel
  function assignCarouselLinkEvents() {
    const carouselLinks = document.querySelectorAll('.carousel-item a');
    carouselLinks.forEach(link => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const page = this.getAttribute('href');
        loadPage(page);
      });
    });
  }

  // Función para asignar eventos a las imágenes de la galería
  function assignGalleryEvents() {
    const galleryImages = document.querySelectorAll('.gallery-img');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const imageModalLabel = document.getElementById('imageModalLabel');
    const modalLink = document.getElementById('modalLink');

    galleryImages.forEach(image => {
      image.addEventListener('click', function () {
        const imgSrc = this.src;
        const imgAlt = this.alt;
        const imgDescription = this.getAttribute('data-description');
        const imgLink = this.getAttribute('data-link');

        modalImage.src = imgSrc;
        imageModalLabel.textContent = imgAlt;
        modalDescription.textContent = imgDescription;
        modalLink.href = imgLink;

        const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
        imageModal.show();
      });
    });
  }

  // Función para manejar el envío del formulario de contacto
  function enviarFormulario(event) {
    event.preventDefault(); // Evitar que el formulario se envíe normalmente

    // Validar el formulario
    const form = event.target;
    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    // Mostrar el mensaje de registro y ocultar el formulario
    document.getElementById("formularioAdopcion").style.display = "none";
    document.getElementById("mensajeRegistro").style.display = "block";

    // Redirigir al usuario al menú principal después de 3 segundos
    setTimeout(function() {
      window.location.href = "Index.html";
    }, 3000);
  }

  // Función para asignar evento al formulario de contacto
  function assignContactFormEvent() {
    const form = document.getElementById('formularioAdopcion');
    if (form) {
      form.addEventListener('submit', enviarFormulario);
    }
  }

  // Asignar eventos iniciales a las imágenes del carrusel y de la galería
  assignCarouselLinkEvents();
  assignGalleryEvents();
  assignContactFormEvent();
});
