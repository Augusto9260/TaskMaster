# 📝 TaskMaster

O **TaskMaster** é um aplicativo móvel de gerenciamento de tarefas (To-Do List) simples, rápido e eficiente. Desenvolvido em **React Native**, o app permite que o usuário crie, conclua e exclua tarefas locais, contando com persistência de dados em disco e verificação automática de atualizações via API do GitHub.

👉 **[Clique aqui para ir direto para a página de Downloads](https://github.com/Augusto9260/TaskMaster/releases/latest)**

---

## 📲 Como Baixar e Instalar o Aplicativo (APK)

Para instalar o **TaskMaster** diretamente no seu dispositivo Android, siga os passos abaixo:

1. **Acessar as Releases:** Vá até a aba [Releases](https://github.com/Augusto9260/TaskMaster/releases) do repositório ou clique no botão de download acima.
2. **Baixar o arquivo:** Na versão mais recente (ex: `v1.2.2`), clique no arquivo **`TaskMaster.apk`** dentro da seção *Assets* para iniciar o download.
3. **Autorizar a Instalação:** Caso o seu navegador ou gerenciador de arquivos peça permissão para "Instalar aplicativos de fontes desconhecidas", conceda a permissão (esse é um procedimento padrão do Android para aplicativos que não estão na Google Play Store).
4. **Pronto!** Abra o aplicativo e comece a gerenciar suas tarefas.

---

## 🚀 Funcionalidades

* **Gerenciamento de Tarefas:** Adicione novas obrigações diárias com um clique.
* **Marcar como Concluída:** Alterne o status da tarefa tocando no botão de verificação (muda o estado visual).
* **Persistência Local:** Seus dados não somem ao fechar o app! Integração total com o `AsyncStorage`.
* **Interface Responsiva:** Uso do `react-native-safe-area-context` para evitar que o conteúdo mude de posição ou fique embaixo da câmera (*notch*) do celular.
* **Auto-Update:** O app consulta a API do GitHub Releases automaticamente na inicialização e avisa o usuário se houver um novo APK disponível para download.

---

## 🛠️ Tecnologias Utilizadas

* [React Native](https://reactnative.dev/) — Framework Mobile
* [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) — Linguagem de Programação
* [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) — Armazenamento Local de Dados
* [React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context) — Tratamento de Telas e Bordas