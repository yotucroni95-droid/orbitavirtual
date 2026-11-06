# Órbita Virtual — Portfólio oficial

Portfólio institucional da **Órbita Virtual**, desenvolvido com HTML, CSS e JavaScript puro. Foi feito para ser hospedado gratuitamente no **GitHub Pages**, sem instalação de Node.js, sem banco de dados e sem etapa de compilação.

## O que já funciona

- Design responsivo, mobile-first, com a **logo enviada** e identidade azul-marinho/azul elétrico.
- Menu de navegação para computador e celular.
- Dez cartões de serviços. O link **Tenho interesse** pré-seleciona o serviço no formulário.
- Seleção múltipla de serviços e envio da proposta ao WhatsApp **(87) 98134-5302** com mensagem personalizada.
- Galeria de projetos com filtros por categoria.
- Seção de clientes e diferenciais.
- Animações discretas com respeito à preferência de movimento reduzido.
- Botão flutuante de WhatsApp, SEO básico e recursos de acessibilidade.
- Áreas de indicadores e depoimentos prontas para ativação **somente com dados reais**.
- Nenhum preço publicado.

## Publicar no GitHub Pages (sem terminal)

1. Acesse [github.com/new](https://github.com/new) e crie um repositório, por exemplo `orbita-virtual` (público, se quiser usar GitHub Pages gratuitamente).
2. Entre no repositório e use **Add file → Upload files**.
3. Envie **o conteúdo da pasta** deste projeto, mantendo `index.html`, `styles.css`, `script.js`, `content.js` e a pasta `assets/` na raiz. **Não coloque todos os arquivos dentro de uma pasta extra.**
4. Confirme com **Commit changes**.
5. Em **Settings → Pages**, no campo **Build and deployment**, escolha **Deploy from a branch**, branch **main**, pasta **/(root)**, e clique **Save**.
6. O endereço será semelhante a `https://SEU-USUARIO.github.io/orbita-virtual/`. O próprio GitHub Pages informará a URL exata quando a publicação estiver concluída.

Também é possível abrir `index.html` diretamente no computador para conferir o layout. Para testar o WhatsApp, é necessário ter acesso à internet.

## Atualizar o conteúdo

Abra **`content.js`** para alterar:

| Propriedade | Para que serve |
|---|---|
| `whatsapp` | Número que receberá os pedidos. Apenas dígitos e DDI 55. |
| `instagram` | Link do Instagram (inicialmente vazio). |
| `email` | E-mail comercial (inicialmente vazio). |
| `services` | Nomes e descrições dos serviços. |
| `projects` | Projetos exibidos e suas categorias. |
| `clients` | Lista de marcas atendidas. |
| `differentials` | Diferenciais institucionais. |
| `process` | Etapas do processo criativo. |
| `metrics` | Resultados reais, com indicação de período e contexto. |
| `testimonials` | Depoimentos autorizados. |

### Adicionar fotos reais dos projetos

1. Coloque suas imagens em `assets/projetos/` (crie a pasta se necessário).
2. Em `content.js`, encontre o projeto desejado e altere `image: ''` para, por exemplo, `image: 'assets/projetos/sao-miguel.jpg'`.
3. A capa da galeria passa a mostrar **essa fotografia real**, no lugar da capa tipográfica.
4. Evite arquivos muito pesados: preferencialmente WebP ou JPG otimizado, entre 1200 e 1600 pixels de largura.

**Nota importante:** As capas tipográficas iniciais **não são montagens dos trabalhos reais**. São apresentações editoriais de cada projeto. Substitua-as por fotos e peças aprovadas para criar um portfólio visual mais convincente.

### Adicionar logos reais dos clientes

Atualmente os nomes das marcas aparecem em uma grade tipográfica, sem simular logos que não foram enviadas. Se quiser usar logotipos reais, é possível adaptar os itens e o renderizador do `script.js` ou solicitar uma atualização.

### Atualizar resultados sem inventar números

Altere `metrics: []` no arquivo `content.js` para algo assim, **somente depois de verificar os dados**:

```js
metrics: [
  { value: 120000, suffix: '+', label: 'Visualizações', context: 'Projeto X — mês/ano' },
  { value: 15, suffix: '', label: 'Projetos realizados', context: 'Até mês/ano' }
]
```

Os números acima são **exemplos de estrutura, não dados da Órbita**. Enquanto `metrics` estiver vazio, a seção não aparece.

Para depoimentos:

```js
testimonials: [
  { quote: 'Texto autorizado pelo cliente', person: 'Nome da pessoa', company: 'Empresa' }
]
```

### Instagram e e-mail

Por segurança, nenhum perfil ou e-mail foi inventado. Após confirmar, preencha `instagram` e `email` em `content.js`; esses contatos aparecem automaticamente na seção de contato.

## Arquivos

```text
orbita-virtual/
├── index.html            Página e conteúdo institucional
├── styles.css            Identidade visual e responsividade
├── script.js             Interações (WhatsApp, filtros, menu e animações)
├── content.js            Serviços, clientes, projetos e contatos editáveis
├── README.md             Instruções de publicação e edição
├── .nojekyll             Desativa processamento Jekyll desnecessário
└── assets/
    ├── logo-original.png
    ├── logo-transparente.png
    ├── favicon.png
    ├── apple-touch-icon.png
    └── og-orbita.jpg
```

## Observações

- As imagens de projetos e logos individuais de clientes precisam ser inseridas depois, com os arquivos corretos e as permissões pertinentes.
- A fonte usa Google Fonts quando há acesso à internet, com fontes locais como alternativa.
- O formulário abre o WhatsApp; **não coleta nem armazena mensagens no servidor**.
- Hospedagem gratuita do GitHub Pages não inclui backend próprio; a página atual não precisa dele.
- Se for conectar domínio próprio ou publicar em outro endereço, atualize os dados Open Graph e as configurações de SEO de acordo com a nova URL.

Desenvolvido para apresentação institucional e captação de propostas personalizadas, **sem tabela de preços**.