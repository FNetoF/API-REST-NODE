const AlunoRepository = require('../repositories/AlunoRepository')

class AlunoController {
    async consultar(request, response) {
        const { orderBy } = request.query
        const alunos = await AlunoRepository.buscarTodos(orderBy)

        response.json(alunos)
    }

    async consultarUmRegistro(request, response) {
        const { id } = request.params

        const aluno = await AlunoRepository.buscarPorId(id)

        if (!aluno) {
            return response.status(404).json({ error: 'ERROR: aluno invalido.' })
        }

        response.json(aluno)
    }

    async criar(request, response) {
        const { matricula, nome, email, sexo, telefone } = request.body

        if (!matricula) {
            return response.status(404).json({ error: 'ERROR: a matrícula é obrigatória.' })
        } else if (!nome) {
            return response.status(404).json({ error: 'ERROR: o nome é obrigatório.' })
        } else if (!email) {
            return response.status(404).json({ error: 'ERROR: o email é obrigatório.' })
        } else if (!sexo) {
            return response.status(404).json({ error: 'ERROR: o sexo é obrigatório.' })
        } else if (!telefone) {
            return response.status(404).json({ error: 'ERROR: o telefone é obrigatório.' })
        }

        const alunoExiste = await AlunoRepository.buscarPorMatricula(matricula)

        if (alunoExiste) {
            return response.status(404).json({ error: 'ERROR: matricula já cadastrada!' })
        }

        const aluno = await AlunoRepository.criar({
            matricula, nome, email, sexo, telefone
        })

        response.json(aluno)
    }

    async atualizar(request, response) {
        const { id } = request.params
        const { matricula, nome, email, sexo, telefone } = request.body

        const alunoExiste = await AlunoRepository.buscarPorId(id)

        if (!alunoExiste) {
            return response.status(404).json({ error: 'ERROR: aluno invalido' })
        }

        if (!nome) {
            return response.status(404).json({ error: 'ERROR: o nome é obrigatório.' })
        } else if (!email) {
            return response.status(404).json({ error: 'ERROR: o email é obrigatório.' })
        } else if (!sexo) {
            return response.status(404).json({ error: 'ERROR: o sexo é obrigatório.' })
        } else if (!telefone) {
            return response.status(404).json({ error: 'ERROR: o telefone é obrigatório.' })
        }

        const alunoPorMatricula = await AlunoRepository.buscarPorMatricula(matricula)

        if (alunoPorMatricula && alunoPorMatricula.id !== id) {
            return response.status(404).json({ error: 'ERROR: Essa matrícula já está em uso.' })
        }

        const aluno = await AlunoRepository.atualizar(id, {
            matricula, nome, email, sexo, telefone
        })

        response.json(aluno)
    }

    async excluir(request, response) {
        const { id } = request.params

        const aluno = await AlunoRepository.buscarPorId(id)

        if (!aluno) {
            return response.status(404).json({ error: 'ERROR: aluno invalido.' })
        }

        await AlunoRepository.deletar(id)

        response.sendStatus(204)
    }
}

module.exports = new AlunoController
