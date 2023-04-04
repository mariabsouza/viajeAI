
function generateTrip() {
  
  //API que conecta com a OpenAI, hospedada no Heroku
  const url = 'https://viajeai-api.herokuapp.com/data/api/prompt'
  
  const days = document.getElementById('days')
  const city = document.getElementById('city')
  const type = document.getElementById('type')
  const budget = document.getElementById('budget')

  const section = document.getElementById('tripDetails')
  section.classList.add('show')

  const scheduleHTML = document.getElementById('schedule')
  scheduleHTML.innerHTML = `<h2>Estamos carregando seu roteiro...</h2><img src="assets/img/Process.gif">`
  

  const trip = `Escreva um roteiro de ${days.value} dias, organizado com horários de mais de uma atividade para realizar na cidade ${city.value}, em uma viagem ${type.value}. Tudo isso, dentro do orçamento de R$ ${budget.value}. A resposta deve estar no formato JSON, respeitando perfeitamente o modelo a seguir, sem NENHUMA alteração na estrutura, apenas preencha com os dados:  [{"Dia_1": [{"horario": "09:00","atividade": "atividade"}]},{"Dia_2": [{"horario": "horario","atividade": "atividade"}]}]`
  
  const body = {
    prompt: trip
  }
  
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(response => response.json())

  
    .then(data => {
      data = data.data
      console.log(data)
      data = JSON.parse(data)
  
      scheduleHTML.innerHTML = `<h1>Roteiro para <span>${city.value}</span></h1>`
      for (i = 0; i < data.length; i++) {
        const dia = data[i][`Dia_${i + 1}`]

        scheduleHTML.innerHTML += `<div id="dia_${i+1}"><h3 class="dia">Dia ${i + 1}</h3></div>`

        for (var key in dia) {
          var value = dia[key]

          document.getElementById(`dia_${i+1}`).innerHTML += `<p class="">${value.horario} - ${value.atividade}</p>`
        }
      }


    })
    .catch(error => {
      console.error(error)
    })
}

