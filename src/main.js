import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './style.css'

import { renderPage } from './page.js'

document.getElementById('root').innerHTML = renderPage()

const contactForm = document.querySelector('#contactForm')
contactForm.addEventListener('submit', (event) => {
	event.preventDefault()
	contactForm.classList.add('was-validated')

	if (!contactForm.checkValidity()) {
		contactForm.querySelector(':invalid')?.focus()
		return
	}

	document.querySelector('#contactFeedback').textContent =
		'Formulario validado. Esta demostración no envía mensajes.'
})