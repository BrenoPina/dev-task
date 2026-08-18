# 📋 DevTask — Painel de Tarefas Kanban

> Aplicação web de gerenciamento de tarefas em estilo Kanban, desenvolvida em **JavaScript Vanilla**, focando na **API nativa de Drag and Drop do HTML5**, manipulação performática do DOM, persistência local e arquitetura modular CSS/JS.

---

## 📌 Sobre o Projeto

O **DevTask** é uma ferramenta de produtividade visual inspirada na metodologia Kanban. O projeto foi construído do zero, sem bibliotecas externas para UI ou estado, com o objetivo de dominar as APIs nativas da Web Platform.

A aplicação permite criar, mover, avançar e deletar tarefas organizadas em três colunas (_Pendentes_, _Em andamento_ e _Concluídas_), oferecendo feedback visual interativo e salvamento automático das informações.

---

## ✨ Funcionalidades

- 🔄 **Drag and Drop Nativo (HTML5):** Reorganização intuitiva de tarefas entre colunas ao arrastar o cartão, com indicação visual dinâmica de _dropzone_.
- ➕ **Criação de Tarefas via Modal:** Formulário dentro da tag nativa `<dialog>`, com validação em tempo real para habilitar o botão de envio apenas com o título preenchido.
- 🚀 **Avanço Rápido de Status:** Botão de ação direta no card para mover a tarefa para a próxima etapa (_Pendente ➔ Em andamento ➔ Concluída_) sem precisar arrastar.
- 🗑️ **Remoção de Tarefas:** Exclusão individual de cards com atualização imediata no painel e no armazenamento.
- 💾 **Persistência de Dados:** Integração com `localStorage` para manter o quadro exatamente como o usuário deixou após recarregar a página.
- 🎨 **Empty States Inteligentes:** Feedback visual (_"Nenhuma tarefa por aqui! 🎉"_) exibido automaticamente quando uma coluna fica sem cards.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estruturação semântica (`<main>`, `<section>`, `<dialog>`), atributos nativos de acessibilidade (`aria-label`) e suporte a drag and drop (`draggable="true"`).
- **CSS3:** Arquitetura modular (`@import`), metodologia **BEM** (_Block Element Modifier_), Variáveis CSS (_Design Tokens_), CSS Grid, Flexbox e estados de _hover_ e _focus_.
- **JavaScript (ES6+):** Arquitetura orientada a módulos (`import`/`export`), manipulação do DOM via `DocumentFragment`, tratamento de eventos e `localStorage`.

---

## 🧠 Conceitos Técnicos & Decisões de Arquitetura

### 1. API Nativa de Drag and Drop (HTML5)

- Implementação dos eventos `dragstart`, `dragend`, `dragenter`, `dragleave`, `dragover` e `drop`.
- Uso da propriedade `dataTransfer` para trafegar o `id` da tarefa em movimento entre os contextos de arraste e soltura.
- Feedback visual imediato alterando classes CSS no início do arraste (`is-dragging`) e ao sobrevoar colunas válidas (`column__list--dropzone`).

### 2. Otimização do DOM com `DocumentFragment`

- A função `renderBoard` utiliza **`document.createDocumentFragment()`** para montar a estrutura das listas em memória antes de anexá-las ao DOM principal, minimizando re-fluxos (_reflows_) e repinturas (_reprints_) no navegador.

### 3. Delegação de Eventos (_Event Delegation_)

- Captura unificada de eventos de clique e eventos de drag no elemento pai (`.board`), utilizando `.closest()` para identificar qual card ou botão específico disparou a ação. Isso reduz o consumo de memória ao evitar múltiplos _event listeners_ em cada card.

### 4. Acessibilidade e Modal Semântico com `<dialog>`

- Uso do elemento nativo `<dialog>` com `.showModal()` e `.close()`, garantindo o gerenciamento do _backdrop_ (com desfoque de fundo `backdrop-filter`) e fechamento ao clicar na área externa ou no botão de cancelar.

---

## 👨‍💻 Autor

Desenvolvido por Breno Pina
