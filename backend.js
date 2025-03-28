class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = Number(idade);
        this.curso = curso;
        this.notaFinal = Number(notaFinal);
    }

    isAprovado() {
        return this.notaFinal >= 7;
    }

    toString() {
        return `${this.nome} - ${this.curso} - Nota: ${this.notaFinal} (${this.isAprovado() ? "Aprovado" : "Reprovado"})`;
    }
}

const alunos = [];

document.getElementById('alunoForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const curso = document.getElementById('curso').value;
    const notaFinal = document.getElementById('notaFinal').value;

    const aluno = new Aluno(nome, idade, curso, notaFinal);
    alunos.push(aluno);

    atualizarTabela();
    document.getElementById('alunoForm').reset();
    alert(`${aluno.nome} cadastrado com sucesso!`);
});

const atualizarTabela = () => {
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
};

const excluirAluno = (index) => {
    alert(`Aluno ${alunos[index].nome} removido!`);
    alunos.splice(index, 1);
    atualizarTabela();
};

const editarAluno = (index) => {
    const aluno = alunos[index];
    document.getElementById('nome').value = aluno.nome;
    document.getElementById('idade').value = aluno.idade;
    document.getElementById('curso').value = aluno.curso;
    document.getElementById('notaFinal').value = aluno.notaFinal;
    
    excluirAluno(index);
};

const gerarRelatorios = () => {
    if (alunos.length === 0) {
        alert("Nenhum aluno cadastrado para gerar relatórios.");
        return;
    }

    const aprovados = alunos.filter(aluno => aluno.isAprovado());
    const mediaNotas = alunos.reduce((acc, aluno) => acc + aluno.notaFinal, 0) / alunos.length || 0;
    const mediaIdades = alunos.reduce((acc, aluno) => acc + aluno.idade, 0) / alunos.length || 0;
    const alunosOrdenados = [...alunos].sort((a, b) => a.nome.localeCompare(b.nome));
    const qtdPorCurso = alunos.reduce((acc, aluno) => {
        acc[aluno.curso] = (acc[aluno.curso] || 0) + 1;
        return acc;
    }, {});

    alert(`Relatório:\n\n` +
          `Alunos Aprovados: ${aprovados.length}\n` +
          `Média das Notas: ${mediaNotas.toFixed(2)}\n` +
          `Média das Idades: ${mediaIdades.toFixed(2)}\n` +
          `Alunos em Ordem Alfabética: ${alunosOrdenados.map(a => a.nome).join(", ")}\n` +
          `Quantidade por Curso: ${JSON.stringify(qtdPorCurso)}`);
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("button[onclick='gerarRelatorios()']").addEventListener("click", gerarRelatorios);
});
