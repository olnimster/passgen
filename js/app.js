const arr_num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const arr_en = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
	'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't',
	'u', 'v', 'w', 'x', 'y', 'z'
];
const arr_EN = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
	'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T',
	'U', 'V', 'W', 'X', 'Y', 'Z'
];
const arr_symb = ['!', '@', '#', '$', '%', '&', '?', '-', '+', '=', '~'];

function randomInteger(min, max) {
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}

function generatePass(passLength = 25) {
	let result = [];
	if (document.getElementById('password-param-1').checked) {
		result = result.concat(arr_num);
	}
	if (document.getElementById('password-param-2').checked) {
		result = result.concat(arr_en);
	}
	if (document.getElementById('password-param-3').checked) {
		result = result.concat(arr_EN);
	}
	if (document.getElementById('password-param-4').checked) {
		result = result.concat(arr_symb);
	}
	if (result.length === 0) {
		result = [''];
	}

	document.getElementById('out').innerHTML = '';
	for (let i = 0; i < 6; i++) {
		let pass = '';
		for (let index = 0; index < passLength; index++) {
			pass += result[randomInteger(0, result.length - 1)];
		}
		document.getElementById('out').innerHTML += '<p>' + pass + '</p>';
	}

	let outP = document.querySelectorAll('.out p');
	[].forEach.call(outP, function (el) {
		el.onclick = function (e) {
			navigator.clipboard.writeText(this.innerHTML).catch(err => {
				console.log('Something went wrong', err);
			})
		}
	});
}

const container = document.querySelector('.slider__box');
const btn = document.querySelector('.slider__btn');
const color = document.querySelector('.slider__color');
const tooltip = document.querySelector('.slider__tooltip');
const checkbox = document.querySelector('.switch-listener');
const genButton = document.getElementById('generator');

genButton.addEventListener('click', () => {
	generatePass(document.querySelector('.slider__tooltip').innerHTML);
})

checkbox.addEventListener('click', () => {
	generatePass(document.querySelector('.slider__tooltip').innerHTML);
});

dragElement = (target, btn) => {
	target.addEventListener('mousedown', (e) => {
		onMouseMove(e);
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
	});

	onMouseMove = (e) => {
		e.preventDefault();
		let targetRect = target.getBoundingClientRect();
		let x = e.pageX - targetRect.left + 10;
		if (x > targetRect.width) {
			x = targetRect.width
		};
		if (x < 3) {
			x = 3;
		};
		btn.x = x - 10;
		btn.style.left = btn.x + 'px';

		let percentPosition = (btn.x + 10) / targetRect.width * 100;

		color.style.width = percentPosition + "%";

		tooltip.style.left = btn.x - 5 + 'px';

		const passLengthBefore = document.querySelector('.slider__tooltip').innerHTML;
		tooltip.textContent = Math.round(percentPosition / 2);
		const passLengthAfter = document.querySelector('.slider__tooltip').innerHTML;
		if (passLengthBefore != passLengthAfter) {
			generatePass(passLengthAfter);
		}
	};

	onMouseUp = (e) => {
		window.removeEventListener('mousemove', onMouseMove);
	};
};

generatePass();
dragElement(container, btn);