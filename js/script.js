const filterByType = (type, ...values) => values.filter(value => typeof value === type), //функция перебирает все значения, переданные в инпут пользователем и сравнивает их тип с типом селекта, и возвращают те, которые совпадают(проходят фильтр)

	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); //создается массив из всех блоков с выводом
		responseBlocksArray.forEach(block => block.style.display = 'none'); //каждому из блоков присваивается display: none
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks(); //функция, которая скрывает все блоки с выводом
		document.querySelector(blockSelector).style.display = 'block'; //ищет нужный элемент, переданный в качестве параметра и присваивает ему стиль display:block
		if (spanSelector) { //если передается аргумент, содержащий id для span (err/ok)
			document.querySelector(spanSelector).textContent = msgText; //то ищется этот спан и вставляется текст из аргумента msgText
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), //функция показывает ошибку и блок для нее с соответствующими стилями 

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),//показывает результат о том найдены, или нет нужные типы в строке

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), //показывает блок, в котором написано, что показывать нечего

	tryFilterByType = (type, values) => {
		try { //сработает, если нет никаких ошибок
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); //в переменную помещается результат работы кода, представленного строкой, который вернул массив и с момощью метода join этот результат стал строкой
			const alertMsg = (valuesArray.length) ? //в строке есть что-нибудь?
				`Данные с типом ${type}: ${valuesArray}` : //если да, что в алертсообщении будет информация об отобранных элементах
				`Отсутствуют данные типа ${type}`; //иначе, уведомление о том, что ничего не найдено
			showResults(alertMsg); //вызывается функция, которая показывает результат с нашим сформированным выше сообщением
		} catch (e) { //если будут ошибки, то сработает этот блок
			showError(`Ошибка: ${e}`); //функция показывает ошибку
		}
	};

const filterButton = document.querySelector('#filter-btn');
//навешиваем на кнопку фильтровать обработчик события клик
filterButton.addEventListener('click', e => { 
	const typeInput = document.querySelector('#type'); //селект
	const dataInput = document.querySelector('#data'); //инпут для ввода данных

	if (dataInput.value === '') { //если пользователь ничего не ввел, 
		dataInput.setCustomValidity('Поле не должно быть пустым!'); //выводится уведомление о том, что поле не должно пустовать 
		showNoResults();
	} else {
		dataInput.setCustomValidity(''); //если пользователь что-то ввел, уведомляшка пустая
		e.preventDefault();//отменяет перезагрузку страницы
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //вызывается функция, для фильтра, куда подаются значение селекта и введенные данные в инпут
	}
});

