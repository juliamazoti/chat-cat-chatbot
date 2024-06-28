const chatMessages = document.getElementById('chat-messages');
const chatOptions = document.getElementById('chat-options');
const chatInput = document.getElementById('chat-input');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

let catName = "";
let catAge = "";
let currentQuestion = 0; 

const questions = [
    { question: "Miau, olá! Sou o ChatCat, seu amigo felino virtual! 😸 Qual o nome do seu gatinho?", options: [] },
    { question: "Quantos anos tem o(a) [nome do gato]?", options: ["Filhote (0-1 ano)", "Adulto (1-7 anos)", "Idoso (7+ anos)"] },
    { question: "O que você gostaria de saber sobre o(a) [nome do gato]?", options: ["Qual tipo de areia é melhor?", "Meu gato está vomitando", "Posso dar banho no meu gato?", "Com que frequência devo escovar os dentes do meu gato?", "Como manter uma rotina saudável com meu gato?", "Como escolher a melhor ração para meu gato?"] }
];

function displayQuestion() {
    const questionData = questions[currentQuestion];
    addMessage(questionData.question.replace('[nome do gato]', catName));
    
    if (questionData.options.length > 0) {
        chatOptions.innerHTML = ''; // Limpar opções anteriores

        // Criar a lista (<ul>)
        const optionsList = document.createElement('ul');
        chatOptions.appendChild(optionsList);

        questionData.options.forEach(option => {
            // Criar o item da lista (<li>)
            const listItem = document.createElement('li');
            optionsList.appendChild(listItem);

            // Criar o botão dentro do item da lista
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => handleOptionClick(option));
            listItem.appendChild(button);
        });

        chatOptions.style.display = 'block';
        chatInput.style.display = 'none'; // Esconder o input e botão
    } else if (currentQuestion === 0) { // Pergunta do nome
        chatInput.style.display = 'flex'; // Exibir o input e botão
        messageInput.placeholder = "Digite o nome do seu gatinho...";
        messageInput.focus(); // Dar foco ao input

        sendButton.addEventListener('click', () => {
            catName = messageInput.value;
            addMessage(`Nome do gatinho: ${catName}`, true); 
            chatInput.style.display = 'none'; 
            messageInput.value = ''; // Limpar o input
            currentQuestion++;
            displayQuestion();
        });
    }
}

function handleOptionClick(option) {
    chatOptions.style.display = 'none';

    // Adicionar a pergunta do usuário ao chat
    if (currentQuestion > 1) { 
        addMessage(option, true); 
    }

    if (currentQuestion === 1) { 
        catAge = option;
        addMessage(`Idade do gatinho: ${catAge}`, true);
        currentQuestion++;
        displayQuestion();
    } else {
        handleQuestion(option);
        currentQuestion = 2; 
    }
}

function handleQuestion(option) {
    let response = "Miau, não entendi sua pergunta. Miaau, consulte um veterinário para mais informações.";

    switch (option) {
        case "Qual tipo de areia é melhor?":
            response = `Miau, para o(a) ${catName}, areia de sílica ou aglomerante são boas opções! Mas cada gatinho tem sua preferência, então experimente para ver qual ele mais gosta. Lembre-se, a caixinha de areia sempre limpinha é essencial! 😺`;
            break;
        case "Meu gato está vomitando":
            response = `Miau, se o(a) ${catName} está vomitando, pode ser por várias razões, como bolas de pelo, comida estragada ou até alguma doença. Observe se ele está com outros sintomas, como falta de apetite ou diarreia. Se o vômito persistir, leve-o ao veterinário o quanto antes! 😿`;
            break;
        case "Posso dar banho no meu gato?":
            response = `Miau, a maioria dos gatos não gosta de água, mas se o(a) ${catName} estiver muito sujo, um banho pode ser necessário. Use água morna e shampoo específico para gatos, e tome cuidado para não molhar os ouvidos e olhos. Miaau, não esqueça de consultar um veterinário para ter certeza, ok? 🛁`;
            break;
        case "Com que frequência devo escovar os dentes do meu gato?":
            response = `Miau, o ideal é escovar os dentes do(a) ${catName} diariamente, mas se não for possível, tente escovar pelo menos 3 vezes por semana. Use uma escova e pasta de dente específicas para gatos, e comece aos poucos para ele se acostumar. Miaau, não esqueça de consultar um veterinário para ter certeza, ok? 🦷`;
            break;
        case "Como manter uma rotina saudável com meu gato?":
            response = `Miau, para o(a) ${catName} ter uma vida feliz e saudável, ele precisa de brincadeiras, carinho, alimentação balanceada e visitas regulares ao veterinário. Tente estabelecer horários para as refeições e brincadeiras, e dedique um tempo para escovar os pelos e dentes. 😻`;
            break;
        case "Como escolher a melhor ração para meu gato?":
            response = `Miau, a melhor ração para o(a) ${catName} vai depender da idade, peso, nível de atividade e possíveis condições de saúde. Procure por rações balanceadas, com ingredientes de qualidade e sem corantes ou conservantes artificiais. O veterinário pode te ajudar a escolher a ração ideal! 🍲`;
            break;
    }


    addMessage(response);
    currentQuestion = 2; 
    setTimeout(displayQuestion, 1000); 
}

function addMessage(message, isUser = false) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', isUser ? 'user-message' : 'cat-message');

    // Adicionar o avatar correspondente (gato ou usuário)
    const avatarElement = document.createElement('div');
    avatarElement.classList.add(isUser ? 'user-avatar' : 'avatar');
    messageElement.prepend(avatarElement); 

    const messageText = document.createElement('span');
    messageText.textContent = message;
    messageElement.appendChild(messageText);

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; 

    // Ajustar o tamanho do input se for mensagem do usuário
    if (isUser && messageText.offsetWidth > 0) { 
        const inputWidth = messageText.offsetWidth + 20; 
        messageText.style.width = `${inputWidth}px`;
    }
}

displayQuestion(); 


const modal = document.getElementById("modal");
const instructionsButton = document.getElementById("instructions-button");
const closeButton = document.getElementsByClassName("close-button")[0];

instructionsButton.onclick = function() {
    modal.style.display = "block";
}

closeButton.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
