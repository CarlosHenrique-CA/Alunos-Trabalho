const alunos = [];
document.getElementById('alunoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const curso = document.getElementById('curso').value;
    const notaFinal = document.getElementById('notaFinal').value;
    
    alunos.push({ nome, idade, curso, notaFinal });
    atualizarTabela();
    this.reset();
});

function atualizarTabela() {
    const tabela = document.getElementById('alunosTabela');
    tabela.innerHTML = '';
    alunos.forEach((aluno, index) => {
        const row = `<tr>
            <td>${aluno.nome}</td>
            <td>${aluno.idade}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.notaFinal}</td>
            <td>
                <button onclick="editarAluno(${index})">Editar</button>
                <button onclick="excluirAluno(${index})">Excluir</button>
            </td>
        </tr>`;
        tabela.innerHTML += row;
    });
}

function excluirAluno(index) {
    alunos.splice(index, 1);
    atualizarTabela();
}

function editarAluno(index) {
    const aluno = alunos[index];
    document.getElementById('nome').value = aluno.nome;
    document.getElementById('idade').value = aluno.idade;
    document.getElementById('curso').value = aluno.curso;
    document.getElementById('notaFinal').value = aluno.notaFinal;
    
    excluirAluno(index);
}