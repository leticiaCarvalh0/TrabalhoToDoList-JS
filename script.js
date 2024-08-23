const minhaLista = new LinkedList();

  //--------------------------------------------------------------------------------------------
  function adicionarTarefa() {
    const descricao = document.getElementById("txtnovaTarefa").value.trim();
    const posicao = parseInt(document.getElementById("txtnovaPrioridade").value.trim());
    const novaTarefa = new Tarefa(descricao, posicao, obterDataAtual(), obterHoraAtual());
  
  let index = 0;
  
  if (minhaLista.isEmpty()) {
      minhaLista.adicionaInicio(novaTarefa);
      console.log("Lista vazia");
  } else {
      let i = 0;
      for (const tarefa of minhaLista) {
          if (posicao < tarefa.prioridade) {
              index = i;
              break;
          }
          index = ++i;
      }
      minhaLista.addAtIndex(index, novaTarefa);
  }
  // Limpar inputs e atualizar a lista
  document.getElementById("txtnovaTarefa").value = "";
  document.getElementById("txtnovaPrioridade").value = "";
  document.getElementById("txtnovaTarefa").focus();
  atualizarLista();
  
  }
 
//--------------------------------------------------------------------------------------------
 
  function removerElementoInicio() {
    if(!minhaLista.isEmpty()){
      const tarefaRealizada = minhaLista.removeInicio();
      mostrarMensagemRemocao(tarefaRealizada);
      const dataInicio = tarefaRealizada.data;
      const dataFim = obterDataAtual();
      const diferencaDias = calcularDiferencaDias(dataInicio, dataFim);
      const horaInicio = tarefaRealizada.hora;
      const horaFim = obterHoraAtual();
      const diferencaHoras = calcularDiferencaHoras(horaInicio, horaFim);
      alert(`Tempo para realizar a tarefa: ${diferencaDias} dias e ${diferencaHoras}`);
      atualizarLista();
    }
    else{

      alert("Lista de Tarefas Vazia");
    }
  }

 //--------------------------------------------------------------------------------------------
 // Função para remover o ultimo elemento da lista
 function removerElementoFinal() {
  if(!minhaLista.isEmpty()){
    const tarefaRealizada = minhaLista.removeFim();
    mostrarMensagemRemocao(tarefaRealizada);
    atualizarLista();
  }
  else{
    alert("Lista de Tarefas Vazia");
  }
}

//--------------------------------------------------------------------------------------------

function tarefaMaisAntiga() {
  if(!minhaLista.isEmpty()){
    let tarefaMaisAntiga = minhaLista.getFirst();
    for(const tarefa of minhaLista){
      tarefaMaisAntiga = comparaTarefasDataHora(tarefa, tarefaMaisAntiga)
    }
    const mensagem = document.getElementById("mensagem-remocao");
    mensagem.innerHTML ="Tarefa mais antiga: "+ tarefaMaisAntiga.descricao;
    mensagem.style.display = "block";
  }
  else{
    alert("Lista de Tarefas Vazia");
  }
}

//--------------------------------------------------------------------------------------------
function mostrarMensagemRemocao(tarefaRealizada) {
    const mensagem = document.getElementById("mensagem-remocao");
    mensagem.innerHTML ="Tarefa realizada: "+ tarefaRealizada.descricao;
    mensagem.style.display = "block";
  }
//-------------------------------------------------------------------------------------------- 
// Função para atualizar a exibição da fila
 function atualizarLista() {
    const lista = document.getElementById("list_listadeTarefas");
    lista.innerHTML = "";
    for (const tarefa of minhaLista) {
        const itemLista = document.createElement("li");
        itemLista.textContent = `${tarefa.descricao} - Prioridade: ${tarefa.prioridade} - Data: ${tarefa.data} - Hora: ${tarefa.hora}`;
        lista.appendChild(itemLista);
    }
  }

 //--------------------------------------------------------------------------------------------
  //FUNÇÕES COMPLEMENTARES PARA A APLICAÇÃO
 //-----------------------------------------
 
 // funcao data
 function obterDataAtual() {
    let dataAtual = new Date();
    let dia = dataAtual.getDate();
    let mes = dataAtual.getMonth() + 1; // Adiciona 1 porque o mês inicia do zero
    let ano = dataAtual.getFullYear();
    // Formata a data como "dd/mm/aaaa"
    let dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
    return dataFormatada;
}
//--------------------------------------------------------------------------------------------
function obterHoraAtual() {
  const data = new Date();
  const hora = data.getHours().toString().padStart(2, '0');
  const minuto = data.getMinutes().toString().padStart(2, '0');
  const segundo = data.getSeconds().toString().padStart(2, '0');
  return `${hora}:${minuto}:${segundo}`;
}
//--------------------------------------------------------------------------------------------
function calcularDiferencaHoras(hora1, hora2) {
  const [h1, m1, s1] = hora1.split(':').map(Number);
  const [h2, m2, s2] = hora2.split(':').map(Number);
  
  const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);
  
  const horas = Math.floor(diferencaSegundos / 3600);
  const minutos = Math.floor((diferencaSegundos % 3600) / 60);
  const segundos = diferencaSegundos % 60;
  
  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}
//--------------------------------------------------------------------------------------------
function calcularDiferencaDias(dataInicial, dataFinal) {
  // Converte as datas em milissegundos
  const msPorDia = 24 * 60 * 60 * 1000; // Quantidade de milissegundos em um dia
  const [diaIni, mesIni, anoIni] = dataInicial.split('/').map(Number);
  const [diaFim, mesFim, anoFim] = dataFinal.split('/').map(Number);
  // Cria objetos Date com as datas fornecidas
  const dataIni = new Date(anoIni, mesIni - 1, diaIni); // Subtrai 1 do mês porque o mês inicia do zero
  const dataFim = new Date(anoFim, mesFim - 1, diaFim);
  // Calcula a diferença em milissegundos entre as duas datas
  const diferencaMs = dataFim - dataIni;
  // Converte a diferença de milissegundos para dias e arredonda para baixo
  const diferencaDias = Math.floor(diferencaMs / msPorDia);
  return diferencaDias;
}
//--------------------------------------------------------------------------------------------
function converterDataFormatoISO8601(data) {
  const partes = data.split('/');
  const dia = partes[0].padStart(2, '0');
  const mes = partes[1].padStart(2, '0');
  const ano = partes[2];
  return `${ano}-${mes}-${dia}`;
}
//--------------------------------------------------------------------------------------------
function comparaTarefasDataHora(tarefa1, tarefa2) {
  const dataHoraTarefa1 = new Date(`${converterDataFormatoISO8601(tarefa1.data)}T${tarefa1.hora}`);
  const dataHoraTarefa2 = new Date(`${converterDataFormatoISO8601(tarefa2.data)}T${tarefa2.hora}`);
  if (dataHoraTarefa1.getTime() < dataHoraTarefa2.getTime()) {
    return tarefa1;
  } else {
    return tarefa2;
  }
}
//--------------------------------------------------------------------------------------------
function saveLinkedListToLocalStorage() {
  console.log("saveLinkedListToLocalStorage");
  let listaParaSalvar = [];
  for(const item of minhaLista){
      listaParaSalvar.push({
          _descricao: item.descricao,
          _prioridade: item.prioridade,
          _data: item.data,
          _hora: item.hora
      });
      console.log(item.toString());
  };
  let jsonStr = JSON.stringify(listaParaSalvar);
  console.log(jsonStr);
  localStorage.setItem('myLinkedList', jsonStr);
  alert("Lista salva com sucesso!");
}
//-----------------------------
function loadLinkedListFromLocalStorage() {
  console.log("loadLinkedListFromLocalStorage");
  let jsonStr = localStorage.getItem('myLinkedList');
  if (jsonStr) {
      let listaCarregada = JSON.parse(jsonStr);
      for (let i = 0; i < listaCarregada.length; i++) {
          let obj = listaCarregada[i];
          let novaTarefa = new Tarefa(obj._descricao, obj._prioridade, obj._data, obj._hora);
          console.log(novaTarefa.toString());
          minhaLista.adicionaFim(novaTarefa);
      }
      atualizarLista();
      alert("Lista carregada com sucesso!");
  }
}
//----------  ----------------------------------------------------------------------------------
