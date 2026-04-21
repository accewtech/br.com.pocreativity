document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        // Verifica se o menu está visível (aberto) antes de tentar fechar
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});

// 1. Efeito de Expansão (Hover)
const cards = document.querySelectorAll('.card-item');

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});

// 2. Função para abrir o Popup (Modal)
function abrirPopup(url) {
  const iframe = document.getElementById('videoIframe');
  const myModal = new bootstrap.Modal(document.getElementById('videoModal'));
  
  // Adiciona a URL com autoplay
  iframe.src = url + "?autoplay=1&modestbranding=1&rel=0";
  myModal.show();

  // Limpa o Iframe ao fechar a modal para o som parar
  document.getElementById('videoModal').addEventListener('hidden.bs.modal', function () {
    iframe.src = "";
  });
}



document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. LÓGICA DO FORMULÁRIO DE CONTATO (Geralmente na Index) ---
    const formContato = document.getElementById('Formulario'); // Verifique se o ID é este mesmo
    if (formContato) {
        formContato.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = e.target.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = "Enviando...";
            btn.disabled = true;

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            fetch('https://n8n.accew.com.br/webhook/formulario-po', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    alert('Mensagem enviada com sucesso!');
                    this.reset();
                } else {
                    alert('Erro ao enviar contato.');
                }
            })
            .catch(error => console.error('Erro Contato:', error))
            .finally(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            });
        });
    }

    // --- 2. LÓGICA DO FORMULÁRIO DE RECRUTAMENTO (Página Trabalhe) ---
    const formRecrutamento = document.getElementById('formRecrutamento'); // ID que definimos no BStudio
    if (formRecrutamento) {
        formRecrutamento.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = e.target.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = "Enviando...";
            btn.disabled = true;

            // FormData envia o PDF corretamente (não usar JSON aqui)
            const formData = new FormData(this);

            fetch('https://n8n.accew.com.br/webhook/formrecrutamento', {
                method: 'POST',
                body: formData // O navegador configura o Content-Type automaticamente
            })
            .then(response => {
                if (response.ok) {
                    alert('Candidatura enviada com sucesso!');
                    this.reset();
                } else {
                    alert('Erro ao enviar currículo. Verifique o arquivo.');
                }
            })
            .catch(error => console.error('Erro Recrutamento:', error))
            .finally(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            });
        });
    }

});