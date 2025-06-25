# 📊 Dashboard de Produção - Raios-X

Este é um dashboard simples feito com **React + Vite**, projetado para gerar relatórios de produção por máquinas de Raio-X. O sistema não utiliza banco de dados — os dados são temporários e são apagados ao recarregar a página.

O principal objetivo é preencher os dados de operação, gerar um **gráfico interativo** e exportar tudo isso em um **documento Word (.docx)**.

---

## 🚀 Acesso Online

🔗 [Acesse o dashboard no Vercel](https://dashboard-producao.vercel.app) (se já estiver publicado)

---

## ⚙️ Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [docx](https://www.npmjs.com/package/docx) — para gerar arquivos `.docx`
- [file-saver](https://www.npmjs.com/package/file-saver) — para salvar o `.docx` no navegador
- [recharts](https://recharts.org/) — para exibir o gráfico de barras
- [html-to-image](https://www.npmjs.com/package/html-to-image) — para capturar o gráfico como imagem para o Word

---

## 📝 Funcionalidades

- 📅 Preenchimento de dados da operação
- 🖊️ Inclusão manual dos totais de remessas por máquina (Raio 1 a Raio 5)
- 📈 Gráfico de colunas dinâmico exibido na própria tela
- 📄 Geração de um arquivo `.docx` com:
  - Dados preenchidos
  - Tabela de produção
  - Observações
  - Gráfico de barras embutido como imagem

---

## 📦 Instalação Local

```bash
git clone https://github.com/serbiow/dashboard-producao.git
cd dashboard-producao
npm install
npm run dev
```

---

## 📤 Deploy

Este projeto pode ser facilmente hospedado na [Vercel](https://vercel.com/):

1. Faça login no Vercel com sua conta GitHub.
2. Clique em **"New Project"** e selecione este repositório.
3. O Vercel detecta automaticamente que é um projeto Vite.
4. Clique em **Deploy**.

---

## 📂 Estrutura Principal

```bash
📁 src/
 ┣ 📄 App.jsx
 ┣ 📄 Dashboard.jsx
 ┗ 📄 main.jsx
```

---

## 🧪 Exemplo de Uso

1. Preencha os campos de data, responsável e agente.
2. Informe os totais das máquinas Raio 1 a 5.
3. Escreva qualquer observação.
4. Veja o gráfico sendo gerado automaticamente.
5. Clique em **"Gerar Documento"**.
6. Um arquivo `.docx` será baixado, contendo todos os dados e o gráfico.

---

## 🛠️ Melhorias Futuras (opcional)

- Exportar para PDF
- Permitir upload de logo personalizado
- Adicionar múltiplas páginas de relatórios por dia

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
