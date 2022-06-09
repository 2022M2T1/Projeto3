let auth
let company_name
let companyId

/* A adição dessa função que "escuta" um evento permite que verifiquemos se a página foi carregada */
document.onreadystatechange = async function () {
    if (document.readyState == "complete") {
        auth = window.sessionStorage.getItem('auth')
        $.ajax({
            url: "http://localhost:3001/Company",
            headers: {"Authorization": `Bearer ${auth}`},
            success: function(resul) { 
                console.log(resul)
                company_name = resul.name
                companyId = resul.id
                if (resul.isCompany == false) {
                    window.location.href = '/view/hubVagas.html'
                }
                checkVagas()
            }
        }).fail(function(err) {
            console.log(err.responseJSON.message);
            window.location.href = '../view/hubVagas.html'
        })
    }
}

let vagas = [
    {
        'nome': 'Analista de Sistemas 1',
        'matchPer': 60,
        'modelo': "Remoto",
        'status': "Aguardando"
    },
    {
        'nome': 'Analista de Sistemas 2',
        'matchPer': 60,
        'modelo': "Presencial",
        'status': "Aprovado"
    },
    {
        'nome': 'Analista de Sistemas 3',
        'matchPer': 50,
        'modelo': "Remoto",
        'status': "Rejeitado"
    },
    {
        'nome': 'Engenheiro de Software',
        'matchPer': 10,
        'modelo': "Presencial",
        'status': "Aguardando"
    },
    {
        'nome': 'Engenheiro da Computação',
        'matchPer': 20,
        'modelo': "Remoto",
        'status': "Aguardando"
    },
    {
        'nome': 'Analista de DB',
        'matchPer': 50,
        'modelo': "Remoto",
        'status': "Aguardando"
    },
]

async function checkVagas() {
    await $.ajax({
        url: "http://localhost:3001/Offer/getOfferCompany",
        headers: { "authorization": `Bearer ${auth}` },
        success: function (resul) {
            console.log(resul)
            vagas = resul.offers
            console.log(vagas)
        }
    }).fail(function (err) {
        console.log(err.responseJSON.message)
    })

    vagas.map((vaga) => {
        console.log('teste')
        document.getElementById('containerOfAll').innerHTML += `
        <div class = "col-sm-12 col-md-6 col-lg-4 bodyVagaComponent" style = "margin-top: 20px;">
            <div class = 'vagaComponent'>
                <div class="row mainWidGet">
                    <div class="col-5 imgHubVagas">
                        <img src = '../images/userTest.png'>
                    </div>
                    <div class="col-7">
                        <div class="divRightHubVagasComponent">
                            <p>${vaga.name}</p>
                            <p class="pForHubVagas"><img src="../images/locationIcon.png" style="height: 25px; width: 30px;">${vaga.location}</p>
                            <p class="pForHubVagas"><img src="../images/workIcon.png" style="height: 25px; width: 30px;">${vaga.type}</p>
                            <div class = 'divBtnSeeMore'>
                                <button class="btnSeeMore">Ver Mais</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    })
}

function redirectToVagaId(param) {
    document.location.href = `../view/vagaExpandida.html?id=${param}`
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 100)
}