function mostrarAlerta(icon, title, text, redirectUrl= null) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      willClose: () => {
        window.location.href = redirectUrl;
      },
    });
  }