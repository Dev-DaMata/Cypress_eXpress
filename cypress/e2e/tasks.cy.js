describe('Tasks', () => {
    let testData;

    before(() => {
        cy.fixture('tasks').then(t => { //rever aula 2 módulo 5, ficou meio confuso em pleno domingo anoite
            testData = t
        })
    })

    const task = {
        name: 'Ler um livro de node.js',
        is_done: false
    }

    context('cadastro', () => {
        it('Should create a task', () => {

            cy.deleteTask(task.name)

            cy.visitCreateTask(task.name)

            cy.contains('main div p', task.name) //procura o item especifico dentro de uma lista pelo seu valor 
                .should('be.visible') //verifica se o mesmo se encontra visivel      
        })

        it('should not duplicate a task', () => {
            cy.deleteTask(task.name)

            cy.postTask(task)

            cy.visitCreateTask(task.name)

            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')
        })

        it('required field', () => {
            cy.visitCreateTask()

            cy.isRequired('This is a required field')
        })
    })

    context('atualização', () => {
        it('must complete a task', () => {
            const task = testData.dup //rever depois 

            cy.deleteTask(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
        })
    })

    context('exclusão', () => {
        it('must remove a task', () => {
            const task = {
                name: 'Estudar JavaScript ',
                is_done: false
            }

            cy.deleteTask(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()

            cy.contains('p', task.name)
                .should('not.exist')
        })
    })
})
